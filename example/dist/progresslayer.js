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

var Progress = (function (_Component) {
    _inherits(Progress, _Component);

    function Progress(props) {
        _classCallCheck(this, Progress);

        _get(Object.getPrototypeOf(Progress.prototype), 'constructor', this).call(this, props);
        this.state = {
            stepIndex: 1,
            finished: false,
            clear: {},
            previous: {},
            next: {}
        };
    }

    _createClass(Progress, [{
        key: 'render',
        value: function render() {

            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'div',
                    { id: 'buttons' },
                    _react2['default'].createElement(
                        'button',
                        { id: 'delete-button', className: 'btn btn-info', style: this.state.clear },
                        'Clear'
                    ),
                    _react2['default'].createElement(
                        'button',
                        { onClick: this.props.handlePre, className: 'btn btn-info', style: this.state.previous },
                        'pre'
                    ),
                    _react2['default'].createElement(
                        'button',
                        { onClick: this.props.handleNext, disabled: this.state.finished, className: 'btn btn-info', style: this.state.next },
                        'next'
                    ),
                    this.state.stepIndex
                )
            );
        }
    }]);

    return Progress;
})(_react.Component);

exports['default'] = Progress;
module.exports = exports['default'];

},{"react":undefined,"react-dom":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9KeW90aGkvRGlnaXRha18yMDE4XzExXzA3KDEpL0Rvd25sb2FkIEZyb20gU2VydmVyL0RpZ2l0YWtfMjAxOF8xMV8xNC9leGFtcGxlL3NyYy9wcm9ncmVzc2xheWVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztxQkNBaUMsT0FBTzs7Ozt3QkFDbkIsV0FBVzs7OztJQUUxQixRQUFRO2NBQVIsUUFBUTs7QUFDQyxhQURULFFBQVEsQ0FDRSxLQUFLLEVBQUU7OEJBRGpCLFFBQVE7O0FBRU4sbUNBRkYsUUFBUSw2Q0FFQSxLQUFLLEVBQUU7QUFDYixZQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1QscUJBQVMsRUFBRSxDQUFDO0FBQ1osb0JBQVEsRUFBRSxLQUFLO0FBQ2YsaUJBQUssRUFBRSxFQUFFO0FBQ1Qsb0JBQVEsRUFBRSxFQUFFO0FBQ1osZ0JBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQTtLQUNKOztpQkFWQyxRQUFROztlQWlCSixrQkFBRzs7QUFHTCxtQkFBUTs7O2dCQUNKOztzQkFBSyxFQUFFLEVBQUMsU0FBUztvQkFDYjs7MEJBQVEsRUFBRSxFQUFDLGVBQWUsRUFBQyxTQUFTLEVBQUMsY0FBYyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQUFBQzs7cUJBQWdCO29CQUM1Rjs7MEJBQVEsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxBQUFDLEVBQUMsU0FBUyxFQUFDLGNBQWMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEFBQUM7O3FCQUFjO29CQUN6Rzs7MEJBQVEsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxBQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxBQUFDLEVBQUMsU0FBUyxFQUFDLGNBQWMsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEFBQUM7O3FCQUFnQjtvQkFHbkksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO2lCQUV0QjthQUNKLENBQUM7U0FDVjs7O1dBL0JDLFFBQVE7OztxQkFpQ0MsUUFBUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuXHJcbmNsYXNzIFByb2dyZXNzIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHN0ZXBJbmRleDogMSxcclxuICAgICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBjbGVhcjoge30sXHJcbiAgICAgICAgICAgIHByZXZpb3VzOiB7fSxcclxuICAgICAgICAgICAgbmV4dDoge31cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gIFxyXG4gICAgXHJcblxyXG5cclxuICAgXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gKDxkaXY+XHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJidXR0b25zXCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwiZGVsZXRlLWJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4taW5mb1wiIHN0eWxlPXt0aGlzLnN0YXRlLmNsZWFyfSA+Q2xlYXI8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5wcm9wcy5oYW5kbGVQcmV9IGNsYXNzTmFtZT1cImJ0biBidG4taW5mb1wiIHN0eWxlPXt0aGlzLnN0YXRlLnByZXZpb3VzfSA+cHJlPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMucHJvcHMuaGFuZGxlTmV4dH0gZGlzYWJsZWQ9e3RoaXMuc3RhdGUuZmluaXNoZWR9IGNsYXNzTmFtZT1cImJ0biBidG4taW5mb1wiIHN0eWxlPXt0aGlzLnN0YXRlLm5leHR9ICA+bmV4dDwvYnV0dG9uPlxyXG5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnN0ZXBJbmRleFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj4pXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgUHJvZ3Jlc3M7Il19
