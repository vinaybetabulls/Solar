require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactGoogleMapDrawFilter = require('react-google-map-draw-filter');

var _reactGoogleMapDrawFilter2 = _interopRequireDefault(_reactGoogleMapDrawFilter);

var App = (function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    _classCallCheck(this, App);

    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, props);
    this.state = {
      drawMode: true,
      activeMarkers: []

    };
  }

  _createClass(App, [{
    key: 'onMarkerClick',
    value: function onMarkerClick(marker, e) {
      this.setState({
        activeMarkers: [marker]
      });
    }
  }, {
    key: 'renderMarkerInfo',
    value: function renderMarkerInfo() {
      if (this.state.activeMarkers) {
        return this.state.activeMarkers.map(function (marker, i) {
          return _react2['default'].createElement(
            'div',
            { key: 'marker' + i },
            marker.label,
            marker.info
          );
        });
      }
    }
  }, {
    key: 'handleReturnedMarkers',
    value: function handleReturnedMarkers(markers) {
      this.setState({
        activeMarkers: markers
      });
    }
  }, {
    key: 'toggleDraw',
    value: function toggleDraw() {
      this.setState({
        drawMode: !this.state.drawMode
      });
    }
  }, {
    key: 'render',
    value: function render() {

      console.log("addrss in map component" + this.props.roofaddress);

      var markers = [{
        info: '- Marker1',
        label: 'A',
        title: 'hello',
        latLng: { lng: 2.13815342634916, lat: 41.39485570794 }
      }, {
        label: 'B',
        info: '- Marker2',
        latLng: { lng: 2.1575260162353516, lat: 41.39586980544921 }
      }, {
        label: 'C',
        info: '- Marker 3',
        latLng: { lng: 2.162332534790039, lat: 41.397801375978204 }
      }, {
        label: 'D',
        info: '- Marker 4',
        latLng: { lng: 2.154865264892578, lat: 41.38576031676253 }
      }, {
        label: 'E',
        info: '- Marker 5',
        latLng: { lng: 2.14205645751953, lat: 41.38344199588044 }
      }];

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'div',
          { className: 'App' },
          _react2['default'].createElement(_reactGoogleMapDrawFilter2['default'], {
            drawMode: this.state.drawMode,
            markers: markers,
            handleReturnedMarkers: this.handleReturnedMarkers.bind(this),
            onMarkerClick: this.onMarkerClick.bind(this),
            apiKey: 'AIzaSyADYWSlC4yEedJ-5lvQb9UFOVaMMux54Zc',
            area: this.props.area,
            roofaddress: this.props.roofaddress

          })
        ),
        _react2['default'].createElement(
          'h1',
          null,
          this.renderMarkerInfo.bind(this)()
        )
      );
    }
  }]);

  return App;
})(_react.Component);

exports['default'] = App;
module.exports = exports['default'];

/*}
  <button onClick={this.toggleDraw.bind(this)}>Draw again</button>
      */

},{"react":undefined,"react-dom":undefined,"react-google-map-draw-filter":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9KeW90aGkvRGlnaXRha18yMDE4XzExXzA3KDEpL0Rvd25sb2FkIEZyb20gU2VydmVyL0RpZ2l0YWtfMjAxOF8xMV8xNC9leGFtcGxlL3NyYy9tYXBjb21wb25lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ0FpQyxPQUFPOzs7O3dCQUNuQixXQUFXOzs7O3dDQUVBLDhCQUE4Qjs7OztJQUV4RCxHQUFHO1lBQUgsR0FBRzs7QUFDSyxXQURSLEdBQUcsQ0FDTSxLQUFLLEVBQUU7MEJBRGhCLEdBQUc7O0FBRUwsK0JBRkUsR0FBRyw2Q0FFQyxLQUFLLEVBQUU7QUFDYixRQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1gsY0FBUSxFQUFDLElBQUk7QUFDYixtQkFBYSxFQUFFLEVBQUU7O0tBRWxCLENBQUM7R0FHSDs7ZUFWRyxHQUFHOztXQVdNLHVCQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUM7QUFDckIsVUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLHFCQUFhLEVBQUcsQ0FBQyxNQUFNLENBQUM7T0FDekIsQ0FBQyxDQUFDO0tBQ0o7OztXQUNlLDRCQUFHO0FBQ25CLFVBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7QUFDN0IsZUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQyxNQUFNLEVBQUMsQ0FBQztpQkFDNUM7O2NBQUssR0FBRyxhQUFXLENBQUMsQUFBRztZQUNyQixNQUFNLENBQUMsS0FBSztZQUNaLE1BQU0sQ0FBQyxJQUFJO1dBQ1A7U0FBQyxDQUNQLENBQUM7T0FDRjtLQUNEOzs7V0FFcUIsK0JBQUMsT0FBTyxFQUFFO0FBQzdCLFVBQUksQ0FBQyxRQUFRLENBQUM7QUFDWixxQkFBYSxFQUFFLE9BQU87T0FDdkIsQ0FBQyxDQUFDO0tBQ0o7OztXQUNTLHNCQUFFO0FBQ1YsVUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLGdCQUFRLEVBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7T0FDOUIsQ0FBQyxDQUFDO0tBQ0o7OztXQUVLLGtCQUFHOztBQUVQLGFBQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQTs7QUFFN0QsVUFBTSxPQUFPLEdBQUcsQ0FDZjtBQUNDLFlBQUksRUFBQyxXQUFXO0FBQ1osYUFBSyxFQUFDLEdBQUc7QUFDYixhQUFLLEVBQUMsT0FBTztBQUNiLGNBQU0sRUFBQyxFQUFDLEdBQUcsRUFBQyxnQkFBZ0IsRUFBQyxHQUFHLEVBQUMsY0FBYyxFQUFDO09BQ2hELEVBRUQ7QUFDSyxhQUFLLEVBQUMsR0FBRztBQUNiLFlBQUksRUFBQyxXQUFXO0FBQ2hCLGNBQU0sRUFBQyxFQUFDLEdBQUcsRUFBQyxrQkFBa0IsRUFBQyxHQUFHLEVBQUUsaUJBQWlCLEVBQUM7T0FDdEQsRUFFRDtBQUNLLGFBQUssRUFBQyxHQUFHO0FBQ2IsWUFBSSxFQUFDLFlBQVk7QUFDakIsY0FBTSxFQUFDLEVBQUMsR0FBRyxFQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBQyxrQkFBa0IsRUFBQztPQUN0RCxFQUVEO0FBQ0ssYUFBSyxFQUFDLEdBQUc7QUFDVCxZQUFJLEVBQUMsWUFBWTtBQUNqQixjQUFNLEVBQUMsRUFBQyxHQUFHLEVBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFDLGlCQUFpQixFQUFDO09BQ3pELEVBRUQ7QUFDSyxhQUFLLEVBQUMsR0FBRztBQUNULFlBQUksRUFBQyxZQUFZO0FBQ2pCLGNBQU0sRUFBQyxFQUFDLEdBQUcsRUFBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUMsaUJBQWlCLEVBQUM7T0FDeEQsQ0FFRCxDQUFDOztBQUlBLGFBQVE7OztRQU9OOztZQUFLLFNBQVMsRUFBQyxLQUFLO1VBRWxCO0FBQ0Usb0JBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQUFBQztBQUM5QixtQkFBTyxFQUFFLE9BQU8sQUFBQztBQUNqQixpQ0FBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDO0FBQzdELHlCQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUM7QUFDN0Msa0JBQU0sRUFBQyx5Q0FBeUM7QUFDaEQsZ0JBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQUFBQztBQUN0Qix1QkFBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxBQUFDOztZQUdsQztTQUVBO1FBQ047OztVQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7U0FBTTtPQUN6QyxDQUNOO0tBQ0g7OztTQXZHRyxHQUFHOzs7cUJBMEdNLEdBQUciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcblxyXG5pbXBvcnQgR29vZ2xlTWFwRHJhd0ZpbHRlciBmcm9tICdyZWFjdC1nb29nbGUtbWFwLWRyYXctZmlsdGVyJztcclxuXHJcbmNsYXNzIEFwcCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBkcmF3TW9kZTp0cnVlLFxyXG4gICAgICBhY3RpdmVNYXJrZXJzOiBbXSxcclxuICAgICBcclxuICAgIH07XHJcblxyXG5cclxuICB9XHJcbiAgb25NYXJrZXJDbGljayhtYXJrZXIsZSl7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgYWN0aXZlTWFya2VycyA6IFttYXJrZXJdXHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmVuZGVyTWFya2VySW5mbygpIHtcclxuXHRcdGlmICh0aGlzLnN0YXRlLmFjdGl2ZU1hcmtlcnMpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc3RhdGUuYWN0aXZlTWFya2Vycy5tYXAoKG1hcmtlcixpKT0+KFxyXG5cdFx0XHRcdDxkaXYga2V5PXtgbWFya2VyJHtpfWB9PlxyXG5cdFx0XHRcdFx0e21hcmtlci5sYWJlbH1cclxuXHRcdFx0XHRcdHttYXJrZXIuaW5mb31cclxuXHRcdFx0XHQ8L2Rpdj4pXHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuICBoYW5kbGVSZXR1cm5lZE1hcmtlcnMobWFya2Vycykge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIGFjdGl2ZU1hcmtlcnM6IG1hcmtlcnNcclxuICAgIH0pO1xyXG4gIH1cclxuICB0b2dnbGVEcmF3KCl7XHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgZHJhd01vZGU6IXRoaXMuc3RhdGUuZHJhd01vZGUgLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJhZGRyc3MgaW4gbWFwIGNvbXBvbmVudFwiK3RoaXMucHJvcHMucm9vZmFkZHJlc3MpXHJcblxyXG4gICAgY29uc3QgbWFya2VycyA9IFtcclxuICBcdFx0XHR7XHJcbiAgXHRcdFx0XHRpbmZvOictIE1hcmtlcjEnLFxyXG4gICAgICAgICAgbGFiZWw6J0EnLFxyXG4gIFx0XHRcdFx0dGl0bGU6J2hlbGxvJyxcclxuICBcdFx0XHRcdGxhdExuZzp7bG5nOjIuMTM4MTUzNDI2MzQ5MTYsbGF0OjQxLjM5NDg1NTcwNzk0fVxyXG4gIFx0XHRcdH0sXHJcblxyXG4gIFx0XHRcdHtcclxuICAgICAgICAgIGxhYmVsOidCJyxcclxuICBcdFx0XHRcdGluZm86Jy0gTWFya2VyMicsXHJcbiAgXHRcdFx0XHRsYXRMbmc6e2xuZzoyLjE1NzUyNjAxNjIzNTM1MTYsbGF0OiA0MS4zOTU4Njk4MDU0NDkyMX1cclxuICBcdFx0XHR9LFxyXG5cclxuICBcdFx0XHR7XHJcbiAgICAgICAgICBsYWJlbDonQycsXHJcbiAgXHRcdFx0XHRpbmZvOictIE1hcmtlciAzJyxcclxuICBcdFx0XHRcdGxhdExuZzp7bG5nOjIuMTYyMzMyNTM0NzkwMDM5ICxsYXQ6NDEuMzk3ODAxMzc1OTc4MjA0fVxyXG4gIFx0XHRcdH0sXHJcblxyXG4gIFx0XHRcdHtcclxuICAgICAgICAgIGxhYmVsOidEJyxcclxuICAgICAgICAgIGluZm86Jy0gTWFya2VyIDQnLFxyXG4gICAgICAgICAgbGF0TG5nOntsbmc6Mi4xNTQ4NjUyNjQ4OTI1NzggLGxhdDo0MS4zODU3NjAzMTY3NjI1M31cclxuICBcdFx0XHR9LFxyXG5cclxuICBcdFx0XHR7XHJcbiAgICAgICAgICBsYWJlbDonRScsXHJcbiAgICAgICAgICBpbmZvOictIE1hcmtlciA1JyxcclxuICAgICAgICAgIGxhdExuZzp7bG5nOjIuMTQyMDU2NDU3NTE5NTMgLGxhdDo0MS4zODM0NDE5OTU4ODA0NH1cclxuICBcdFx0XHR9LFxyXG5cclxuICBcdFx0XTtcclxuXHJcblxyXG5cclxuICAgICAgcmV0dXJuICg8ZGl2PlxyXG57XHJcbiAgXHJcbiAgXHJcbiAgLyp9XHJcbiAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMudG9nZ2xlRHJhdy5iaW5kKHRoaXMpfT5EcmF3IGFnYWluPC9idXR0b24+XHJcbiAgICAgICAgKi99XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJBcHBcIj5cclxuXHJcbiAgICAgICAgICA8R29vZ2xlTWFwRHJhd0ZpbHRlclxyXG4gICAgICAgICAgICBkcmF3TW9kZT17dGhpcy5zdGF0ZS5kcmF3TW9kZX1cclxuICAgICAgICAgICAgbWFya2Vycz17bWFya2Vyc31cclxuICAgICAgICAgICAgaGFuZGxlUmV0dXJuZWRNYXJrZXJzPXt0aGlzLmhhbmRsZVJldHVybmVkTWFya2Vycy5iaW5kKHRoaXMpfVxyXG4gICAgICAgICAgICBvbk1hcmtlckNsaWNrPXt0aGlzLm9uTWFya2VyQ2xpY2suYmluZCh0aGlzKX1cclxuICAgICAgICAgICAgYXBpS2V5PSdBSXphU3lBRFlXU2xDNHlFZWRKLTVsdlFiOVVGT1ZhTU11eDU0WmMnXHJcbiAgICAgICAgICAgIGFyZWE9e3RoaXMucHJvcHMuYXJlYX1cclxuICAgICAgICAgICAgcm9vZmFkZHJlc3M9e3RoaXMucHJvcHMucm9vZmFkZHJlc3N9XHJcbiAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGgxPnt0aGlzLnJlbmRlck1hcmtlckluZm8uYmluZCh0aGlzKSgpfTwvaDE+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcDtcclxuXHJcblxyXG5cclxuIl19
