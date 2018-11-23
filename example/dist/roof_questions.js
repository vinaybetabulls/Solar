require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var styles;

// drop area Component

var DropArea = (function (_React$Component) {
  _inherits(DropArea, _React$Component);

  function DropArea(props) {
    _classCallCheck(this, DropArea);

    _get(Object.getPrototypeOf(DropArea.prototype), 'constructor', this).call(this, props);

    this.state = {
      list: [{ id: 1, isDragging: false, left: 0, angle: 0 }]
    };
  }

  _createClass(DropArea, [{
    key: 'onDragOver',
    value: function onDragOver(e) {
      e.preventDefault();
      return false;
    }
  }, {
    key: 'onDrop',
    value: function onDrop(e) {
      var obj = JSON.parse(e.dataTransfer.getData('application/json'));
      var list = this.state.list;
      var index = this.state.list.findIndex(function (item) {
        return item.id === obj.id;
      });
      list[index].isDragging = false;
      list[index].left = e.clientX - obj.x;
      var val = Math.floor((e.clientX - obj.x) / 3);
      list[index].angle = Math.ceil(val / 5) * 5;
      if (list[index].angle > 90) {
        list[index].angle = 90;
      } else if (list[index].angle < 0) {
        list[index].angle = 0;
      }
      var newState = _extends(this.state, {
        list: list
      });
      this.setState(newState);
      e.preventDefault();
    }
  }, {
    key: 'scrollable',
    value: function scrollable(e) {
      var lists = this.state.list;
      var indexOne = this.state.list.findIndex(function (item) {
        return item.id === lists[0].id;
      });
      lists[indexOne].left = e.nativeEvent.offsetX;
      var value = Math.floor(e.nativeEvent.offsetX / 3);
      lists[indexOne].angle = Math.ceil(value / 5) * 5;
      if (lists[indexOne].angle > 90) {
        lists[indexOne].angle = 90;
      } else if (lists[indexOne].angle < 0) {
        lists[indexOne].angle = 0;
      }
      var clickedState = _extends(this.state, {
        list: lists
      });
      this.setState(clickedState);
    }
  }, {
    key: 'updateStateDragging',
    value: function updateStateDragging(id, isDragging) {
      var list = this.state.list;
      var index = this.state.list.findIndex(function (item) {
        return item.id === id;
      });
      list[index].isDragging = isDragging;
      var newState = _extends(this.state, {
        list: list
      });
      this.setState(newState);
    }
  }, {
    key: 'render',
    value: function render() {
      var items = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.state.list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          items.push(_react2['default'].createElement(Draggable, {
            ref: "node_" + item.id,
            key: item.id,
            id: item.id,
            left: item.left,
            width: item.width,
            angle: item.angle,
            isDragging: item.isDragging,
            updateStateDragging: this.updateStateDragging.bind(this),
            scrollable: this.scrollable.bind(this)
          }));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _react2['default'].createElement(
        'div',
        {
          className: 'drop-area',
          onDragOver: this.onDragOver.bind(this),
          onDrop: this.onDrop.bind(this) },
        items
      );
    }
  }]);

  return DropArea;
})(_react2['default'].Component);

;

// draggable Component

var Draggable = (function (_React$Component2) {
  _inherits(Draggable, _React$Component2);

  function Draggable() {
    _classCallCheck(this, Draggable);

    _get(Object.getPrototypeOf(Draggable.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Draggable, [{
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      var elm = document.elementFromPoint(e.clientX, e.clientY);
      if (elm.className !== 'resizer') {
        this.props.updateStateDragging(this.props.id, true);
      }
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp(e) {
      this.props.updateStateDragging(this.props.id, false);
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart(e) {
      var nodeStyle = this.refs.node.style;
      e.dataTransfer.setData('application/json', JSON.stringify({
        id: this.props.id,
        x: e.clientX - parseInt(nodeStyle.left)
      }));
    }
  }, {
    key: 'onDragEnd',
    value: function onDragEnd(e) {
      this.props.updateStateDragging(this.props.id, false);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.left > 269) {
        styles = {
          left: '269px',
          width: this.props.width
        };
      } else if (this.props.left < 0) {
        styles = {
          left: '0px',
          width: this.props.width
        };
      } else {
        styles = {
          left: this.props.left,
          width: this.props.width
        };
      }

      return _react2['default'].createElement(
        'div',
        { className: 'col-md-9 scroll', style: { textAlign: 'center', padding: '20px' } },
        _react2['default'].createElement(
          'div',
          { id: 'ratio' },
          _react2['default'].createElement('div', { id: 'ratio-center' }),
          _react2['default'].createElement('div', { id: 'ratio-left', className: 'rotate-left-' + this.props.angle }),
          _react2['default'].createElement('div', { id: 'ratio-right', className: 'rotate-right-' + this.props.angle })
        ),
        _react2['default'].createElement(
          'div',
          { id: 'ratio-value' },
          this.props.angle,
          '° '
        ),
        _react2['default'].createElement('input', { type: 'hidden', name: 'ratioValue', id: 'ratioValue', value: this.props.angle }),
        _react2['default'].createElement(
          'div',
          { id: 'ratio-slider', className: 'slider-chart ui-slider', onClick: this.props.scrollable },
          _react2['default'].createElement(
            'a',
            { style: { outline: 'none', border: 'none' } },
            _react2['default'].createElement('div', { ref: "node",
              draggable: this.props.isDragging,
              id: 'item_' + this.props.id,
              className: 'item unselectable ui-slider-handle ui-slider-handle-active',
              style: styles,
              onMouseDown: this.onMouseDown.bind(this),
              onMouseUp: this.onMouseUp.bind(this),
              onDragStart: this.onDragStart.bind(this),
              onDragEnd: this.onDragEnd.bind(this) })
          )
        )
      );
    }
  }]);

  return Draggable;
})(_react2['default'].Component);

;

exports['default'] = DropArea;
module.exports = exports['default'];

},{"react":undefined}],2:[function(require,module,exports){
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

var _componentsDragabbleComponent = require('./components/DragabbleComponent');

var _componentsDragabbleComponent2 = _interopRequireDefault(_componentsDragabbleComponent);

var lastId = 0;
var highletstyle = {
  fontSize: '15'
};
var highletstyle2 = {
  fontSize: '15'
};

var ColoredLine = function ColoredLine(_ref) {
  var color = _ref.color;
  return _react2['default'].createElement('hr', {
    style: {
      color: "#aaa",
      backgroundColor: "#aaa",
      height: 1,
      width: '66%'
    }
  });
};

var RoofQuestions = (function (_Component) {
  _inherits(RoofQuestions, _Component);

  function RoofQuestions(props) {
    _classCallCheck(this, RoofQuestions);

    _get(Object.getPrototypeOf(RoofQuestions.prototype), 'constructor', this).call(this, props);
    this.queval = props.queval.bind(this);
    this.dataSet = [{
      question: "Vilken typ av fastighet bor du i?",
      answers: ["Radhus", "Villa", "Fritidshus", "Bostadsrättsförening", "Lantbruk"]
    }, {
      question: "Hur många våningar är fastigheten?",
      answers: ["1 plan", "2 plan", "3 plan", "3+ plan"]
    }];

    this.state = { modalIsOpen: false, stepIndex: 1, selectedValue: '', selectedValueTwo: '', angle: 45, left: '135px', validationOne: false, validation: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickTwo = this.handleClickTwo.bind(this);
    this.validate = this.validate.bind(this);
    this.scrollable = this.scrollable.bind(this);
    this.selectedAnswers = [];
  }

  _createClass(RoofQuestions, [{
    key: 'handleClick',
    value: function handleClick(value, index, id) {
      var selectedValue = value;
      highletstyle = {
        fontWeight: 'bold',
        color: 'black',
        fontSize: '16px'
      };
      this.selectedAnswers.push(value);
      this.setState({ selectedValue: selectedValue, validationOne: false });
    }
  }, {
    key: 'handleClickTwo',
    value: function handleClickTwo(value2, index, id) {
      var selectedValue = value2;
      highletstyle2 = {
        fontWeight: 'bold',
        color: 'black',
        fontSize: '16px'
      };
      this.selectedAnswers.push(value2);
      this.setState({ selectedValueTwo: selectedValue, validation: false });
    }
  }, {
    key: 'validate',
    value: function validate() {
      if (!this.state.selectedValue) {
        this.setState({ validationOne: true });
      } else if (!this.state.selectedValueTwo) {
        this.setState({ validation: true });
      }
    }
  }, {
    key: 'scrollable',
    value: function scrollable(e) {
      if (e.nativeEvent.offsetX > 270) {
        this.setState({ left: '270px' });
        this.setState({ angle: 90 });
      } else {
        this.setState({ left: e.nativeEvent.offsetX });
        var val = Math.floor(e.nativeEvent.offsetX / 3);
        this.setState({ angle: Math.ceil(val / 5) * 5 });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'div',
          { className: 'container ' },
          _react2['default'].createElement(
            'h3',
            { className: 'roof_subhead' },
            _react2['default'].createElement(
              'button',
              { id: 'backbutton', onClick: this.props.back.bind(this, 2) },
              _react2['default'].createElement('i', { className: 'fa fa-arrow-left' })
            ),
            'Fastighetsinformation'
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'container col-sm-12 panding_no' },
          _react2['default'].createElement('div', { className: 'col-sm-2' }),
          _react2['default'].createElement(
            'div',
            { className: 'col-sm-10 panding_no', id: 'padding-b' },
            _react2['default'].createElement(
              'div',
              { className: 'col-sm-4 panding_no' },
              _react2['default'].createElement(QuizArea, { handleClick: this.handleClick, validation: this.state.validationOne, dataSet: this.dataSet[0], selected: this.state.selectedValue, style: highletstyle })
            ),
            _react2['default'].createElement(
              'div',
              { className: 'col-md-6' },
              _react2['default'].createElement('img', { style: {
                  position: 'absolute',
                  left: '12%',
                  width: '90%',
                  top: '50%'
                }, src: './img/floors.png' })
            )
          ),
          _react2['default'].createElement(ColoredLine, { color: 'black' }),
          _react2['default'].createElement('div', { className: 'col-sm-2' }),
          _react2['default'].createElement(
            'div',
            { className: 'col-sm-10 panding_no', id: 'padding-b' },
            _react2['default'].createElement(
              'div',
              { className: 'col-sm-4 panding_no' },
              _react2['default'].createElement(QuizArea, { handleClick: this.handleClickTwo, validation: this.state.validation, dataSet: this.dataSet[1], selected: this.state.selectedValueTwo, style: highletstyle2 })
            ),
            _react2['default'].createElement(
              'div',
              { className: 'col-md-6' },
              _react2['default'].createElement('img', { style: {
                  position: 'absolute',
                  left: '12%',
                  width: '90%',
                  top: '50%'
                }, src: './img/firsthouse.png' })
            )
          ),
          _react2['default'].createElement(ColoredLine, { color: 'black' }),
          _react2['default'].createElement('div', { className: 'col-sm-2' }),
          _react2['default'].createElement(
            'div',
            { className: 'col-sm-10 panding_no', id: 'navbar2' },
            _react2['default'].createElement(
              'div',
              { className: 'col-sm-12 panding_no' },
              _react2['default'].createElement(
                'div',
                { style: { padding: '15px 0 15px 0' } },
                _react2['default'].createElement(
                  'div',
                  null,
                  'Vilken är fastighetens ungefärliga taklutning'
                ),
                _react2['default'].createElement(
                  'div',
                  null,
                  ' ',
                  _react2['default'].createElement(
                    'span',
                    null,
                    '- Dra i reglaget för att ändra takets ungefärliga taklutning'
                  )
                )
              )
            ),
            _react2['default'].createElement(_componentsDragabbleComponent2['default'], null)
          ),
          _react2['default'].createElement(ColoredLine, { color: 'black' }),
          _react2['default'].createElement(
            'div',
            { className: 'col-md-12 estimate', style: { textAlign: 'center' } },
            this.state.selectedValue && this.state.selectedValueTwo ? _react2['default'].createElement(
              'button',
              { onClick: this.props.queval.bind(this, this.state.selectedValue, this.state.selectedValueTwo, this.state.angle), className: 'submit' },
              'Nästa'
            ) : _react2['default'].createElement(
              'button',
              { onClick: this.validate, className: 'submit' },
              'Nästa'
            )
          )
        )
      );
    }
  }]);

  return RoofQuestions;
})(_react.Component);

function Question(props) {
  var style = {
    color: 'black',
    fontSize: '17px',
    padding: '15px 0 15px 0'
  };
  return _react2['default'].createElement(
    'div',
    null,
    _react2['default'].createElement(
      'h1',
      { style: style },
      props.dataSet.question
    ),
    props.validation ? _react2['default'].createElement(
      'div',
      { style: {
          border: '1px solid #ed5565',
          backgroundColor: '#fcdfe2',
          color: '#ed5565',
          margin: '0.5em 0',
          padding: '0.5em' } },
      _react2['default'].createElement(
        'span',
        null,
        'Please select the answer'
      )
    ) : null
  );
}

function getNextHtmlFor() {
  lastId++;
  return '' + lastId;
}

function Answer(props) {
  var spanstyle = {
    fontSize: '15px'
  };
  return _react2['default'].createElement(
    'div',
    { className: 'roundEstimate', onClick: props.handleClick.bind(this, props.answer, props.choice, lastId) },
    _react2['default'].createElement('input', { type: 'checkbox', id: getNextHtmlFor(), name: 'radAnswer', value: props.answer,
      checked: props.answer == props.selected }),
    _react2['default'].createElement('label', { htmlFor: lastId }),
    props.answer == props.selected ? _react2['default'].createElement(
      'span',
      { style: props.style },
      props.answer
    ) : _react2['default'].createElement(
      'span',
      { style: spanstyle },
      props.answer
    )
  );
}

function AnswerList(props) {
  var answers = [];
  for (var i = 0; i < props.dataSet.answers.length; i++) {
    answers.push(_react2['default'].createElement(Answer, { key: i, choice: i, style: props.style, handleClick: props.handleClick, selected: props.selected, answer: props.dataSet.answers[i] }));
  }
  return _react2['default'].createElement(
    'div',
    null,
    answers
  );
}

function QuizArea(props) {
  return _react2['default'].createElement(
    'div',
    null,
    _react2['default'].createElement(Question, { dataSet: props.dataSet, validation: props.validation }),
    _react2['default'].createElement(AnswerList, { dataSet: props.dataSet, style: props.style, handleClick: props.handleClick, selected: props.selected })
  );
}

exports['default'] = RoofQuestions;
module.exports = exports['default'];
/* onClick={this.props.queval.bind(this, this.state.selectedValue, this.state.selectedValueTwo)} */

},{"./components/DragabbleComponent":1,"react":undefined}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9KeW90aGkvRGlnaXRha18yMDE4XzExXzA3KDEpL0Rvd25sb2FkIEZyb20gU2VydmVyL0RpZ2l0YWtfMjAxOF8xMV8xNC9leGFtcGxlL3NyYy9jb21wb25lbnRzL0RyYWdhYmJsZUNvbXBvbmVudC5qcyIsIkM6L0p5b3RoaS9EaWdpdGFrXzIwMThfMTFfMDcoMSkvRG93bmxvYWQgRnJvbSBTZXJ2ZXIvRGlnaXRha18yMDE4XzExXzE0L2V4YW1wbGUvc3JjL3Jvb2ZfcXVlc3Rpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ0FrQixPQUFPOzs7O0FBRXpCLElBQUksTUFBTSxDQUFDOzs7O0lBR0wsUUFBUTtZQUFSLFFBQVE7O0FBQ0QsV0FEUCxRQUFRLENBQ0EsS0FBSyxFQUFFOzBCQURmLFFBQVE7O0FBRVYsK0JBRkUsUUFBUSw2Q0FFSixLQUFLLEVBQUU7O0FBRWIsUUFBSSxDQUFDLEtBQUssR0FBRztBQUNYLFVBQUksRUFBRSxDQUNKLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUNoRDtLQUNGLENBQUM7R0FDSDs7ZUFURyxRQUFROztXQVVGLG9CQUFDLENBQUMsRUFBRTtBQUNaLE9BQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQixhQUFPLEtBQUssQ0FBQztLQUNkOzs7V0FFSyxnQkFBQyxDQUFDLEVBQUU7QUFDUixVQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztBQUNqRSxVQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztBQUMzQixVQUFJLEtBQUssR0FBRyxJQUFJ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QU8sQUFBQyxFQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVSxBQUFDLEdBQUU7SUFDakUsaUNBQUMsVUFBVSxJQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxBQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLEFBQUMsRUFBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVcsQUFBQyxFQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUSxBQUFDLEdBQUc7R0FDaEgsQ0FDUDtDQUNGOztxQkFHYyxhQUFhIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG52YXIgc3R5bGVzO1xyXG5cclxuLy8gZHJvcCBhcmVhIENvbXBvbmVudFxyXG5jbGFzcyBEcm9wQXJlYSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBsaXN0OiBbXHJcbiAgICAgICAgeyBpZDogMSwgaXNEcmFnZ2luZzogZmFsc2UsIGxlZnQ6IDAsIGFuZ2xlOiAwIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9O1xyXG4gIH1cclxuICBvbkRyYWdPdmVyKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIG9uRHJvcChlKSB7XHJcbiAgICB2YXIgb2JqID0gSlNPTi5wYXJzZShlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCdhcHBsaWNhdGlvbi9qc29uJykpO1xyXG4gICAgbGV0IGxpc3QgPSB0aGlzLnN0YXRlLmxpc3Q7XHJcbiAgICBsZXQgaW5kZXggPSB0aGlzLnN0YXRlLmxpc3QuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBvYmouaWQpO1xyXG4gICAgbGlzdFtpbmRleF0uaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgbGlzdFtpbmRleF0ubGVmdCA9IChlLmNsaWVudFggLSBvYmoueCk7XHJcbiAgICBsZXQgdmFsID0gTWF0aC5mbG9vcigoZS5jbGllbnRYIC0gb2JqLngpIC8gMyk7XHJcbiAgICBsaXN0W2luZGV4XS5hbmdsZSA9IChNYXRoLmNlaWwodmFsIC8gNSkgKiA1KTtcclxuICAgIGlmKGxpc3RbaW5kZXhdLmFuZ2xlID4gOTApIHtcclxuICAgICAgbGlzdFtpbmRleF0uYW5nbGUgPSA5MFxyXG4gICAgfSBlbHNlIGlmKGxpc3RbaW5kZXhdLmFuZ2xlIDwgMCkge1xyXG4gICAgICAgIGxpc3RbaW5kZXhdLmFuZ2xlID0gMFxyXG4gICAgICB9XHJcbiAgICBsZXQgbmV3U3RhdGUgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICB0aGlzLnN0YXRlLCB7XHJcbiAgICAgICAgbGlzdDogbGlzdFxyXG4gICAgICB9KTtcclxuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuICBzY3JvbGxhYmxlKGUpIHtcclxuICAgICAgbGV0IGxpc3RzID0gdGhpcy5zdGF0ZS5saXN0O1xyXG4gICAgICBsZXQgaW5kZXhPbmUgPSB0aGlzLnN0YXRlLmxpc3QuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBsaXN0c1swXS5pZCk7XHJcbiAgICAgIGxpc3RzW2luZGV4T25lXS5sZWZ0ID0gKGUubmF0aXZlRXZlbnQub2Zmc2V0WCk7XHJcbiAgICAgIGxldCB2YWx1ZSA9IE1hdGguZmxvb3IoKGUubmF0aXZlRXZlbnQub2Zmc2V0WCkgLyAzKTtcclxuICAgICAgbGlzdHNbaW5kZXhPbmVdLmFuZ2xlID0gKE1hdGguY2VpbCh2YWx1ZSAvIDUpICogNSk7XHJcbiAgICAgIGlmKGxpc3RzW2luZGV4T25lXS5hbmdsZSA+IDkwKSB7XHJcbiAgICAgICAgbGlzdHNbaW5kZXhPbmVdLmFuZ2xlID0gOTBcclxuICAgICAgfSBlbHNlIGlmKGxpc3RzW2luZGV4T25lXS5hbmdsZSA8IDApIHtcclxuICAgICAgICBsaXN0c1tpbmRleE9uZV0uYW5nbGUgPSAwXHJcbiAgICAgIH1cclxuICAgICAgbGV0IGNsaWNrZWRTdGF0ZSA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAgdGhpcy5zdGF0ZSwge1xyXG4gICAgICAgICAgbGlzdDogbGlzdHNcclxuICAgICAgICB9KTtcclxuICAgICAgdGhpcy5zZXRTdGF0ZShjbGlja2VkU3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlU3RhdGVEcmFnZ2luZyhpZCwgaXNEcmFnZ2luZykge1xyXG4gICAgbGV0IGxpc3QgPSB0aGlzLnN0YXRlLmxpc3Q7XHJcbiAgICBsZXQgaW5kZXggPSB0aGlzLnN0YXRlLmxpc3QuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBpZCk7XHJcbiAgICBsaXN0W2luZGV4XS5pc0RyYWdnaW5nID0gaXNEcmFnZ2luZztcclxuICAgIGxldCBuZXdTdGF0ZSA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIHRoaXMuc3RhdGUsIHtcclxuICAgICAgICBsaXN0OiBsaXN0XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBsZXQgaXRlbXMgPSBbXTtcclxuICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5zdGF0ZS5saXN0KSB7XHJcbiAgICAgIGl0ZW1zLnB1c2goXHJcbiAgICAgICAgPERyYWdnYWJsZVxyXG4gICAgICAgICAgcmVmPXtcIm5vZGVfXCIgKyBpdGVtLmlkfVxyXG4gICAgICAgICAga2V5PXtpdGVtLmlkfVxyXG4gICAgICAgICAgaWQ9e2l0ZW0uaWR9XHJcbiAgICAgICAgICBsZWZ0PXtpdGVtLmxlZnR9XHJcbiAgICAgICAgICB3aWR0aD17aXRlbS53aWR0aH1cclxuICAgICAgICAgIGFuZ2xlPXtpdGVtLmFuZ2xlfVxyXG4gICAgICAgICAgaXNEcmFnZ2luZz17aXRlbS5pc0RyYWdnaW5nfVxyXG4gICAgICAgICAgdXBkYXRlU3RhdGVEcmFnZ2luZz17dGhpcy51cGRhdGVTdGF0ZURyYWdnaW5nLmJpbmQodGhpcyl9XHJcbiAgICAgICAgICBzY3JvbGxhYmxlPXt0aGlzLnNjcm9sbGFibGUuYmluZCh0aGlzKX1cclxuICAgICAgICAvPlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImRyb3AtYXJlYVwiXHJcbiAgICAgICAgb25EcmFnT3Zlcj17dGhpcy5vbkRyYWdPdmVyLmJpbmQodGhpcyl9XHJcbiAgICAgICAgb25Ecm9wPXt0aGlzLm9uRHJvcC5iaW5kKHRoaXMpfSA+XHJcbiAgICAgICAge2l0ZW1zfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59O1xyXG5cclxuXHJcbi8vIGRyYWdnYWJsZSBDb21wb25lbnRcclxuY2xhc3MgRHJhZ2dhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgb25Nb3VzZURvd24oZSkge1xyXG4gICAgdmFyIGVsbSA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xyXG4gICAgaWYgKGVsbS5jbGFzc05hbWUgIT09ICdyZXNpemVyJykge1xyXG4gICAgICB0aGlzLnByb3BzLnVwZGF0ZVN0YXRlRHJhZ2dpbmcodGhpcy5wcm9wcy5pZCwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uTW91c2VVcChlKSB7XHJcbiAgICB0aGlzLnByb3BzLnVwZGF0ZVN0YXRlRHJhZ2dpbmcodGhpcy5wcm9wcy5pZCwgZmFsc2UpO1xyXG4gIH1cclxuICBvbkRyYWdTdGFydChlKSB7XHJcbiAgICBjb25zdCBub2RlU3R5bGUgPSB0aGlzLnJlZnMubm9kZS5zdHlsZTtcclxuICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ2FwcGxpY2F0aW9uL2pzb24nLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIGlkOiB0aGlzLnByb3BzLmlkLFxyXG4gICAgICB4OiBlLmNsaWVudFggLSBwYXJzZUludChub2RlU3R5bGUubGVmdCksXHJcbiAgICB9KSk7XHJcbiAgfVxyXG4gIG9uRHJhZ0VuZChlKSB7XHJcbiAgICB0aGlzLnByb3BzLnVwZGF0ZVN0YXRlRHJhZ2dpbmcodGhpcy5wcm9wcy5pZCwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMucHJvcHMubGVmdCA+IDI2OSkge1xyXG4gICAgICBzdHlsZXMgPSB7XHJcbiAgICAgICAgbGVmdDogJzI2OXB4JyxcclxuICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCxcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5sZWZ0IDwgMCkge1xyXG4gICAgICBzdHlsZXMgPSB7XHJcbiAgICAgICAgbGVmdDogJzBweCcsXHJcbiAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMud2lkdGgsXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdHlsZXMgPSB7XHJcbiAgICAgICAgbGVmdDogdGhpcy5wcm9wcy5sZWZ0LFxyXG4gICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTkgc2Nyb2xsXCIgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJywgcGFkZGluZzogJzIwcHgnIH19PlxyXG4gICAgICAgIDxkaXYgaWQ9XCJyYXRpb1wiID5cclxuICAgICAgICAgIDxkaXYgaWQ9XCJyYXRpby1jZW50ZXJcIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgaWQ9XCJyYXRpby1sZWZ0XCIgY2xhc3NOYW1lPXtgcm90YXRlLWxlZnQtJHt0aGlzLnByb3BzLmFuZ2xlfWB9PjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBpZD1cInJhdGlvLXJpZ2h0XCIgY2xhc3NOYW1lPXtgcm90YXRlLXJpZ2h0LSR7dGhpcy5wcm9wcy5hbmdsZX1gfT48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGlkPVwicmF0aW8tdmFsdWVcIj57dGhpcy5wcm9wcy5hbmdsZX3CsCA8L2Rpdj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJyYXRpb1ZhbHVlXCIgaWQ9XCJyYXRpb1ZhbHVlXCIgdmFsdWU9e3RoaXMucHJvcHMuYW5nbGV9IC8+XHJcbiAgICAgICAgPGRpdiBpZD1cInJhdGlvLXNsaWRlclwiIGNsYXNzTmFtZT1cInNsaWRlci1jaGFydCB1aS1zbGlkZXJcIiBvbkNsaWNrPXt0aGlzLnByb3BzLnNjcm9sbGFibGV9PlxyXG4gICAgICAgICAgPGEgc3R5bGU9e3sgb3V0bGluZTogJ25vbmUnLCBib3JkZXI6ICdub25lJyB9fT5cclxuICAgICAgICAgICAgPGRpdiByZWY9e1wibm9kZVwifVxyXG4gICAgICAgICAgICAgIGRyYWdnYWJsZT17dGhpcy5wcm9wcy5pc0RyYWdnaW5nfVxyXG4gICAgICAgICAgICAgIGlkPXsnaXRlbV8nICsgdGhpcy5wcm9wcy5pZH1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpdGVtIHVuc2VsZWN0YWJsZSB1aS1zbGlkZXItaGFuZGxlIHVpLXNsaWRlci1oYW5kbGUtYWN0aXZlXCJcclxuICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzfVxyXG4gICAgICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLm9uTW91c2VEb3duLmJpbmQodGhpcyl9XHJcbiAgICAgICAgICAgICAgb25Nb3VzZVVwPXt0aGlzLm9uTW91c2VVcC5iaW5kKHRoaXMpfVxyXG4gICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXt0aGlzLm9uRHJhZ1N0YXJ0LmJpbmQodGhpcyl9XHJcbiAgICAgICAgICAgICAgb25EcmFnRW5kPXt0aGlzLm9uRHJhZ0VuZC5iaW5kKHRoaXMpfT48L2Rpdj48L2E+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuXHJcblxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRHJvcEFyZWFcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IERyYWdhYmJsZUNvbXBvbmVudCBmcm9tICcuL2NvbXBvbmVudHMvRHJhZ2FiYmxlQ29tcG9uZW50J1xyXG5sZXQgbGFzdElkID0gMDtcclxudmFyIGhpZ2hsZXRzdHlsZSA9IHtcclxuICBmb250U2l6ZTogJzE1J1xyXG59XHJcbnZhciBoaWdobGV0c3R5bGUyID0ge1xyXG4gIGZvbnRTaXplOiAnMTUnXHJcbn07XHJcblxyXG5jb25zdCBDb2xvcmVkTGluZSA9ICh7IGNvbG9yIH0pID0+IChcclxuICA8aHJcclxuICAgIHN0eWxlPXt7XHJcbiAgICAgIGNvbG9yOiBcIiNhYWFcIixcclxuICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNhYWFcIixcclxuICAgICAgaGVpZ2h0OiAxLFxyXG4gICAgICB3aWR0aDogJzY2JSdcclxuICAgIH19XHJcbiAgLz5cclxuKTtcclxuXHJcbmNsYXNzIFJvb2ZRdWVzdGlvbnMgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcylcclxuICAgIHRoaXMucXVldmFsID0gcHJvcHMucXVldmFsLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmRhdGFTZXQgPSBbXHJcbiAgICAgIHtcclxuICAgICAgICBxdWVzdGlvbjogXCJWaWxrZW4gdHlwIGF2IGZhc3RpZ2hldCBib3IgZHUgaT9cIixcclxuICAgICAgICBhbnN3ZXJzOiBbXHJcbiAgICAgICAgICBcIlJhZGh1c1wiLFxyXG4gICAgICAgICAgXCJWaWxsYVwiLFxyXG4gICAgICAgICAgXCJGcml0aWRzaHVzXCIsXHJcbiAgICAgICAgICBcIkJvc3RhZHNyw6R0dHNmw7ZyZW5pbmdcIixcclxuICAgICAgICAgIFwiTGFudGJydWtcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHF1ZXN0aW9uOiBcIkh1ciBtw6VuZ2EgdsOlbmluZ2FyIMOkciBmYXN0aWdoZXRlbj9cIixcclxuICAgICAgICBhbnN3ZXJzOiBbXHJcbiAgICAgICAgICBcIjEgcGxhblwiLFxyXG4gICAgICAgICAgXCIyIHBsYW5cIixcclxuICAgICAgICAgIFwiMyBwbGFuXCIsXHJcbiAgICAgICAgICBcIjMrIHBsYW5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICB0aGlzLnN0YXRlID0geyBtb2RhbElzT3BlbjogZmFsc2UsIHN0ZXBJbmRleDogMSwgc2VsZWN0ZWRWYWx1ZTogJycsIHNlbGVjdGVkVmFsdWVUd286ICcnLCBhbmdsZTogNDUsIGxlZnQ6ICcxMzVweCcsIHZhbGlkYXRpb25PbmU6IGZhbHNlLCB2YWxpZGF0aW9uOiBmYWxzZSB9XHJcbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5oYW5kbGVDbGlja1R3byA9IHRoaXMuaGFuZGxlQ2xpY2tUd28uYmluZCh0aGlzKTtcclxuICAgIHRoaXMudmFsaWRhdGUgPSB0aGlzLnZhbGlkYXRlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnNjcm9sbGFibGUgPSB0aGlzLnNjcm9sbGFibGUuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRBbnN3ZXJzID0gW107XHJcbiAgfVxyXG5cclxuXHJcbiAgaGFuZGxlQ2xpY2sodmFsdWUsIGluZGV4LCBpZCkge1xyXG4gICAgbGV0IHNlbGVjdGVkVmFsdWUgPSB2YWx1ZTtcclxuICAgIGhpZ2hsZXRzdHlsZSA9IHtcclxuICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICBjb2xvcjogJ2JsYWNrJyxcclxuICAgICAgZm9udFNpemU6ICcxNnB4J1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZWxlY3RlZEFuc3dlcnMucHVzaCh2YWx1ZSk7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRWYWx1ZTogc2VsZWN0ZWRWYWx1ZSwgdmFsaWRhdGlvbk9uZTogZmFsc2UgfSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVDbGlja1R3byh2YWx1ZTIsIGluZGV4LCBpZCkge1xyXG4gICAgbGV0IHNlbGVjdGVkVmFsdWUgPSB2YWx1ZTI7XHJcbiAgICBoaWdobGV0c3R5bGUyID0ge1xyXG4gICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgIGNvbG9yOiAnYmxhY2snLFxyXG4gICAgICBmb250U2l6ZTogJzE2cHgnXHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbGVjdGVkQW5zd2Vycy5wdXNoKHZhbHVlMik7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRWYWx1ZVR3bzogc2VsZWN0ZWRWYWx1ZSwgIHZhbGlkYXRpb246IGZhbHNlIH0pO1xyXG4gIH1cclxuICB2YWxpZGF0ZSgpIHtcclxuICAgIGlmKCF0aGlzLnN0YXRlLnNlbGVjdGVkVmFsdWUpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbGlkYXRpb25PbmU6IHRydWUgfSk7XHJcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnN0YXRlLnNlbGVjdGVkVmFsdWVUd28pIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbGlkYXRpb246IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgfVxyXG4gIHNjcm9sbGFibGUoZSkge1xyXG4gICAgaWYgKGUubmF0aXZlRXZlbnQub2Zmc2V0WCA+IDI3MCkge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgbGVmdDogJzI3MHB4JyB9KTtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFuZ2xlOiA5MCB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxlZnQ6IGUubmF0aXZlRXZlbnQub2Zmc2V0WCB9KTtcclxuICAgICAgdmFyIHZhbCA9IE1hdGguZmxvb3IoZS5uYXRpdmVFdmVudC5vZmZzZXRYIC8gMyk7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBhbmdsZTogTWF0aC5jZWlsKHZhbCAvIDUpICogNSB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBcIj5cclxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJyb29mX3N1YmhlYWRcIj48YnV0dG9uIGlkPVwiYmFja2J1dHRvblwiIG9uQ2xpY2s9e3RoaXMucHJvcHMuYmFjay5iaW5kKHRoaXMsIDIpfT5cclxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtYXJyb3ctbGVmdFwiPjwvaT5cclxuICAgICAgICAgIDwvYnV0dG9uPkZhc3RpZ2hldHNpbmZvcm1hdGlvbjwvaDM+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgY29sLXNtLTEyIHBhbmRpbmdfbm9cIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTJcIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTEwIHBhbmRpbmdfbm9cIiBpZD1cInBhZGRpbmctYlwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS00IHBhbmRpbmdfbm9cIj5cclxuICAgICAgICAgICAgICA8UXVpekFyZWEgaGFuZGxlQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9IHZhbGlkYXRpb249e3RoaXMuc3RhdGUudmFsaWRhdGlvbk9uZX0gZGF0YVNldD17dGhpcy5kYXRhU2V0WzBdfSBzZWxlY3RlZD17dGhpcy5zdGF0ZS5zZWxlY3RlZFZhbHVlfSBzdHlsZT17aGlnaGxldHN0eWxlfSAvPlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTZcIj5cclxuICAgICAgICAgICAgICA8aW1nIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgIGxlZnQ6ICcxMiUnLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6ICc5MCUnLFxyXG4gICAgICAgICAgICAgICAgdG9wOiAnNTAlJ1xyXG4gICAgICAgICAgICAgIH19IHNyYz1cIi4vaW1nL2Zsb29ycy5wbmdcIiAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPENvbG9yZWRMaW5lIGNvbG9yPVwiYmxhY2tcIiAvPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMlwiPjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMTAgcGFuZGluZ19ub1wiIGlkPVwicGFkZGluZy1iXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTQgcGFuZGluZ19ub1wiPlxyXG4gICAgICAgICAgICAgIDxRdWl6QXJlYSBoYW5kbGVDbGljaz17dGhpcy5oYW5kbGVDbGlja1R3b30gdmFsaWRhdGlvbj17dGhpcy5zdGF0ZS52YWxpZGF0aW9ufSBkYXRhU2V0PXt0aGlzLmRhdGFTZXRbMV19IHNlbGVjdGVkPXt0aGlzLnN0YXRlLnNlbGVjdGVkVmFsdWVUd299IHN0eWxlPXtoaWdobGV0c3R5bGUyfSAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNlwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogJzEyJScsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogJzkwJScsXHJcbiAgICAgICAgICAgICAgICB0b3A6ICc1MCUnXHJcbiAgICAgICAgICAgICAgfX0gc3JjPVwiLi9pbWcvZmlyc3Rob3VzZS5wbmdcIiAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxDb2xvcmVkTGluZSBjb2xvcj1cImJsYWNrXCIgLz5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTJcIj48L2Rpdj5cclxuICAgICAgICAgIHsvKiBvbkNsaWNrPXt0aGlzLnByb3BzLnF1ZXZhbC5iaW5kKHRoaXMsIHRoaXMuc3RhdGUuc2VsZWN0ZWRWYWx1ZSwgdGhpcy5zdGF0ZS5zZWxlY3RlZFZhbHVlVHdvKX0gKi99XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMCBwYW5kaW5nX25vXCIgaWQ9XCJuYXZiYXIyXCIgPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMiBwYW5kaW5nX25vXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTVweCAwIDE1cHggMCcgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlZpbGtlbiDDpHIgZmFzdGlnaGV0ZW5zIHVuZ2Vmw6RybGlnYSB0YWtsdXRuaW5nPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PiA8c3Bhbj4tIERyYSBpIHJlZ2xhZ2V0IGbDtnIgYXR0IMOkbmRyYSB0YWtldHMgdW5nZWbDpHJsaWdhIHRha2x1dG5pbmc8L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8RHJhZ2FiYmxlQ29tcG9uZW50Lz5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxDb2xvcmVkTGluZSBjb2xvcj1cImJsYWNrXCIgLz5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEyIGVzdGltYXRlXCIgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fSA+XHJcbiAgICAgICAgICAgIHt0aGlzLnN0YXRlLnNlbGVjdGVkVmFsdWUgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZFZhbHVlVHdvID8gKFxyXG4gICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5wcm9wcy5xdWV2YWwuYmluZCh0aGlzLCB0aGlzLnN0YXRlLnNlbGVjdGVkVmFsdWUsIHRoaXMuc3RhdGUuc2VsZWN0ZWRWYWx1ZVR3bywgdGhpcy5zdGF0ZS5hbmdsZSl9IGNsYXNzTmFtZT1cInN1Ym1pdFwiID5Ow6RzdGE8L2J1dHRvbj5cclxuICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy52YWxpZGF0ZX0gY2xhc3NOYW1lPVwic3VibWl0XCIgPk7DpHN0YTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICl9XHJcblxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIFF1ZXN0aW9uKHByb3BzKSB7XHJcbiAgdmFyIHN0eWxlID0ge1xyXG4gICAgY29sb3I6ICdibGFjaycsXHJcbiAgICBmb250U2l6ZTogJzE3cHgnLFxyXG4gICAgcGFkZGluZzogJzE1cHggMCAxNXB4IDAnXHJcbiAgfVxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgPGgxIHN0eWxlPXtzdHlsZX0+e3Byb3BzLmRhdGFTZXQucXVlc3Rpb259PC9oMT5cclxuICAgIHtwcm9wcy52YWxpZGF0aW9uID8gKFxyXG4gICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2VkNTU2NScsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmY2RmZTInLFxyXG4gICAgICAgICAgICBjb2xvcjogJyNlZDU1NjUnLCBcclxuICAgICAgICAgICAgbWFyZ2luOiAnMC41ZW0gMCcsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwLjVlbSd9fT48c3Bhbj5QbGVhc2Ugc2VsZWN0IHRoZSBhbnN3ZXI8L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgXHJcbiAgICApIDogKG51bGwpfVxyXG4gIDwvZGl2PlxyXG4gIClcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0TmV4dEh0bWxGb3IoKSB7XHJcbiAgbGFzdElkKys7XHJcbiAgcmV0dXJuIGAke2xhc3RJZH1gO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gQW5zd2VyKHByb3BzKSB7XHJcbiAgdmFyIHNwYW5zdHlsZSA9IHtcclxuICAgIGZvbnRTaXplOiAnMTVweCdcclxuICB9XHJcbiAgcmV0dXJuIChcclxuXHJcblxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJyb3VuZEVzdGltYXRlXCIgb25DbGljaz17cHJvcHMuaGFuZGxlQ2xpY2suYmluZCh0aGlzLCBwcm9wcy5hbnN3ZXIsIHByb3BzLmNob2ljZSwgbGFzdElkKX0gPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9e2dldE5leHRIdG1sRm9yKCl9IG5hbWU9XCJyYWRBbnN3ZXJcIiB2YWx1ZT17cHJvcHMuYW5zd2VyfVxyXG4gICAgICAgIGNoZWNrZWQ9e3Byb3BzLmFuc3dlciA9PSBwcm9wcy5zZWxlY3RlZH0gLz5cclxuICAgICAgPGxhYmVsIGh0bWxGb3I9e2xhc3RJZH0gPjwvbGFiZWw+XHJcbiAgICAgIHsocHJvcHMuYW5zd2VyID09IHByb3BzLnNlbGVjdGVkKSA/IChcclxuICAgICAgICA8c3BhbiBzdHlsZT17cHJvcHMuc3R5bGV9Pntwcm9wcy5hbnN3ZXJ9PC9zcGFuPlxyXG4gICAgICApIDogKFxyXG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3NwYW5zdHlsZX0+e3Byb3BzLmFuc3dlcn08L3NwYW4+XHJcbiAgICAgICAgKVxyXG4gICAgICB9XHJcbiAgICA8L2Rpdj5cclxuXHJcblxyXG4gICk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBBbnN3ZXJMaXN0KHByb3BzKSB7XHJcbiAgdmFyIGFuc3dlcnMgPSBbXVxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMuZGF0YVNldC5hbnN3ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBhbnN3ZXJzLnB1c2goPEFuc3dlciBrZXk9e2l9IGNob2ljZT17aX0gc3R5bGU9e3Byb3BzLnN0eWxlfSBoYW5kbGVDbGljaz17cHJvcHMuaGFuZGxlQ2xpY2t9IHNlbGVjdGVkPXtwcm9wcy5zZWxlY3RlZH0gYW5zd2VyPXtwcm9wcy5kYXRhU2V0LmFuc3dlcnNbaV19IC8+KVxyXG4gIH1cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAge2Fuc3dlcnN9XHJcbiAgICA8L2Rpdj5cclxuICApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIFF1aXpBcmVhKHByb3BzKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIDxRdWVzdGlvbiBkYXRhU2V0PXtwcm9wcy5kYXRhU2V0fSB2YWxpZGF0aW9uPXtwcm9wcy52YWxpZGF0aW9ufS8+XHJcbiAgICAgIDxBbnN3ZXJMaXN0IGRhdGFTZXQ9e3Byb3BzLmRhdGFTZXR9IHN0eWxlPXtwcm9wcy5zdHlsZX0gaGFuZGxlQ2xpY2s9e3Byb3BzLmhhbmRsZUNsaWNrfSBzZWxlY3RlZD17cHJvcHMuc2VsZWN0ZWR9IC8+XHJcbiAgICA8L2Rpdj5cclxuICApXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBSb29mUXVlc3Rpb25zO1xyXG4iXX0=
