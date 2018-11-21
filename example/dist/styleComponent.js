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

var stylestyle = {
    padding: "30px 20px 20px 20px",
    margin: "5px 5px 50px 5px",
    border: "1px solid #f9f9f9",
    textAlign: "-webkit-center",
    borderRadius: "4px",
    boxShadow: "0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)",
    transition: "all 0.3s ease-out",
    WebkitTransform: "all 0.3s ease-out",
    minHeight: "190px"
};
var textstyle = {
    marginTop: 10,
    marginBottom: 10
};

var StyleComponent = (function (_Component) {
    _inherits(StyleComponent, _Component);

    function StyleComponent(props) {
        _classCallCheck(this, StyleComponent);

        _get(Object.getPrototypeOf(StyleComponent.prototype), 'constructor', this).call(this, props);
        this.state = {
            stepIndex: 1,
            finished: false,
            clear: {},
            previous: {},
            next: {}
        };

        this.styles = [{
            image: "./img/choose1.png",
            name: "Sadeltak",
            cost: 600
        }, {
            image: "./img/choose2.png",
            name: "Valmat tak",
            cost: 1000
        }, {
            image: "./img/choose4.png",
            name: "Brutet Tak​",
            cost: 1000
        }, {
            image: "./img/choose3.png",
            name: "Halvvalmat tak",
            cost: 820

        }, {
            image: "./img/pulpettak_style.jpg",
            name: "Pulpettak",
            cost: 600
        }];
    }

    _createClass(StyleComponent, [{
        key: 'stchoose',
        value: function stchoose(name) {
            alert(name);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            return _react2['default'].createElement(
                'div',
                { className: 'container mt-5' },
                _react2['default'].createElement(
                    'div',
                    { style: textstyle },
                    ' ',
                    _react2['default'].createElement(
                        'h3',
                        { className: 'roof_subhead' },
                        _react2['default'].createElement(
                            'button',
                            { id: 'backbutton', onClick: this.props.back.bind(this, 1) },
                            _react2['default'].createElement('i', { className: 'fa fa-arrow-left' })
                        ),
                        'Vilken design har ditt tak?'
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'row justify-content-center' },
                    _react2['default'].createElement('div', { className: 'col-sm-1' }),
                    this.styles.map(function (data, index) {
                        return _react2['default'].createElement(
                            'div',
                            { className: 'col-sm-2 ', key: index, onClick: _this.props.styval.bind(_this, data.name, data.cost) },
                            ' ',
                            _react2['default'].createElement(
                                'div',
                                { className: 'onfocs_brdr', style: stylestyle },
                                _react2['default'].createElement('img', { className: 'img-responsive', src: data.image }),
                                _react2['default'].createElement('br', null),
                                _react2['default'].createElement(
                                    'p',
                                    null,
                                    data.name
                                ),
                                ' '
                            )
                        );
                    })
                )
            );
        }
    }]);

    return StyleComponent;
})(_react.Component);

exports['default'] = StyleComponent;
module.exports = exports['default'];

},{"react":undefined,"react-dom":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9KeW90aGkvRGlnaXRha18yMDE4XzExXzA3KDEpL0Rvd25sb2FkIEZyb20gU2VydmVyL0RpZ2l0YWtfMjAxOF8xMV8xNC9leGFtcGxlL3NyYy9zdHlsZUNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDQWlDLE9BQU87Ozs7d0JBQ25CLFdBQVc7Ozs7QUFFaEMsSUFBTSxVQUFVLEdBQUc7QUFDZixXQUFPLEVBQUUscUJBQXFCO0FBQzlCLFVBQU0sRUFBRSxrQkFBa0I7QUFDMUIsVUFBTSxFQUFFLG1CQUFtQjtBQUMzQixhQUFTLEVBQUUsZ0JBQWdCO0FBQzNCLGdCQUFZLEVBQUUsS0FBSztBQUNuQixhQUFTLEVBQUUsMkRBQTJEO0FBQ3RFLGNBQVUsRUFBRSxtQkFBbUI7QUFDL0IsbUJBQWUsRUFBRSxtQkFBbUI7QUFDcEMsYUFBUyxFQUFDLE9BQU87Q0FDcEIsQ0FBQTtBQUNELElBQU0sU0FBUyxHQUFHO0FBQ2QsYUFBUyxFQUFFLEVBQUU7QUFDYixnQkFBWSxFQUFFLEVBQUU7Q0FDbkIsQ0FBQTs7SUFDSyxjQUFjO2NBQWQsY0FBYzs7QUFDTCxhQURULGNBQWMsQ0FDSixLQUFLLEVBQUU7OEJBRGpCLGNBQWM7O0FBRVosbUNBRkYsY0FBYyw2Q0FFTixLQUFLLEVBQUU7QUFDYixZQUFJLENBQUMsS0FBSyxHQUFHO0FBQ1QscUJBQVMsRUFBRSxDQUFDO0FBQ1osb0JBQVEsRUFBRSxLQUFLO0FBQ2YsaUJBQUssRUFBRSxFQUFFO0FBQ1Qsb0JBQVEsRUFBRSxFQUFFO0FBQ1osZ0JBQUksRUFBRSxFQUFFO1NBQ1gsQ0FBQTs7QUFHRCxZQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7QUFDWCxpQkFBSyxFQUFFLG1CQUFtQjtBQUMxQixnQkFBSSxFQUFFLFVBQVU7QUFDaEIsZ0JBQUksRUFBRSxHQUFHO1NBQ1osRUFDRDtBQUNJLGlCQUFLLEVBQUUsbUJBQW1CO0FBQzFCLGdCQUFJLEVBQUUsWUFBWTtBQUNsQixnQkFBSSxFQUFFLElBQUk7U0FDYixFQUVEO0FBQ0ksaUJBQUssRUFBRSxtQkFBbUI7QUFDMUIsZ0JBQUksRUFBRSxhQUFhO0FBQ25CLGdCQUFJLEVBQUUsSUFBSTtTQUNiLEVBQ0Q7QUFDSSxpQkFBSyxFQUFFLG1CQUFtQjtBQUMxQixnQkFBSSxFQUFFLGdCQUFnQjtBQUN0QixnQkFBSSxFQUFFLEdBQUc7O1NBRVosRUFBRTtBQUNDLGlCQUFLLEVBQUUsMkJBQTJCO0FBQ2xDLGdCQUFJLEVBQUUsV0FBVztBQUNqQixnQkFBSSxFQUFFLEdBQUc7U0FDWixDQUFDLENBQUE7S0FFTDs7aUJBdkNDLGNBQWM7O2VBMENSLGtCQUFDLElBQUksRUFBRTtBQUNYLGlCQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDZDs7O2VBQ0ssa0JBQUc7OztBQUdMLG1CQUNJOztrQkFBSyxTQUFTLEVBQUMsZ0JBQWdCO2dCQUUzQjs7c0JBQUssS0FBSyxFQUFFLFNBQVMsQUFBQzs7b0JBQUU7OzBCQUFJLFNBQVMsRUFBQyxjQUFjO3dCQUFDOzs4QkFBUSxFQUFFLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxBQUFDOzRCQUFDLHdDQUFHLFNBQVMsRUFBQyxrQkFBa0IsR0FBSzt5QkFFaEo7O3FCQUFnQztpQkFDbkM7Z0JBQ047O3NCQUFLLFNBQVMsRUFBQyw0QkFBNEI7b0JBQ3ZDLDBDQUFLLFNBQVMsRUFBQyxVQUFVLEdBQU87b0JBRzVCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUssRUFBSztBQUM3QiwrQkFBUTs7OEJBQUssU0FBUyxFQUFDLFdBQVcsRUFBQyxHQUFHLEVBQUUsS0FBSyxBQUFDLEVBQUMsT0FBTyxFQUFFLE1BQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFFBQU8sSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUM7OzRCQUFHOztrQ0FBSyxTQUFTLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBRSxVQUFVLEFBQUM7Z0NBQUksMENBQUssU0FBUyxFQUFDLGdCQUFnQixFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxBQUFDLEdBQUc7Z0NBQ2hOLDRDQUFNO2dDQUNOOzs7b0NBQUksSUFBSSxDQUFDLElBQUk7aUNBQUs7OzZCQUFPO3lCQUV2QixDQUNMO3FCQUNKLENBQUM7aUJBS0o7YUFBTSxDQUFDO1NBQ3hCOzs7V0F4RUMsY0FBYzs7O3FCQTBFTCxjQUFjIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5cclxuY29uc3Qgc3R5bGVzdHlsZSA9IHtcclxuICAgIHBhZGRpbmc6IFwiMzBweCAyMHB4IDIwcHggMjBweFwiLFxyXG4gICAgbWFyZ2luOiBcIjVweCA1cHggNTBweCA1cHhcIixcclxuICAgIGJvcmRlcjogXCIxcHggc29saWQgI2Y5ZjlmOVwiLFxyXG4gICAgdGV4dEFsaWduOiBcIi13ZWJraXQtY2VudGVyXCIsXHJcbiAgICBib3JkZXJSYWRpdXM6IFwiNHB4XCIsXHJcbiAgICBib3hTaGFkb3c6IFwiMCAxNXB4IDM1cHggcmdiYSg1MCw1MCw5MywuMSksIDAgNXB4IDE1cHggcmdiYSgwLDAsMCwuMDcpXCIsXHJcbiAgICB0cmFuc2l0aW9uOiBcImFsbCAwLjNzIGVhc2Utb3V0XCIsXHJcbiAgICBXZWJraXRUcmFuc2Zvcm06IFwiYWxsIDAuM3MgZWFzZS1vdXRcIixcclxuICAgIG1pbkhlaWdodDpcIjE5MHB4XCJcclxufVxyXG5jb25zdCB0ZXh0c3R5bGUgPSB7XHJcbiAgICBtYXJnaW5Ub3A6IDEwLFxyXG4gICAgbWFyZ2luQm90dG9tOiAxMCxcclxufVxyXG5jbGFzcyBTdHlsZUNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBzdGVwSW5kZXg6IDEsXHJcbiAgICAgICAgICAgIGZpbmlzaGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgY2xlYXI6IHt9LFxyXG4gICAgICAgICAgICBwcmV2aW91czoge30sXHJcbiAgICAgICAgICAgIG5leHQ6IHt9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5zdHlsZXMgPSBbe1xyXG4gICAgICAgICAgICBpbWFnZTogXCIuL2ltZy9jaG9vc2UxLnBuZ1wiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIlNhZGVsdGFrXCIsXHJcbiAgICAgICAgICAgIGNvc3Q6IDYwMFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbWFnZTogXCIuL2ltZy9jaG9vc2UyLnBuZ1wiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIlZhbG1hdCB0YWtcIixcclxuICAgICAgICAgICAgY29zdDogMTAwMFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW1hZ2U6IFwiLi9pbWcvY2hvb3NlNC5wbmdcIixcclxuICAgICAgICAgICAgbmFtZTogXCJCcnV0ZXQgVGFr4oCLXCIsXHJcbiAgICAgICAgICAgIGNvc3Q6IDEwMDBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW1hZ2U6IFwiLi9pbWcvY2hvb3NlMy5wbmdcIixcclxuICAgICAgICAgICAgbmFtZTogXCJIYWx2dmFsbWF0IHRha1wiLFxyXG4gICAgICAgICAgICBjb3N0OiA4MjAsXHJcblxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgaW1hZ2U6IFwiLi9pbWcvcHVscGV0dGFrX3N0eWxlLmpwZ1wiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIlB1bHBldHRha1wiLFxyXG4gICAgICAgICAgICBjb3N0OiA2MDBcclxuICAgICAgICB9XVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgc3RjaG9vc2UobmFtZSkge1xyXG4gICAgICAgIGFsZXJ0KG5hbWUpXHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBtdC01XCI+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17dGV4dHN0eWxlfT4gPGgzIGNsYXNzTmFtZT1cInJvb2Zfc3ViaGVhZFwiPjxidXR0b24gaWQ9XCJiYWNrYnV0dG9uXCIgb25DbGljaz17dGhpcy5wcm9wcy5iYWNrLmJpbmQodGhpcywgMSl9PjxpIGNsYXNzTmFtZT1cImZhIGZhLWFycm93LWxlZnRcIj48L2k+XHJcblxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+Vmlsa2VuIGRlc2lnbiBoYXIgZGl0dCB0YWs/PC9oMz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cganVzdGlmeS1jb250ZW50LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTFcIj48L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0eWxlcy5tYXAoKGRhdGEsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTIgXCIga2V5PXtpbmRleH0gb25DbGljaz17dGhpcy5wcm9wcy5zdHl2YWwuYmluZCh0aGlzLCBkYXRhLm5hbWUsIGRhdGEuY29zdCl9ID4gPGRpdiBjbGFzc05hbWU9XCJvbmZvY3NfYnJkclwiIHN0eWxlPXtzdHlsZXN0eWxlfSAgID48aW1nIGNsYXNzTmFtZT1cImltZy1yZXNwb25zaXZlXCIgc3JjPXtkYXRhLmltYWdlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiciAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPntkYXRhLm5hbWV9PC9wPiA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICA8L2Rpdj48L2Rpdj4pXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgU3R5bGVDb21wb25lbnQ7Il19
