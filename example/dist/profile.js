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

var Profile = (function (_Component) {
    _inherits(Profile, _Component);

    function Profile(props) {
        _classCallCheck(this, Profile);

        _get(Object.getPrototypeOf(Profile.prototype), "constructor", this).call(this, props);
        var userdata = "";
        var name = "";
        var Phone = "";
        var Email = "";
        if (localStorage.getItem("userdata") == "undefined" || localStorage.getItem("userdata") == undefined) {
            this.userdata = "";
        } else {

            this.userdata = JSON.parse(localStorage.getItem("userdata"));
            this.name = this.userdata.name;
            this.Phone = this.userdata.email;
            this.Email = this.userdata.phone;
        }
    }

    _createClass(Profile, [{
        key: "render",
        value: function render() {

            return _react2["default"].createElement(
                "div",
                { id: "profile" },
                _react2["default"].createElement(
                    "div",
                    { className: "container" },
                    _react2["default"].createElement(
                        "div",
                        { className: "col-sm-12" },
                        _react2["default"].createElement(
                            "div",
                            { id: "", hidden: true },
                            _react2["default"].createElement(
                                "table",
                                { className: "table" },
                                _react2["default"].createElement(
                                    "tbody",
                                    null,
                                    _react2["default"].createElement(
                                        "tr",
                                        null,
                                        _react2["default"].createElement(
                                            "td",
                                            null,
                                            "Name"
                                        ),
                                        _react2["default"].createElement(
                                            "td",
                                            null,
                                            " ",
                                            _react2["default"].createElement("input", { type: "text", className: "form-control", value: this.name, readOnly: true }),
                                            " "
                                        ),
                                        _react2["default"].createElement(
                                            "td",
                                            null,
                                            "Email"
                                        ),
                                        _react2["default"].createElement(
                                            "td",
                                            null,
                                            " ",
                                            _react2["default"].createElement("input", { type: "text", className: "form-control", value: this.Email, readOnly: true })
                                        )
                                    ),
                                    _react2["default"].createElement(
                                        "tr",
                                        null,
                                        _react2["default"].createElement(
                                            "td",
                                            null,
                                            "Phone"
                                        ),
                                        _react2["default"].createElement(
                                            "td",
                                            null,
                                            " ",
                                            _react2["default"].createElement("input", { type: "text", value: this.Phone, className: "form-control", readOnly: true }),
                                            " "
                                        ),
                                        _react2["default"].createElement("td", null),
                                        _react2["default"].createElement(
                                            "td",
                                            null,
                                            " ",
                                            _react2["default"].createElement(
                                                "button",
                                                { className: "btn btn-primary" },
                                                "Submit"
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2["default"].createElement(
                        "div",
                        { className: "col-sm-12" },
                        _react2["default"].createElement(
                            "div",
                            { id: "" },
                            _react2["default"].createElement(
                                "h2",
                                null,
                                _react2["default"].createElement(
                                    "b",
                                    null,
                                    this.props.address
                                )
                            ),
                            _react2["default"].createElement(
                                "h3",
                                { className: "text-center" },
                                _react2["default"].createElement(
                                    "b",
                                    null,
                                    "Your Roofing Estimation"
                                )
                            ),
                            _react2["default"].createElement(
                                "table",
                                { className: "table" },
                                _react2["default"].createElement(
                                    "thead",
                                    null,
                                    _react2["default"].createElement(
                                        "tr",
                                        null,
                                        _react2["default"].createElement(
                                            "th",
                                            null,
                                            "S.No"
                                        ),
                                        _react2["default"].createElement(
                                            "th",
                                            null,
                                            "Style"
                                        ),
                                        _react2["default"].createElement(
                                            "th",
                                            null,
                                            "Material"
                                        ),
                                        _react2["default"].createElement(
                                            "th",
                                            null,
                                            "Area"
                                        ),
                                        _react2["default"].createElement(
                                            "th",
                                            null,
                                            "Estimated Price"
                                        )
                                    )
                                ),
                                _react2["default"].createElement(Estimation, { data: this.userdata.estdet })
                            )
                        )
                    ),
                    _react2["default"].createElement("div", { className: "col-sm-12" })
                )
            );
        }
    }]);

    return Profile;
})(_react.Component);

var Estimation = (function (_Component2) {
    _inherits(Estimation, _Component2);

    function Estimation(props) {
        _classCallCheck(this, Estimation);

        _get(Object.getPrototypeOf(Estimation.prototype), "constructor", this).call(this, props);

        var resdata = props.data;
        console.log(props.data[0]);
    }

    _createClass(Estimation, [{
        key: "render",
        value: function render() {
            return _react2["default"].createElement(
                "tbody",
                null,
                this.props.data.map(function (value, key) {
                    return _react2["default"].createElement(
                        "tr",
                        { key: key },
                        _react2["default"].createElement(
                            "td",
                            null,
                            key + 1
                        ),
                        _react2["default"].createElement(
                            "td",
                            { key: key },
                            value.slope
                        ),
                        _react2["default"].createElement(
                            "td",
                            null,
                            value.material
                        ),
                        _react2["default"].createElement(
                            "td",
                            null,
                            value.area
                        ),
                        _react2["default"].createElement(
                            "td",
                            null,
                            value.estimatedamount
                        )
                    );
                })
            );
        }
    }]);

    return Estimation;
})(_react.Component);

exports["default"] = Profile;
module.exports = exports["default"];

},{"react":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9KeW90aGkvRGlnaXRha18yMDE4XzExXzA3KDEpL0Rvd25sb2FkIEZyb20gU2VydmVyL0RpZ2l0YWtfMjAxOF8xMV8xNC9leGFtcGxlL3NyYy9wcm9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztxQkNBaUMsT0FBTzs7OztJQUVsQyxPQUFPO2NBQVAsT0FBTzs7QUFDRSxhQURULE9BQU8sQ0FDRyxLQUFLLEVBQUU7OEJBRGpCLE9BQU87O0FBRUwsbUNBRkYsT0FBTyw2Q0FFQyxLQUFLLEVBQUM7QUFDWixZQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDbEIsWUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsWUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YsWUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YsWUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLFdBQVcsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLFNBQVMsRUFBRTtBQUNsRyxnQkFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUE7U0FHckIsTUFBTTs7QUFFSCxnQkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUM3RCxnQkFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztBQUMvQixnQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztBQUNqQyxnQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztTQUdwQztLQUNKOztpQkFwQkMsT0FBTzs7ZUFxQkgsa0JBQUc7O0FBRUwsbUJBQ0k7O2tCQUFL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b250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuXHJcbmNsYXNzIFByb2ZpbGUgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuICAgICAgICB2YXIgdXNlcmRhdGEgPSBcIlwiO1xyXG4gICAgICAgIHZhciBuYW1lID0gXCJcIjtcclxuICAgICAgICB2YXIgUGhvbmUgPSBcIlwiO1xyXG4gICAgICAgIHZhciBFbWFpbCA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlcmRhdGFcIikgPT0gXCJ1bmRlZmluZWRcIiB8fCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJkYXRhXCIpID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJkYXRhID0gXCJcIlxyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXNlcmRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlcmRhdGFcIikpO1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLnVzZXJkYXRhLm5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuUGhvbmUgPSB0aGlzLnVzZXJkYXRhLmVtYWlsO1xyXG4gICAgICAgICAgICB0aGlzLkVtYWlsID0gdGhpcy51c2VyZGF0YS5waG9uZTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBpZD1cInByb2ZpbGVcIj5cclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMTJcIiA+PGRpdiBpZD1cIlwiIGhpZGRlbj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPk5hbWU8L3RkPjx0ZD4gPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3RoaXMubmFtZX0gcmVhZE9ubHkgLz4gPC90ZD48dGQ+RW1haWw8L3RkPjx0ZD4gPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9e3RoaXMuRW1haWx9IHJlYWRPbmx5IC8+PC90ZD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5QaG9uZTwvdGQ+PHRkPiA8aW5wdXQgdHlwZT1cInRleHRcIiB2YWx1ZT17dGhpcy5QaG9uZX0gY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgcmVhZE9ubHkgLz4gPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjwvdGQ+PHRkPiA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiPlN1Ym1pdDwvYnV0dG9uPjwvdGQ+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMTJcIj48ZGl2IGlkPVwiXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMiA+PGI+e3RoaXMucHJvcHMuYWRkcmVzc308L2I+PC9oMj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+PGI+WW91ciBSb29maW5nIEVzdGltYXRpb248L2I+PC9oMz5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlXCI+PHRoZWFkPjx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD5TLk5vPC90aD48dGg+U3R5bGU8L3RoPjx0aD5NYXRlcmlhbDwvdGg+PHRoPkFyZWE8L3RoPjx0aD5Fc3RpbWF0ZWQgUHJpY2U8L3RoPjwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFc3RpbWF0aW9uIGRhdGE9e3RoaXMudXNlcmRhdGEuZXN0ZGV0fSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RhYmxlPlxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PjwvZGl2PlxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMTJcIj5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuXHJcblxyXG4gICAgICAgIClcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbmNsYXNzIEVzdGltYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcylcclxuXHJcbiAgICAgICAgdmFyIHJlc2RhdGEgPSBwcm9wcy5kYXRhO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHByb3BzLmRhdGFbMF0pO1xyXG5cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKDx0Ym9keT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5kYXRhLm1hcCgodmFsdWUsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoPHRyIGtleT17a2V5fT48dGQ+e2tleSArIDF9PC90ZD48dGQga2V5PXtrZXl9Pnt2YWx1ZS5zbG9wZX08L3RkPjx0ZD57dmFsdWUubWF0ZXJpYWx9PC90ZD48dGQ+e3ZhbHVlLmFyZWF9PC90ZD48dGQ+e3ZhbHVlLmVzdGltYXRlZGFtb3VudH08L3RkPjwvdHI+KVxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICA8L3Rib2R5PilcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlOyJdfQ==
