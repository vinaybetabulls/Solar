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

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
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
        mergeTarget = arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = merge(target[i], item, options);
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
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

var encode = function encode(str) {
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

var compact = function compact(value) {
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

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcG9pbnQtaW4tcG9seWdvbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9xcy9saWIvZm9ybWF0cy5qcyIsIm5vZGVfbW9kdWxlcy9xcy9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcXMvbGliL3BhcnNlLmpzIiwibm9kZV9tb2R1bGVzL3FzL2xpYi9zdHJpbmdpZnkuanMiLCJub2RlX21vZHVsZXMvcXMvbGliL3V0aWxzLmpzIiwiQzovSnlvdGhpL0RpZ2l0YWtfMjAxOF8xMV8wNygxKS9Eb3dubG9hZCBGcm9tIFNlcnZlci9EaWdpdGFrXzIwMThfMTFfMTQvc3JjL0FwaUNvbXBvbmVudHMvR29vZ2xlQXBpLmpzIiwiQzovSnlvdGhpL0RpZ2l0YWtfMjAxOF8xMV8wNygxKS9Eb3dubG9hZCBGcm9tIFNlcnZlci9EaWdpdGFrXzIwMThfMTFfMTQvc3JjL0FwaUNvbXBvbmVudHMvR29vZ2xlQXBpQ29tcG9uZW50LmpzIiwiQzovSnlvdGhpL0RpZ2l0YWtfMjAxOF8xMV8wNygxKS9Eb3dubG9hZCBGcm9tIFNlcnZlci9EaWdpdGFrXzIwMThfMTFfMTQvc3JjL0FwaUNvbXBvbmVudHMvU2NyaXB0Q2FjaGUuanMiLCJDOi9KeW90aGkvRGlnaXRha18yMDE4XzExXzA3KDEpL0Rvd25sb2FkIEZyb20gU2VydmVyL0RpZ2l0YWtfMjAxOF8xMV8xNC9zcmMvTWFwLmpzIiwiQzovSnlvdGhpL0RpZ2l0YWtfMjAxOF8xMV8wNygxKS9Eb3dubG9hZCBGcm9tIFNlcnZlci9EaWdpdGFrXzIwMThfMTFfMTQvc3JjL0dvb2dsZU1hcERyYXdGaWx0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNoQyxlQUFjLEVBQUMsbUJBQU0sU0FBUyxDQUFDLE1BQU07QUFDckMsT0FBTSxFQUFDLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0FBQzdCLFNBQVEsRUFBQyxtQkFBTSxTQUFTLENBQUMsTUFBTTtBQUMvQixzQkFBcUIsRUFBQyxtQkFBTSxTQUFTLENBQUMsSUFBSTtBQUMxQyxjQUFhLEVBQUMsbUJBQU0sU0FBUyxDQUFDLElBQUk7QUFDbEMsYUFBWSxFQUFDLG1CQUFNLFNBQVMsQ0FBQyxJQUFJO0NBQ2pDLENBQUM7O0FBRUYsbUJBQW1CLENBQUMsWUFBWSxHQUFDO0FBQ2hDLFNBQVEsRUFBQyxJQUFJO0FBQ2IsYUFBWSxFQUFDLEtBQUs7QUFDbEIsVUFBUyxFQUFDO0FBQ1QsTUFBSSxFQUFDLEVBQUU7QUFDUCxLQUFHLEVBQUMsR0FBRztBQUNQLEtBQUcsRUFBQyxHQUFHOztFQUVQO0FBQ0QsU0FBUSxFQUFDO0FBQ1IsUUFBTSxFQUFDLE9BQU87QUFDZCxPQUFLLEVBQUUsTUFBTTtFQUNiO0FBQ0QsZUFBYyxFQUFDO0FBQ2QsV0FBUyxFQUFFLFNBQVM7QUFDcEIsYUFBVyxFQUFFLEdBQUc7QUFDaEIsYUFBVyxFQUFDLFNBQVM7QUFDckIsY0FBWSxFQUFDLENBQUM7QUFDZCxXQUFTLEVBQUUsSUFBSTtBQUNmLFVBQVEsRUFBRSxJQUFJO0FBQ2QsUUFBTSxFQUFFLENBQUM7RUFDVDs7QUFJRCxRQUFPLEVBQUMsRUFBRTtDQUNWLENBQUM7O3FCQUlhLGtEQUFtQixtQkFBbUIsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwb2ludCwgdnMpIHtcbiAgICAvLyByYXktY2FzdGluZyBhbGdvcml0aG0gYmFzZWQgb25cbiAgICAvLyBodHRwOi8vd3d3LmVjc2UucnBpLmVkdS9Ib21lcGFnZXMvd3JmL1Jlc2VhcmNoL1Nob3J0X05vdGVzL3BucG9seS5odG1sXG4gICAgXG4gICAgdmFyIHggPSBwb2ludFswXSwgeSA9IHBvaW50WzFdO1xuICAgIFxuICAgIHZhciBpbnNpZGUgPSBmYWxzZTtcbiAgICBmb3IgKHZhciBpID0gMCwgaiA9IHZzLmxlbmd0aCAtIDE7IGkgPCB2cy5sZW5ndGg7IGogPSBpKyspIHtcbiAgICAgICAgdmFyIHhpID0gdnNbaV1bMF0sIHlpID0gdnNbaV1bMV07XG4gICAgICAgIHZhciB4aiA9IHZzW2pdWzBdLCB5aiA9IHZzW2pdWzFdO1xuICAgICAgICBcbiAgICAgICAgdmFyIGludGVyc2VjdCA9ICgoeWkgPiB5KSAhPSAoeWogPiB5KSlcbiAgICAgICAgICAgICYmICh4IDwgKHhqIC0geGkpICogKHkgLSB5aSkgLyAoeWogLSB5aSkgKyB4aSk7XG4gICAgICAgIGlmIChpbnRlcnNlY3QpIGluc2lkZSA9ICFpbnNpZGU7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBpbnNpZGU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcbnZhciBwZXJjZW50VHdlbnRpZXMgPSAvJTIwL2c7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgICdkZWZhdWx0JzogJ1JGQzM5ODYnLFxuICAgIGZvcm1hdHRlcnM6IHtcbiAgICAgICAgUkZDMTczODogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVwbGFjZS5jYWxsKHZhbHVlLCBwZXJjZW50VHdlbnRpZXMsICcrJyk7XG4gICAgICAgIH0sXG4gICAgICAgIFJGQzM5ODY6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBSRkMxNzM4OiAnUkZDMTczOCcsXG4gICAgUkZDMzk4NjogJ1JGQzM5ODYnXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9zdHJpbmdpZnknKTtcbnZhciBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKTtcbnZhciBmb3JtYXRzID0gcmVxdWlyZSgnLi9mb3JtYXRzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGZvcm1hdHM6IGZvcm1hdHMsXG4gICAgcGFyc2U6IHBhcnNlLFxuICAgIHN0cmluZ2lmeTogc3RyaW5naWZ5XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gICAgYWxsb3dEb3RzOiBmYWxzZSxcbiAgICBhbGxvd1Byb3RvdHlwZXM6IGZhbHNlLFxuICAgIGFycmF5TGltaXQ6IDIwLFxuICAgIGRlY29kZXI6IHV0aWxzLmRlY29kZSxcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBkZXB0aDogNSxcbiAgICBwYXJhbWV0ZXJMaW1pdDogMTAwMCxcbiAgICBwbGFpbk9iamVjdHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBwYXJzZVZhbHVlcyA9IGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmdWYWx1ZXMoc3RyLCBvcHRpb25zKSB7XG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIHZhciBjbGVhblN0ciA9IG9wdGlvbnMuaWdub3JlUXVlcnlQcmVmaXggPyBzdHIucmVwbGFjZSgvXlxcPy8sICcnKSA6IHN0cjtcbiAgICB2YXIgbGltaXQgPSBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID09PSBJbmZpbml0eSA/IHVuZGVmaW5lZCA6IG9wdGlvbnMucGFyYW1ldGVyTGltaXQ7XG4gICAgdmFyIHBhcnRzID0gY2xlYW5TdHIuc3BsaXQob3B0aW9ucy5kZWxpbWl0ZXIsIGxpbWl0KTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpXTtcblxuICAgICAgICB2YXIgYnJhY2tldEVxdWFsc1BvcyA9IHBhcnQuaW5kZXhPZignXT0nKTtcbiAgICAgICAgdmFyIHBvcyA9IGJyYWNrZXRFcXVhbHNQb3MgPT09IC0xID8gcGFydC5pbmRleE9mKCc9JykgOiBicmFja2V0RXF1YWxzUG9zICsgMTtcblxuICAgICAgICB2YXIga2V5LCB2YWw7XG4gICAgICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICAgICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydCwgZGVmYXVsdHMuZGVjb2Rlcik7XG4gICAgICAgICAgICB2YWwgPSBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA/IG51bGwgOiAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGtleSA9IG9wdGlvbnMuZGVjb2RlcihwYXJ0LnNsaWNlKDAsIHBvcyksIGRlZmF1bHRzLmRlY29kZXIpO1xuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQuc2xpY2UocG9zICsgMSksIGRlZmF1bHRzLmRlY29kZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXMuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgICAgIG9ialtrZXldID0gW10uY29uY2F0KG9ialtrZXldKS5jb25jYXQodmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9ialtrZXldID0gdmFsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBwYXJzZU9iamVjdCA9IGZ1bmN0aW9uIChjaGFpbiwgdmFsLCBvcHRpb25zKSB7XG4gICAgdmFyIGxlYWYgPSB2YWw7XG5cbiAgICBmb3IgKHZhciBpID0gY2hhaW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIG9iajtcbiAgICAgICAgdmFyIHJvb3QgPSBjaGFpbltpXTtcblxuICAgICAgICBpZiAocm9vdCA9PT0gJ1tdJykge1xuICAgICAgICAgICAgb2JqID0gW107XG4gICAgICAgICAgICBvYmogPSBvYmouY29uY2F0KGxlYWYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqID0gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgICAgICAgICB2YXIgY2xlYW5Sb290ID0gcm9vdC5jaGFyQXQoMCkgPT09ICdbJyAmJiByb290LmNoYXJBdChyb290Lmxlbmd0aCAtIDEpID09PSAnXScgPyByb290LnNsaWNlKDEsIC0xKSA6IHJvb3Q7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBwYXJzZUludChjbGVhblJvb3QsIDEwKTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhaXNOYU4oaW5kZXgpXG4gICAgICAgICAgICAgICAgJiYgcm9vdCAhPT0gY2xlYW5Sb290XG4gICAgICAgICAgICAgICAgJiYgU3RyaW5nKGluZGV4KSA9PT0gY2xlYW5Sb290XG4gICAgICAgICAgICAgICAgJiYgaW5kZXggPj0gMFxuICAgICAgICAgICAgICAgICYmIChvcHRpb25zLnBhcnNlQXJyYXlzICYmIGluZGV4IDw9IG9wdGlvbnMuYXJyYXlMaW1pdClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG9iaiA9IFtdO1xuICAgICAgICAgICAgICAgIG9ialtpbmRleF0gPSBsZWFmO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmpbY2xlYW5Sb290XSA9IGxlYWY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZWFmID0gb2JqO1xuICAgIH1cblxuICAgIHJldHVybiBsZWFmO1xufTtcblxudmFyIHBhcnNlS2V5cyA9IGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmdLZXlzKGdpdmVuS2V5LCB2YWwsIG9wdGlvbnMpIHtcbiAgICBpZiAoIWdpdmVuS2V5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUcmFuc2Zvcm0gZG90IG5vdGF0aW9uIHRvIGJyYWNrZXQgbm90YXRpb25cbiAgICB2YXIga2V5ID0gb3B0aW9ucy5hbGxvd0RvdHMgPyBnaXZlbktleS5yZXBsYWNlKC9cXC4oW14uW10rKS9nLCAnWyQxXScpIDogZ2l2ZW5LZXk7XG5cbiAgICAvLyBUaGUgcmVnZXggY2h1bmtzXG5cbiAgICB2YXIgYnJhY2tldHMgPSAvKFxcW1teW1xcXV0qXSkvO1xuICAgIHZhciBjaGlsZCA9IC8oXFxbW15bXFxdXSpdKS9nO1xuXG4gICAgLy8gR2V0IHRoZSBwYXJlbnRcblxuICAgIHZhciBzZWdtZW50ID0gYnJhY2tldHMuZXhlYyhrZXkpO1xuICAgIHZhciBwYXJlbnQgPSBzZWdtZW50ID8ga2V5LnNsaWNlKDAsIHNlZ21lbnQuaW5kZXgpIDoga2V5O1xuXG4gICAgLy8gU3Rhc2ggdGhlIHBhcmVudCBpZiBpdCBleGlzdHNcblxuICAgIHZhciBrZXlzID0gW107XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgICAvLyBJZiB3ZSBhcmVuJ3QgdXNpbmcgcGxhaW4gb2JqZWN0cywgb3B0aW9uYWxseSBwcmVmaXgga2V5c1xuICAgICAgICAvLyB0aGF0IHdvdWxkIG92ZXJ3cml0ZSBvYmplY3QgcHJvdG90eXBlIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKCFvcHRpb25zLnBsYWluT2JqZWN0cyAmJiBoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBwYXJlbnQpKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAga2V5cy5wdXNoKHBhcmVudCk7XG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGNoaWxkcmVuIGFwcGVuZGluZyB0byB0aGUgYXJyYXkgdW50aWwgd2UgaGl0IGRlcHRoXG5cbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKChzZWdtZW50ID0gY2hpbGQuZXhlYyhrZXkpKSAhPT0gbnVsbCAmJiBpIDwgb3B0aW9ucy5kZXB0aCkge1xuICAgICAgICBpICs9IDE7XG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgc2VnbWVudFsxXS5zbGljZSgxLCAtMSkpKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGtleXMucHVzaChzZWdtZW50WzFdKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSdzIGEgcmVtYWluZGVyLCBqdXN0IGFkZCB3aGF0ZXZlciBpcyBsZWZ0XG5cbiAgICBpZiAoc2VnbWVudCkge1xuICAgICAgICBrZXlzLnB1c2goJ1snICsga2V5LnNsaWNlKHNlZ21lbnQuaW5kZXgpICsgJ10nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VPYmplY3Qoa2V5cywgdmFsLCBvcHRpb25zKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0ciwgb3B0cykge1xuICAgIHZhciBvcHRpb25zID0gb3B0cyA/IHV0aWxzLmFzc2lnbih7fSwgb3B0cykgOiB7fTtcblxuICAgIGlmIChvcHRpb25zLmRlY29kZXIgIT09IG51bGwgJiYgb3B0aW9ucy5kZWNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdGlvbnMuZGVjb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdEZWNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIG9wdGlvbnMuaWdub3JlUXVlcnlQcmVmaXggPSBvcHRpb25zLmlnbm9yZVF1ZXJ5UHJlZml4ID09PSB0cnVlO1xuICAgIG9wdGlvbnMuZGVsaW1pdGVyID0gdHlwZW9mIG9wdGlvbnMuZGVsaW1pdGVyID09PSAnc3RyaW5nJyB8fCB1dGlscy5pc1JlZ0V4cChvcHRpb25zLmRlbGltaXRlcikgPyBvcHRpb25zLmRlbGltaXRlciA6IGRlZmF1bHRzLmRlbGltaXRlcjtcbiAgICBvcHRpb25zLmRlcHRoID0gdHlwZW9mIG9wdGlvbnMuZGVwdGggPT09ICdudW1iZXInID8gb3B0aW9ucy5kZXB0aCA6IGRlZmF1bHRzLmRlcHRoO1xuICAgIG9wdGlvbnMuYXJyYXlMaW1pdCA9IHR5cGVvZiBvcHRpb25zLmFycmF5TGltaXQgPT09ICdudW1iZXInID8gb3B0aW9ucy5hcnJheUxpbWl0IDogZGVmYXVsdHMuYXJyYXlMaW1pdDtcbiAgICBvcHRpb25zLnBhcnNlQXJyYXlzID0gb3B0aW9ucy5wYXJzZUFycmF5cyAhPT0gZmFsc2U7XG4gICAgb3B0aW9ucy5kZWNvZGVyID0gdHlwZW9mIG9wdGlvbnMuZGVjb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuZGVjb2RlciA6IGRlZmF1bHRzLmRlY29kZXI7XG4gICAgb3B0aW9ucy5hbGxvd0RvdHMgPSB0eXBlb2Ygb3B0aW9ucy5hbGxvd0RvdHMgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuYWxsb3dEb3RzIDogZGVmYXVsdHMuYWxsb3dEb3RzO1xuICAgIG9wdGlvbnMucGxhaW5PYmplY3RzID0gdHlwZW9mIG9wdGlvbnMucGxhaW5PYmplY3RzID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnBsYWluT2JqZWN0cyA6IGRlZmF1bHRzLnBsYWluT2JqZWN0cztcbiAgICBvcHRpb25zLmFsbG93UHJvdG90eXBlcyA9IHR5cGVvZiBvcHRpb25zLmFsbG93UHJvdG90eXBlcyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMgOiBkZWZhdWx0cy5hbGxvd1Byb3RvdHlwZXM7XG4gICAgb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9IHR5cGVvZiBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID09PSAnbnVtYmVyJyA/IG9wdGlvbnMucGFyYW1ldGVyTGltaXQgOiBkZWZhdWx0cy5wYXJhbWV0ZXJMaW1pdDtcbiAgICBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA9IHR5cGVvZiBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgOiBkZWZhdWx0cy5zdHJpY3ROdWxsSGFuZGxpbmc7XG5cbiAgICBpZiAoc3RyID09PSAnJyB8fCBzdHIgPT09IG51bGwgfHwgdHlwZW9mIHN0ciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgIH1cblxuICAgIHZhciB0ZW1wT2JqID0gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBwYXJzZVZhbHVlcyhzdHIsIG9wdGlvbnMpIDogc3RyO1xuICAgIHZhciBvYmogPSBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcblxuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUga2V5cyBhbmQgc2V0dXAgdGhlIG5ldyBvYmplY3RcblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGVtcE9iaik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICB2YXIgbmV3T2JqID0gcGFyc2VLZXlzKGtleSwgdGVtcE9ialtrZXldLCBvcHRpb25zKTtcbiAgICAgICAgb2JqID0gdXRpbHMubWVyZ2Uob2JqLCBuZXdPYmosIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB1dGlscy5jb21wYWN0KG9iaik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xuXG52YXIgYXJyYXlQcmVmaXhHZW5lcmF0b3JzID0ge1xuICAgIGJyYWNrZXRzOiBmdW5jdGlvbiBicmFja2V0cyhwcmVmaXgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbXSc7XG4gICAgfSxcbiAgICBpbmRpY2VzOiBmdW5jdGlvbiBpbmRpY2VzKHByZWZpeCwga2V5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSc7XG4gICAgfSxcbiAgICByZXBlYXQ6IGZ1bmN0aW9uIHJlcGVhdChwcmVmaXgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG59O1xuXG52YXIgdG9JU08gPSBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZztcblxudmFyIGRlZmF1bHRzID0ge1xuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGVuY29kZTogdHJ1ZSxcbiAgICBlbmNvZGVyOiB1dGlscy5lbmNvZGUsXG4gICAgZW5jb2RlVmFsdWVzT25seTogZmFsc2UsXG4gICAgc2VyaWFsaXplRGF0ZTogZnVuY3Rpb24gc2VyaWFsaXplRGF0ZShkYXRlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiB0b0lTTy5jYWxsKGRhdGUpO1xuICAgIH0sXG4gICAgc2tpcE51bGxzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgIG9iamVjdCxcbiAgICBwcmVmaXgsXG4gICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgc2tpcE51bGxzLFxuICAgIGVuY29kZXIsXG4gICAgZmlsdGVyLFxuICAgIHNvcnQsXG4gICAgYWxsb3dEb3RzLFxuICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgZm9ybWF0dGVyLFxuICAgIGVuY29kZVZhbHVlc09ubHlcbikge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb2JqID0gZmlsdGVyKHByZWZpeCwgb2JqKTtcbiAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgb2JqID0gc2VyaWFsaXplRGF0ZShvYmopO1xuICAgIH0gZWxzZSBpZiAob2JqID09PSBudWxsKSB7XG4gICAgICAgIGlmIChzdHJpY3ROdWxsSGFuZGxpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVyICYmICFlbmNvZGVWYWx1ZXNPbmx5ID8gZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIpIDogcHJlZml4O1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqID0gJyc7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBvYmogPT09ICdudW1iZXInIHx8IHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCB1dGlscy5pc0J1ZmZlcihvYmopKSB7XG4gICAgICAgIGlmIChlbmNvZGVyKSB7XG4gICAgICAgICAgICB2YXIga2V5VmFsdWUgPSBlbmNvZGVWYWx1ZXNPbmx5ID8gcHJlZml4IDogZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIpO1xuICAgICAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIoa2V5VmFsdWUpICsgJz0nICsgZm9ybWF0dGVyKGVuY29kZXIob2JqLCBkZWZhdWx0cy5lbmNvZGVyKSldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZm9ybWF0dGVyKHByZWZpeCkgKyAnPScgKyBmb3JtYXR0ZXIoU3RyaW5nKG9iaikpXTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWVzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlcztcbiAgICB9XG5cbiAgICB2YXIgb2JqS2V5cztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXIpKSB7XG4gICAgICAgIG9iaktleXMgPSBmaWx0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBvYmpLZXlzID0gc29ydCA/IGtleXMuc29ydChzb3J0KSA6IGtleXM7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuXG4gICAgICAgIGlmIChza2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeChwcmVmaXgsIGtleSksXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHlcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWVzID0gdmFsdWVzLmNvbmNhdChzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICAgICAgcHJlZml4ICsgKGFsbG93RG90cyA/ICcuJyArIGtleSA6ICdbJyArIGtleSArICddJyksXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHlcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgb3B0cykge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgdmFyIG9wdGlvbnMgPSBvcHRzID8gdXRpbHMuYXNzaWduKHt9LCBvcHRzKSA6IHt9O1xuXG4gICAgaWYgKG9wdGlvbnMuZW5jb2RlciAhPT0gbnVsbCAmJiBvcHRpb25zLmVuY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0aW9ucy5lbmNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VuY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGRlbGltaXRlciA9IHR5cGVvZiBvcHRpb25zLmRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5kZWxpbWl0ZXIgOiBvcHRpb25zLmRlbGltaXRlcjtcbiAgICB2YXIgc3RyaWN0TnVsbEhhbmRsaW5nID0gdHlwZW9mIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZztcbiAgICB2YXIgc2tpcE51bGxzID0gdHlwZW9mIG9wdGlvbnMuc2tpcE51bGxzID09PSAnYm9vbGVhbicgPyBvcHRpb25zLnNraXBOdWxscyA6IGRlZmF1bHRzLnNraXBOdWxscztcbiAgICB2YXIgZW5jb2RlID0gdHlwZW9mIG9wdGlvbnMuZW5jb2RlID09PSAnYm9vbGVhbicgPyBvcHRpb25zLmVuY29kZSA6IGRlZmF1bHRzLmVuY29kZTtcbiAgICB2YXIgZW5jb2RlciA9IHR5cGVvZiBvcHRpb25zLmVuY29kZXIgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLmVuY29kZXIgOiBkZWZhdWx0cy5lbmNvZGVyO1xuICAgIHZhciBzb3J0ID0gdHlwZW9mIG9wdGlvbnMuc29ydCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuc29ydCA6IG51bGw7XG4gICAgdmFyIGFsbG93RG90cyA9IHR5cGVvZiBvcHRpb25zLmFsbG93RG90cyA9PT0gJ3VuZGVmaW5lZCcgPyBmYWxzZSA6IG9wdGlvbnMuYWxsb3dEb3RzO1xuICAgIHZhciBzZXJpYWxpemVEYXRlID0gdHlwZW9mIG9wdGlvbnMuc2VyaWFsaXplRGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuc2VyaWFsaXplRGF0ZSA6IGRlZmF1bHRzLnNlcmlhbGl6ZURhdGU7XG4gICAgdmFyIGVuY29kZVZhbHVlc09ubHkgPSB0eXBlb2Ygb3B0aW9ucy5lbmNvZGVWYWx1ZXNPbmx5ID09PSAnYm9vbGVhbicgPyBvcHRpb25zLmVuY29kZVZhbHVlc09ubHkgOiBkZWZhdWx0cy5lbmNvZGVWYWx1ZXNPbmx5O1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5mb3JtYXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG9wdGlvbnMuZm9ybWF0ID0gZm9ybWF0c1snZGVmYXVsdCddO1xuICAgIH0gZWxzZSBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChmb3JtYXRzLmZvcm1hdHRlcnMsIG9wdGlvbnMuZm9ybWF0KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGZvcm1hdCBvcHRpb24gcHJvdmlkZWQuJyk7XG4gICAgfVxuICAgIHZhciBmb3JtYXR0ZXIgPSBmb3JtYXRzLmZvcm1hdHRlcnNbb3B0aW9ucy5mb3JtYXRdO1xuICAgIHZhciBvYmpLZXlzO1xuICAgIHZhciBmaWx0ZXI7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmogPSBmaWx0ZXIoJycsIG9iaik7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmFyIGFycmF5Rm9ybWF0O1xuICAgIGlmIChvcHRpb25zLmFycmF5Rm9ybWF0IGluIGFycmF5UHJlZml4R2VuZXJhdG9ycykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdGlvbnMuYXJyYXlGb3JtYXQ7XG4gICAgfSBlbHNlIGlmICgnaW5kaWNlcycgaW4gb3B0aW9ucykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdGlvbnMuaW5kaWNlcyA/ICdpbmRpY2VzJyA6ICdyZXBlYXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gJ2luZGljZXMnO1xuICAgIH1cblxuICAgIHZhciBnZW5lcmF0ZUFycmF5UHJlZml4ID0gYXJyYXlQcmVmaXhHZW5lcmF0b3JzW2FycmF5Rm9ybWF0XTtcblxuICAgIGlmICghb2JqS2V5cykge1xuICAgICAgICBvYmpLZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICB9XG5cbiAgICBpZiAoc29ydCkge1xuICAgICAgICBvYmpLZXlzLnNvcnQoc29ydCk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmpLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2ldO1xuXG4gICAgICAgIGlmIChza2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KHN0cmluZ2lmeShcbiAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgIGVuY29kZSA/IGVuY29kZXIgOiBudWxsLFxuICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5XG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHZhciBqb2luZWQgPSBrZXlzLmpvaW4oZGVsaW1pdGVyKTtcbiAgICB2YXIgcHJlZml4ID0gb3B0aW9ucy5hZGRRdWVyeVByZWZpeCA9PT0gdHJ1ZSA/ICc/JyA6ICcnO1xuXG4gICAgcmV0dXJuIGpvaW5lZC5sZW5ndGggPiAwID8gcHJlZml4ICsgam9pbmVkIDogJyc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIGhleFRhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gICAgICAgIGFycmF5LnB1c2goJyUnICsgKChpIDwgMTYgPyAnMCcgOiAnJykgKyBpLnRvU3RyaW5nKDE2KSkudG9VcHBlckNhc2UoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5O1xufSgpKTtcblxudmFyIGNvbXBhY3RRdWV1ZSA9IGZ1bmN0aW9uIGNvbXBhY3RRdWV1ZShxdWV1ZSkge1xuICAgIHZhciBvYmo7XG5cbiAgICB3aGlsZSAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHZhciBpdGVtID0gcXVldWUucG9wKCk7XG4gICAgICAgIG9iaiA9IGl0ZW0ub2JqW2l0ZW0ucHJvcF07XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgdmFyIGNvbXBhY3RlZCA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG9iai5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2pdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjb21wYWN0ZWQucHVzaChvYmpbal0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXRlbS5vYmpbaXRlbS5wcm9wXSA9IGNvbXBhY3RlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG52YXIgYXJyYXlUb09iamVjdCA9IGZ1bmN0aW9uIGFycmF5VG9PYmplY3Qoc291cmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBvYmpbaV0gPSBzb3VyY2VbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIG1lcmdlID0gZnVuY3Rpb24gbWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICAgICAgICB0YXJnZXQucHVzaChzb3VyY2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5wbGFpbk9iamVjdHMgfHwgb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMgfHwgIWhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbc291cmNlXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW3RhcmdldCwgc291cmNlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBbdGFyZ2V0XS5jb25jYXQoc291cmNlKTtcbiAgICB9XG5cbiAgICB2YXIgbWVyZ2VUYXJnZXQgPSB0YXJnZXQ7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSAmJiAhQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIG1lcmdlVGFyZ2V0ID0gYXJyYXlUb09iamVjdCh0YXJnZXQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgICAgICBpZiAoaGFzLmNhbGwodGFyZ2V0LCBpKSkge1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRbaV0gJiYgdHlwZW9mIHRhcmdldFtpXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gbWVyZ2UodGFyZ2V0W2ldLCBpdGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gc291cmNlW2tleV07XG5cbiAgICAgICAgaWYgKGhhcy5jYWxsKGFjYywga2V5KSkge1xuICAgICAgICAgICAgYWNjW2tleV0gPSBtZXJnZShhY2Nba2V5XSwgdmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWNjW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIG1lcmdlVGFyZ2V0KTtcbn07XG5cbnZhciBhc3NpZ24gPSBmdW5jdGlvbiBhc3NpZ25TaW5nbGVTb3VyY2UodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIGFjY1trZXldID0gc291cmNlW2tleV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgdGFyZ2V0KTtcbn07XG5cbnZhciBkZWNvZGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG59O1xuXG52YXIgZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKHN0cikge1xuICAgIC8vIFRoaXMgY29kZSB3YXMgb3JpZ2luYWxseSB3cml0dGVuIGJ5IEJyaWFuIFdoaXRlIChtc2NkZXgpIGZvciB0aGUgaW8uanMgY29yZSBxdWVyeXN0cmluZyBsaWJyYXJ5LlxuICAgIC8vIEl0IGhhcyBiZWVuIGFkYXB0ZWQgaGVyZSBmb3Igc3RyaWN0ZXIgYWRoZXJlbmNlIHRvIFJGQyAzOTg2XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICB2YXIgc3RyaW5nID0gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBzdHIgOiBTdHJpbmcoc3RyKTtcblxuICAgIHZhciBvdXQgPSAnJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgYyA9IHN0cmluZy5jaGFyQ29kZUF0KGkpO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGMgPT09IDB4MkQgLy8gLVxuICAgICAgICAgICAgfHwgYyA9PT0gMHgyRSAvLyAuXG4gICAgICAgICAgICB8fCBjID09PSAweDVGIC8vIF9cbiAgICAgICAgICAgIHx8IGMgPT09IDB4N0UgLy8gflxuICAgICAgICAgICAgfHwgKGMgPj0gMHgzMCAmJiBjIDw9IDB4MzkpIC8vIDAtOVxuICAgICAgICAgICAgfHwgKGMgPj0gMHg0MSAmJiBjIDw9IDB4NUEpIC8vIGEtelxuICAgICAgICAgICAgfHwgKGMgPj0gMHg2MSAmJiBjIDw9IDB4N0EpIC8vIEEtWlxuICAgICAgICApIHtcbiAgICAgICAgICAgIG91dCArPSBzdHJpbmcuY2hhckF0KGkpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIGhleFRhYmxlW2NdO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4ODAwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhDMCB8IChjID4+IDYpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHhEODAwIHx8IGMgPj0gMHhFMDAwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhFMCB8IChjID4+IDEyKV0gKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaSArPSAxO1xuICAgICAgICBjID0gMHgxMDAwMCArICgoKGMgJiAweDNGRikgPDwgMTApIHwgKHN0cmluZy5jaGFyQ29kZUF0KGkpICYgMHgzRkYpKTtcbiAgICAgICAgb3V0ICs9IGhleFRhYmxlWzB4RjAgfCAoYyA+PiAxOCldXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gMTIpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gNikgJiAweDNGKV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG52YXIgY29tcGFjdCA9IGZ1bmN0aW9uIGNvbXBhY3QodmFsdWUpIHtcbiAgICB2YXIgcXVldWUgPSBbeyBvYmo6IHsgbzogdmFsdWUgfSwgcHJvcDogJ28nIH1dO1xuICAgIHZhciByZWZzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBpdGVtID0gcXVldWVbaV07XG4gICAgICAgIHZhciBvYmogPSBpdGVtLm9ialtpdGVtLnByb3BdO1xuXG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBrZXlzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tqXTtcbiAgICAgICAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwgIT09IG51bGwgJiYgcmVmcy5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcXVldWUucHVzaCh7IG9iajogb2JqLCBwcm9wOiBrZXkgfSk7XG4gICAgICAgICAgICAgICAgcmVmcy5wdXNoKHZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29tcGFjdFF1ZXVlKHF1ZXVlKTtcbn07XG5cbnZhciBpc1JlZ0V4cCA9IGZ1bmN0aW9uIGlzUmVnRXhwKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuXG52YXIgaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlcihvYmopIHtcbiAgICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gISEob2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhcnJheVRvT2JqZWN0OiBhcnJheVRvT2JqZWN0LFxuICAgIGFzc2lnbjogYXNzaWduLFxuICAgIGNvbXBhY3Q6IGNvbXBhY3QsXG4gICAgZGVjb2RlOiBkZWNvZGUsXG4gICAgZW5jb2RlOiBlbmNvZGUsXG4gICAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICAgIGlzUmVnRXhwOiBpc1JlZ0V4cCxcbiAgICBtZXJnZTogbWVyZ2Vcbn07XG4iLCJleHBvcnQgY29uc3QgR29vZ2xlQXBpID0gZnVuY3Rpb24ob3B0cykge1xuICBvcHRzID0gb3B0cyB8fCB7fVxuXG4gIGNvbnN0IGFwaUtleSA9IG9wdHMuYXBpS2V5O1xuICBjb25zdCBsaWJyYXJpZXMgPSBvcHRzLmxpYnJhcmllcyB8fCBbXTtcbiAgY29uc3QgY2xpZW50ID0gb3B0cy5jbGllbnQ7XG4gIGNvbnN0IFVSTCA9ICdodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanMnO1xuXG4gIGNvbnN0IGdvb2dsZVZlcnNpb24gPSAnMy4yNSc7XG4gIGxldCBzY3JpcHQgPSBudWxsO1xuICBsZXQgZ29vZ2xlID0gd2luZG93Lmdvb2dsZSA9IG51bGw7XG4gIGxldCBsb2FkaW5nID0gZmFsc2U7XG4gIGxldCBjaGFubmVsID0gbnVsbDtcbiAgbGV0IGxhbmd1YWdlID0gbnVsbDtcbiAgbGV0IHJlZ2lvbiA9IG51bGw7XG5cbiAgbGV0IG9uTG9hZEV2ZW50cyA9IFtdO1xuXG4gIGNvbnN0IHVybCA9ICgpID0+IHtcbiAgICBsZXQgdXJsID0gVVJMO1xuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICBrZXk6IGFwaUtleSxcbiAgICAgIGNhbGxiYWNrOiAnQ0FMTEJBQ0tfTkFNRScsXG4gICAgICBsaWJyYXJpZXM6IGxpYnJhcmllcy5qb2luKCcsJyksXG4gICAgICBjbGllbnQ6IGNsaWVudCxcbiAgICAgIHY6IGdvb2dsZVZlcnNpb24sXG4gICAgICBjaGFubmVsOiBjaGFubmVsLFxuICAgICAgbGFuZ3VhZ2U6IGxhbmd1YWdlLFxuICAgICAgcmVnaW9uOiByZWdpb25cbiAgICB9XG5cbiAgICBsZXQgcGFyYW1TdHIgPSBPYmplY3Qua2V5cyhwYXJhbXMpXG4gICAgICAgIC5maWx0ZXIoayA9PiAhIXBhcmFtc1trXSlcbiAgICAgICAgLm1hcChrID0+IGAke2t9PSR7cGFyYW1zW2tdfWApLmpvaW4oJyYnKTtcblxuICAgIHJldHVybiBgJHt1cmx9PyR7cGFyYW1TdHJ9YDtcbiAgfVxuXG4gIHJldHVybiB1cmwoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgR29vZ2xlQXBpXG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIGFzIFQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcblxuaW1wb3J0IGNhY2hlIGZyb20gJy4vU2NyaXB0Q2FjaGUnO1xuaW1wb3J0IEdvb2dsZUFwaSBmcm9tICcuL0dvb2dsZUFwaSc7XG5cbmNvbnN0IGRlZmF1bHRNYXBDb25maWcgPSB7fTtcbmV4cG9ydCBjb25zdCB3cmFwcGVyID0gIChXcmFwcGVkQ29tcG9uZW50KSA9PiB7XG5cblxuICBjbGFzcyBXcmFwcGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcywgY29udGV4dCkge1xuICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBsb2FkZWQ6IGZhbHNlLFxuICAgICAgICBtYXA6IG51bGwsXG4gICAgICAgIGdvb2dsZTogbnVsbFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcblxuICAgICAgY29uc3QgcmVmcyA9IHRoaXMucmVmcztcbiAgICAgIHRoaXMuc2NyaXB0Q2FjaGUuZ29vZ2xlLm9uTG9hZCgoZXJyLCB0YWcpID0+IHtcbiAgICAgICAgXG4gICAgICAgICAgY29uc3QgbWFwcyA9IHdpbmRvdy5nb29nbGUubWFwcztcblxuICAgICAgICAgIGNvbnN0IHByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcywge1xuICAgICAgICAgICAgbG9hZGVkOiB0aGlzLnN0YXRlLmxvYWRlZFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29uc3QgbWFwUmVmID0gcmVmcy5tYXA7XG5cbiAgICAgICAgICBjb25zdCBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUobWFwUmVmKTtcbiAgICAgICAgICBsZXQgY2VudGVyID0gbmV3IG1hcHMuTGF0TG5nKHRoaXMucHJvcHMubGF0LCB0aGlzLnByb3BzLmxuZyk7XG5cbiAgICAgICAgICBsZXQgbWFwQ29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE1hcENvbmZpZywge1xuICAgICAgICAgICAgY2VudGVyLCB6b29tOiB0aGlzLnByb3BzLnpvb21cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMubWFwID0gbmV3IG1hcHMuTWFwKG5vZGUsIG1hcENvbmZpZyk7XG5cbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGxvYWRlZDogdHJ1ZSxcbiAgICAgICAgICAgIG1hcDogdGhpcy5tYXAsXG4gICAgICAgICAgICBnb29nbGU6IHdpbmRvdy5nb29nbGVcbiAgICAgICAgICB9KVxuXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG5cbiAgICAgIHRoaXMuc2NyaXB0Q2FjaGUgPSBjYWNoZSh7XG4gICAgICAgIGdvb2dsZTogR29vZ2xlQXBpKHtcbiAgICAgICAgICBhcGlLZXk6IHRoaXMucHJvcHMuYXBpS2V5LFxuICAgICAgICAgIGxpYnJhcmllczogWydkcmF3aW5nJywgJ3Zpc3VhbGl6YXRpb24nLCdwbGFjZXMnXSxcbiAgICAgICAgICBsYW5ndWFnZTpcIlNFXCIsXG4gICAgICAgICAgcmVnaW9uOlwiR0JcIixcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcywge1xuICAgICAgICBsb2FkZWQ6IHRoaXMuc3RhdGUubG9hZGVkLFxuICAgICAgICBtYXA6IHRoaXMuc3RhdGUubWFwLFxuICAgICAgICBnb29nbGU6IHRoaXMuc3RhdGUuZ29vZ2xlLFxuICAgICAgICBtYXBDb21wb25lbnQ6IHRoaXMucmVmcy5tYXBcbiAgICAgIH0pXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxXcmFwcGVkQ29tcG9uZW50IHsuLi5wcm9wc30gLz5cbiAgICAgICAgICA8ZGl2IHJlZj0nbWFwJyAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gV3JhcHBlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgd3JhcHBlcjtcbiIsImxldCBjb3VudGVyID0gMDtcbmxldCBzY3JpcHRNYXAgPSBuZXcgTWFwKCk7XG5cbmV4cG9ydCBjb25zdCBTY3JpcHRDYWNoZSA9IChmdW5jdGlvbihnbG9iYWwpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIFNjcmlwdENhY2hlIChzY3JpcHRzKSB7XG4gICAgY29uc3QgQ2FjaGUgPSB7fVxuXG4gICAgQ2FjaGUuX29uTG9hZCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiAoY2IpID0+IHtcbiAgICAgICAgbGV0IHN0b3JlZCA9IHNjcmlwdE1hcC5nZXQoa2V5KTtcbiAgICAgICAgaWYgKHN0b3JlZCkge1xuICAgICAgICAgIHN0b3JlZC5wcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgc3RvcmVkLmVycm9yID8gY2Ioc3RvcmVkLmVycm9yKSA6IGNiKG51bGwsIHN0b3JlZClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRPRE86XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBDYWNoZS5fc2NyaXB0VGFnID0gKGtleSwgc3JjKSA9PiB7XG4gICAgICAgIGxldCB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgbGV0IHJlc29sdmVkID0gZmFsc2UsXG4gICAgICAgICAgICAgIGVycm9yZWQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG5cbiAgICAgICAgICB0YWcudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICAgIHRhZy5hc3luYyA9IGZhbHNlOyAvLyBMb2FkIGluIG9yZGVyXG5cbiAgICAgICAgICBjb25zdCBjYk5hbWUgPSBgbG9hZGVyQ0Ike2NvdW50ZXIrK30ke0RhdGUubm93KCl9YDtcbiAgICAgICAgICBsZXQgY2I7XG5cbiAgICAgICAgICBjb25zdCBjbGVhbnVwID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGdsb2JhbFtjYk5hbWVdICYmIHR5cGVvZiBnbG9iYWxbY2JOYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICBnbG9iYWxbY2JOYW1lXSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBoYW5kbGVSZXN1bHQgPSAoc3RhdGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgIGxldCBzdG9yZWQgPSBzY3JpcHRNYXAuZ2V0KGtleSk7XG4gICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gJ2xvYWRlZCcpIHtcbiAgICAgICAgICAgICAgICBzdG9yZWQucmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoc3JjKTtcbiAgICAgICAgICAgICAgICAvLyBzdG9yZWQuaGFuZGxlcnMuZm9yRWFjaChoID0+IGguY2FsbChudWxsLCBzdG9yZWQpKVxuICAgICAgICAgICAgICAgIC8vIHN0b3JlZC5oYW5kbGVycyA9IFtdXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgICAgICBzdG9yZWQuZXJyb3JlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gc3RvcmVkLmhhbmRsZXJzLmZvckVhY2goaCA9PiBoLmNhbGwobnVsbCwgc3RvcmVkKSlcbiAgICAgICAgICAgICAgICAvLyBzdG9yZWQuaGFuZGxlcnMgPSBbXTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXZ0KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cblxuXG4gICAgICAgICAgdGFnLm9ubG9hZCA9IGhhbmRsZVJlc3VsdCgnbG9hZGVkJyk7XG4gICAgICAgICAgdGFnLm9uZXJyb3IgPSBoYW5kbGVSZXN1bHQoJ2Vycm9yJylcbiAgICAgICAgICB0YWcub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgaGFuZGxlUmVzdWx0KHRhZy5yZWFkeVN0YXRlKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFBpY2sgb2ZmIGNhbGxiYWNrLCBpZiB0aGVyZSBpcyBvbmVcbiAgICAgICAgICBpZiAoc3JjLm1hdGNoKC9jYWxsYmFjaz1DQUxMQkFDS19OQU1FLykpIHtcbiAgICAgICAgICAgIHNyYyA9IHNyYy5yZXBsYWNlKC8oY2FsbGJhY2s9KVteXFwmXSsvLCBgJDEke2NiTmFtZX1gKVxuICAgICAgICAgICAgY2IgPSB3aW5kb3dbY2JOYW1lXSA9IHRhZy5vbmxvYWQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgdGFnLm9ubG9hZClcbiAgICAgICAgICB9XG4gICAgICAgICAgdGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgdGFnLm9uZXJyb3IpO1xuXG4gICAgICAgICAgdGFnLnNyYyA9IHNyYztcbiAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKHRhZyk7XG4gICAgICAgICAgcmV0dXJuIHRhZztcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBpbml0aWFsU3RhdGUgPSB7XG4gICAgICAgICAgbG9hZGVkOiBmYWxzZSxcbiAgICAgICAgICBlcnJvcjogZmFsc2UsXG4gICAgICAgICAgcHJvbWlzZTogcHJvbWlzZSxcbiAgICAgICAgICB0YWdcbiAgICAgICAgfVxuICAgICAgICBzY3JpcHRNYXAuc2V0KGtleSwgaW5pdGlhbFN0YXRlKTtcblxuICAgICAgcmV0dXJuIHNjcmlwdE1hcC5nZXQoa2V5KTtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhzY3JpcHRzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgY29uc3Qgc2NyaXB0ID0gc2NyaXB0c1trZXldO1xuICAgICAgQ2FjaGVba2V5XSA9IHtcbiAgICAgICAgdGFnOiAgICBDYWNoZS5fc2NyaXB0VGFnKGtleSwgc2NyaXB0KSxcbiAgICAgICAgb25Mb2FkOiBDYWNoZS5fb25Mb2FkKGtleSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIENhY2hlO1xuICB9XG59KSh3aW5kb3cpXG5cbmV4cG9ydCBkZWZhdWx0IFNjcmlwdENhY2hlO1xuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGlzSW5zaWRlIGZyb20gJ3BvaW50LWluLXBvbHlnb24nO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICdxcyc7XG5cblxubGV0IG1hcmtlcnNBcnJheSA9IFtdO1xubGV0IGJvdW5kcztcbmxldCBkcmF3aW5nTWFuYWdlcjtcbmxldCBjZW50ZXI7XG5sZXQgbWFwcztcbmxldCByZXNpemFibGVQb2x5Z29uO1xubGV0IGFyZWE7XG5sZXQgbGF0aXR1ZGU7XG5sZXQgbG9uZ2l0dWRlO1xubGV0IGxvY2F0aW9uQWRkcmVzcyA9IFwiRGp1cmfDpXJkc3bDpGdlbiA1MCwgMTE1IDIxIFN0b2NraG9sbVwiO1xubGV0IGNvb3JkaW5hdGVzID0gW107XG5cbmNvbnN0IGRlbGV0ZVN0eWxlID0ge1xuICBtYXJnaW5Ub3A6IFwiLTg4cHhcIixcbiAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxuICBsZWZ0OiBcIjQwJVwiXG59XG5jb25zdCBuZXh0U3R5bGUgPSB7XG4gIG1hcmdpblRvcDogXCItODhweFwiLFxuICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICB0ZXh0QWxpZ246IFwibGVmdFwiLFxuXG59XG5cbmNsYXNzIE1hcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIGxhdGl0dWRlID0gdGhpcy5wcm9wcy5tYXBDb25maWcubGF0O1xuICAgIGxvbmdpdHVkZSA9IHRoaXMucHJvcHMubWFwQ29uZmlnLmxuZztcblxuICAgIHZhciBhZGRyZXNzPVwiRGp1cmfDpXJkc3bDpGdlbiA1MCwgMTE1IDIxIFN0b2NraG9sbVwiO1xuXG4gICAgaWYodGhpcy5wcm9wcy5yb29mYWRkcmVzcyE9XCJcIilcbiAgICB7XG4gICAgICBsb2NhdGlvbkFkZHJlc3M9dGhpcy5wcm9wcy5yb29mYWRkcmVzc1xuICAgIH1cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZHJhd01vZGU6IHRydWUsXG4gICAgICBsb2FkZWQ6IGZhbHNlLFxuICAgICAgcGxhY2U6IGFkZHJlc3MsXG4gICAgICBwb3NpdGlvbjogbnVsbCxcbiAgICAgIGxhdDogbGF0aXR1ZGUsXG4gICAgICBsbmc6IGxvbmdpdHVkZSxcbiAgICAgIGxvY2FkZHJlc3M6ICcnLFxuICAgICAgY29sb3I6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiMwQTUzOUNcIlxuICAgICAgfVxuXG4gICAgfTtcblxuXG5cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IG1haW4gPSB0aGlzO1xuXG4gICAgdmFyIGxvY2F0aW9ubmFtZSA9IHBhcnNlKGxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkpXG4gICAgaWYgKGxvY2F0aW9ubmFtZS5sb2NhdGlvbiAhPSB1bmRlZmluZWQpIHtcbiAgICAgIGxvY2F0aW9uQWRkcmVzcyA9IGxvY2F0aW9ubmFtZS5sb2NhdGlvbjtcbiAgICB9XG5cblxuICAgIGZldGNoKGBodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZ2VvY29kZS9qc29uP2tleT1BSXphU3lDSjdJNEh2RksxQ1pjUmxvQlZMam5POF9KRWxnVFJaMW8mYWRkcmVzcz0ke2xvY2F0aW9uQWRkcmVzc31gKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblxuXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgaWYgKGRhdGEucmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQgIT0gJycgJiYgZGF0YS5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxuZykge1xuXG4gICAgICAgICAgbGF0aXR1ZGUgPSBkYXRhLnJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24ubGF0LFxuICAgICAgICAgICAgbG9uZ2l0dWRlID0gZGF0YS5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxuZ1xuXG5cbiAgICAgICAgICBtYWluLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGxhdDogbGF0aXR1ZGUsXG4gICAgICAgICAgICBsbmc6IGxvbmdpdHVkZSxcbiAgICAgICAgICAgIHBsYWNlOiBsb2NhdGlvbkFkZHJlc3NcbiAgICAgICAgICB9XG4gICAgICAgICAgKVxuXG4gICAgICAgICAgbWFpbi5sb2FkTWFwKCk7XG4gICAgICAgICAgbWFpbi5kcmF3UG9seWxpbmUoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgIH0pXG5cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuXG5cbiAgICBpZiAocHJldlByb3BzLmdvb2dsZSAhPT0gdGhpcy5wcm9wcy5nb29nbGUpIHtcbiAgICAgIHRoaXMubG9hZE1hcCgpO1xuICAgICAgaWYgKHRoaXMucHJvcHMuZHJhd01vZGUpIHtcbiAgICAgICAgdGhpcy5kcmF3UG9seWxpbmUoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByb3BzLmluc2VydE1hcmtlcikge1xuICAgICAgICB0aGlzLmluc2VydE1hcmtlcigpO1xuICAgICAgfVxuICAgICAgLyppZiAodGhpcy5wcm9wcy5oZWF0TWFwKSB7XG4gICAgICAgIHRoaXMuaGVhdE1hcCgpO1xuICAgICAgfSovXG4gICAgfVxuICAgIC8qIGlmIChwcmV2UHJvcHMubWFya2Vycy5sZW5ndGghPT10aGlzLnByb3BzLm1hcmtlcnMubGVuZ3RoICYmdGhpcy5tYXJrZXJzIT1wcmV2UHJvcHMubWFya2VycyAmJiB0aGlzLnN0YXRlLmxvYWRlZCYmIXRoaXMucHJvcHMuaGVhdE1hcCl7XG4gICAgICAgdGhpcy5nZXRNYXJrZXJzKCk7XG4gICAgIH0qL1xuXG5cbiAgfVxuXG4gIGFyZWEocmVzaXphYmxlUG9seWdvbikge1xuXG5cbiAgICBhcmVhID0gZ29vZ2xlLm1hcHMuZ2VvbWV0cnkuc3BoZXJpY2FsLmNvbXB1dGVBcmVhKHJlc2l6YWJsZVBvbHlnb24pO1xuICAgIGNvbnNvbGUubG9nKFwiYXJlYVwiICsgYXJlYSk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgIGNvbnN0IGdvb2dsZSA9IHRoaXMucHJvcHMuZ29vZ2xlO1xuICAgIGlmIChkcmF3aW5nTWFuYWdlciAmJiBuZXh0UHJvcHMuZHJhd01vZGUgIT0gdGhpcy5wcm9wcy5kcmF3TW9kZSkge1xuICAgICAgZHJhd2luZ01hbmFnZXIuc2V0RHJhd2luZ01vZGUobnVsbCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnByb3BzLmRyYXdNb2RlICE9PSBuZXh0UHJvcHMuZHJhd01vZGUgJiYgbmV4dFByb3BzLmRyYXdNb2RlICYmIHRoaXMucHJvcHMuZ29vZ2xlKSB7XG4gICAgICB0aGlzLmRyYXdQb2x5bGluZSgpO1xuICAgIH1cblxuICB9XG5cbiAgLypcbiAgXG4gICAgaGVhdE1hcCgpe1xuICBcbiAgICAgIGNvbnN0IHtnb29nbGV9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IG1hcHMgPSBnb29nbGUubWFwcztcbiAgICAgIGNvbnN0IHBvaW50cz10aGlzLnByb3BzLm1hcmtlcnMubWFwKChwb2ludCkgPT4gKFxuICAgICAgICAgIG5ldyBnb29nbGUubWFwcy5MYXRMbmcocG9pbnQubGF0TG5nLmxhdCxwb2ludC5sYXRMbmcubG5nKVxuICAgICAgKSk7XG4gIFxuICAgICAgbGV0IGhlYXRtYXAgPSBuZXcgbWFwcy52aXN1YWxpemF0aW9uLkhlYXRtYXBMYXllcih7XG4gICAgICAgIGRhdGE6cG9pbnRzICxcbiAgICAgICAgbWFwOiB0aGlzLm1hcFxuICAgICAgfSk7XG4gICAgfVxuICAqL1xuXG4gIGluc2VydE1hcmtlcigpIHtcbiAgICBjb25zdCB7IGdvb2dsZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBtYXBzID0gZ29vZ2xlLm1hcHM7XG5cbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcih0aGlzLm1hcCwgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnN0IG1hcmtlclByb3BzID0gKHtcbiAgICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoZS5sYXRMbmcubGF0KCksIGUubGF0TG5nLmxuZygpKSxcbiAgICAgICAgbWFwOiB0aGlzLm1hcCxcbiAgICAgICAgZHJhZ2dhYmxlOiB0cnVlXG4gICAgICB9KVxuICAgICAgY29uc3QgbWFya2VyID0gbmV3IG1hcHMuTWFya2VyKG1hcmtlclByb3BzKTtcblxuICAgICAgdGhpcy5wcm9wcy5oYW5kbGVSZXR1cm5lZE1hcmtlcnMoeyBsYXQ6IGUubGF0TG5nLmxhdCgpLCBsbmc6IGUubGF0TG5nLmxuZygpIH0pO1xuICAgICAgbWFya2VyLmFkZExpc3RlbmVyKCdkcmFnZW5kJywgKGUpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVSZXR1cm5lZE1hcmtlcnMoeyBsYXQ6IGUubGF0TG5nLmxhdCgpLCBsbmc6IGUubGF0TG5nLmxuZygpIH0pO1xuXG4gICAgICB9KTtcblxuICAgIH0uYmluZCh0aGlzKSk7XG5cblxuXG5cbiAgfVxuXG4gIGRyYXdQb2x5bGluZSgpIHtcbiAgICBjb25zdCBnb29nbGUgPSB0aGlzLnByb3BzLmdvb2dsZTtcblxuICAgIC8qZHJhd2luZ01hbmFnZXIgPSBuZXcgZ29vZ2xlLm1hcHMuZHJhd2luZy5EcmF3aW5nTWFuYWdlcih7XG4gICAgICBkcmF3aW5nTW9kZTogZ29vZ2xlLm1hcHMuZHJhd2luZy5PdmVybGF5VHlwZS5QT0xZR09OLFxuICAgICAgZHJhd2luZ0NvbnRyb2w6IGZhbHNlLFxuICAgICAgcG9seWdvbk9wdGlvbnM6IHRoaXMucHJvcHMucG9seWdvbk9wdGlvbnNcbiAgICB9KTsqL1xuXG4gICAgZHJhd2luZ01hbmFnZXIgPSBuZXcgZ29vZ2xlLm1hcHMuZHJhd2luZy5EcmF3aW5nTWFuYWdlcih7XG4gICAgICBkcmF3aW5nTW9kZTogZ29vZ2xlLm1hcHMuZHJhd2luZy5PdmVybGF5VHlwZS5QT0xZR09OLFxuICAgICAgZHJhd2luZ0NvbnRyb2w6IHRydWUsXG4gICAgICBtYXBUeXBlQ29udHJvbDogZmFsc2UsXG4gICAgICBkcmF3aW5nQ29udHJvbE9wdGlvbnM6IHtcbiAgICAgICAgZHJhd2luZ01vZGVzOiBbZ29vZ2xlLm1hcHMuZHJhd2luZy5PdmVybGF5VHlwZS5QT0xZR09OXSxcbiAgICAgICAgcG9zaXRpb246IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5MRUZUX1RPUFxuICAgICAgfSxcbiAgICAgIG1hcmtlck9wdGlvbnM6IHsgaWNvbjogJ2h0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL21hcHMvZG9jdW1lbnRhdGlvbi9qYXZhc2NyaXB0L2V4YW1wbGVzL2Z1bGwvaW1hZ2VzL2JlYWNoZmxhZy5wbmcnIH0sXG4gICAgICBjaXJjbGVPcHRpb25zOiB7XG4gICAgICAgIGZpbGxDb2xvcjogJyNmZmZmMDAnLFxuICAgICAgICBmaWxsT3BhY2l0eTogMSxcbiAgICAgICAgc3Ryb2tlV2VpZ2h0OiA1LFxuICAgICAgICBjbGlja2FibGU6IGZhbHNlLFxuICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgekluZGV4OiAxXG4gICAgICB9LFxuICAgICAgcG9seWdvbk9wdGlvbnM6IHRoaXMucHJvcHMucG9seWdvbk9wdGlvbnNcbiAgICB9KTtcblxuICAgIGRyYXdpbmdNYW5hZ2VyLnNldE1hcCh0aGlzLm1hcCk7XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAvLyBFdmVudCBsaXN0ZW5lcnMgYWZ0ZXIgUG9seWdvbiBjbG9zZWRcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKGRyYXdpbmdNYW5hZ2VyLCAncG9seWdvbmNvbXBsZXRlJywgZnVuY3Rpb24gKHBvbHlsaW5lKSB7XG4gICAgICBkcmF3aW5nTWFuYWdlci5zZXREcmF3aW5nTW9kZShudWxsKTtcbiAgICAgIHJlc2l6YWJsZVBvbHlnb24gPSBwb2x5bGluZS5nZXRQYXRoKCk7XG4gICAgICB0aGlzLmFyZWEocmVzaXphYmxlUG9seWdvbik7XG4gICAgICBsZXQgY29sb3JfZGF0YSA9IHRoaXMuc3RhdGUuY29sb3I7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnV0dG9ubmV3Jykuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjMDAwXCI7XG5cblxuXG5cbiAgICAgIC8vIERlbGV0ZSBQb2x5Z29uIG9uIGNsaWNrXG4gICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAgICAvKlxuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIocG9seWxpbmUsICdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgIHBvbHlsaW5lLnNldE1hcChudWxsKTtcbiAgICAgICAgICAgICAgcmVzaXphYmxlUG9seWdvbiA9IFtdO1xuICAgICAgICAgICAgICAvLyB0aGlzLmdldE1hcmtlcnMoKTtcbiAgICAgICAgICAgICAgdGhpcy5kcmF3UG9seWxpbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgKi9cblxuICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbGV0ZS1idXR0b24nKSwgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICBwb2x5bGluZS5zZXRNYXAobnVsbCk7XG4gICAgICAgIHJlc2l6YWJsZVBvbHlnb24gPSBbXTtcbiAgICAgICAgZHJhd2luZ01hbmFnZXIuc2V0RHJhd2luZ01vZGUodHJ1ZSk7XG4gICAgICAgIGxldCBjb2xvcl9kYXRhID0gY29sb3JfZGF0YTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J1dHRvbm5ldycpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzBBNTM5Q1wiO1xuICAgICAgICAvKiAgIGNvbG9yX2RhdGEuYmFja2dyb3VuZENvbG9yPVwiIzU4YmVlY1wiO1xuICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICBjb2xvcjpjb2xvcl9kYXRhXG4gICAgIH0pKi9cblxuXG4gICAgICAgIC8vdGhpcy5kZWxldGUoKTtcblxuXG4gICAgICB9KTtcblxuXG4gICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgLy8gRmlsdGVyaW5nIGZ1bmN0aW9uXG4gICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgLypjb25zdCBmaWx0ZXJNYXJrZXJzID0gKCkgPT4ge1xuICAgICAgICBsZXQgcG9seWdvbiA9IFtdO1xuICAgICAgICBsZXQgaW5zaWRlTWFya2VycyA9IFtdO1xuXG4gICAgICAgIHJlc2l6YWJsZVBvbHlnb24uZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICAgICAgcG9seWdvbi5wdXNoKFtjb29yZC5sYXQoKSwgY29vcmQubG5nKCldKTtcbiAgICAgICAgfSlcbiAgICAgICAgbWFya2Vyc0FycmF5LmZvckVhY2gobWFya2VyID0+IHtcbiAgICAgICAgICBjb25zdCB4ID0gbWFya2VyLmdldFBvc2l0aW9uKCkubGF0KCk7XG4gICAgICAgICAgY29uc3QgeSA9IG1hcmtlci5nZXRQb3NpdGlvbigpLmxuZygpO1xuICAgICAgICAgIGlmICghaXNJbnNpZGUoW3gsIHldLCBwb2x5Z29uKSkge1xuICAgICAgICAgICAgbWFya2VyLnNldE1hcChudWxsKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbnNpZGVNYXJrZXJzLnB1c2gobWFya2VyKTtcbiAgICAgICAgICAgIGlmICghbWFya2VyLm1hcCkge1xuICAgICAgICAgICAgICBtYXJrZXIuc2V0TWFwKHRoaXMubWFwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGFuZGxlUmV0dXJuZWRNYXJrZXJzKSB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVSZXR1cm5lZE1hcmtlcnMoaW5zaWRlTWFya2Vycyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZpbHRlck1hcmtlcnMoKTsqL1xuICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIC8vIFJlc2l6ZSBwb2x5Z29uXG4gICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIocmVzaXphYmxlUG9seWdvbiwgJ3NldF9hdCcsIGZ1bmN0aW9uIChlZGdlKSB7XG4gICAgICAgIHJlc2l6YWJsZVBvbHlnb24gPSBwb2x5bGluZS5nZXRQYXRoKCk7XG4gICAgICAgIHZhciBhcmVhID0gZ29vZ2xlLm1hcHMuZ2VvbWV0cnkuc3BoZXJpY2FsLmNvbXB1dGVBcmVhKHJlc2l6YWJsZVBvbHlnb24pO1xuICAgICAgICBjb25zb2xlLmxvZyhcImFyZWEgOiBcIiArIGFyZWEpO1xuICAgICAgICAvLyBmaWx0ZXJNYXJrZXJzKCk7XG4gICAgICB9KTtcblxuICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIoZHJhd2luZ01hbmFnZXIsICdkcmF3aW5nbW9kZV9jaGFuZ2VkJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcG9seWxpbmUuc2V0TWFwKG51bGwpO1xuICAgICAgICByZXNpemFibGVQb2x5Z29uID0gW107XG4gICAgICAgIHZhciBhcmVhID0gZ29vZ2xlLm1hcHMuZ2VvbWV0cnkuc3BoZXJpY2FsLmNvbXB1dGVBcmVhKHJlc2l6YWJsZVBvbHlnb24pO1xuICAgICAgICBjb25zb2xlLmxvZyhcImFyZWEgOiBcIiArIGFyZWEpO1xuICAgICAgfSk7XG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihyZXNpemFibGVQb2x5Z29uLCAnaW5zZXJ0X2F0JywgZnVuY3Rpb24gKGVkZ2UpIHtcbiAgICAgICAgcmVzaXphYmxlUG9seWdvbiA9IHBvbHlsaW5lLmdldFBhdGgoKTtcbiAgICAgICAgdmFyIGFyZWEgPSBnb29nbGUubWFwcy5nZW9tZXRyeS5zcGhlcmljYWwuY29tcHV0ZUFyZWEocmVzaXphYmxlUG9seWdvbik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXJlYSA6IFwiICsgYXJlYSk7XG4gICAgICAgIC8vIGZpbHRlck1hcmtlcnMoKTtcbiAgICAgIH0pO1xuICAgIH0uYmluZCh0aGlzKSlcbiAgfVxuXG5cbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgLy8gRElTUExBWSBNQVJLRVJTIElOIE1BUFxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAvKmdldE1hcmtlcnMoKXtcbiAgICBjb25zb2xlLmxvZygnZ2V0TWFya2VycycpO1xuICAgIGNvbnN0IHtnb29nbGV9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBtYXBzID0gZ29vZ2xlLm1hcHM7XG4gICAgbWFya2Vyc0FycmF5LmZvckVhY2gobWFya2VyPT57XG4gICAgICBtYXJrZXIuc2V0TWFwKG51bGwpO1xuICAgIH0pXG4gICAgbWFya2Vyc0FycmF5PVtdO1xuXG4gICAgdGhpcy5wcm9wcy5tYXJrZXJzLmZvckVhY2goKGZsYWcpPT57XG4gICAgICBjb25zdCBtYXJrZXJQcm9wcz0oe1xuICAgICAgICAuLi5mbGFnLFxuICAgICAgICBwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhmbGFnLmxhdExuZy5sYXQsZmxhZy5sYXRMbmcubG5nKSxcbiAgICAgICAgbWFwOiB0aGlzLm1hcFxuICAgICAgfSlcblxuXG4gICAgICBjb25zdCBtYXJrZXIgPSBuZXcgbWFwcy5NYXJrZXIobWFya2VyUHJvcHMpO1xuXG4gICAgICBpZiAodGhpcy5wcm9wcy5vbk1hcmtlckNsaWNrKSB7XG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwnY2xpY2snLChldmVudCk9PntcbiAgICAgICAgICB0aGlzLnByb3BzLm9uTWFya2VyQ2xpY2sobWFya2VyKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgLy8gUmVuZGVyIGluZm8gd2luZG93IGlmIHdlIGhhdmUgYW4gaW5mbyBwcm9wZXJ0eVxuICAgICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgIGlmIChtYXJrZXIuaW5mbykge1xuICAgICAgICBjb25zdCBpbmZvd2luZG93ID0gbmV3IGdvb2dsZS5tYXBzLkluZm9XaW5kb3coe1xuICAgICAgICAgIGNvbnRlbnQ6IG1hcmtlci5pbmZvXG4gICAgICAgIH0pO1xuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsJ2NsaWNrJywoZXZlbnQpPT57XG4gICAgICAgICAgaW5mb3dpbmRvdy5vcGVuKHRoaXMubWFwLCBtYXJrZXIpO1xuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgbWFya2Vyc0FycmF5LnB1c2gobWFya2VyKTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmhhbmRsZVJldHVybmVkTWFya2Vycykge1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZVJldHVybmVkTWFya2VycyhtYXJrZXJzQXJyYXkpO1xuICAgICAgfVxuICAgIH0pXG4gIH1cbiovXG5cblxuICBsb2FkTWFwKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGdvb2dsZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IG1hcHMgPSBnb29nbGUubWFwcztcbiAgICAgIGNvbnN0IG1hcFJlZiA9IHRoaXMucmVmcy5tYXA7XG4gICAgICBjb25zdCBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUobWFwUmVmKTtcbiAgICAgIGNvbnN0IHsgbWFwQ29uZmlnIH0gPSB0aGlzLnByb3BzO1xuICAgICAgbGV0IHsgem9vbSB9ID0gbWFwQ29uZmlnO1xuICAgICAgbGV0IHsgbGF0IH0gPSBtYXBDb25maWc7XG4gICAgICBsZXQgeyBsbmcgfSA9IG1hcENvbmZpZztcbiAgICAgIGNvbnN0IGNlbnRlciA9IG5ldyBtYXBzLkxhdExuZyh0aGlzLnN0YXRlLmxhdCwgdGhpcy5zdGF0ZS5sbmcpO1xuICAgICAgY29uc3QgbWFwQ29uZmlndXJhdGlvbiA9IE9iamVjdC5hc3NpZ24oe30sIHtcbiAgICAgICAgY2VudGVyOiBjZW50ZXIsXG4gICAgICAgIHpvb206IHpvb20sXG4gICAgICAgIHpvb21Db250cm9sOiB0cnVlLFxuICAgICAgICBzdHlsZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXG4gICAgICAgICAgICBcInN0eWxlcnNcIjogW1xuICAgICAgICAgICAgICB7IFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF0sXG5cblxuXG4gICAgICAgIGRyYXdpbmdNb2RlOiBnb29nbGUubWFwcy5kcmF3aW5nLk92ZXJsYXlUeXBlLlBPTFlHT04sXG4gICAgICAgIGRyYXdpbmdDb250cm9sOiB0cnVlLFxuICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXG4gICAgICAgIGRyYXdpbmdDb250cm9sT3B0aW9uczogeyBkcmF3aW5nTW9kZXM6IFtnb29nbGUubWFwcy5kcmF3aW5nLk92ZXJsYXlUeXBlLlBPTFlHT05dIH0sXG4gICAgICAgIG1hcFR5cGVJZDogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlNBVEVMTElURSxcblxuXG5cbiAgICAgIH0pXG4gICAgICB0aGlzLm1hcCA9IG5ldyBtYXBzLk1hcChub2RlLCBtYXBDb25maWd1cmF0aW9uKTtcbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyT25jZSh0aGlzLm1hcCwgJ2lkbGUnLCAoKSA9PiB7XG4gICAgICAgIC8qaWYgKCF0aGlzLnByb3BzLmhlYXRNYXApIHtcbiAgICAgICAgIC8vIHRoaXMuZ2V0TWFya2VycygpO1xuICAgICAgICB9Ki9cbiAgICAgIH0pO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGxvYWRlZDogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnZXJyb3IgaW4gbG9hZCcpO1xuICAgIH1cblxuICB9XG5cblxuXG4gIGF1dG9jbXAoKSB7XG5cbiAgICBsZXQgZ2VvY29kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcblxuXG4gICAgY29uc3QgYXJlZiA9IHRoaXMucmVmcy5hdXRvY29tcGxldGU7XG5cblxuICAgIGNvbnN0IG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShhcmVmKTtcblxuICAgIHZhciBhdXRvY29tcGxldGUgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZShub2RlKTtcblxuXG4gICAgYXV0b2NvbXBsZXRlLmFkZExpc3RlbmVyKCdwbGFjZV9jaGFuZ2VkJywgKCkgPT4ge1xuICAgICAgY29uc3QgcGxhY2UgPSBhdXRvY29tcGxldGUuZ2V0UGxhY2UoKTtcbiAgICAgIGlmICghcGxhY2UuZ2VvbWV0cnkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG5cblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHBsYWNlOiBwbGFjZS5mb3JtYXR0ZWRfYWRkcmVzcyxcbiAgICAgICAgcG9zaXRpb246IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uXG4gICAgICB9KVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGxhdDogdGhpcy5zdGF0ZS5wb3NpdGlvbi5sYXQoKSxcbiAgICAgICAgbG5nOiB0aGlzLnN0YXRlLnBvc2l0aW9uLmxuZygpXG4gICAgICB9KVxuICAgICAgdGhpcy5wcm9wcy5tYXBDb25maWcubGF0ID0gdGhpcy5zdGF0ZS5wb3NpdGlvbi5sYXQoKVxuICAgICAgdGhpcy5wcm9wcy5tYXBDb25maWcubG5nID0gdGhpcy5zdGF0ZS5wb3NpdGlvbi5sbmcoKVxuXG4gICAgICB0aGlzLmxvYWRNYXAoKTtcblxuICAgICAgaWYgKHRoaXMucHJvcHMuZHJhd01vZGUpIHtcbiAgICAgICAgdGhpcy5kcmF3UG9seWxpbmUoKTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUucG9zaXRpb24ubGF0KCkpO1xuICAgICAgY29uc29sZS5sb2codGhpcy5zdGF0ZS5wb3NpdGlvbi5sbmcoKSk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLnBsYWNlKTtcblxuICAgIH0pXG4gIH1cblxuICBjYWxhcmVhKCkge1xuICAgIGlmIChyZXNpemFibGVQb2x5Z29uICE9IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIGFyZWF2YWwgPSBnb29nbGUubWFwcy5nZW9tZXRyeS5zcGhlcmljYWwuY29tcHV0ZUFyZWEocmVzaXphYmxlUG9seWdvbik7XG5cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXNpemFibGVQb2x5Z29uLmdldExlbmd0aCgpOyBpKyspIHtcbiAgICAgICAgY29vcmRpbmF0ZXMucHVzaChyZXNpemFibGVQb2x5Z29uLmdldEF0KGkpLnRvVXJsVmFsdWUoNikpXG4gICAgICB9XG4gICAgICB2YXIgc3RyaW5naWZ5Y29yZGltYXRlcyA9IEpTT04uc3RyaW5naWZ5KGNvb3JkaW5hdGVzKTtcbiAgICAgIGNvbnNvbGUubG9nKHN0cmluZ2lmeWNvcmRpbWF0ZXMpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLnBsYWNlKVxuXG4gICAgICB0aGlzLnByb3BzLmFyZWEoYXJlYXZhbCwgdGhpcy5zdGF0ZS5wbGFjZSwgc3RyaW5naWZ5Y29yZGltYXRlcyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoXCJwbGVhc2UgZHJhdyB0aGUgbWFwXCIpO1xuICAgIH1cbiAgfVxuXG5cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFwLXBvc2l0aW9uXCIgPlxuICAgICAgICA8ZGl2IGlkPVwibXlNb2RhbFwiIGNsYXNzTmFtZT1cIm1vZGFsIGZhZGVcIiByb2xlPVwiZGlhbG9nXCIgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZGlhbG9nXCIgc3R5bGU9e3sgd2lkdGg6IFwiNzUlXCIsdG9wOjgxIH19ID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWhlYWRlciBtb2RhbC1oZWRcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+JnRpbWVzOzwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5IHJvd1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLThcIj5cbiAgICAgICAgICAgICAgICAgIHsvKn0gIDxpZnJhbWUgd2lkdGg9XCI1NjBcIiBoZWlnaHQ9XCIzMTVcIiBzcmM9XCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC9zWHI3XzJzWUxEdz9hdXRvcGxheT0xXCIgPjwvaWZyYW1lPiovfVxuICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2ltZy9lemdpZi5jb20tdmlkZW8tdG8tZ2lmLmdpZlwiIGNsYXNzTmFtZT1cImltZy1yZXNwb25zaXZlXCIgc3R5bGU9e3sgbWluSGVpZ2h0OiBcIjIwMHB4XCIsIHdpZHRoOiBcIjEwMCVcIiB9fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PjxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTRcIj5cbiAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzdGVnc19tYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpPjxzcGFuPiAxPC9zcGFuPjogSGl0dGEgRGl0dCBIdXMgb2NoIHpvb21hIGluIG1lZCArIHN5bWJvbGVuIGzDpG5nc3QgbmVyIHRpbGwgaMO2Z2VyIHDDpSBrYXJ0YW48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGk+PHNwYW4+Mjwvc3Bhbj46VsOkeGxhIHRpbGwga2FydGzDpGdldCBow7Znc3QgdXBwIHRpbGwgdsOkbnN0ZXIgb20gZGl0dCBodXMgw6RyIG90eWRsaWd0IHDDpSBzYXRlbGxpdGJpbGRlbjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48c3Bhbj4zPC9zcGFuPjogTWFya2VyYSB1dCB0YWtlbnMgYWxsYSBow7ZybjwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaT48c3Bhbj4gNDwvc3Bhbj46IFRyeWNrIFwiTsOkc3RhXCIgbsOkciBsaW5qZXJuYSDDpHIgc2x1dG5hPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpID48YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiID5PazwvYnV0dG9uPjwvbGk+XG4gICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgIGlkPVwiYXV0b2ZpbGxcIlxuICAgICAgICAgICAgcmVmPSdhdXRvY29tcGxldGUnXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuYXV0b2NtcC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkFuZ2UgZW4gcGxhdHNcIiAvPlxuICAgICAgICAgICAgey8qfVxuICAgICAgICAgPGlucHV0XG5cbiAgICAgICAgICAgIHR5cGU9J3N1Ym1pdCdcbiAgICAgICAgICAgIHZhbHVlPSdHbycgLz5cbiAgICAgICAgXG4gICAgKi99XG5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLm1hcFN0eWxlfVxuICAgICAgICAgIHJlZj0nbWFwJz5cbiAgICAgICAgICBMb2FkaW5nIG1hcC4uLlxuICAgICAgPC9kaXY+XG5cblxuICAgICAgICB7PGRpdiBzdHlsZT17ZGVsZXRlU3R5bGV9ID48YnV0dG9uIGlkPVwiZGVsZXRlLWJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4taW5mb1wiPlJlbnNhPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmNhbGFyZWEuYmluZCh0aGlzKX0gY2xhc3NOYW1lPVwiYnRuIGJ0bi1pbmZvXCIgaWQ9XCJidXR0b25uZXdcIiBzdHlsZT17eyAuLi50aGlzLnN0YXRlLmNvbG9yIH19ID5Ow6RzdGE8L2J1dHRvbj48L2Rpdj5cbiAgICAgICAgfVxuICAgICAgPC9kaXY+KVxuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgTWFwO1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgY2FjaGUgZnJvbSAnLi9BcGlDb21wb25lbnRzL1NjcmlwdENhY2hlJztcbmltcG9ydCBHb29nbGVBcGkgZnJvbSAnLi9BcGlDb21wb25lbnRzL0dvb2dsZUFwaSc7XG5pbXBvcnQgR29vZ2xlQXBpQ29tcG9uZW50IGZyb20gJy4vQXBpQ29tcG9uZW50cy9Hb29nbGVBcGlDb21wb25lbnQnO1xuaW1wb3J0IE1hcCBmcm9tICcuL01hcCc7XG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gJ3FzJztcblxuXG5cblxuXG5sZXQgbGF0O1xubGV0IGxuZztcbmNsYXNzIEdvb2dsZU1hcERyYXdGaWx0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG5cbmNvbnN0cnVjdG9yKHByb3BzKVxue1xuXG5cdHN1cGVyKHByb3BzKVxuXHRjb25zb2xlLmxvZyh0aGlzLnByb3BzLmFyZWEpO1xuXG59XG5cblxuXG5jb21wb25lbnRXaWxsTW91bnQoKVxue1xuIGNvbnN0IG1haW4gPSB0aGlzO1xuIFxuIHZhciBsb2NhdGlvbm5hbWU9cGFyc2UobG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKSlcbiBpZihsb2NhdGlvbm5hbWUubG9jYXRpb24hPXVuZGVmaW5lZClcbiAge1xudmFyIGxvY2F0aW9uQWRkcmVzcz1sb2NhdGlvbm5hbWUubG9jYXRpb247XG4gIH1cblx0ICAgZmV0Y2goYGh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/a2V5PUFJemFTeUNKN0k0SHZGSzFDWmNSbG9CVkxqbk84X0pFbGdUUloxbyZhZGRyZXNzPSR7bG9jYXRpb25BZGRyZXNzfWApXG4gICAgLnRoZW4oIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSlcbiAgICAudGhlbiggZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXHRcblxuICAgIH0pLnRoZW4oIGZ1bmN0aW9uKGRhdGEpIHtcblxuXHRcdGlmKGRhdGEucmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQhPScnICYmIGRhdGEucmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbi5sbmchPVwiXCIgKVxuXHRcdFx0e1xuXHRcdFx0XHRcblx0XHR2YXIgbGF0aXR1ZGU9ZGF0YS5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxhdDtcbiAgICAgICB2YXIgIGxvbmdpdHVkZT1kYXRhLnJlc3VsdHNbMF0uZ2VvbWV0cnkubG9jYXRpb24ubG5nO1xuXHRcdGxhdDogZGF0YS5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxhdDtcblx0XHRsbmc6ZGF0YS5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uLmxhdDtcblxuICAgIFxuXHRcdFx0fVxuXHRcblx0XHRcbiAgfSlcbiAgICBcdFxufVxuXG5cblxuXG5cdHJlbmRlciAoKSB7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtYXBwb3NpdGlvbnRvcFwiPlxuXHRcdFx0XHQ8TWFwXG5cdFx0XHRcdFx0Z29vZ2xlPXt0aGlzLnByb3BzLmdvb2dsZX1cblx0XHRcdFx0XHRoZWF0TWFwPXt0aGlzLnByb3BzLmhlYXRNYXB9XG5cdFx0XHRcdFx0ZHJhd01vZGU9e3RoaXMucHJvcHMuZHJhd01vZGV9XG5cdFx0XHRcdFx0bWFya2Vycz17dGhpcy5wcm9wcy5tYXJrZXJzfVxuXHRcdFx0XHRcdG1hcENvbmZpZz17dGhpcy5wcm9wcy5tYXBDb25maWd9XG5cdFx0XHRcdFx0bWFwU3R5bGU9e3RoaXMucHJvcHMubWFwU3R5bGV9XG5cdFx0XHRcdFx0cG9seWdvbk9wdGlvbnM9e3RoaXMucHJvcHMucG9seWdvbk9wdGlvbnN9XG5cdFx0XHRcdFx0aGFuZGxlUmV0dXJuZWRNYXJrZXJzPXt0aGlzLnByb3BzLmhhbmRsZVJldHVybmVkTWFya2Vyc31cblx0XHRcdFx0XHRvbk1hcmtlckNsaWNrPXt0aGlzLnByb3BzLm9uTWFya2VyQ2xpY2t9XG5cdFx0XHRcdFx0aW5zZXJ0TWFya2VyPXt0aGlzLnByb3BzLmluc2VydE1hcmtlcn1cblx0XHRcdFx0XHRhcGlLZXk9e3RoaXMucHJvcHMuYXBpS2V5fVxuXHRcdFx0XHRcdGFyZWE9e3RoaXMucHJvcHMuYXJlYX1cblx0XHRcdFx0XHRyb29mYWRkcmVzcz17dGhpcy5wcm9wcy5yb29mYWRkcmVzc31cblxuXHRcdFx0XHQvPlxuXG5cdFx0XHQ8L2Rpdj5cblx0XHQpO1xuXHR9XG59XG5cblxuXG5Hb29nbGVNYXBEcmF3RmlsdGVyLnByb3BUeXBlcz17XG5cdGFwaUtleTpSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cdGRyYXdNb2RlOlJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHRoZWF0TWFwOlJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHRtYXJrZXJzOlJlYWN0LlByb3BUeXBlcy5hcnJheSxcblx0bWFwQ29uZmlnOlJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG5cdHBvbHlnb25PcHRpb25zOlJlYWN0LlByb3BUeXBlcy5vYmplY3QsXG5cdGdvb2dsZTpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LCAvL2lzIHByb3ZpZGVkIGJ5IHdyYXBwZXJcblx0bWFwU3R5bGU6UmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcblx0aGFuZGxlUmV0dXJuZWRNYXJrZXJzOlJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHRvbk1hcmtlckNsaWNrOlJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHRpbnNlcnRNYXJrZXI6UmVhY3QuUHJvcFR5cGVzLmJvb2xcbn07XG5cbkdvb2dsZU1hcERyYXdGaWx0ZXIuZGVmYXVsdFByb3BzPXtcblx0ZHJhd01vZGU6dHJ1ZSxcblx0aW5zZXJ0TWFya2VyOmZhbHNlLFxuXHRtYXBDb25maWc6e1xuXHRcdHpvb206MTgsXG5cdFx0bGF0OmxhdCxcblx0XHRsbmc6bG5nLFxuXG5cdH0sXG5cdG1hcFN0eWxlOntcblx0XHRoZWlnaHQ6JzYwMHB4Jyxcblx0XHR3aWR0aDogJzEwMCUnLFxuXHR9LFxuXHRwb2x5Z29uT3B0aW9uczp7XG5cdFx0ZmlsbENvbG9yOiAnIzU4YmVlYycsXG5cdFx0ZmlsbE9wYWNpdHk6IDAuMyxcblx0XHRzdHJva2VDb2xvcjonIzU4YmVlYycsXG5cdFx0c3Ryb2tlV2VpZ2h0OjMsXG5cdFx0Y2xpY2thYmxlOiB0cnVlLFxuXHRcdGVkaXRhYmxlOiB0cnVlLFxuXHRcdHpJbmRleDogMVxuXHR9LFxuXG5cblx0XG5cdG1hcmtlcnM6W10sXG59O1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgR29vZ2xlQXBpQ29tcG9uZW50KEdvb2dsZU1hcERyYXdGaWx0ZXIpO1xuIl19
