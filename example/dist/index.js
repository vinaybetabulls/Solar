require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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

  function App() {
    _classCallCheck(this, App);

    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this);
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
            apiKey: 'AIzaSyADYWSlC4yEedJ-5lvQb9UFOVaMMux54Zc'
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

_reactDom2['default'].render(_react2['default'].createElement(App, null), document.getElementById('app'));
/*}
   <button onClick={this.toggleDraw.bind(this)}>Draw again</button>
       */

},{"react":undefined,"react-dom":undefined,"react-google-map-draw-filter":undefined}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _exampleJs = require('./example.js');

var _exampleJs2 = _interopRequireDefault(_exampleJs);

var RootComponent = (function (_Component) {
    _inherits(RootComponent, _Component);

    function RootComponent() {
        _classCallCheck(this, RootComponent);

        _get(Object.getPrototypeOf(RootComponent.prototype), 'constructor', this).call(this);
    }

    _createClass(RootComponent, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(_exampleJs2['default'], null)
            );
        }
    }]);

    return RootComponent;
})(_react.Component);

_reactDom2['default'].render(_react2['default'].createElement(_exampleJs2['default'], null), document.getElementById('app'));

},{"./example.js":1,"react":undefined,"react-dom":undefined}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9wYWN0aWNlb25tYXBzL3JlYWN0LWdvb2dsZS1tYXAtZHJhdy1maWx0ZXItbWFzdGVyL2V4YW1wbGUvc3JjL2V4YW1wbGUuanMiLCJDOi9wYWN0aWNlb25tYXBzL3JlYWN0LWdvb2dsZS1tYXAtZHJhdy1maWx0ZXItbWFzdGVyL2V4YW1wbGUvc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O3FCQ0FpQyxPQUFPOzs7O3dCQUNuQixXQUFXOzs7O3dDQUVBLDhCQUE4Qjs7OztJQUV4RCxHQUFHO1lBQUgsR0FBRzs7QUFDSyxXQURSLEdBQUcsR0FDUTswQkFEWCxHQUFHOztBQUVMLCtCQUZFLEdBQUcsNkNBRUc7QUFDUixRQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1gsY0FBUSxFQUFDLElBQUk7QUFDYixtQkFBYSxFQUFFLEVBQUU7S0FDbEIsQ0FBQztHQUNIOztlQVBHLEdBQUc7O1dBUU0sdUJBQUMsTUFBTSxFQUFDLENBQUMsRUFBQztBQUNyQixVQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1oscUJBQWEsRUFBRyxDQUFDLE1BQU0sQ0FBQztPQUN6QixDQUFDLENBQUM7S0FDSjs7O1dBQ2UsNEJBQUc7QUFDbkIsVUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRTtBQUM3QixlQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE1BQU0sRUFBQyxDQUFDO2lCQUM1Qzs7Y0FBSyxHQUFHLGFBQVcsQ0FBQyxBQUFHO1lBQ3JCLE1BQU0sQ0FBQyxLQUFLO1lBQ1osTUFBTSxDQUFDLElBQUk7V0FDUDtTQUFDLENBQ1AsQ0FBQztPQUNGO0tBQ0Q7OztXQUVxQiwrQkFBQyxPQUFPLEVBQUU7QUFDN0IsVUFBSSxDQUFDLFFBQVEsQ0FBQztBQUNaLHFCQUFhLEVBQUUsT0FBTztPQUN2QixDQUFDLENBQUM7S0FDSjs7O1dBQ1Msc0JBQUU7QUFDVixVQUFJLENBQUMsUUFBUSxDQUFDO0FBQ1osZ0JBQVEsRUFBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtPQUM5QixDQUFDLENBQUM7S0FDSjs7O1dBRUssa0JBQUc7QUFDUCxVQUFNLE9BQU8sR0FBRyxDQUNmO0FBQ0MsWUFBSSxFQUFDLFdBQVc7QUFDWixhQUFLLEVBQUMsR0FBRztBQUNiLGFBQUssRUFBQyxPQUFPO0FBQ2IsY0FBTSxFQUFDLEVBQUMsR0FBRyxFQUFDLGdCQUFnQixFQUFDLEdBQUcsRUFBQyxjQUFjLEVBQUM7T0FDaEQsRUFFRDtBQUNLLGFBQUssRUFBQyxHQUFHO0FBQ2IsWUFBSSxFQUFDLFdBQVc7QUFDaEIsY0FBTSxFQUFDLEVBQUMsR0FBRyxFQUFDLGtCQUFrQixFQUFDLEdBQUcsRUFBRSxpQkFBaUIsRUFBQztPQUN0RCxFQUVEO0FBQ0ssYUFBSyxFQUFDLEdBQUc7QUFDYixZQUFJLEVBQUMsWUFBWTtBQUNqQixjQUFNLEVBQUMsRUFBQyxHQUFHLEVBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFDLGtCQUFrQixFQUFDO09BQ3RELEVBRUQ7QUFDSyxhQUFLLEVBQUMsR0FBRztBQUNULFlBQUksRUFBQyxZQUFZO0FBQ2pCLGNBQU0sRUFBQyxFQUFDLEdBQUcsRUFBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUMsaUJBQWlCLEVBQUM7T0FDekQsRUFFRDtBQUNLLGFBQUssRUFBQyxHQUFHO0FBQ1QsWUFBSSxFQUFDLFlBQVk7QUFDakIsY0FBTSxFQUFDLEVBQUMsR0FBRyxFQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBQyxpQkFBaUIsRUFBQztPQUN4RCxDQUVELENBQUM7O0FBSUEsYUFBUTs7O1FBSU47O1lBQUssU0FBUyxFQUFDLEtBQUs7VUFFbEI7QUFDRSxvQkFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxBQUFDO0FBQzlCLG1CQUFPLEVBQUUsT0FBTyxBQUFDO0FBQ2pCLGlDQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUM7QUFDN0QseUJBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQztBQUM3QyxrQkFBTSxFQUFDLHlDQUF5QztZQUNoRDtTQUVFO1FBQ047OztVQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7U0FBTTtPQUN6QyxDQUNOO0tBQ0g7OztTQTFGRyxHQUFHOzs7QUE2RlQsc0JBQVMsTUFBTSxDQUFDLGlDQUFDLEdBQUcsT0FBRyxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ2xHeEIsT0FBTzs7Ozt3QkFDbkIsV0FBVzs7Ozt5QkFDaEIsY0FBYzs7OztJQUN4QixhQUFhO2NBQWIsYUFBYTs7QUFFSixhQUZULGFBQWEsR0FHZjs4QkFIRSxhQUFhOztBQUlYLG1DQUpGLGFBQWEsNkNBSUg7S0FDWDs7aUJBTEMsYUFBYTs7ZUFNVCxrQkFDTjtBQUNKLG1CQUFPOzs7Z0JBRVAsOERBQU07YUFFQSxDQUFDO1NBQ0Y7OztXQWJDLGFBQWE7OztBQWVuQixzQkFBUyxNQUFNLENBQUMsOERBQU8sRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuXG5pbXBvcnQgR29vZ2xlTWFwRHJhd0ZpbHRlciBmcm9tICdyZWFjdC1nb29nbGUtbWFwLWRyYXctZmlsdGVyJztcblxuY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGRyYXdNb2RlOnRydWUsXG4gICAgICBhY3RpdmVNYXJrZXJzOiBbXSxcbiAgICB9O1xuICB9XG4gIG9uTWFya2VyQ2xpY2sobWFya2VyLGUpe1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgYWN0aXZlTWFya2VycyA6IFttYXJrZXJdXG4gICAgfSk7XG4gIH1cbiAgcmVuZGVyTWFya2VySW5mbygpIHtcblx0XHRpZiAodGhpcy5zdGF0ZS5hY3RpdmVNYXJrZXJzKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5hY3RpdmVNYXJrZXJzLm1hcCgobWFya2VyLGkpPT4oXG5cdFx0XHRcdDxkaXYga2V5PXtgbWFya2VyJHtpfWB9PlxuXHRcdFx0XHRcdHttYXJrZXIubGFiZWx9XG5cdFx0XHRcdFx0e21hcmtlci5pbmZvfVxuXHRcdFx0XHQ8L2Rpdj4pXG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXG4gIGhhbmRsZVJldHVybmVkTWFya2VycyhtYXJrZXJzKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBhY3RpdmVNYXJrZXJzOiBtYXJrZXJzXG4gICAgfSk7XG4gIH1cbiAgdG9nZ2xlRHJhdygpe1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJhd01vZGU6IXRoaXMuc3RhdGUuZHJhd01vZGUgLFxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG1hcmtlcnMgPSBbXG4gIFx0XHRcdHtcbiAgXHRcdFx0XHRpbmZvOictIE1hcmtlcjEnLFxuICAgICAgICAgIGxhYmVsOidBJyxcbiAgXHRcdFx0XHR0aXRsZTonaGVsbG8nLFxuICBcdFx0XHRcdGxhdExuZzp7bG5nOjIuMTM4MTUzNDI2MzQ5MTYsbGF0OjQxLjM5NDg1NTcwNzk0fVxuICBcdFx0XHR9LFxuXG4gIFx0XHRcdHtcbiAgICAgICAgICBsYWJlbDonQicsXG4gIFx0XHRcdFx0aW5mbzonLSBNYXJrZXIyJyxcbiAgXHRcdFx0XHRsYXRMbmc6e2xuZzoyLjE1NzUyNjAxNjIzNTM1MTYsbGF0OiA0MS4zOTU4Njk4MDU0NDkyMX1cbiAgXHRcdFx0fSxcblxuICBcdFx0XHR7XG4gICAgICAgICAgbGFiZWw6J0MnLFxuICBcdFx0XHRcdGluZm86Jy0gTWFya2VyIDMnLFxuICBcdFx0XHRcdGxhdExuZzp7bG5nOjIuMTYyMzMyNTM0NzkwMDM5ICxsYXQ6NDEuMzk3ODAxMzc1OTc4MjA0fVxuICBcdFx0XHR9LFxuXG4gIFx0XHRcdHtcbiAgICAgICAgICBsYWJlbDonRCcsXG4gICAgICAgICAgaW5mbzonLSBNYXJrZXIgNCcsXG4gICAgICAgICAgbGF0TG5nOntsbmc6Mi4xNTQ4NjUyNjQ4OTI1NzggLGxhdDo0MS4zODU3NjAzMTY3NjI1M31cbiAgXHRcdFx0fSxcblxuICBcdFx0XHR7XG4gICAgICAgICAgbGFiZWw6J0UnLFxuICAgICAgICAgIGluZm86Jy0gTWFya2VyIDUnLFxuICAgICAgICAgIGxhdExuZzp7bG5nOjIuMTQyMDU2NDU3NTE5NTMgLGxhdDo0MS4zODM0NDE5OTU4ODA0NH1cbiAgXHRcdFx0fSxcblxuICBcdFx0XTtcblxuXG5cbiAgICAgIHJldHVybiAoPGRpdj5cbnsvKn1cbiAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMudG9nZ2xlRHJhdy5iaW5kKHRoaXMpfT5EcmF3IGFnYWluPC9idXR0b24+XG4gICAgICAgICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkFwcFwiPlxuXG4gICAgICAgICAgPEdvb2dsZU1hcERyYXdGaWx0ZXJcbiAgICAgICAgICAgIGRyYXdNb2RlPXt0aGlzLnN0YXRlLmRyYXdNb2RlfVxuICAgICAgICAgICAgbWFya2Vycz17bWFya2Vyc31cbiAgICAgICAgICAgIGhhbmRsZVJldHVybmVkTWFya2Vycz17dGhpcy5oYW5kbGVSZXR1cm5lZE1hcmtlcnMuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIG9uTWFya2VyQ2xpY2s9e3RoaXMub25NYXJrZXJDbGljay5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgYXBpS2V5PSdBSXphU3lBRFlXU2xDNHlFZWRKLTVsdlFiOVVGT1ZhTU11eDU0WmMnXG4gICAgICAgICAgLz5cblxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGgxPnt0aGlzLnJlbmRlck1hcmtlckluZm8uYmluZCh0aGlzKSgpfTwvaDE+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBBcHAgZnJvbSAnLi9leGFtcGxlLmpzJztcclxuY2xhc3MgUm9vdENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudFxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpXHJcbiAgICB7XHJcbnJldHVybig8ZGl2PlxyXG5cclxuPEFwcC8+XHJcblxyXG48L2Rpdj4pXHJcbiAgICB9XHJcbn1cclxuUmVhY3RET00ucmVuZGVyKDxBcHAgLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7XHJcbiJdfQ==
