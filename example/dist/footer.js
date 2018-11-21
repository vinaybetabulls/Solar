require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/*
import mail1 from './img/mail1.png';
import phone1 from './img/phone1.png';
import location1 from './img/location1.png';
import facebook from './img/facebook.png';
import google from './img/google.png';
import printerst from './img/printerst.png';
import twitter from './img/twitter.png';
import youtube from './img/youtube.png';

import aboutus_banner from './img/aboutus-banner.jpg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';*/

var Footer = (function (_Component) {
  _inherits(Footer, _Component);

  function Footer() {
    _classCallCheck(this, Footer);

    _get(Object.getPrototypeOf(Footer.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Footer, [{
    key: "render",
    value: function render() {
      return _react2["default"].createElement(
        "div",
        null,
        _react2["default"].createElement(
          "section",
          null,
          _react2["default"].createElement(
            "div",
            { id: "helpus" },
            _react2["default"].createElement(
              "h2",
              { className: "text-center" },
              "Vill du prata med en riktig person?"
            ),
            _react2["default"].createElement(
              "div",
              { className: "row text-center troble_sec" },
              _react2["default"].createElement(
                "a",
                { id: "left-help-button", href: "tel:+0763949564" },
                _react2["default"].createElement("i", { className: "fa fa-phone", "aria-hidden": "true" }),
                "   Ring Digitak -  076-3949564"
              ),
              _react2["default"].createElement(
                "a",
                { id: "left-help-button", href: "mailto:info@digitak.se?" },
                "@ Maila oss - info@digitak.se "
              )
            )
          )
        ),
        _react2["default"].createElement(
          "div",
          { id: "bottomfoo" },
          _react2["default"].createElement(
            "span",
            null,
            "Copyright © 2018 Digitak.All rights reserved"
          )
        )
      );
    }
  }]);

  return Footer;
})(_react.Component);

exports["default"] = Footer;
module.exports = exports["default"];

},{"react":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9KeW90aGkvRGlnaXRha18yMDE4XzExXzA3KDEpL0Rvd25sb2FkIEZyb20gU2VydmVyL0RpZ2l0YWtfMjAxOF8xMV8xNC9leGFtcGxlL3NyYy9mb290ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ0FpQyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQmxDLE1BQU07WUFBTixNQUFNOztXQUFOLE1BQU07MEJBQU4sTUFBTTs7K0JBQU4sTUFBTTs7O2VBQU4sTUFBTTs7V0FDSixrQkFBRztBQUNQLGFBQ0U7OztRQUVFOzs7VUFDRTs7Y0FBSyxFQUFFLEVBQUMsUUFBUTtZQUVkOztnQkFBSSxTQUFTLEVBQUMsYUFBYTs7YUFBeUM7WUFFcEU7O2dCQUFLLFNBQVMsRUFBQyw0QkFBNEI7Y0FDekM7O2tCQUFHLEVBQUUsRUFBQyxrQkFBa0IsRUFBQyxJQUFJLEVBQUMsaUJBQWlCO2dCQUFDLHdDQUFHLFNBQVMsRUFBQyxhQUFhLEVBQUMsZUFBWSxNQUFNLEdBQUs7O2VBRzlFO2NBQUE7O2tCQUFHLEVBQUUsRUFBQyxrQkFBa0IsRUFBQyxJQUFJLEVBQUMseUJBQXlCOztlQUFtQzthQUFNO1dBQ2xIO1NBQ0U7UUFFVjs7WUFBSyxFQUFFLEVBQUMsV0FBVztVQUFDOzs7O1dBQThEO1NBQU07T0FFcEYsQ0FDTjtLQUNIOzs7U0F0QkcsTUFBTTs7O3FCQXlCRyxNQUFNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbi8qXHJcbmltcG9ydCBtYWlsMSBmcm9tICcuL2ltZy9tYWlsMS5wbmcnO1xyXG5pbXBvcnQgcGhvbmUxIGZyb20gJy4vaW1nL3Bob25lMS5wbmcnO1xyXG5pbXBvcnQgbG9jYXRpb24xIGZyb20gJy4vaW1nL2xvY2F0aW9uMS5wbmcnO1xyXG5pbXBvcnQgZmFjZWJvb2sgZnJvbSAnLi9pbWcvZmFjZWJvb2sucG5nJztcclxuaW1wb3J0IGdvb2dsZSBmcm9tICcuL2ltZy9nb29nbGUucG5nJztcclxuaW1wb3J0IHByaW50ZXJzdCBmcm9tICcuL2ltZy9wcmludGVyc3QucG5nJztcclxuaW1wb3J0IHR3aXR0ZXIgZnJvbSAnLi9pbWcvdHdpdHRlci5wbmcnO1xyXG5pbXBvcnQgeW91dHViZSBmcm9tICcuL2ltZy95b3V0dWJlLnBuZyc7XHJcblxyXG5pbXBvcnQgYWJvdXR1c19iYW5uZXIgZnJvbSAnLi9pbWcvYWJvdXR1cy1iYW5uZXIuanBnJztcclxuaW1wb3J0ICcuL0FwcC5jc3MnO1xyXG5pbXBvcnQgJy4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnOyovXHJcblxyXG5cclxuY2xhc3MgRm9vdGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG5cclxuICAgICAgICA8c2VjdGlvbiA+XHJcbiAgICAgICAgICA8ZGl2IGlkPVwiaGVscHVzXCI+XHJcblxyXG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5WaWxsIGR1IHByYXRhIG1lZCBlbiByaWt0aWcgcGVyc29uPzwvaDI+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyB0ZXh0LWNlbnRlciB0cm9ibGVfc2VjXCI+XHJcbiAgICAgICAgICAgICAgPGEgaWQ9XCJsZWZ0LWhlbHAtYnV0dG9uXCIgaHJlZj1cInRlbDorMDc2Mzk0OTU2NFwiPjxpIGNsYXNzTmFtZT1cImZhIGZhLXBob25lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiZuYnNwOyZuYnNwO1xyXG5cclxuXHJcbiAgIFJpbmcgRGlnaXRhayAtICAwNzYtMzk0OTU2NDwvYT48YSBpZD1cImxlZnQtaGVscC1idXR0b25cIiBocmVmPVwibWFpbHRvOmluZm9AZGlnaXRhay5zZT9cIj5AIE1haWxhIG9zcyAtIGluZm9AZGlnaXRhay5zZSA8L2E+PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgICAgIDxkaXYgaWQ9XCJib3R0b21mb29cIj48c3Bhbj5Db3B5cmlnaHQgJmNvcHk7IDIwMTggRGlnaXRhay5BbGwgcmlnaHRzIHJlc2VydmVkPC9zcGFuPjwvZGl2PlxyXG5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRm9vdGVyOyJdfQ==
