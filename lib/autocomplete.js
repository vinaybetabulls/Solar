'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

var _autocompleteModuleCss = require('./autocomplete.module.css');

var _autocompleteModuleCss2 = _interopRequireDefault(_autocompleteModuleCss);

var Contents = _react2['default'].createClass({
  displayName: 'Contents',

  getInitialState: function getInitialState() {
    return {
      place: null,
      position: null
    };
  },

  onSubmit: function onSubmit(e) {
    e.preventDefault();
  },

  componentDidMount: function componentDidMount() {
    this.renderAutoComplete();
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    var _props = this.props;
    var google = _props.google;
    var map = _props.map;

    if (map !== prevProps.map) {
      this.renderAutoComplete();
    }
  },

  renderAutoComplete: function renderAutoComplete() {
    var _this = this;

    var _props2 = this.props;
    var google = _props2.google;
    var map = _props2.map;

    if (!google || !map) return;

    var aref = this.refs.autocomplete;
    var node = _reactDom2['default'].findDOMNode(aref);
    var autocomplete = new google.maps.places.Autocomplete(node);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      _this.setState({
        place: place,
        position: place.geometry.location
      });
    });
  },

  render: function render() {
    var props = this.props;
    var position = this.state.position;

    return _react2['default'].createElement(
      'div',
      { className: _autocompleteModuleCss2['default'].flexWrapper },
      _react2['default'].createElement(
        'div',
        { className: _autocompleteModuleCss2['default'].left },
        _react2['default'].createElement(
          'form',
          { onSubmit: this.onSubmit },
          _react2['default'].createElement('input', {
            ref: 'autocomplete',
            type: 'text',
            placeholder: 'Enter a location' }),
          _react2['default'].createElement('input', {
            className: _autocompleteModuleCss2['default'].button,
            type: 'submit',
            value: 'Go' })
        ),
        _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'div',
            null,
            'Lat: ',
            position && position.lat()
          ),
          _react2['default'].createElement(
            'div',
            null,
            'Lng: ',
            position && position.lng()
          )
        )
      ),
      _react2['default'].createElement(
        'div',
        { className: _autocompleteModuleCss2['default'].right },
        _react2['default'].createElement(
          _Map2['default'],
          _extends({}, props, {
            containerStyle: {
              position: 'relative',
              height: '100vh',
              width: '100%'
            },
            center: this.state.position,
            centerAroundCurrentLocation: false }),
          _react2['default'].createElement(Marker, { position: this.state.position })
        )
      )
    );
  }
});

var MapWrapper = _react2['default'].createClass({
  displayName: 'MapWrapper',

  render: function render() {
    var props = this.props;
    var google = this.props.google;

    return _react2['default'].createElement(
      _Map2['default'],
      { google: google,
        className: 'map',
        visible: false },
      _react2['default'].createElement(Contents, props)
    );
  }
});

exports['default'] = MapWrapper;
module.exports = exports['default'];