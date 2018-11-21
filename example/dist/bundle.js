require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};

},{}],2:[function(require,module,exports){
'use strict';

var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

},{}],3:[function(require,module,exports){
'use strict';

var stringify = require('./stringify');
var parse = require('./parse');
var formats = require('./formats');

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};

},{"./formats":2,"./parse":4,"./stringify":5}],4:[function(require,module,exports){
'use strict';

var utils = require('./utils');

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder);
            val = options.decoder(part.slice(pos + 1), defaults.decoder);
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]') {
            obj = [];
            obj = obj.concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};

},{"./utils":6}],5:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var formats = require('./formats');

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats['default'];
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    return joined.length > 0 ? prefix + joined : '';
};

},{"./formats":2,"./utils":6}],6:[function(require,module,exports){
'use strict';

var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    var obj;

    while (queue.length) {
        var item = queue.pop();
        obj = item.obj[item.prop];

        if (Array.isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }

    return obj;
};

exports.arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function encode(str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

exports.compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    return compactQueue(queue);
};

exports.isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var GoogleApi = function GoogleApi(opts) {
  opts = opts || {};

  var apiKey = opts.apiKey;
  var libraries = opts.libraries || [];
  var client = opts.client;
  var URL = 'https://maps.googleapis.com/maps/api/js';

  var googleVersion = '3.25';
  var script = null;
  var google = window.google = null;
  var loading = false;
  var channel = null;
  var language = null;
  var region = null;

  var onLoadEvents = [];

  var url = function url() {
    var url = URL;
    var params = {
      key: apiKey,
      callback: 'CALLBACK_NAME',
      libraries: libraries.join(','),
      client: client,
      v: googleVersion,
      channel: channel,
      language: language,
      region: region
    };

    var paramStr = Object.keys(params).filter(function (k) {
      return !!params[k];
    }).map(function (k) {
      return k + '=' + params[k];
    }).join('&');

    return url + '?' + paramStr;
  };

  return url();
};

exports.GoogleApi = GoogleApi;
exports['default'] = GoogleApi;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ScriptCache = require('./ScriptCache');

var _ScriptCache2 = _interopRequireDefault(_ScriptCache);

var _GoogleApi = require('./GoogleApi');

var _GoogleApi2 = _interopRequireDefault(_GoogleApi);

var defaultMapConfig = {};
var wrapper = function wrapper(WrappedComponent) {
  var Wrapper = (function (_React$Component) {
    _inherits(Wrapper, _React$Component);

    function Wrapper(props, context) {
      _classCallCheck(this, Wrapper);

      _get(Object.getPrototypeOf(Wrapper.prototype), 'constructor', this).call(this, props, context);

      this.state = {
        loaded: false,
        map: null,
        google: null
      };
    }

    _createClass(Wrapper, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this = this;

        var refs = this.refs;
        this.scriptCache.google.onLoad(function (err, tag) {

          var maps = window.google.maps;

          var props = _extends({}, _this.props, {
            loaded: _this.state.loaded
          });

          var mapRef = refs.map;

          var node = _reactDom2['default'].findDOMNode(mapRef);
          var center = new maps.LatLng(_this.props.lat, _this.props.lng);

          var mapConfig = _extends({}, defaultMapConfig, {
            center: center, zoom: _this.props.zoom
          });

          _this.map = new maps.Map(node, mapConfig);

          _this.setState({
            loaded: true,
            map: _this.map,
            google: window.google
          });
        });
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {

        this.scriptCache = (0, _ScriptCache2['default'])({
          google: (0, _GoogleApi2['default'])({
            apiKey: this.props.apiKey,
            libraries: ['drawing', 'visualization', 'places'],
            language: "SE",
            region: "GB"
          })
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var props = _extends({}, this.props, {
          loaded: this.state.loaded,
          map: this.state.map,
          google: this.state.google,
          mapComponent: this.refs.map
        });
        return _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(WrappedComponent, props),
          _react2['default'].createElement('div', { ref: 'map' })
        );
      }
    }]);

    return Wrapper;
  })(_react2['default'].Component);

  return Wrapper;
};

exports.wrapper = wrapper;
exports['default'] = wrapper;

},{"./GoogleApi":7,"./ScriptCache":9,"react":undefined,"react-dom":undefined}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var counter = 0;
var scriptMap = new Map();

var ScriptCache = (function (global) {
  return function ScriptCache(scripts) {
    var Cache = {};

    Cache._onLoad = function (key) {
      return function (cb) {
        var stored = scriptMap.get(key);
        if (stored) {
          stored.promise.then(function () {
            stored.error ? cb(stored.error) : cb(null, stored);
          });
        } else {
          // TODO:
        }
      };
    };

    Cache._scriptTag = function (key, src) {
      var tag = document.createElement('script');
      var promise = new Promise(function (resolve, reject) {
        var resolved = false,
            errored = false,
            body = document.getElementsByTagName('body')[0];

        tag.type = 'text/javascript';
        tag.async = false; // Load in order

        var cbName = 'loaderCB' + counter++ + Date.now();
        var cb = undefined;

        var cleanup = function cleanup() {
          if (global[cbName] && typeof global[cbName] === 'function') {
            global[cbName] = null;
          }
        };
        var handleResult = function handleResult(state) {
          return function (evt) {
            var stored = scriptMap.get(key);
            if (state === 'loaded') {
              stored.resolved = true;
              resolve(src);
              // stored.handlers.forEach(h => h.call(null, stored))
              // stored.handlers = []
            } else if (state === 'error') {
                stored.errored = true;
                // stored.handlers.forEach(h => h.call(null, stored))
                // stored.handlers = [];
                reject(evt);
              }
            cleanup();
          };
        };

        tag.onload = handleResult('loaded');
        tag.onerror = handleResult('error');
        tag.onreadystatechange = function () {
          handleResult(tag.readyState);
        };

        // Pick off callback, if there is one
        if (src.match(/callback=CALLBACK_NAME/)) {
          src = src.replace(/(callback=)[^\&]+/, '$1' + cbName);
          cb = window[cbName] = tag.onload;
        } else {
          tag.addEventListener('load', tag.onload);
        }
        tag.addEventListener('error', tag.onerror);

        tag.src = src;
        body.appendChild(tag);
        return tag;
      });
      var initialState = {
        loaded: false,
        error: false,
        promise: promise,
        tag: tag
      };
      scriptMap.set(key, initialState);

      return scriptMap.get(key);
    };

    Object.keys(scripts).forEach(function (key) {
      var script = scripts[key];
      Cache[key] = {
        tag: Cache._scriptTag(key, script),
        onLoad: Cache._onLoad(key)
      };
    });

    return Cache;
  };
})(window);

exports.ScriptCache = ScriptCache;
exports['default'] = ScriptCache;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _pointInPolygon = require('point-in-polygon');

var _pointInPolygon2 = _interopRequireDefault(_pointInPolygon);

var _qs = require('qs');

var markersArray = [];
var bounds = undefined;
var drawingManager = undefined;
var center = undefined;
var maps = undefined;
var resizablePolygon = undefined;
var _area = undefined;
var latitude = undefined;
var longitude = undefined;
var locationAddress = "Djurgårdsvägen 50, 115 21 Stockholm";
var coordinates = [];

var deleteStyle = {
  marginTop: "-88px",
  position: "absolute",
  textAlign: "center",
  left: "40%"
};
var nextStyle = {
  marginTop: "-88px",
  position: "absolute",
  textAlign: "left"

};

var Map = (function (_React$Component) {
  _inherits(Map, _React$Component);

  function Map(props) {
    _classCallCheck(this, Map);

    _get(Object.getPrototypeOf(Map.prototype), 'constructor', this).call(this, props);
    latitude = this.props.mapConfig.lat;
    longitude = this.props.mapConfig.lng;

    var address = "Djurgårdsvägen 50, 115 21 Stockholm";

    if (this.props.roofaddress != "") {
      locationAddress = this.props.roofaddress;
    }
    this.state = {
      drawMode: true,
      loaded: false,
      place: address,
      position: null,
      lat: latitude,
      lng: longitude,
      locaddress: '',
      color: {
        backgroundColor: "#0A539C"
      }

    };
  }

  _createClass(Map, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var main = this;

      var locationname = (0, _qs.parse)(location.search.substr(1));
      if (locationname.location != undefined) {
        locationAddress = locationname.location;
      }

      fetch('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCJ7I4HvFK1CZcRloBVLjnO8_JElgTRZ1o&address=' + locationAddress).then(function (response) {
        return response;
      }).then(function (response) {
        return response.json();
      }).then(function (data) {

        if (data.results[0].geometry.location.lat != '' && data.results[0].geometry.location.lng) {

          latitude = data.results[0].geometry.location.lat, longitude = data.results[0].geometry.location.lng;

          main.setState({
            lat: latitude,
            lng: longitude,
            place: locationAddress
          });

          main.loadMap();
          main.drawPolyline();
        }
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {

      if (prevProps.google !== this.props.google) {
        this.loadMap();
        if (this.props.drawMode) {
          this.drawPolyline();
        }
        if (this.props.insertMarker) {
          this.insertMarker();
        }
        /*if (this.props.heatMap) {
          this.heatMap();
        }*/
      }
      /* if (prevProps.markers.length!==this.props.markers.length &&this.markers!=prevProps.markers && this.state.loaded&&!this.props.heatMap){
         this.getMarkers();
       }*/
    }
  }, {
    key: 'area',
    value: function area(resizablePolygon) {

      _area = google.maps.geometry.spherical.computeArea(resizablePolygon);
      console.log("area" + _area);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var google = this.props.google;
      if (drawingManager && nextProps.drawMode != this.props.drawMode) {
        drawingManager.setDrawingMode(null);
      }
      if (this.props.drawMode !== nextProps.drawMode && nextProps.drawMode && this.props.google) {
        this.drawPolyline();
      }
    }

    /*
    
      heatMap(){
    
        const {google} = this.props;
        const maps = google.maps;
        const points=this.props.markers.map((point) => (
            new google.maps.LatLng(point.latLng.lat,point.latLng.lng)
        ));
    
        let heatmap = new maps.visualization.HeatmapLayer({
          data:points ,
          map: this.map
        });
      }
    */

  }, {
    key: 'insertMarker',
    value: function insertMarker() {
      var google = this.props.google;

      var maps = google.maps;

      google.maps.event.addListener(this.map, 'click', (function (e) {
        var _this = this;

        var markerProps = {
          position: new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()),
          map: this.map,
          draggable: true
        };
        var marker = new maps.Marker(markerProps);

        this.props.handleReturnedMarkers({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        marker.addListener('dragend', function (e) {
          _this.props.handleReturnedMarkers({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        });
      }).bind(this));
    }
  }, {
    key: 'drawPolyline',
    value: function drawPolyline() {
      var google = this.props.google;

      /*drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: false,
        polygonOptions: this.props.polygonOptions
      });*/

      drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        mapTypeControl: false,
        drawingControlOptions: {
          drawingModes: [google.maps.drawing.OverlayType.POLYGON],
          position: google.maps.ControlPosition.LEFT_TOP
        },
        markerOptions: { icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' },
        circleOptions: {
          fillColor: '#ffff00',
          fillOpacity: 1,
          strokeWeight: 5,
          clickable: false,
          editable: true,
          zIndex: 1
        },
        polygonOptions: this.props.polygonOptions
      });

      drawingManager.setMap(this.map);
      //======================================================
      // Event listeners after Polygon closed
      //======================================================
      google.maps.event.addListener(drawingManager, 'polygoncomplete', (function (polyline) {
        drawingManager.setDrawingMode(null);
        resizablePolygon = polyline.getPath();
        this.area(resizablePolygon);
        var color_data = this.state.color;
        document.getElementById('buttonnew').style.backgroundColor = "#000";

        // Delete Polygon on click
        //======================================================

        /*
              google.maps.event.addListener(polyline, 'click', (e) => {
                polyline.setMap(null);
                resizablePolygon = [];
                // this.getMarkers();
                this.drawPolyline();
              });
        */

        google.maps.event.addDomListener(document.getElementById('delete-button'), 'click', function (e) {

          polyline.setMap(null);
          resizablePolygon = [];
          drawingManager.setDrawingMode(true);
          var color_data = color_data;
          document.getElementById('buttonnew').style.backgroundColor = "#0A539C";
          /*   color_data.backgroundColor="#58beec";
          this.setState({
          color:color_data
          })*/

          //this.delete();
        });

        //======================================================
        // Filtering function
        //======================================================
        /*const filterMarkers = () => {
          let polygon = [];
          let insideMarkers = [];
           resizablePolygon.forEach(coord => {
            polygon.push([coord.lat(), coord.lng()]);
          })
          markersArray.forEach(marker => {
            const x = marker.getPosition().lat();
            const y = marker.getPosition().lng();
            if (!isInside([x, y], polygon)) {
              marker.setMap(null)
            } else {
              insideMarkers.push(marker);
              if (!marker.map) {
                marker.setMap(this.map)
              }
            }
          })
          if (this.props.handleReturnedMarkers) {
            this.props.handleReturnedMarkers(insideMarkers);
          }
        }
        filterMarkers();*/
        //======================================================
        // Resize polygon
        //======================================================
        google.maps.event.addListener(resizablePolygon, 'set_at', function (edge) {
          resizablePolygon = polyline.getPath();
          var area = google.maps.geometry.spherical.computeArea(resizablePolygon);
          console.log("area : " + area);
          // filterMarkers();
        });

        google.maps.event.addListener(drawingManager, 'drawingmode_changed', function (e) {
          polyline.setMap(null);
          resizablePolygon = [];
          var area = google.maps.geometry.spherical.computeArea(resizablePolygon);
          console.log("area : " + area);
        });
        google.maps.event.addListener(resizablePolygon, 'insert_at', function (edge) {
          resizablePolygon = polyline.getPath();
          var area = google.maps.geometry.spherical.computeArea(resizablePolygon);
          console.log("area : " + area);
          // filterMarkers();
        });
      }).bind(this));
    }

    //======================================================
    // DISPLAY MARKERS IN MAP
    //======================================================
    /*getMarkers(){
      console.log('getMarkers');
      const {google} = this.props;
      const maps = google.maps;
      markersArray.forEach(marker=>{
        marker.setMap(null);
      })
      markersArray=[];
       this.props.markers.forEach((flag)=>{
        const markerProps=({
          ...flag,
          position: new google.maps.LatLng(flag.latLng.lat,flag.latLng.lng),
          map: this.map
        })
          const marker = new maps.Marker(markerProps);
         if (this.props.onMarkerClick) {
          google.maps.event.addListener(marker,'click',(event)=>{
            this.props.onMarkerClick(marker);
          });
        }
        //======================================================
        // Render info window if we have an info property
        //======================================================
        if (marker.info) {
          const infowindow = new google.maps.InfoWindow({
            content: marker.info
          });
          google.maps.event.addListener(marker,'click',(event)=>{
            infowindow.open(this.map, marker);
          })
        }
        markersArray.push(marker);
        if (this.props.handleReturnedMarkers) {
          this.props.handleReturnedMarkers(markersArray);
        }
      })
    }
    */

  }, {
    key: 'loadMap',
    value: function loadMap() {
      try {
        var _google = this.props.google;

        var _maps = _google.maps;
        var mapRef = this.refs.map;
        var node = _reactDom2['default'].findDOMNode(mapRef);
        var mapConfig = this.props.mapConfig;
        var zoom = mapConfig.zoom;
        var lat = mapConfig.lat;
        var lng = mapConfig.lng;

        var _center = new _maps.LatLng(this.state.lat, this.state.lng);
        var mapConfiguration = _extends({}, {
          center: _center,
          zoom: zoom,
          zoomControl: true,
          styles: [{
            "featureType": "poi",
            "stylers": [{ "visibility": "off" }]
          }],

          drawingMode: _google.maps.drawing.OverlayType.POLYGON,
          drawingControl: true,
          streetViewControl: false,
          drawingControlOptions: { drawingModes: [_google.maps.drawing.OverlayType.POLYGON] },
          mapTypeId: _google.maps.MapTypeId.SATELLITE

        });
        this.map = new _maps.Map(node, mapConfiguration);
        _google.maps.event.addListenerOnce(this.map, 'idle', function () {
          /*if (!this.props.heatMap) {
           // this.getMarkers();
          }*/
        });
        this.setState({
          loaded: true
        });
      } catch (e) {
        console.log('error in load');
      }
    }
  }, {
    key: 'autocmp',
    value: function autocmp() {
      var _this2 = this;

      var geocoder = new google.maps.Geocoder();

      var aref = this.refs.autocomplete;

      var node = _reactDom2['default'].findDOMNode(aref);

      var autocomplete = new google.maps.places.Autocomplete(node);

      autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          return;
        }

        _this2.setState({
          place: place.formatted_address,
          position: place.geometry.location
        });
        _this2.setState({
          lat: _this2.state.position.lat(),
          lng: _this2.state.position.lng()
        });
        _this2.props.mapConfig.lat = _this2.state.position.lat();
        _this2.props.mapConfig.lng = _this2.state.position.lng();

        _this2.loadMap();

        if (_this2.props.drawMode) {
          _this2.drawPolyline();
        }
        console.log(_this2.state.position.lat());
        console.log(_this2.state.position.lng());
        console.log(_this2.state.place);
      });
    }
  }, {
    key: 'calarea',
    value: function calarea() {
      if (resizablePolygon != undefined) {
        var areaval = google.maps.geometry.spherical.computeArea(resizablePolygon);

        for (var i = 0; i < resizablePolygon.getLength(); i++) {
          coordinates.push(resizablePolygon.getAt(i).toUrlValue(6));
        }
        var stringifycordimates = JSON.stringify(coordinates);
        console.log(stringifycordimates);
        console.log(this.state.place);

        this.props.area(areaval, this.state.place, stringifycordimates);
      } else {
        alert("please draw the map");
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'map-position' },
        _react2['default'].createElement(
          'div',
          { id: 'myModal', className: 'modal fade', role: 'dialog' },
          _react2['default'].createElement(
            'div',
            { className: 'modal-dialog', style: { width: "75%", top: 81 } },
            _react2['default'].createElement(
              'div',
              { className: 'modal-content' },
              _react2['default'].createElement(
                'div',
                { className: 'modal-header modal-hed' },
                _react2['default'].createElement(
                  'button',
                  { type: 'button', className: 'close', 'data-dismiss': 'modal' },
                  '×'
                )
              ),
              _react2['default'].createElement(
                'div',
                { className: 'modal-body row' },
                _react2['default'].createElement(
                  'div',
                  { className: 'col-md-8' },
                  _react2['default'].createElement('img', { src: './img/ezgif.com-video-to-gif.gif', className: 'img-responsive', style: { minHeight: "200px", width: "100%" } })
                ),
                _react2['default'].createElement(
                  'div',
                  { className: 'col-md-4' },
                  _react2['default'].createElement(
                    'ul',
                    { className: 'stegs_map' },
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        'span',
                        null,
                        ' 1'
                      ),
                      ': Hitta Ditt Hus och zooma in med + symbolen längst ner till höger på kartan'
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        'span',
                        null,
                        '2'
                      ),
                      ':Växla till kartläget högst upp till vänster om ditt hus är otydligt på satellitbilden'
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        'span',
                        null,
                        '3'
                      ),
                      ': Markera ut takens alla hörn'
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        'span',
                        null,
                        ' 4'
                      ),
                      ': Tryck "Nästa" när linjerna är slutna'
                    ),
                    _react2['default'].createElement(
                      'li',
                      null,
                      _react2['default'].createElement(
                        'button',
                        { className: 'btn btn-primary ', 'data-dismiss': 'modal' },
                        'Ok'
                      )
                    )
                  )
                )
              )
            )
          )
        ),
        _react2['default'].createElement('input', {
          id: 'autofill',
          ref: 'autocomplete',
          type: 'text',
          className: 'form-control',
          onChange: this.autocmp.bind(this),

          placeholder: 'Ange en plats' }),
        _react2['default'].createElement(
          'div',
          {
            style: this.props.mapStyle,
            ref: 'map' },
          'Loading map...'
        ),
        _react2['default'].createElement(
          'div',
          { style: deleteStyle },
          _react2['default'].createElement(
            'button',
            { id: 'delete-button', className: 'btn btn-info' },
            'Rensa'
          ),
          _react2['default'].createElement(
            'button',
            { onClick: this.calarea.bind(this), className: 'btn btn-info', id: 'buttonnew', style: _extends({}, this.state.color) },
            'Nästa'
          )
        )
      );
    }
  }]);

  return Map;
})(_react2['default'].Component);

exports['default'] = Map;
module.exports = exports['default'];
/*}  <iframe width="560" height="315" src="https://www.youtube.com/embed/sXr7_2sYLDw?autoplay=1" ></iframe>*/ /*}
                                                                                                              <input
                                                                                                              type='submit'
                                                                                                              value='Go' />
                                                                                                              */

},{"point-in-polygon":1,"qs":3,"react":undefined,"react-dom":undefined}],"react-google-map-draw-filter":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ApiComponentsScriptCache = require('./ApiComponents/ScriptCache');

var _ApiComponentsScriptCache2 = _interopRequireDefault(_ApiComponentsScriptCache);

var _ApiComponentsGoogleApi = require('./ApiComponents/GoogleApi');

var _ApiComponentsGoogleApi2 = _interopRequireDefault(_ApiComponentsGoogleApi);

var _ApiComponentsGoogleApiComponent = require('./ApiComponents/GoogleApiComponent');

var _ApiComponentsGoogleApiComponent2 = _interopRequireDefault(_ApiComponentsGoogleApiComponent);

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

var _qs = require('qs');

var lat = undefined;
var lng = undefined;

var GoogleMapDrawFilter = (function (_React$Component) {
	_inherits(GoogleMapDrawFilter, _React$Component);

	function GoogleMapDrawFilter(props) {
		_classCallCheck(this, GoogleMapDrawFilter);

		_get(Object.getPrototypeOf(GoogleMapDrawFilter.prototype), 'constructor', this).call(this, props);
		console.log(this.props.area);
	}

	_createClass(GoogleMapDrawFilter, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var main = this;

			var locationname = (0, _qs.parse)(location.search.substr(1));
			if (locationname.location != undefined) {
				var locationAddress = locationname.location;
			}
			fetch('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCJ7I4HvFK1CZcRloBVLjnO8_JElgTRZ1o&address=' + locationAddress).then(function (response) {
				return response;
			}).then(function (response) {
				return response.json();
			}).then(function (data) {

				if (data.results[0].geometry.location.lat != '' && data.results[0].geometry.location.lng != "") {

					var latitude = data.results[0].geometry.location.lat;
					var longitude = data.results[0].geometry.location.lng;
					lat: data.results[0].geometry.location.lat;
					lng: data.results[0].geometry.location.lat;
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {

			return _react2['default'].createElement(
				'div',
				{ className: 'mappositiontop' },
				_react2['default'].createElement(_Map2['default'], {
					google: this.props.google,
					heatMap: this.props.heatMap,
					drawMode: this.props.drawMode,
					markers: this.props.markers,
					mapConfig: this.props.mapConfig,
					mapStyle: this.props.mapStyle,
					polygonOptions: this.props.polygonOptions,
					handleReturnedMarkers: this.props.handleReturnedMarkers,
					onMarkerClick: this.props.onMarkerClick,
					insertMarker: this.props.insertMarker,
					apiKey: this.props.apiKey,
					area: this.props.area,
					roofaddress: this.props.roofaddress

				})
			);
		}
	}]);

	return GoogleMapDrawFilter;
})(_react2['default'].Component);

GoogleMapDrawFilter.propTypes = {
	apiKey: _react2['default'].PropTypes.string.isRequired,
	drawMode: _react2['default'].PropTypes.bool,
	heatMap: _react2['default'].PropTypes.bool,
	markers: _react2['default'].PropTypes.array,
	mapConfig: _react2['default'].PropTypes.object,
	polygonOptions: _react2['default'].PropTypes.object,
	google: _react2['default'].PropTypes.object, //is provided by wrapper
	mapStyle: _react2['default'].PropTypes.object,
	handleReturnedMarkers: _react2['default'].PropTypes.func,
	onMarkerClick: _react2['default'].PropTypes.func,
	insertMarker: _react2['default'].PropTypes.bool
};

GoogleMapDrawFilter.defaultProps = {
	drawMode: true,
	insertMarker: false,
	mapConfig: {
		zoom: 18,
		lat: lat,
		lng: lng

	},
	mapStyle: {
		height: '600px',
		width: '100%'
	},
	polygonOptions: {
		fillColor: '#58beec',
		fillOpacity: 0.3,
		strokeColor: '#58beec',
		strokeWeight: 3,
		clickable: true,
		editable: true,
		zIndex: 1
	},

	markers: []
};

exports['default'] = (0, _ApiComponentsGoogleApiComponent2['default'])(GoogleMapDrawFilter);
module.exports = exports['default'];

},{"./ApiComponents/GoogleApi":7,"./ApiComponents/GoogleApiComponent":8,"./ApiComponents/ScriptCache":9,"./Map":10,"qs":3,"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcG9pbnQtaW4tcG9seWdvbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9xcy9saWIvZm9ybWF0cy5qcyIsIm5vZGVfbW9kdWxlcy9xcy9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcXMvbGliL3BhcnNlLmpzIiwibm9kZV9tb2R1bGVzL3FzL2xpYi9zdHJpbmdpZnkuanMiLCJub2RlX21vZHVsZXMvcXMvbGliL3V0aWxzLmpzIiwiQzovSnlvdGhpL0RpZ2l0YWtfMjAxOF8xMV8wNygxKS9Eb3dubG9hZCBGcm9tIFNlcnZlci9EaWdpdGFrXzIwMThfMTFfMTQvc3JjL0FwaUNvbXBvbmVudHMvR29vZ2xlQXBpLmpzIiwiQzovSnlvdGhpL0RpZ2l0YWtfMjAxOF8xMV8wNygxKS9Eb3dubG9hZCBGcm9tIFNlcnZlci9EaWdpdGFrXzIwMThfMTFfMTQvc3JjL0FwaUNvbXBvbmVudHMvR29vZ2xlQXBpQ29tcG9uZW50LmpzIiwiQzovSnlvdGhpL0RpZ2l0YWtfMjAxOF8xMV8wNygxKS9Eb3dubG9hZCBGcm9tIFNlcnZlci9EaWdpdGFrXzIwMThfMTFfMTQvc3JjL0FwaUNvbXBvbmVudHMvU2NyaXB0Q2FjaGUuanMiLCJDOi9KeW90aGkvRGlnaXRha18yMDE4XzExXzA3KDEpL0Rvd25sb2FkIEZyb20gU2VydmVyL0RpZ2l0YWtfMjAxOF8xMV8xNC9zcmMvTWFwLmpzIiwiQzovSnlvdGhpL0RpZ2l0YWtfMjAxOF8xMV8wNygxKS9Eb3dubG9hZCBGcm9tIFNlcnZlci9EaWdpdGFrXzIwMThfMTFfMTQvc3JjL0dvb2dsZU1hcERyYXdGaWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QU0sU0FBUyxDQUFDLE1BQU07QUFDN0IsU0FBUSxFQUFDLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQy9CLHNCQUFxQixFQUFDLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQzFDLGNBQWEsRUFBQyxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUNsQyxhQUFZLEVBQUMsbUJBQU0sU0FBUyxDQUFDLElBQUk7Q0FDakMsQ0FBQzs7QUFFRixtQkFBbUIsQ0FBQyxZQUFZLEdBQUM7QUFDaEMsU0FBUSxFQUFDLElBQUk7QUFDYixhQUFZLEVBQUMsS0FBSztBQUNsQixVQUFTLEVBQUM7QUFDVCxNQUFJLEVBQUMsRUFBRTtBQUNQLEtBQUcsRUFBQyxHQUFHO0FBQ1AsS0FBRyxFQUFDLEdBQUc7O0VBRVA7QUFDRCxTQUFRLEVBQUM7QUFDUixRQUFNLEVBQUMsT0FBTztBQUNkLE9BQUssRUFBRSxNQUFNO0VBQ2I7QUFDRCxlQUFjLEVBQUM7QUFDZCxXQUFTLEVBQUUsU0FBUztBQUNwQixhQUFXLEVBQUUsR0FBRztBQUNoQixhQUFXLEVBQUMsU0FBUztBQUNyQixjQUFZLEVBQUMsQ0FBQztBQUNkLFdBQVMsRUFBRSxJQUFJO0FBQ2YsVUFBUSxFQUFFLElBQUk7QUFDZCxRQUFNLEVBQUUsQ0FBQztFQUNUOztBQUlELFFBQU8sRUFBQyxFQUFFO0NBQ1YsQ0FBQzs7cUJBSWEsa0RBQW1CLG1CQUFtQixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBvaW50LCB2cykge1xuICAgIC8vIHJheS1jYXN0aW5nIGFsZ29yaXRobSBiYXNlZCBvblxuICAgIC8vIGh0dHA6Ly93d3cuZWNzZS5ycGkuZWR1L0hvbWVwYWdlcy93cmYvUmVzZWFyY2gvU2hvcnRfTm90ZXMvcG5wb2x5Lmh0bWxcbiAgICBcbiAgICB2YXIgeCA9IHBvaW50WzBdLCB5ID0gcG9pbnRbMV07XG4gICAgXG4gICAgdmFyIGluc2lkZSA9IGZhbHNlO1xuICAgIGZvciAodmFyIGkgPSAwLCBqID0gdnMubGVuZ3RoIC0gMTsgaSA8IHZzLmxlbmd0aDsgaiA9IGkrKykge1xuICAgICAgICB2YXIgeGkgPSB2c1tpXVswXSwgeWkgPSB2c1tpXVsxXTtcbiAgICAgICAgdmFyIHhqID0gdnNbal1bMF0sIHlqID0gdnNbal1bMV07XG4gICAgICAgIFxuICAgICAgICB2YXIgaW50ZXJzZWN0ID0gKCh5aSA+IHkpICE9ICh5aiA+IHkpKVxuICAgICAgICAgICAgJiYgKHggPCAoeGogLSB4aSkgKiAoeSAtIHlpKSAvICh5aiAtIHlpKSArIHhpKTtcbiAgICAgICAgaWYgKGludGVyc2VjdCkgaW5zaWRlID0gIWluc2lkZTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGluc2lkZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHBlcmNlbnRUd2VudGllcyA9IC8lMjAvZztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ2RlZmF1bHQnOiAnUkZDMzk4NicsXG4gICAgZm9ybWF0dGVyczoge1xuICAgICAgICBSRkMxNzM4OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlLmNhbGwodmFsdWUsIHBlcmNlbnRUd2VudGllcywgJysnKTtcbiAgICAgICAgfSxcbiAgICAgICAgUkZDMzk4NjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFJGQzE3Mzg6ICdSRkMxNzM4JyxcbiAgICBSRkMzOTg2OiAnUkZDMzk4Nidcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xudmFyIHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybWF0czogZm9ybWF0cyxcbiAgICBwYXJzZTogcGFyc2UsXG4gICAgc3RyaW5naWZ5OiBzdHJpbmdpZnlcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgICBhbGxvd0RvdHM6IGZhbHNlLFxuICAgIGFsbG93UHJvdG90eXBlczogZmFsc2UsXG4gICAgYXJyYXlMaW1pdDogMjAsXG4gICAgZGVjb2RlcjogdXRpbHMuZGVjb2RlLFxuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGRlcHRoOiA1LFxuICAgIHBhcmFtZXRlckxpbWl0OiAxMDAwLFxuICAgIHBsYWluT2JqZWN0czogZmFsc2UsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nOiBmYWxzZVxufTtcblxudmFyIHBhcnNlVmFsdWVzID0gZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZ1ZhbHVlcyhzdHIsIG9wdGlvbnMpIHtcbiAgICB2YXIgb2JqID0ge307XG4gICAgdmFyIGNsZWFuU3RyID0gb3B0aW9ucy5pZ25vcmVRdWVyeVByZWZpeCA/IHN0ci5yZXBsYWNlKC9eXFw/LywgJycpIDogc3RyO1xuICAgIHZhciBsaW1pdCA9IG9wdGlvbnMucGFyYW1ldGVyTGltaXQgPT09IEluZmluaXR5ID8gdW5kZWZpbmVkIDogb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdDtcbiAgICB2YXIgcGFydHMgPSBjbGVhblN0ci5zcGxpdChvcHRpb25zLmRlbGltaXRlciwgbGltaXQpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgcGFydCA9IHBhcnRzW2ldO1xuXG4gICAgICAgIHZhciBicmFja2V0RXF1YWxzUG9zID0gcGFydC5pbmRleE9mKCddPScpO1xuICAgICAgICB2YXIgcG9zID0gYnJhY2tldEVxdWFsc1BvcyA9PT0gLTEgPyBwYXJ0LmluZGV4T2YoJz0nKSA6IGJyYWNrZXRFcXVhbHNQb3MgKyAxO1xuXG4gICAgICAgIHZhciBrZXksIHZhbDtcbiAgICAgICAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICAgICAgICAgIGtleSA9IG9wdGlvbnMuZGVjb2RlcihwYXJ0LCBkZWZhdWx0cy5kZWNvZGVyKTtcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID8gbnVsbCA6ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQuc2xpY2UoMCwgcG9zKSwgZGVmYXVsdHMuZGVjb2Rlcik7XG4gICAgICAgICAgICB2YWwgPSBvcHRpb25zLmRlY29kZXIocGFydC5zbGljZShwb3MgKyAxKSwgZGVmYXVsdHMuZGVjb2Rlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhcy5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgb2JqW2tleV0gPSBbXS5jb25jYXQob2JqW2tleV0pLmNvbmNhdCh2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqW2tleV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIHBhcnNlT2JqZWN0ID0gZnVuY3Rpb24gKGNoYWluLCB2YWwsIG9wdGlvbnMpIHtcbiAgICB2YXIgbGVhZiA9IHZhbDtcblxuICAgIGZvciAodmFyIGkgPSBjaGFpbi5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgb2JqO1xuICAgICAgICB2YXIgcm9vdCA9IGNoYWluW2ldO1xuXG4gICAgICAgIGlmIChyb290ID09PSAnW10nKSB7XG4gICAgICAgICAgICBvYmogPSBbXTtcbiAgICAgICAgICAgIG9iaiA9IG9iai5jb25jYXQobGVhZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmogPSBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICAgICAgICAgIHZhciBjbGVhblJvb3QgPSByb290LmNoYXJBdCgwKSA9PT0gJ1snICYmIHJvb3QuY2hhckF0KHJvb3QubGVuZ3RoIC0gMSkgPT09ICddJyA/IHJvb3Quc2xpY2UoMSwgLTEpIDogcm9vdDtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGNsZWFuUm9vdCwgMTApO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICFpc05hTihpbmRleClcbiAgICAgICAgICAgICAgICAmJiByb290ICE9PSBjbGVhblJvb3RcbiAgICAgICAgICAgICAgICAmJiBTdHJpbmcoaW5kZXgpID09PSBjbGVhblJvb3RcbiAgICAgICAgICAgICAgICAmJiBpbmRleCA+PSAwXG4gICAgICAgICAgICAgICAgJiYgKG9wdGlvbnMucGFyc2VBcnJheXMgJiYgaW5kZXggPD0gb3B0aW9ucy5hcnJheUxpbWl0KVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgb2JqID0gW107XG4gICAgICAgICAgICAgICAgb2JqW2luZGV4XSA9IGxlYWY7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ialtjbGVhblJvb3RdID0gbGVhZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxlYWYgPSBvYmo7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxlYWY7XG59O1xuXG52YXIgcGFyc2VLZXlzID0gZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZ0tleXMoZ2l2ZW5LZXksIHZhbCwgb3B0aW9ucykge1xuICAgIGlmICghZ2l2ZW5LZXkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFRyYW5zZm9ybSBkb3Qgbm90YXRpb24gdG8gYnJhY2tldCBub3RhdGlvblxuICAgIHZhciBrZXkgPSBvcHRpb25zLmFsbG93RG90cyA/IGdpdmVuS2V5LnJlcGxhY2UoL1xcLihbXi5bXSspL2csICdbJDFdJykgOiBnaXZlbktleTtcblxuICAgIC8vIFRoZSByZWdleCBjaHVua3NcblxuICAgIHZhciBicmFja2V0cyA9IC8oXFxbW15bXFxdXSpdKS87XG4gICAgdmFyIGNoaWxkID0gLyhcXFtbXltcXF1dKl0pL2c7XG5cbiAgICAvLyBHZXQgdGhlIHBhcmVudFxuXG4gICAgdmFyIHNlZ21lbnQgPSBicmFja2V0cy5leGVjKGtleSk7XG4gICAgdmFyIHBhcmVudCA9IHNlZ21lbnQgPyBrZXkuc2xpY2UoMCwgc2VnbWVudC5pbmRleCkgOiBrZXk7XG5cbiAgICAvLyBTdGFzaCB0aGUgcGFyZW50IGlmIGl0IGV4aXN0c1xuXG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIC8vIElmIHdlIGFyZW4ndCB1c2luZyBwbGFpbiBvYmplY3RzLCBvcHRpb25hbGx5IHByZWZpeCBrZXlzXG4gICAgICAgIC8vIHRoYXQgd291bGQgb3ZlcndyaXRlIG9iamVjdCBwcm90b3R5cGUgcHJvcGVydGllc1xuICAgICAgICBpZiAoIW9wdGlvbnMucGxhaW5PYmplY3RzICYmIGhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHBhcmVudCkpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBrZXlzLnB1c2gocGFyZW50KTtcbiAgICB9XG5cbiAgICAvLyBMb29wIHRocm91Z2ggY2hpbGRyZW4gYXBwZW5kaW5nIHRvIHRoZSBhcnJheSB1bnRpbCB3ZSBoaXQgZGVwdGhcblxuICAgIHZhciBpID0gMDtcbiAgICB3aGlsZSAoKHNlZ21lbnQgPSBjaGlsZC5leGVjKGtleSkpICE9PSBudWxsICYmIGkgPCBvcHRpb25zLmRlcHRoKSB7XG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgaWYgKCFvcHRpb25zLnBsYWluT2JqZWN0cyAmJiBoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBzZWdtZW50WzFdLnNsaWNlKDEsIC0xKSkpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAga2V5cy5wdXNoKHNlZ21lbnRbMV0pO1xuICAgIH1cblxuICAgIC8vIElmIHRoZXJlJ3MgYSByZW1haW5kZXIsIGp1c3QgYWRkIHdoYXRldmVyIGlzIGxlZnRcblxuICAgIGlmIChzZWdtZW50KSB7XG4gICAgICAgIGtleXMucHVzaCgnWycgKyBrZXkuc2xpY2Uoc2VnbWVudC5pbmRleCkgKyAnXScpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJzZU9iamVjdChrZXlzLCB2YWwsIG9wdGlvbnMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyLCBvcHRzKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRzID8gdXRpbHMuYXNzaWduKHt9LCBvcHRzKSA6IHt9O1xuXG4gICAgaWYgKG9wdGlvbnMuZGVjb2RlciAhPT0gbnVsbCAmJiBvcHRpb25zLmRlY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0aW9ucy5kZWNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0RlY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgb3B0aW9ucy5pZ25vcmVRdWVyeVByZWZpeCA9IG9wdGlvbnMuaWdub3JlUXVlcnlQcmVmaXggPT09IHRydWU7XG4gICAgb3B0aW9ucy5kZWxpbWl0ZXIgPSB0eXBlb2Ygb3B0aW9ucy5kZWxpbWl0ZXIgPT09ICdzdHJpbmcnIHx8IHV0aWxzLmlzUmVnRXhwKG9wdGlvbnMuZGVsaW1pdGVyKSA/IG9wdGlvbnMuZGVsaW1pdGVyIDogZGVmYXVsdHMuZGVsaW1pdGVyO1xuICAgIG9wdGlvbnMuZGVwdGggPSB0eXBlb2Ygb3B0aW9ucy5kZXB0aCA9PT0gJ251bWJlcicgPyBvcHRpb25zLmRlcHRoIDogZGVmYXVsdHMuZGVwdGg7XG4gICAgb3B0aW9ucy5hcnJheUxpbWl0ID0gdHlwZW9mIG9wdGlvbnMuYXJyYXlMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRpb25zLmFycmF5TGltaXQgOiBkZWZhdWx0cy5hcnJheUxpbWl0O1xuICAgIG9wdGlvbnMucGFyc2VBcnJheXMgPSBvcHRpb25zLnBhcnNlQXJyYXlzICE9PSBmYWxzZTtcbiAgICBvcHRpb25zLmRlY29kZXIgPSB0eXBlb2Ygb3B0aW9ucy5kZWNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5kZWNvZGVyIDogZGVmYXVsdHMuZGVjb2RlcjtcbiAgICBvcHRpb25zLmFsbG93RG90cyA9IHR5cGVvZiBvcHRpb25zLmFsbG93RG90cyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5hbGxvd0RvdHMgOiBkZWZhdWx0cy5hbGxvd0RvdHM7XG4gICAgb3B0aW9ucy5wbGFpbk9iamVjdHMgPSB0eXBlb2Ygb3B0aW9ucy5wbGFpbk9iamVjdHMgPT09ICdib29sZWFuJyA/IG9wdGlvbnMucGxhaW5PYmplY3RzIDogZGVmYXVsdHMucGxhaW5PYmplY3RzO1xuICAgIG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzID0gdHlwZW9mIG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzID09PSAnYm9vbGVhbicgPyBvcHRpb25zLmFsbG93UHJvdG90eXBlcyA6IGRlZmF1bHRzLmFsbG93UHJvdG90eXBlcztcbiAgICBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID0gdHlwZW9mIG9wdGlvbnMucGFyYW1ldGVyTGltaXQgPT09ICdudW1iZXInID8gb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA6IGRlZmF1bHRzLnBhcmFtZXRlckxpbWl0O1xuICAgIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID0gdHlwZW9mIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZztcblxuICAgIGlmIChzdHIgPT09ICcnIHx8IHN0ciA9PT0gbnVsbCB8fCB0eXBlb2Ygc3RyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgfVxuXG4gICAgdmFyIHRlbXBPYmogPSB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyA/IHBhcnNlVmFsdWVzKHN0ciwgb3B0aW9ucykgOiBzdHI7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuXG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBrZXlzIGFuZCBzZXR1cCB0aGUgbmV3IG9iamVjdFxuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0ZW1wT2JqKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgIHZhciBuZXdPYmogPSBwYXJzZUtleXMoa2V5LCB0ZW1wT2JqW2tleV0sIG9wdGlvbnMpO1xuICAgICAgICBvYmogPSB1dGlscy5tZXJnZShvYmosIG5ld09iaiwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHV0aWxzLmNvbXBhY3Qob2JqKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBmb3JtYXRzID0gcmVxdWlyZSgnLi9mb3JtYXRzJyk7XG5cbnZhciBhcnJheVByZWZpeEdlbmVyYXRvcnMgPSB7XG4gICAgYnJhY2tldHM6IGZ1bmN0aW9uIGJyYWNrZXRzKHByZWZpeCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1tdJztcbiAgICB9LFxuICAgIGluZGljZXM6IGZ1bmN0aW9uIGluZGljZXMocHJlZml4LCBrZXkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbJyArIGtleSArICddJztcbiAgICB9LFxuICAgIHJlcGVhdDogZnVuY3Rpb24gcmVwZWF0KHByZWZpeCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gcHJlZml4O1xuICAgIH1cbn07XG5cbnZhciB0b0lTTyA9IERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nO1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZW5jb2RlOiB0cnVlLFxuICAgIGVuY29kZXI6IHV0aWxzLmVuY29kZSxcbiAgICBlbmNvZGVWYWx1ZXNPbmx5OiBmYWxzZSxcbiAgICBzZXJpYWxpemVEYXRlOiBmdW5jdGlvbiBzZXJpYWxpemVEYXRlKGRhdGUpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHRvSVNPLmNhbGwoZGF0ZSk7XG4gICAgfSxcbiAgICBza2lwTnVsbHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBzdHJpbmdpZnkgPSBmdW5jdGlvbiBzdHJpbmdpZnkoIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgb2JqZWN0LFxuICAgIHByZWZpeCxcbiAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICBza2lwTnVsbHMsXG4gICAgZW5jb2RlcixcbiAgICBmaWx0ZXIsXG4gICAgc29ydCxcbiAgICBhbGxvd0RvdHMsXG4gICAgc2VyaWFsaXplRGF0ZSxcbiAgICBmb3JtYXR0ZXIsXG4gICAgZW5jb2RlVmFsdWVzT25seVxuKSB7XG4gICAgdmFyIG9iaiA9IG9iamVjdDtcbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvYmogPSBmaWx0ZXIocHJlZml4LCBvYmopO1xuICAgIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBvYmogPSBzZXJpYWxpemVEYXRlKG9iaik7XG4gICAgfSBlbHNlIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgICAgaWYgKHN0cmljdE51bGxIYW5kbGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZXIgJiYgIWVuY29kZVZhbHVlc09ubHkgPyBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2RlcikgOiBwcmVmaXg7XG4gICAgICAgIH1cblxuICAgICAgICBvYmogPSAnJztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IHV0aWxzLmlzQnVmZmVyKG9iaikpIHtcbiAgICAgICAgaWYgKGVuY29kZXIpIHtcbiAgICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IGVuY29kZVZhbHVlc09ubHkgPyBwcmVmaXggOiBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2Rlcik7XG4gICAgICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihrZXlWYWx1ZSkgKyAnPScgKyBmb3JtYXR0ZXIoZW5jb2RlcihvYmosIGRlZmF1bHRzLmVuY29kZXIpKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIocHJlZml4KSArICc9JyArIGZvcm1hdHRlcihTdHJpbmcob2JqKSldO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHZhciBvYmpLZXlzO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGZpbHRlcikpIHtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIG9iaktleXMgPSBzb3J0ID8ga2V5cy5zb3J0KHNvcnQpIDoga2V5cztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKHNraXBOdWxscyAmJiBvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KHN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4KHByZWZpeCwga2V5KSxcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICAgICAgZW5jb2RlcixcbiAgICAgICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seVxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KHN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgICAgICBwcmVmaXggKyAoYWxsb3dEb3RzID8gJy4nICsga2V5IDogJ1snICsga2V5ICsgJ10nKSxcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICAgICAgZW5jb2RlcixcbiAgICAgICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seVxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBvcHRzKSB7XG4gICAgdmFyIG9iaiA9IG9iamVjdDtcbiAgICB2YXIgb3B0aW9ucyA9IG9wdHMgPyB1dGlscy5hc3NpZ24oe30sIG9wdHMpIDoge307XG5cbiAgICBpZiAob3B0aW9ucy5lbmNvZGVyICE9PSBudWxsICYmIG9wdGlvbnMuZW5jb2RlciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRpb25zLmVuY29kZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRW5jb2RlciBoYXMgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgZGVsaW1pdGVyID0gdHlwZW9mIG9wdGlvbnMuZGVsaW1pdGVyID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmRlbGltaXRlciA6IG9wdGlvbnMuZGVsaW1pdGVyO1xuICAgIHZhciBzdHJpY3ROdWxsSGFuZGxpbmcgPSB0eXBlb2Ygb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nO1xuICAgIHZhciBza2lwTnVsbHMgPSB0eXBlb2Ygb3B0aW9ucy5za2lwTnVsbHMgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuc2tpcE51bGxzIDogZGVmYXVsdHMuc2tpcE51bGxzO1xuICAgIHZhciBlbmNvZGUgPSB0eXBlb2Ygb3B0aW9ucy5lbmNvZGUgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuZW5jb2RlIDogZGVmYXVsdHMuZW5jb2RlO1xuICAgIHZhciBlbmNvZGVyID0gdHlwZW9mIG9wdGlvbnMuZW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuZW5jb2RlciA6IGRlZmF1bHRzLmVuY29kZXI7XG4gICAgdmFyIHNvcnQgPSB0eXBlb2Ygb3B0aW9ucy5zb3J0ID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5zb3J0IDogbnVsbDtcbiAgICB2YXIgYWxsb3dEb3RzID0gdHlwZW9mIG9wdGlvbnMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGZhbHNlIDogb3B0aW9ucy5hbGxvd0RvdHM7XG4gICAgdmFyIHNlcmlhbGl6ZURhdGUgPSB0eXBlb2Ygb3B0aW9ucy5zZXJpYWxpemVEYXRlID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5zZXJpYWxpemVEYXRlIDogZGVmYXVsdHMuc2VyaWFsaXplRGF0ZTtcbiAgICB2YXIgZW5jb2RlVmFsdWVzT25seSA9IHR5cGVvZiBvcHRpb25zLmVuY29kZVZhbHVlc09ubHkgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuZW5jb2RlVmFsdWVzT25seSA6IGRlZmF1bHRzLmVuY29kZVZhbHVlc09ubHk7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmZvcm1hdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgb3B0aW9ucy5mb3JtYXQgPSBmb3JtYXRzWydkZWZhdWx0J107XG4gICAgfSBlbHNlIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGZvcm1hdHMuZm9ybWF0dGVycywgb3B0aW9ucy5mb3JtYXQpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZm9ybWF0IG9wdGlvbiBwcm92aWRlZC4nKTtcbiAgICB9XG4gICAgdmFyIGZvcm1hdHRlciA9IGZvcm1hdHMuZm9ybWF0dGVyc1tvcHRpb25zLmZvcm1hdF07XG4gICAgdmFyIG9iaktleXM7XG4gICAgdmFyIGZpbHRlcjtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5maWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG4gICAgICAgIG9iaiA9IGZpbHRlcignJywgb2JqKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9ucy5maWx0ZXIpKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH1cblxuICAgIHZhciBrZXlzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgb2JqID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB2YXIgYXJyYXlGb3JtYXQ7XG4gICAgaWYgKG9wdGlvbnMuYXJyYXlGb3JtYXQgaW4gYXJyYXlQcmVmaXhHZW5lcmF0b3JzKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0aW9ucy5hcnJheUZvcm1hdDtcbiAgICB9IGVsc2UgaWYgKCdpbmRpY2VzJyBpbiBvcHRpb25zKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0aW9ucy5pbmRpY2VzID8gJ2luZGljZXMnIDogJ3JlcGVhdCc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSAnaW5kaWNlcyc7XG4gICAgfVxuXG4gICAgdmFyIGdlbmVyYXRlQXJyYXlQcmVmaXggPSBhcnJheVByZWZpeEdlbmVyYXRvcnNbYXJyYXlGb3JtYXRdO1xuXG4gICAgaWYgKCFvYmpLZXlzKSB7XG4gICAgICAgIG9iaktleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIH1cblxuICAgIGlmIChzb3J0KSB7XG4gICAgICAgIG9iaktleXMuc29ydChzb3J0KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKHNraXBOdWxscyAmJiBvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQoc3RyaW5naWZ5KFxuICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgZW5jb2RlID8gZW5jb2RlciA6IG51bGwsXG4gICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgIGZvcm1hdHRlcixcbiAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHlcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgdmFyIGpvaW5lZCA9IGtleXMuam9pbihkZWxpbWl0ZXIpO1xuICAgIHZhciBwcmVmaXggPSBvcHRpb25zLmFkZFF1ZXJ5UHJlZml4ID09PSB0cnVlID8gJz8nIDogJyc7XG5cbiAgICByZXR1cm4gam9pbmVkLmxlbmd0aCA+IDAgPyBwcmVmaXggKyBqb2luZWQgOiAnJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgaGV4VGFibGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgICAgICAgYXJyYXkucHVzaCgnJScgKyAoKGkgPCAxNiA/ICcwJyA6ICcnKSArIGkudG9TdHJpbmcoMTYpKS50b1VwcGVyQ2FzZSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXk7XG59KCkpO1xuXG52YXIgY29tcGFjdFF1ZXVlID0gZnVuY3Rpb24gY29tcGFjdFF1ZXVlKHF1ZXVlKSB7XG4gICAgdmFyIG9iajtcblxuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiAgICAgICAgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICB2YXIgY29tcGFjdGVkID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgb2JqLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbal0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhY3RlZC5wdXNoKG9ialtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtLm9ialtpdGVtLnByb3BdID0gY29tcGFjdGVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbmV4cG9ydHMuYXJyYXlUb09iamVjdCA9IGZ1bmN0aW9uIGFycmF5VG9PYmplY3Qoc291cmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBvYmpbaV0gPSBzb3VyY2VbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxuZXhwb3J0cy5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGFyZ2V0LnB1c2goc291cmNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGxhaW5PYmplY3RzIHx8IG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzIHx8ICFoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3NvdXJjZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFt0YXJnZXQsIHNvdXJjZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gW3RhcmdldF0uY29uY2F0KHNvdXJjZSk7XG4gICAgfVxuXG4gICAgdmFyIG1lcmdlVGFyZ2V0ID0gdGFyZ2V0O1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgIUFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBtZXJnZVRhcmdldCA9IGV4cG9ydHMuYXJyYXlUb09iamVjdCh0YXJnZXQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgICAgICBpZiAoaGFzLmNhbGwodGFyZ2V0LCBpKSkge1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRbaV0gJiYgdHlwZW9mIHRhcmdldFtpXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gZXhwb3J0cy5tZXJnZSh0YXJnZXRbaV0sIGl0ZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICAgICAgICBpZiAoaGFzLmNhbGwoYWNjLCBrZXkpKSB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IGV4cG9ydHMubWVyZ2UoYWNjW2tleV0sIHZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBtZXJnZVRhcmdldCk7XG59O1xuXG5leHBvcnRzLmFzc2lnbiA9IGZ1bmN0aW9uIGFzc2lnblNpbmdsZVNvdXJjZSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgYWNjW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB0YXJnZXQpO1xufTtcblxuZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG59O1xuXG5leHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShzdHIpIHtcbiAgICAvLyBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBCcmlhbiBXaGl0ZSAobXNjZGV4KSBmb3IgdGhlIGlvLmpzIGNvcmUgcXVlcnlzdHJpbmcgbGlicmFyeS5cbiAgICAvLyBJdCBoYXMgYmVlbiBhZGFwdGVkIGhlcmUgZm9yIHN0cmljdGVyIGFkaGVyZW5jZSB0byBSRkMgMzk4NlxuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgdmFyIHN0cmluZyA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gc3RyIDogU3RyaW5nKHN0cik7XG5cbiAgICB2YXIgb3V0ID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGMgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjID09PSAweDJEIC8vIC1cbiAgICAgICAgICAgIHx8IGMgPT09IDB4MkUgLy8gLlxuICAgICAgICAgICAgfHwgYyA9PT0gMHg1RiAvLyBfXG4gICAgICAgICAgICB8fCBjID09PSAweDdFIC8vIH5cbiAgICAgICAgICAgIHx8IChjID49IDB4MzAgJiYgYyA8PSAweDM5KSAvLyAwLTlcbiAgICAgICAgICAgIHx8IChjID49IDB4NDEgJiYgYyA8PSAweDVBKSAvLyBhLXpcbiAgICAgICAgICAgIHx8IChjID49IDB4NjEgJiYgYyA8PSAweDdBKSAvLyBBLVpcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBvdXQgKz0gc3RyaW5nLmNoYXJBdChpKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyBoZXhUYWJsZVtjXTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4QzAgfCAoYyA+PiA2KV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4RDgwMCB8fCBjID49IDB4RTAwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4RTAgfCAoYyA+PiAxMildICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgYyA9IDB4MTAwMDAgKyAoKChjICYgMHgzRkYpIDw8IDEwKSB8IChzdHJpbmcuY2hhckNvZGVBdChpKSAmIDB4M0ZGKSk7XG4gICAgICAgIG91dCArPSBoZXhUYWJsZVsweEYwIHwgKGMgPj4gMTgpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDEyKSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuZXhwb3J0cy5jb21wYWN0ID0gZnVuY3Rpb24gY29tcGFjdCh2YWx1ZSkge1xuICAgIHZhciBxdWV1ZSA9IFt7IG9iajogeyBvOiB2YWx1ZSB9LCBwcm9wOiAnbycgfV07XG4gICAgdmFyIHJlZnMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBxdWV1ZVtpXTtcbiAgICAgICAgdmFyIG9iaiA9IGl0ZW0ub2JqW2l0ZW0ucHJvcF07XG5cbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGtleXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2pdO1xuICAgICAgICAgICAgdmFyIHZhbCA9IG9ialtrZXldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCAmJiByZWZzLmluZGV4T2YodmFsKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKHsgb2JqOiBvYmosIHByb3A6IGtleSB9KTtcbiAgICAgICAgICAgICAgICByZWZzLnB1c2godmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb21wYWN0UXVldWUocXVldWUpO1xufTtcblxuZXhwb3J0cy5pc1JlZ0V4cCA9IGZ1bmN0aW9uIGlzUmVnRXhwKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuXG5leHBvcnRzLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIob2JqKSB7XG4gICAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaikpO1xufTtcbiIsImV4cG9ydCBjb25zdCBHb29nbGVBcGkgPSBmdW5jdGlvbihvcHRzKSB7XG4gIG9wdHMgPSBvcHRzIHx8IHt9XG5cbiAgY29uc3QgYXBpS2V5ID0gb3B0cy5hcGlLZXk7XG4gIGNvbnN0IGxpYnJhcmllcyA9IG9wdHMubGlicmFyaWVzIHx8IFtdO1xuICBjb25zdCBjbGllbnQgPSBvcHRzLmNsaWVudDtcbiAgY29uc3QgVVJMID0gJ2h0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9qcyc7XG5cbiAgY29uc3QgZ29vZ2xlVmVyc2lvbiA9ICczLjI1JztcbiAgbGV0IHNjcmlwdCA9IG51bGw7XG4gIGxldCBnb29nbGUgPSB3aW5kb3cuZ29vZ2xlID0gbnVsbDtcbiAgbGV0IGxvYWRpbmcgPSBmYWxzZTtcbiAgbGV0IGNoYW5uZWwgPSBudWxsO1xuICBsZXQgbGFuZ3VhZ2UgPSBudWxsO1xuICBsZXQgcmVnaW9uID0gbnVsbDtcblxuICBsZXQgb25Mb2FkRXZlbnRzID0gW107XG5cbiAgY29uc3QgdXJsID0gKCkgPT4ge1xuICAgIGxldCB1cmwgPSBVUkw7XG4gICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgIGtleTogYXBpS2V5LFxuICAgICAgY2FsbGJhY2s6ICdDQUxMQkFDS19OQU1FJyxcbiAgICAgIGxpYnJhcmllczogbGlicmFyaWVzLmpvaW4oJywnKSxcbiAgICAgIGNsaWVudDogY2xpZW50LFxuICAgICAgdjogZ29vZ2xlVmVyc2lvbixcbiAgICAgIGNoYW5uZWw6IGNoYW5uZWwsXG4gICAgICBsYW5ndWFnZTogbGFuZ3VhZ2UsXG4gICAgICByZWdpb246IHJlZ2lvblxuICAgIH1cblxuICAgIGxldCBwYXJhbVN0ciA9IE9iamVjdC5rZXlzKHBhcmFtcylcbiAgICAgICAgLmZpbHRlcihrID0+ICEhcGFyYW1zW2tdKVxuICAgICAgICAubWFwKGsgPT4gYCR7a309JHtwYXJhbXNba119YCkuam9pbignJicpO1xuXG4gICAgcmV0dXJuIGAke3VybH0/JHtwYXJhbVN0cn1gO1xuICB9XG5cbiAgcmV0dXJuIHVybCgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBHb29nbGVBcGlcbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgYXMgVCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuXG5pbXBvcnQgY2FjaGUgZnJvbSAnLi9TY3JpcHRDYWNoZSc7XG5pbXBvcnQgR29vZ2xlQXBpIGZyb20gJy4vR29vZ2xlQXBpJztcblxuY29uc3QgZGVmYXVsdE1hcENvbmZpZyA9IHt9O1xuZXhwb3J0IGNvbnN0IHdyYXBwZXIgPSAgKFdyYXBwZWRDb21wb25lbnQpID0+IHtcblxuXG4gIGNsYXNzIFdyYXBwZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XG5cbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIGxvYWRlZDogZmFsc2UsXG4gICAgICAgIG1hcDogbnVsbCxcbiAgICAgICAgZ29vZ2xlOiBudWxsXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuXG4gICAgICBjb25zdCByZWZzID0gdGhpcy5yZWZzO1xuICAgICAgdGhpcy5zY3JpcHRDYWNoZS5nb29nbGUub25Mb2FkKChlcnIsIHRhZykgPT4ge1xuICAgICAgICBcbiAgICAgICAgICBjb25zdCBtYXBzID0gd2luZG93Lmdvb2dsZS5tYXBzO1xuXG4gICAgICAgICAgY29uc3QgcHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLCB7XG4gICAgICAgICAgICBsb2FkZWQ6IHRoaXMuc3RhdGUubG9hZGVkXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBtYXBSZWYgPSByZWZzLm1hcDtcblxuICAgICAgICAgIGNvbnN0IG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShtYXBSZWYpO1xuICAgICAgICAgIGxldCBjZW50ZXIgPSBuZXcgbWFwcy5MYXRMbmcodGhpcy5wcm9wcy5sYXQsIHRoaXMucHJvcHMubG5nKTtcblxuICAgICAgICAgIGxldCBtYXBDb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0TWFwQ29uZmlnLCB7XG4gICAgICAgICAgICBjZW50ZXIsIHpvb206IHRoaXMucHJvcHMuem9vbVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5tYXAgPSBuZXcgbWFwcy5NYXAobm9kZSwgbWFwQ29uZmlnKTtcblxuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgbG9hZGVkOiB0cnVlLFxuICAgICAgICAgICAgbWFwOiB0aGlzLm1hcCxcbiAgICAgICAgICAgIGdvb2dsZTogd2luZG93Lmdvb2dsZVxuICAgICAgICAgIH0pXG5cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcblxuICAgICAgdGhpcy5zY3JpcHRDYWNoZSA9IGNhY2hlKHtcbiAgICAgICAgZ29vZ2xlOiBHb29nbGVBcGkoe1xuICAgICAgICAgIGFwaUtleTogdGhpcy5wcm9wcy5hcGlLZXksXG4gICAgICAgICAgbGlicmFyaWVzOiBbJ2RyYXdpbmcnLCAndmlzdWFsaXphdGlvbicsJ3BsYWNlcyddLFxuICAgICAgICAgIGxhbmd1YWdlOlwiU0VcIixcbiAgICAgICAgICByZWdpb246XCJHQlwiLFxuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3QgcHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLCB7XG4gICAgICAgIGxvYWRlZDogdGhpcy5zdGF0ZS5sb2FkZWQsXG4gICAgICAgIG1hcDogdGhpcy5zdGF0ZS5tYXAsXG4gICAgICAgIGdvb2dsZTogdGhpcy5zdGF0ZS5nb29nbGUsXG4gICAgICAgIG1hcENvbXBvbmVudDogdGhpcy5yZWZzLm1hcFxuICAgICAgfSlcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPFdyYXBwZWRDb21wb25lbnQgey4uLnByb3BzfSAvPlxuICAgICAgICAgIDxkaXYgcmVmPSdtYXAnIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBXcmFwcGVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCB3cmFwcGVyO1xuIiwibGV0IGNvdW50ZXIgPSAwO1xubGV0IHNjcmlwdE1hcCA9IG5ldyBNYXAoKTtcblxuZXhwb3J0IGNvbnN0IFNjcmlwdENhY2hlID0gKGZ1bmN0aW9uKGdsb2JhbCkge1xuICByZXR1cm4gZnVuY3Rpb24gU2NyaXB0Q2FjaGUgKHNjcmlwdHMpIHtcbiAgICBjb25zdCBDYWNoZSA9IHt9XG5cbiAgICBDYWNoZS5fb25Mb2FkID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIChjYikgPT4ge1xuICAgICAgICBsZXQgc3RvcmVkID0gc2NyaXB0TWFwLmdldChrZXkpO1xuICAgICAgICBpZiAoc3RvcmVkKSB7XG4gICAgICAgICAgc3RvcmVkLnByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBzdG9yZWQuZXJyb3IgPyBjYihzdG9yZWQuZXJyb3IpIDogY2IobnVsbCwgc3RvcmVkKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVE9ETzpcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIENhY2hlLl9zY3JpcHRUYWcgPSAoa2V5LCBzcmMpID0+IHtcbiAgICAgICAgbGV0IHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBsZXQgcmVzb2x2ZWQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgZXJyb3JlZCA9IGZhbHNlLFxuICAgICAgICAgICAgICBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcblxuICAgICAgICAgIHRhZy50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgICAgICAgdGFnLmFzeW5jID0gZmFsc2U7IC8vIExvYWQgaW4gb3JkZXJcblxuICAgICAgICAgIGNvbnN0IGNiTmFtZSA9IGBsb2FkZXJDQiR7Y291bnRlcisrfSR7RGF0ZS5ub3coKX1gO1xuICAgICAgICAgIGxldCBjYjtcblxuICAgICAgICAgIGNvbnN0IGNsZWFudXAgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZ2xvYmFsW2NiTmFtZV0gJiYgdHlwZW9mIGdsb2JhbFtjYk5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIGdsb2JhbFtjYk5hbWVdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IGhhbmRsZVJlc3VsdCA9IChzdGF0ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChldnQpID0+IHtcbiAgICAgICAgICAgICAgbGV0IHN0b3JlZCA9IHNjcmlwdE1hcC5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSAnbG9hZGVkJykge1xuICAgICAgICAgICAgICAgIHN0b3JlZC5yZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzcmMpO1xuICAgICAgICAgICAgICAgIC8vIHN0b3JlZC5oYW5kbGVycy5mb3JFYWNoKGggPT4gaC5jYWxsKG51bGwsIHN0b3JlZCkpXG4gICAgICAgICAgICAgICAgLy8gc3RvcmVkLmhhbmRsZXJzID0gW11cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICAgIHN0b3JlZC5lcnJvcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBzdG9yZWQuaGFuZGxlcnMuZm9yRWFjaChoID0+IGguY2FsbChudWxsLCBzdG9yZWQpKVxuICAgICAgICAgICAgICAgIC8vIHN0b3JlZC5oYW5kbGVycyA9IFtdO1xuICAgICAgICAgICAgICAgIHJlamVjdChldnQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICB0YWcub25sb2FkID0gaGFuZGxlUmVzdWx0KCdsb2FkZWQnKTtcbiAgICAgICAgICB0YWcub25lcnJvciA9IGhhbmRsZVJlc3VsdCgnZXJyb3InKVxuICAgICAgICAgIHRhZy5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBoYW5kbGVSZXN1bHQodGFnLnJlYWR5U3RhdGUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gUGljayBvZmYgY2FsbGJhY2ssIGlmIHRoZXJlIGlzIG9uZVxuICAgICAgICAgIGlmIChzcmMubWF0Y2goL2NhbGxiYWNrPUNBTExCQUNLX05BTUUvKSkge1xuICAgICAgICAgICAgc3JjID0gc3JjLnJlcGxhY2UoLyhjYWxsYmFjaz0pW15cXCZdKy8sIGAkMSR7Y2JOYW1lfWApXG4gICAgICAgICAgICBjYiA9IHdpbmRvd1tjYk5hbWVdID0gdGFnLm9ubG9hZDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCB0YWcub25sb2FkKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0YWcuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCB0YWcub25lcnJvcik7XG5cbiAgICAgICAgICB0YWcuc3JjID0gc3JjO1xuICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGFnKTtcbiAgICAgICAgICByZXR1cm4gdGFnO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGluaXRpYWxTdGF0ZSA9IHtcbiAgICAgICAgICBsb2FkZWQ6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiBmYWxzZSxcbiAgICAgICAgICBwcm9taXNlOiBwcm9taXNlLFxuICAgICAgICAgIHRhZ1xuICAgICAgICB9XG4gICAgICAgIHNjcmlwdE1hcC5zZXQoa2V5LCBpbml0aWFsU3RhdGUpO1xuXG4gICAgICByZXR1cm4gc2NyaXB0TWFwLmdldChrZXkpO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKHNjcmlwdHMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICBjb25zdCBzY3JpcHQgPSBzY3JpcHRzW2tleV07XG4gICAgICBDYWNoZVtrZXldID0ge1xuICAgICAgICB0YWc6ICAgIENhY2hlLl9zY3JpcHRUYWcoa2V5LCBzY3JpcHQpLFxuICAgICAgICBvbkxvYWQ6IENhY2hlLl9vbkxvYWQoa2V5KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gQ2FjaGU7XG4gIH1cbn0pKHdpbmRvdylcblxuZXhwb3J0IGRlZmF1bHQgU2NyaXB0Q2FjaGU7XG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgaXNJbnNpZGUgZnJvbSAncG9pbnQtaW4tcG9seWdvbic7XG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3FzJztcblxuXG5sZXQgbWFya2Vyc0FycmF5ID0gW107XG5sZXQgYm91bmRzO1xubGV0IGRyYXdpbmdNYW5hZ2VyO1xubGV0IGNlbnRlcjtcbmxldCBtYXBzO1xubGV0IHJlc2l6YWJsZVBvbHlnb247XG5sZXQgYXJlYTtcbmxldCBsYXRpdHVkZTtcbmxldCBsb25naXR1ZGU7XG5sZXQgbG9jYXRpb25BZGRyZXNzID0gXCJEanVyZ8OlcmRzdsOkZ2VuIDUwLCAxMTUgMjEgU3RvY2tob2xtXCI7XG5sZXQgY29vcmRpbmF0ZXMgPSBbXTtcblxuY29uc3QgZGVsZXRlU3R5bGUgPSB7XG4gIG1hcmdpblRvcDogXCItODhweFwiLFxuICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICB0ZXh0QWxpZ246IFwiY2VudGVyXCIsXG4gIGxlZnQ6IFwiNDAlXCJcbn1cbmNvbnN0IG5leHRTdHlsZSA9IHtcbiAgbWFyZ2luVG9wOiBcIi04OHB4XCIsXG4gIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gIHRleHRBbGlnbjogXCJsZWZ0XCIsXG5cbn1cblxuY2xhc3MgTWFwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgbGF0aXR1ZGUgPSB0aGlzLnByb3BzLm1hcENvbmZpZy5sYXQ7XG4gICAgbG9uZ2l0dWRlID0gdGhpcy5wcm9wcy5tYXBDb25maWcubG5nO1xuXG4gICAgdmFyIGFkZHJlc3M9XCJEanVyZ8OlcmRzdsOkZ2VuIDUwLCAxMTUgMjEgU3RvY2tob2xtXCI7XG5cbiAgICBpZih0aGlzLnByb3BzLnJvb2ZhZGRyZXNzIT1cIlwiKVxuICAgIHtcbiAgICAgIGxvY2F0aW9uQWRkcmVzcz10aGlzLnByb3BzLnJvb2ZhZGRyZXNzXG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkcmF3TW9kZTogdHJ1ZSxcbiAgICAgIGxvYWRlZDogZmFsc2UsXG4gICAgICBwbGFjZTogYWRkcmVzcyxcbiAgICAgIHBvc2l0aW9uOiBudWxsLFxuICAgICAgbGF0OiBsYXRpdHVkZSxcbiAgICAgIGxuZzogbG9uZ2l0dWRlLFxuICAgICAgbG9jYWRkcmVzczogJycsXG4gICAgICBjb2xvcjoge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzBBNTM5Q1wiXG4gICAgICB9XG5cbiAgICB9O1xuXG5cblxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgbWFpbiA9IHRoaXM7XG5cbiAgICB2YXIgbG9jYXRpb25uYW1lID0gcGFyc2UobG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKSlcbiAgICBpZiAobG9jYXRpb25uYW1lLmxvY2F0aW9uICE9IHVuZGVmaW5lZCkge1xuICAgICAgbG9jYXRpb25BZGRyZXNzID0gbG9jYXRpb25uYW1lLmxvY2F0aW9uO1xuICAgIH1cblxuXG4gICAgZmV0Y2goYGh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/a2V5PUFJemFTeUNKN0k0SHZGSzFDWmNSbG9CVkxqbk84X0pFbGdUUloxbyZhZGRyZXNzPSR7bG9jYXRpb25BZGRyZXNzfWApXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXG5cbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcblxuICAgICAgICBpZiAoZGF0YS5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCAhPSAnJyAmJiBkYXRhLnJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24ubG5nKSB7XG5cbiAgICAgICAgICBsYXRpdHVkZSA9IGRhdGEucmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQsXG4gICAgICAgICAgICBsb25naXR1ZGUgPSBkYXRhLnJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24ubG5nXG5cblxuICAgICAgICAgIG1haW4uc2V0U3RhdGUoe1xuICAgICAgICAgICAgbGF0OiBsYXRpdHVkZSxcbiAgICAgICAgICAgIGxuZzogbG9uZ2l0dWRlLFxuICAgICAgICAgICAgcGxhY2U6IGxvY2F0aW9uQWRkcmVzc1xuICAgICAgICAgIH1cbiAgICAgICAgICApXG5cbiAgICAgICAgICBtYWluLmxvYWRNYXAoKTtcbiAgICAgICAgICBtYWluLmRyYXdQb2x5bGluZSgpO1xuICAgICAgICB9XG5cblxuICAgICAgfSlcblxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG5cblxuICAgIGlmIChwcmV2UHJvcHMuZ29vZ2xlICE9PSB0aGlzLnByb3BzLmdvb2dsZSkge1xuICAgICAgdGhpcy5sb2FkTWFwKCk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5kcmF3TW9kZSkge1xuICAgICAgICB0aGlzLmRyYXdQb2x5bGluZSgpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucHJvcHMuaW5zZXJ0TWFya2VyKSB7XG4gICAgICAgIHRoaXMuaW5zZXJ0TWFya2VyKCk7XG4gICAgICB9XG4gICAgICAvKmlmICh0aGlzLnByb3BzLmhlYXRNYXApIHtcbiAgICAgICAgdGhpcy5oZWF0TWFwKCk7XG4gICAgICB9Ki9cbiAgICB9XG4gICAgLyogaWYgKHByZXZQcm9wcy5tYXJrZXJzLmxlbmd0aCE9PXRoaXMucHJvcHMubWFya2Vycy5sZW5ndGggJiZ0aGlzLm1hcmtlcnMhPXByZXZQcm9wcy5tYXJrZXJzICYmIHRoaXMuc3RhdGUubG9hZGVkJiYhdGhpcy5wcm9wcy5oZWF0TWFwKXtcbiAgICAgICB0aGlzLmdldE1hcmtlcnMoKTtcbiAgICAgfSovXG5cblxuICB9XG5cbiAgYXJlYShyZXNpemFibGVQb2x5Z29uKSB7XG5cblxuICAgIGFyZWEgPSBnb29nbGUubWFwcy5nZW9tZXRyeS5zcGhlcmljYWwuY29tcHV0ZUFyZWEocmVzaXphYmxlUG9seWdvbik7XG4gICAgY29uc29sZS5sb2coXCJhcmVhXCIgKyBhcmVhKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgY29uc3QgZ29vZ2xlID0gdGhpcy5wcm9wcy5nb29nbGU7XG4gICAgaWYgKGRyYXdpbmdNYW5hZ2VyICYmIG5leHRQcm9wcy5kcmF3TW9kZSAhPSB0aGlzLnByb3BzLmRyYXdNb2RlKSB7XG4gICAgICBkcmF3aW5nTWFuYWdlci5zZXREcmF3aW5nTW9kZShudWxsKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMuZHJhd01vZGUgIT09IG5leHRQcm9wcy5kcmF3TW9kZSAmJiBuZXh0UHJvcHMuZHJhd01vZGUgJiYgdGhpcy5wcm9wcy5nb29nbGUpIHtcbiAgICAgIHRoaXMuZHJhd1BvbHlsaW5lKCk7XG4gICAgfVxuXG4gIH1cblxuICAvKlxuICBcbiAgICBoZWF0TWFwKCl7XG4gIFxuICAgICAgY29uc3Qge2dvb2dsZX0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgbWFwcyA9IGdvb2dsZS5tYXBzO1xuICAgICAgY29uc3QgcG9pbnRzPXRoaXMucHJvcHMubWFya2Vycy5tYXAoKHBvaW50KSA9PiAoXG4gICAgICAgICAgbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhwb2ludC5sYXRMbmcubGF0LHBvaW50LmxhdExuZy5sbmcpXG4gICAgICApKTtcbiAgXG4gICAgICBsZXQgaGVhdG1hcCA9IG5ldyBtYXBzLnZpc3VhbGl6YXRpb24uSGVhdG1hcExheWVyKHtcbiAgICAgICAgZGF0YTpwb2ludHMgLFxuICAgICAgICBtYXA6IHRoaXMubWFwXG4gICAgICB9KTtcbiAgICB9XG4gICovXG5cbiAgaW5zZXJ0TWFya2VyKCkge1xuICAgIGNvbnN0IHsgZ29vZ2xlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG1hcHMgPSBnb29nbGUubWFwcztcblxuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMubWFwLCAnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgY29uc3QgbWFya2VyUHJvcHMgPSAoe1xuICAgICAgICBwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhlLmxhdExuZy5sYXQoKSwgZS5sYXRMbmcubG5nKCkpLFxuICAgICAgICBtYXA6IHRoaXMubWFwLFxuICAgICAgICBkcmFnZ2FibGU6IHRydWVcbiAgICAgIH0pXG4gICAgICBjb25zdCBtYXJrZXIgPSBuZXcgbWFwcy5NYXJrZXIobWFya2VyUHJvcHMpO1xuXG4gICAgICB0aGlzLnByb3BzLmhhbmRsZVJldHVybmVkTWFya2Vycyh7IGxhdDogZS5sYXRMbmcubGF0KCksIGxuZzogZS5sYXRMbmcubG5nKCkgfSk7XG4gICAgICBtYXJrZXIuYWRkTGlzdGVuZXIoJ2RyYWdlbmQnLCAoZSkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZVJldHVybmVkTWFya2Vycyh7IGxhdDogZS5sYXRMbmcubGF0KCksIGxuZzogZS5sYXRMbmcubG5nKCkgfSk7XG5cbiAgICAgIH0pO1xuXG4gICAgfS5iaW5kKHRoaXMpKTtcblxuXG5cblxuICB9XG5cbiAgZHJhd1BvbHlsaW5lKCkge1xuICAgIGNvbnN0IGdvb2dsZSA9IHRoaXMucHJvcHMuZ29vZ2xlO1xuXG4gICAgLypkcmF3aW5nTWFuYWdlciA9IG5ldyBnb29nbGUubWFwcy5kcmF3aW5nLkRyYXdpbmdNYW5hZ2VyKHtcbiAgICAgIGRyYXdpbmdNb2RlOiBnb29nbGUubWFwcy5kcmF3aW5nLk92ZXJsYXlUeXBlLlBPTFlHT04sXG4gICAgICBkcmF3aW5nQ29udHJvbDogZmFsc2UsXG4gICAgICBwb2x5Z29uT3B0aW9uczogdGhpcy5wcm9wcy5wb2x5Z29uT3B0aW9uc1xuICAgIH0pOyovXG5cbiAgICBkcmF3aW5nTWFuYWdlciA9IG5ldyBnb29nbGUubWFwcy5kcmF3aW5nLkRyYXdpbmdNYW5hZ2VyKHtcbiAgICAgIGRyYXdpbmdNb2RlOiBnb29nbGUubWFwcy5kcmF3aW5nLk92ZXJsYXlUeXBlLlBPTFlHT04sXG4gICAgICBkcmF3aW5nQ29udHJvbDogdHJ1ZSxcbiAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZSxcbiAgICAgIGRyYXdpbmdDb250cm9sT3B0aW9uczoge1xuICAgICAgICBkcmF3aW5nTW9kZXM6IFtnb29nbGUubWFwcy5kcmF3aW5nLk92ZXJsYXlUeXBlLlBPTFlHT05dLFxuICAgICAgICBwb3NpdGlvbjogZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uLkxFRlRfVE9QXG4gICAgICB9LFxuICAgICAgbWFya2VyT3B0aW9uczogeyBpY29uOiAnaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vbWFwcy9kb2N1bWVudGF0aW9uL2phdmFzY3JpcHQvZXhhbXBsZXMvZnVsbC9pbWFnZXMvYmVhY2hmbGFnLnBuZycgfSxcbiAgICAgIGNpcmNsZU9wdGlvbnM6IHtcbiAgICAgICAgZmlsbENvbG9yOiAnI2ZmZmYwMCcsXG4gICAgICAgIGZpbGxPcGFjaXR5OiAxLFxuICAgICAgICBzdHJva2VXZWlnaHQ6IDUsXG4gICAgICAgIGNsaWNrYWJsZTogZmFsc2UsXG4gICAgICAgIGVkaXRhYmxlOiB0cnVlLFxuICAgICAgICB6SW5kZXg6IDFcbiAgICAgIH0sXG4gICAgICBwb2x5Z29uT3B0aW9uczogdGhpcy5wcm9wcy5wb2x5Z29uT3B0aW9uc1xuICAgIH0pO1xuXG4gICAgZHJhd2luZ01hbmFnZXIuc2V0TWFwKHRoaXMubWFwKTtcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIEV2ZW50IGxpc3RlbmVycyBhZnRlciBQb2x5Z29uIGNsb3NlZFxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIoZHJhd2luZ01hbmFnZXIsICdwb2x5Z29uY29tcGxldGUnLCBmdW5jdGlvbiAocG9seWxpbmUpIHtcbiAgICAgIGRyYXdpbmdNYW5hZ2VyLnNldERyYXdpbmdNb2RlKG51bGwpO1xuICAgICAgcmVzaXphYmxlUG9seWdvbiA9IHBvbHlsaW5lLmdldFBhdGgoKTtcbiAgICAgIHRoaXMuYXJlYShyZXNpemFibGVQb2x5Z29uKTtcbiAgICAgIGxldCBjb2xvcl9kYXRhID0gdGhpcy5zdGF0ZS5jb2xvcjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXR0b25uZXcnKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMwMDBcIjtcblxuXG5cblxuICAgICAgLy8gRGVsZXRlIFBvbHlnb24gb24gY2xpY2tcbiAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICAgIC8qXG4gICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihwb2x5bGluZSwgJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgcG9seWxpbmUuc2V0TWFwKG51bGwpO1xuICAgICAgICAgICAgICByZXNpemFibGVQb2x5Z29uID0gW107XG4gICAgICAgICAgICAgIC8vIHRoaXMuZ2V0TWFya2VycygpO1xuICAgICAgICAgICAgICB0aGlzLmRyYXdQb2x5bGluZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAqL1xuXG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVsZXRlLWJ1dHRvbicpLCAnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgIHBvbHlsaW5lLnNldE1hcChudWxsKTtcbiAgICAgICAgcmVzaXphYmxlUG9seWdvbiA9IFtdO1xuICAgICAgICBkcmF3aW5nTWFuYWdlci5zZXREcmF3aW5nTW9kZSh0cnVlKTtcbiAgICAgICAgbGV0IGNvbG9yX2RhdGEgPSBjb2xvcl9kYXRhO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9ubmV3Jykuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjMEE1MzlDXCI7XG4gICAgICAgIC8qICAgY29sb3JfZGF0YS5iYWNrZ3JvdW5kQ29sb3I9XCIjNThiZWVjXCI7XG4gICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgIGNvbG9yOmNvbG9yX2RhdGFcbiAgICAgfSkqL1xuXG5cbiAgICAgICAgLy90aGlzLmRlbGV0ZSgpO1xuXG5cbiAgICAgIH0pO1xuXG5cbiAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAvLyBGaWx0ZXJpbmcgZnVuY3Rpb25cbiAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAvKmNvbnN0IGZpbHRlck1hcmtlcnMgPSAoKSA9PiB7XG4gICAgICAgIGxldCBwb2x5Z29uID0gW107XG4gICAgICAgIGxldCBpbnNpZGVNYXJrZXJzID0gW107XG5cbiAgICAgICAgcmVzaXphYmxlUG9seWdvbi5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgICAgICBwb2x5Z29uLnB1c2goW2Nvb3JkLmxhdCgpLCBjb29yZC5sbmcoKV0pO1xuICAgICAgICB9KVxuICAgICAgICBtYXJrZXJzQXJyYXkuZm9yRWFjaChtYXJrZXIgPT4ge1xuICAgICAgICAgIGNvbnN0IHggPSBtYXJrZXIuZ2V0UG9zaXRpb24oKS5sYXQoKTtcbiAgICAgICAgICBjb25zdCB5ID0gbWFya2VyLmdldFBvc2l0aW9uKCkubG5nKCk7XG4gICAgICAgICAgaWYgKCFpc0luc2lkZShbeCwgeV0sIHBvbHlnb24pKSB7XG4gICAgICAgICAgICBtYXJrZXIuc2V0TWFwKG51bGwpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluc2lkZU1hcmtlcnMucHVzaChtYXJrZXIpO1xuICAgICAgICAgICAgaWYgKCFtYXJrZXIubWFwKSB7XG4gICAgICAgICAgICAgIG1hcmtlci5zZXRNYXAodGhpcy5tYXApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5oYW5kbGVSZXR1cm5lZE1hcmtlcnMpIHtcbiAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZVJldHVybmVkTWFya2VycyhpbnNpZGVNYXJrZXJzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZmlsdGVyTWFya2VycygpOyovXG4gICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgLy8gUmVzaXplIHBvbHlnb25cbiAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihyZXNpemFibGVQb2x5Z29uLCAnc2V0X2F0JywgZnVuY3Rpb24gKGVkZ2UpIHtcbiAgICAgICAgcmVzaXphYmxlUG9seWdvbiA9IHBvbHlsaW5lLmdldFBhdGgoKTtcbiAgICAgICAgdmFyIGFyZWEgPSBnb29nbGUubWFwcy5nZW9tZXRyeS5zcGhlcmljYWwuY29tcHV0ZUFyZWEocmVzaXphYmxlUG9seWdvbik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXJlYSA6IFwiICsgYXJlYSk7XG4gICAgICAgIC8vIGZpbHRlck1hcmtlcnMoKTtcbiAgICAgIH0pO1xuXG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihkcmF3aW5nTWFuYWdlciwgJ2RyYXdpbmdtb2RlX2NoYW5nZWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBwb2x5bGluZS5zZXRNYXAobnVsbCk7XG4gICAgICAgIHJlc2l6YWJsZVBvbHlnb24gPSBbXTtcbiAgICAgICAgdmFyIGFyZWEgPSBnb29nbGUubWFwcy5nZW9tZXRyeS5zcGhlcmljYWwuY29tcHV0ZUFyZWEocmVzaXphYmxlUG9seWdvbik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXJlYSA6IFwiICsgYXJlYSk7XG4gICAgICB9KTtcbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHJlc2l6YWJsZVBvbHlnb24sICdpbnNlcnRfYXQnLCBmdW5jdGlvbiAoZWRnZSkge1xuICAgICAgICByZXNpemFibGVQb2x5Z29uID0gcG9seWxpbmUuZ2V0UGF0aCgpO1xuICAgICAgICB2YXIgYXJlYSA9IGdvb2dsZS5tYXBzLmdlb21ldHJ5LnNwaGVyaWNhbC5jb21wdXRlQXJlYShyZXNpemFibGVQb2x5Z29uKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJhcmVhIDogXCIgKyBhcmVhKTtcbiAgICAgICAgLy8gZmlsdGVyTWFya2VycygpO1xuICAgICAgfSk7XG4gICAgfS5iaW5kKHRoaXMpKVxuICB9XG5cblxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvLyBESVNQTEFZIE1BUktFUlMgSU4gTUFQXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gIC8qZ2V0TWFya2Vycygpe1xuICAgIGNvbnNvbGUubG9nKCdnZXRNYXJrZXJzJyk7XG4gICAgY29uc3Qge2dvb2dsZX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG1hcHMgPSBnb29nbGUubWFwcztcbiAgICBtYXJrZXJzQXJyYXkuZm9yRWFjaChtYXJrZXI9PntcbiAgICAgIG1hcmtlci5zZXRNYXAobnVsbCk7XG4gICAgfSlcbiAgICBtYXJrZXJzQXJyYXk9W107XG5cbiAgICB0aGlzLnByb3BzLm1hcmtlcnMuZm9yRWFjaCgoZmxhZyk9PntcbiAgICAgIGNvbnN0IG1hcmtlclByb3BzPSh7XG4gICAgICAgIC4uLmZsYWcsXG4gICAgICAgIHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGZsYWcubGF0TG5nLmxhdCxmbGFnLmxhdExuZy5sbmcpLFxuICAgICAgICBtYXA6IHRoaXMubWFwXG4gICAgICB9KVxuXG5cbiAgICAgIGNvbnN0IG1hcmtlciA9IG5ldyBtYXBzLk1hcmtlcihtYXJrZXJQcm9wcyk7XG5cbiAgICAgIGlmICh0aGlzLnByb3BzLm9uTWFya2VyQ2xpY2spIHtcbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCdjbGljaycsKGV2ZW50KT0+e1xuICAgICAgICAgIHRoaXMucHJvcHMub25NYXJrZXJDbGljayhtYXJrZXIpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAvLyBSZW5kZXIgaW5mbyB3aW5kb3cgaWYgd2UgaGF2ZSBhbiBpbmZvIHByb3BlcnR5XG4gICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgaWYgKG1hcmtlci5pbmZvKSB7XG4gICAgICAgIGNvbnN0IGluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyh7XG4gICAgICAgICAgY29udGVudDogbWFya2VyLmluZm9cbiAgICAgICAgfSk7XG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwnY2xpY2snLChldmVudCk9PntcbiAgICAgICAgICBpbmZvd2luZG93Lm9wZW4odGhpcy5tYXAsIG1hcmtlcik7XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBtYXJrZXJzQXJyYXkucHVzaChtYXJrZXIpO1xuICAgICAgaWYgKHRoaXMucHJvcHMuaGFuZGxlUmV0dXJuZWRNYXJrZXJzKSB7XG4gICAgICAgIHRoaXMucHJvcHMuaGFuZGxlUmV0dXJuZWRNYXJrZXJzKG1hcmtlcnNBcnJheSk7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuKi9cblxuXG4gIGxvYWRNYXAoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZ29vZ2xlIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgbWFwcyA9IGdvb2dsZS5tYXBzO1xuICAgICAgY29uc3QgbWFwUmVmID0gdGhpcy5yZWZzLm1hcDtcbiAgICAgIGNvbnN0IG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShtYXBSZWYpO1xuICAgICAgY29uc3QgeyBtYXBDb25maWcgfSA9IHRoaXMucHJvcHM7XG4gICAgICBsZXQgeyB6b29tIH0gPSBtYXBDb25maWc7XG4gICAgICBsZXQgeyBsYXQgfSA9IG1hcENvbmZpZztcbiAgICAgIGxldCB7IGxuZyB9ID0gbWFwQ29uZmlnO1xuICAgICAgY29uc3QgY2VudGVyID0gbmV3IG1hcHMuTGF0TG5nKHRoaXMuc3RhdGUubGF0LCB0aGlzLnN0YXRlLmxuZyk7XG4gICAgICBjb25zdCBtYXBDb25maWd1cmF0aW9uID0gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgICBjZW50ZXI6IGNlbnRlcixcbiAgICAgICAgem9vbTogem9vbSxcbiAgICAgICAgem9vbUNvbnRyb2w6IHRydWUsXG4gICAgICAgIHN0eWxlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcbiAgICAgICAgICAgIFwic3R5bGVyc1wiOiBbXG4gICAgICAgICAgICAgIHsgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcblxuXG5cbiAgICAgICAgZHJhd2luZ01vZGU6IGdvb2dsZS5tYXBzLmRyYXdpbmcuT3ZlcmxheVR5cGUuUE9MWUdPTixcbiAgICAgICAgZHJhd2luZ0NvbnRyb2w6IHRydWUsXG4gICAgICAgIHN0cmVldFZpZXdDb250cm9sOiBmYWxzZSxcbiAgICAgICAgZHJhd2luZ0NvbnRyb2xPcHRpb25zOiB7IGRyYXdpbmdNb2RlczogW2dvb2dsZS5tYXBzLmRyYXdpbmcuT3ZlcmxheVR5cGUuUE9MWUdPTl0gfSxcbiAgICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuU0FURUxMSVRFLFxuXG5cblxuICAgICAgfSlcbiAgICAgIHRoaXMubWFwID0gbmV3IG1hcHMuTWFwKG5vZGUsIG1hcENvbmZpZ3VyYXRpb24pO1xuICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXJPbmNlKHRoaXMubWFwLCAnaWRsZScsICgpID0+IHtcbiAgICAgICAgLyppZiAoIXRoaXMucHJvcHMuaGVhdE1hcCkge1xuICAgICAgICAgLy8gdGhpcy5nZXRNYXJrZXJzKCk7XG4gICAgICAgIH0qL1xuICAgICAgfSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbG9hZGVkOiB0cnVlXG4gICAgICB9KTtcblxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdlcnJvciBpbiBsb2FkJyk7XG4gICAgfVxuXG4gIH1cblxuXG5cbiAgYXV0b2NtcCgpIHtcblxuICAgIGxldCBnZW9jb2RlciA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpO1xuXG5cbiAgICBjb25zdCBhcmVmID0gdGhpcy5yZWZzLmF1dG9jb21wbGV0ZTtcblxuXG4gICAgY29uc3Qgbm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGFyZWYpO1xuXG4gICAgdmFyIGF1dG9jb21wbGV0ZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlKG5vZGUpO1xuXG5cbiAgICBhdXRvY29tcGxldGUuYWRkTGlzdGVuZXIoJ3BsYWNlX2NoYW5nZWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBwbGFjZSA9IGF1dG9jb21wbGV0ZS5nZXRQbGFjZSgpO1xuICAgICAgaWYgKCFwbGFjZS5nZW9tZXRyeSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cblxuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgcGxhY2U6IHBsYWNlLmZvcm1hdHRlZF9hZGRyZXNzLFxuICAgICAgICBwb3NpdGlvbjogcGxhY2UuZ2VvbWV0cnkubG9jYXRpb25cbiAgICAgIH0pXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgbGF0OiB0aGlzLnN0YXRlLnBvc2l0aW9uLmxhdCgpLFxuICAgICAgICBsbmc6IHRoaXMuc3RhdGUucG9zaXRpb24ubG5nKClcbiAgICAgIH0pXG4gICAgICB0aGlzLnByb3BzLm1hcENvbmZpZy5sYXQgPSB0aGlzLnN0YXRlLnBvc2l0aW9uLmxhdCgpXG4gICAgICB0aGlzLnByb3BzLm1hcENvbmZpZy5sbmcgPSB0aGlzLnN0YXRlLnBvc2l0aW9uLmxuZygpXG5cbiAgICAgIHRoaXMubG9hZE1hcCgpO1xuXG4gICAgICBpZiAodGhpcy5wcm9wcy5kcmF3TW9kZSkge1xuICAgICAgICB0aGlzLmRyYXdQb2x5bGluZSgpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZS5wb3NpdGlvbi5sYXQoKSk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLnBvc2l0aW9uLmxuZygpKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUucGxhY2UpO1xuXG4gICAgfSlcbiAgfVxuXG4gIGNhbGFyZWEoKSB7XG4gICAgaWYgKHJlc2l6YWJsZVBvbHlnb24gIT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgYXJlYXZhbCA9IGdvb2dsZS5tYXBzLmdlb21ldHJ5LnNwaGVyaWNhbC5jb21wdXRlQXJlYShyZXNpemFibGVQb2x5Z29uKTtcblxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlc2l6YWJsZVBvbHlnb24uZ2V0TGVuZ3RoKCk7IGkrKykge1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKHJlc2l6YWJsZVBvbHlnb24uZ2V0QXQoaSkudG9VcmxWYWx1ZSg2KSlcbiAgICAgIH1cbiAgICAgIHZhciBzdHJpbmdpZnljb3JkaW1hdGVzID0gSlNPTi5zdHJpbmdpZnkoY29vcmRpbmF0ZXMpO1xuICAgICAgY29uc29sZS5sb2coc3RyaW5naWZ5Y29yZGltYXRlcylcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUucGxhY2UpXG5cbiAgICAgIHRoaXMucHJvcHMuYXJlYShhcmVhdmFsLCB0aGlzLnN0YXRlLnBsYWNlLCBzdHJpbmdpZnljb3JkaW1hdGVzKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcInBsZWFzZSBkcmF3IHRoZSBtYXBcIik7XG4gICAgfVxuICB9XG5cblxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXAtcG9zaXRpb25cIiA+XG4gICAgICAgIDxkaXYgaWQ9XCJteU1vZGFsXCIgY2xhc3NOYW1lPVwibW9kYWwgZmFkZVwiIHJvbGU9XCJkaWFsb2dcIiA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIiBzdHlsZT17eyB3aWR0aDogXCI3NSVcIix0b3A6ODEgfX0gPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyIG1vZGFsLWhlZFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj4mdGltZXM7PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWJvZHkgcm93XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtOFwiPlxuICAgICAgICAgICAgICAgICAgey8qfSAgPGlmcmFtZSB3aWR0aD1cIjU2MFwiIGhlaWdodD1cIjMxNVwiIHNyYz1cImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkL3NYcjdfMnNZTER3P2F1dG9wbGF5PTFcIiA+PC9pZnJhbWU+Ki99XG4gICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vaW1nL2V6Z2lmLmNvbS12aWRlby10by1naWYuZ2lmXCIgY2xhc3NOYW1lPVwiaW1nLXJlc3BvbnNpdmVcIiBzdHlsZT17eyBtaW5IZWlnaHQ6IFwiMjAwcHhcIiwgd2lkdGg6IFwiMTAwJVwiIH19IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+PGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNFwiPlxuICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInN0ZWdzX21hcFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4+IDE8L3NwYW4+OiBIaXR0YSBEaXR0IEh1cyBvY2ggem9vbWEgaW4gbWVkICsgc3ltYm9sZW4gbMOkbmdzdCBuZXIgdGlsbCBow7ZnZXIgcMOlIGthcnRhbjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48c3Bhbj4yPC9zcGFuPjpWw6R4bGEgdGlsbCBrYXJ0bMOkZ2V0IGjDtmdzdCB1cHAgdGlsbCB2w6Ruc3RlciBvbSBkaXR0IGh1cyDDpHIgb3R5ZGxpZ3QgcMOlIHNhdGVsbGl0YmlsZGVuPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuPjM8L3NwYW4+OiBNYXJrZXJhIHV0IHRha2VucyBhbGxhIGjDtnJuPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuPiA0PC9zcGFuPjogVHJ5Y2sgXCJOw6RzdGFcIiBuw6RyIGxpbmplcm5hIMOkciBzbHV0bmE8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgPjxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IFwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgPk9rPC9idXR0b24+PC9saT5cbiAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgaWQ9XCJhdXRvZmlsbFwiXG4gICAgICAgICAgICByZWY9J2F1dG9jb21wbGV0ZSdcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5hdXRvY21wLmJpbmQodGhpcyl9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQW5nZSBlbiBwbGF0c1wiIC8+XG4gICAgICAgICAgICB7Lyp9XG4gICAgICAgICA8aW5wdXRcblxuICAgICAgICAgICAgdHlwZT0nc3VibWl0J1xuICAgICAgICAgICAgdmFsdWU9J0dvJyAvPlxuICAgICAgICBcbiAgICAqL31cblxuICAgICAgICA8ZGl2XG4gICAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMubWFwU3R5bGV9XG4gICAgICAgICAgcmVmPSdtYXAnPlxuICAgICAgICAgIExvYWRpbmcgbWFwLi4uXG4gICAgICA8L2Rpdj5cblxuXG4gICAgICAgIHs8ZGl2IHN0eWxlPXtkZWxldGVTdHlsZX0gPjxidXR0b24gaWQ9XCJkZWxldGUtYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1pbmZvXCI+UmVuc2E8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuY2FsYXJlYS5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJidG4gYnRuLWluZm9cIiBpZD1cImJ1dHRvbm5ld1wiIHN0eWxlPXt7IC4uLnRoaXMuc3RhdGUuY29sb3IgfX0gPk7DpHN0YTwvYnV0dG9uPjwvZGl2PlxuICAgICAgICB9XG4gICAgICA8L2Rpdj4pXG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBNYXA7XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5cbmltcG9ydCBjYWNoZSBmcm9tICcuL0FwaUNvbXBvbmVudHMvU2NyaXB0Q2FjaGUnO1xuaW1wb3J0IEdvb2dsZUFwaSBmcm9tICcuL0FwaUNvbXBvbmVudHMvR29vZ2xlQXBpJztcbmltcG9ydCBHb29nbGVBcGlDb21wb25lbnQgZnJvbSAnLi9BcGlDb21wb25lbnRzL0dvb2dsZUFwaUNvbXBvbmVudCc7XG5pbXBvcnQgTWFwIGZyb20gJy4vTWFwJztcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAncXMnO1xuXG5cblxuXG5cbmxldCBsYXQ7XG5sZXQgbG5nO1xuY2xhc3MgR29vZ2xlTWFwRHJhd0ZpbHRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cblxuY29uc3RydWN0b3IocHJvcHMpXG57XG5cblx0c3VwZXIocHJvcHMpXG5cdGNvbnNvbGUubG9nKHRoaXMucHJvcHMuYXJlYSk7XG5cbn1cblxuXG5cbmNvbXBvbmVudFdpbGxNb3VudCgpXG57XG4gY29uc3QgbWFpbiA9IHRoaXM7XG4gXG4gdmFyIGxvY2F0aW9ubmFtZT1wYXJzZShsb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpKVxuIGlmKGxvY2F0aW9ubmFtZS5sb2NhdGlvbiE9dW5kZWZpbmVkKVxuICB7XG52YXIgbG9jYXRpb25BZGRyZXNzPWxvY2F0aW9ubmFtZS5sb2NhdGlvbjtcbiAgfVxuXHQgICBmZXRjaChgaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9rZXk9QUl6YVN5Q0o3STRIdkZLMUNaY1Jsb0JWTGpuTzhfSkVsZ1RSWjFvJmFkZHJlc3M9JHtsb2NhdGlvbkFkZHJlc3N9YClcbiAgICAudGhlbiggZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9KVxuICAgIC50aGVuKCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG5cdFxuXG4gICAgfSkudGhlbiggZnVuY3Rpb24oZGF0YSkge1xuXG5cdFx0aWYoZGF0YS5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCE9JycgJiYgZGF0YS5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxuZyE9XCJcIiApXG5cdFx0XHR7XG5cdFx0XHRcdFxuXHRcdHZhciBsYXRpdHVkZT1kYXRhLnJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24ubGF0O1xuICAgICAgIHZhciAgbG9uZ2l0dWRlPWRhdGEucmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbi5sbmc7XG5cdFx0bGF0OiBkYXRhLnJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24ubGF0O1xuXHRcdGxuZzpkYXRhLnJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24ubGF0O1xuXG4gICAgXG5cdFx0XHR9XG5cdFxuXHRcdFxuICB9KVxuICAgIFx0XG59XG5cblxuXG5cblx0cmVuZGVyICgpIHtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cIm1hcHBvc2l0aW9udG9wXCI+XG5cdFx0XHRcdDxNYXBcblx0XHRcdFx0XHRnb29nbGU9e3RoaXMucHJvcHMuZ29vZ2xlfVxuXHRcdFx0XHRcdGhlYXRNYXA9e3RoaXMucHJvcHMuaGVhdE1hcH1cblx0XHRcdFx0XHRkcmF3TW9kZT17dGhpcy5wcm9wcy5kcmF3TW9kZX1cblx0XHRcdFx0XHRtYXJrZXJzPXt0aGlzLnByb3BzLm1hcmtlcnN9XG5cdFx0XHRcdFx0bWFwQ29uZmlnPXt0aGlzLnByb3BzLm1hcENvbmZpZ31cblx0XHRcdFx0XHRtYXBTdHlsZT17dGhpcy5wcm9wcy5tYXBTdHlsZX1cblx0XHRcdFx0XHRwb2x5Z29uT3B0aW9ucz17dGhpcy5wcm9wcy5wb2x5Z29uT3B0aW9uc31cblx0XHRcdFx0XHRoYW5kbGVSZXR1cm5lZE1hcmtlcnM9e3RoaXMucHJvcHMuaGFuZGxlUmV0dXJuZWRNYXJrZXJzfVxuXHRcdFx0XHRcdG9uTWFya2VyQ2xpY2s9e3RoaXMucHJvcHMub25NYXJrZXJDbGlja31cblx0XHRcdFx0XHRpbnNlcnRNYXJrZXI9e3RoaXMucHJvcHMuaW5zZXJ0TWFya2VyfVxuXHRcdFx0XHRcdGFwaUtleT17dGhpcy5wcm9wcy5hcGlLZXl9XG5cdFx0XHRcdFx0YXJlYT17dGhpcy5wcm9wcy5hcmVhfVxuXHRcdFx0XHRcdHJvb2ZhZGRyZXNzPXt0aGlzLnByb3BzLnJvb2ZhZGRyZXNzfVxuXG5cdFx0XHRcdC8+XG5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn1cblxuXG5cbkdvb2dsZU1hcERyYXdGaWx0ZXIucHJvcFR5cGVzPXtcblx0YXBpS2V5OlJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0ZHJhd01vZGU6UmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cdGhlYXRNYXA6UmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cdG1hcmtlcnM6UmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuXHRtYXBDb25maWc6UmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcblx0cG9seWdvbk9wdGlvbnM6UmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcblx0Z29vZ2xlOlJlYWN0LlByb3BUeXBlcy5vYmplY3QsIC8vaXMgcHJvdmlkZWQgYnkgd3JhcHBlclxuXHRtYXBTdHlsZTpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuXHRoYW5kbGVSZXR1cm5lZE1hcmtlcnM6UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdG9uTWFya2VyQ2xpY2s6UmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdGluc2VydE1hcmtlcjpSZWFjdC5Qcm9wVHlwZXMuYm9vbFxufTtcblxuR29vZ2xlTWFwRHJhd0ZpbHRlci5kZWZhdWx0UHJvcHM9e1xuXHRkcmF3TW9kZTp0cnVlLFxuXHRpbnNlcnRNYXJrZXI6ZmFsc2UsXG5cdG1hcENvbmZpZzp7XG5cdFx0em9vbToxOCxcblx0XHRsYXQ6bGF0LFxuXHRcdGxuZzpsbmcsXG5cblx0fSxcblx0bWFwU3R5bGU6e1xuXHRcdGhlaWdodDonNjAwcHgnLFxuXHRcdHdpZHRoOiAnMTAwJScsXG5cdH0sXG5cdHBvbHlnb25PcHRpb25zOntcblx0XHRmaWxsQ29sb3I6ICcjNThiZWVjJyxcblx0XHRmaWxsT3BhY2l0eTogMC4zLFxuXHRcdHN0cm9rZUNvbG9yOicjNThiZWVjJyxcblx0XHRzdHJva2VXZWlnaHQ6Myxcblx0XHRjbGlja2FibGU6IHRydWUsXG5cdFx0ZWRpdGFibGU6IHRydWUsXG5cdFx0ekluZGV4OiAxXG5cdH0sXG5cblxuXHRcblx0bWFya2VyczpbXSxcbn07XG5cblxuXG5leHBvcnQgZGVmYXVsdCBHb29nbGVBcGlDb21wb25lbnQoR29vZ2xlTWFwRHJhd0ZpbHRlcik7XG4iXX0=
