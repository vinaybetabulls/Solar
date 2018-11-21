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

var LoginSignup = (function (_Component) {
    _inherits(LoginSignup, _Component);

    function LoginSignup() {
        _classCallCheck(this, LoginSignup);

        _get(Object.getPrototypeOf(LoginSignup.prototype), 'constructor', this).call(this);
        var url = 'http://localhost:8080/users/';

        fetch(url, {
            method: "post", data: JSON.stringify({ "name": "mahesh" })
        }).then(function (response) {
            if (!response) {
                throw new Error("Bad response from server");
            }
            return response.text();
        }).then(function (data) {});
    }

    _createClass(LoginSignup, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'div',
                null,
                'Hi'
            );
        }
    }]);

    return LoginSignup;
})(_react.Component);

exports['default'] = LoginSignup;
module.exports = exports['default'];

},{"react":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9KeW90aGkvRGlnaXRha18yMDE4XzExXzA3KDEpL0Rvd25sb2FkIEZyb20gU2VydmVyL0RpZ2l0YWtfMjAxOF8xMV8xNC9leGFtcGxlL3NyYy9nZXR1c2VyZGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDR2lDLE9BQU87Ozs7SUFDbEMsV0FBVztjQUFYLFdBQVc7O0FBRUYsYUFGVCxXQUFXLEdBR2I7OEJBSEUsV0FBVzs7QUFJVCxtQ0FKRixXQUFXLDZDQUlEO0FBQ2hCLFlBQUksR0FBRyxHQUFHLDhCQUE4QixDQUFBOztBQUV0QyxhQUFLLENBQUMsR0FBRyxFQUFDO0FBQ04sa0JBQU0sRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLENBQUM7U0FDdkQsQ0FBQyxDQUNELElBQUksQ0FBQyxVQUFTLFFBQVEsRUFBRTtBQUN2QixnQkFBSSxDQUFDLFFBQVEsRUFBRTtBQUNiLHNCQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7YUFDN0M7QUFDRCxtQkFBTyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDeEIsQ0FBQyxDQUNELElBQUksQ0FBQyxVQUFTLElBQUksRUFBRSxFQUNwQixDQUFDLENBQUM7S0FDSjs7aUJBbEJLLFdBQVc7O2VBbUJYLGtCQUNOO0FBQ0ksbUJBQU87Ozs7YUFBYSxDQUFDO1NBQ3hCOzs7V0F0QkssV0FBVzs7O3FCQXdCRixXQUFXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxyXG5cclxuXHJcbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmNsYXNzIExvZ2luU2lnbnVwIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxudmFyIHVybCA9ICdodHRwOi8vbG9jYWxob3N0OjgwODAvdXNlcnMvJ1xyXG5cclxuICBmZXRjaCh1cmwse1xyXG4gICAgICBtZXRob2Q6XCJwb3N0XCIsZGF0YTpKU09OLnN0cmluZ2lmeSh7XCJuYW1lXCI6XCJtYWhlc2hcIn0pXHJcbiAgfSlcclxuICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgaWYgKCFyZXNwb25zZSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgcmVzcG9uc2UgZnJvbSBzZXJ2ZXJcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xyXG4gIH0pXHJcbiAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xyXG4gIH0pO1xyXG59XHJcbnJlbmRlcigpXHJcbntcclxuICAgIHJldHVybig8ZGl2PkhpPC9kaXY+KVxyXG59XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgTG9naW5TaWdudXA7Il19
