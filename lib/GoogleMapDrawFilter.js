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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ApiComponentsGoogleApiComponent = require('./ApiComponents/GoogleApiComponent');

var _ApiComponentsGoogleApiComponent2 = _interopRequireDefault(_ApiComponentsGoogleApiComponent);

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

var _qs = require('qs');

var lat = undefined;
var lng = undefined;

var GoogleMapDrawFilter = (function (_Component) {
	_inherits(GoogleMapDrawFilter, _Component);

	function GoogleMapDrawFilter(props) {
		_classCallCheck(this, GoogleMapDrawFilter);

		_get(Object.getPrototypeOf(GoogleMapDrawFilter.prototype), 'constructor', this).call(this, props);
	}

	_createClass(GoogleMapDrawFilter, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var locationname = (0, _qs.parse)(location.search.substr(1));
			if (locationname.location != undefined) {
				var locationAddress = locationname.location;
			}
			fetch('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCJ7I4HvFK1CZcRloBVLjnO8_JElgTRZ1o&address=' + locationAddress).then(function (response) {
				return response;
			}).then(function (response) {
				return response.json();
			});
			// .then(function (data) {
			// 	if (data.results[0].geometry.location.lat != '' && data.results[0].geometry.location.lng != "") {
			// 		// var latitude = data.results[0].geometry.location.lat;
			// 		// var longitude = data.results[0].geometry.location.lng;
			// 		// lat: data.results[0].geometry.location.lat;
			// 		// lng: data.results[0].geometry.location.lat;
			// 	}
			// })
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
})(_react.Component);

GoogleMapDrawFilter.propTypes = {
	apiKey: _propTypes2['default'].string.isRequired,
	drawMode: _propTypes2['default'].bool,
	heatMap: _propTypes2['default'].bool,
	markers: _propTypes2['default'].array,
	mapConfig: _propTypes2['default'].object,
	polygonOptions: _propTypes2['default'].object,
	google: _propTypes2['default'].object, //is provided by wrapper
	mapStyle: _propTypes2['default'].object,
	handleReturnedMarkers: _propTypes2['default'].func,
	onMarkerClick: _propTypes2['default'].func,
	insertMarker: _propTypes2['default'].bool
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