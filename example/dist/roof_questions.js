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
    this.state = { stepIndex: 1, selectedValue: '', selectedValueTwo: '', angle: 45, left: '135px' };
    this.handleClick = this.handleClick.bind(this);

    this.handleClickTwo = this.handleClickTwo.bind(this);
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
      this.setState({ selectedValue: selectedValue });
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
      this.setState({ selectedValueTwo: selectedValue });
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
              _react2['default'].createElement(QuizArea, { handleClick: this.handleClick, dataSet: this.dataSet[0], selected: this.state.selectedValue, style: highletstyle })
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
              _react2['default'].createElement(QuizArea, { handleClick: this.handleClickTwo, dataSet: this.dataSet[1], selected: this.state.selectedValueTwo, style: highletstyle2 })
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
            _react2['default'].createElement(
              'div',
              { className: 'col-md-9 scroll', style: { textAlign: 'center', padding: '20px' } },
              _react2['default'].createElement(
                'div',
                { id: 'ratio' },
                _react2['default'].createElement('div', { id: 'ratio-center' }),
                _react2['default'].createElement('div', { id: 'ratio-left', className: 'rotate-left-' + this.state.angle }),
                _react2['default'].createElement('div', { id: 'ratio-right', className: 'rotate-right-' + this.state.angle })
              ),
              _react2['default'].createElement(
                'div',
                { id: 'ratio-value' },
                this.state.angle,
                '°'
              ),
              _react2['default'].createElement('input', { type: 'hidden', name: 'ratioValue', id: 'ratioValue', value: '35' }),
              _react2['default'].createElement(
                'div',
                { id: 'ratio-slider', className: 'slider-chart ui-slider', onClick: this.scrollable },
                _react2['default'].createElement(
                  'a',
                  { style: { outline: 'none', border: 'none' }, onClick: this.scrollable },
                  _react2['default'].createElement('div', { className: 'ui-slider-handle ui-slider-handle-active', style: { left: this.state.left } })
                )
              )
            )
          ),
          _react2['default'].createElement(ColoredLine, { color: 'black' }),
          _react2['default'].createElement(
            'div',
            { className: 'col-md-12 estimate', style: { textAlign: 'center' } },
            _react2['default'].createElement(
              'button',
              { onClick: this.props.queval.bind(this, this.state.selectedValue, this.state.selectedValueTwo, this.state.angle), className: 'submit' },
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
    'h1',
    { style: style },
    props.dataSet.question
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
    _react2['default'].createElement(Question, { dataSet: props.dataSet }),
    _react2['default'].createElement(AnswerList, { dataSet: props.dataSet, style: props.style, handleClick: props.handleClick, selected: props.selected })
  );
}

exports['default'] = RoofQuestions;
module.exports = exports['default'];
/* onClick={this.props.queval.bind(this, this.state.selectedValue, this.state.selectedValueTwo)} */

},{"react":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9KeW90aGkvRGlnaXRha18yMDE4XzExXzA3KDEpL0Rvd25sb2FkIEZyb20gU2VydmVyL0RpZ2l0YWtfMjAxOF8xMV8xNC9leGFtcGxlL3NyYy9yb29mX3F1ZXN0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDQWlDLE9BQU87Ozs7QUFDeEMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsSUFBSSxZQUFZLEdBQUc7QUFDakIsVUFBUSxFQUFFLElBQUk7Q0FDZixDQUFBO0FBQ0QsSUFBSSxhQUFhLEdBQUc7QUFDbEIsVUFBUSxFQUFFLElBQUk7Q0FDZixDQUFDOztBQUVGLElBQU0sV0FBVyxHQUFHLFNBQWQsV0FBVyxDQUFJLElBQVM7TUFBUCxLQUFLLEdBQVAsSUFBUyxDQUFQLEtBQUs7U0FDMUI7QUFDRSxTQUFLLEVBQUU7QUFDTCxXQUFLLEVBQUUsTUFBTTtBQUNiLHFCQUFlLEVBQUUsTUFBTTtBQUN2QixZQUFNLEVBQUUsQ0FBQztBQUNULFdBQUssRUFBRSxLQUFLO0tBQ2IsQUFBQztJQUNGO0NBQ0gsQ0FBQzs7SUFHSSxhQUFhO1lBQWIsYUFBYTs7QUFDTixXQURQLGFBQWEsQ0FDTCxLQUFLLEVBQUU7MEJBRGYsYUFBYTs7QUFFZiwrQkFGRSxhQUFhLDZDQUVULEtBQUssRUFBQztBQUNaLFFBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEMsUUFBSSxDQUFDLE9BQU8sR0FBRyxDQUNiO0FBQ0UsY0FBUSxFQUFFLG1DQUFtQztBQUM3QyxhQUFPLEVBQUUsQ0FDUCxRQUFRLEVBQ1IsT0FBTyxFQUNQLFlBQVksRUFDWixzQkFBc0IsRUFDdEIsVUFBVSxDQUNYO0tBQ0YsRUFDRDtBQUNFLGNBQVEsRUFBRSxvQ0FBb0M7QUFDOUMsYUFBTyxFQUFF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QUFDLFdBQVcsQUFBQyxFQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUSxBQUFDLEVBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxBQUFDLEdBQUcsQ0FBQyxDQUFBO0dBQzVKO0FBQ0QsU0FDRTs7O0lBQ0csT0FBTztHQUNKLENBQ1A7Q0FDRjs7QUFFRCxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUU7QUFDdkIsU0FDRTs7O0lBQ0UsaUNBQUMsUUFBUSxJQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxBQUFDLEdBQUc7SUFDcEMsaUNBQUMsVUFBVSxJQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxBQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLEFBQUMsRUFBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVcsQUFBQyxFQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUSxBQUFDLEdBQUc7R0FDaEgsQ0FDUDtDQUNGOztxQkFHYyxhQUFhIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmxldCBsYXN0SWQgPSAwO1xyXG52YXIgaGlnaGxldHN0eWxlID0ge1xyXG4gIGZvbnRTaXplOiAnMTUnXHJcbn1cclxudmFyIGhpZ2hsZXRzdHlsZTIgPSB7XHJcbiAgZm9udFNpemU6ICcxNSdcclxufTtcclxuXHJcbmNvbnN0IENvbG9yZWRMaW5lID0gKHsgY29sb3IgfSkgPT4gKFxyXG4gIDxoclxyXG4gICAgc3R5bGU9e3tcclxuICAgICAgY29sb3I6IFwiI2FhYVwiLFxyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI2FhYVwiLFxyXG4gICAgICBoZWlnaHQ6IDEsXHJcbiAgICAgIHdpZHRoOiAnNjYlJ1xyXG4gICAgfX1cclxuICAvPlxyXG4pO1xyXG5cclxuXHJcbmNsYXNzIFJvb2ZRdWVzdGlvbnMgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcylcclxuICAgIHRoaXMucXVldmFsID0gcHJvcHMucXVldmFsLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmRhdGFTZXQgPSBbXHJcbiAgICAgIHtcclxuICAgICAgICBxdWVzdGlvbjogXCJWaWxrZW4gdHlwIGF2IGZhc3RpZ2hldCBib3IgZHUgaT9cIixcclxuICAgICAgICBhbnN3ZXJzOiBbXHJcbiAgICAgICAgICBcIlJhZGh1c1wiLFxyXG4gICAgICAgICAgXCJWaWxsYVwiLFxyXG4gICAgICAgICAgXCJGcml0aWRzaHVzXCIsXHJcbiAgICAgICAgICBcIkJvc3RhZHNyw6R0dHNmw7ZyZW5pbmdcIixcclxuICAgICAgICAgIFwiTGFudGJydWtcIlxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHF1ZXN0aW9uOiBcIkh1ciBtw6VuZ2EgdsOlbmluZ2FyIMOkciBmYXN0aWdoZXRlbj9cIixcclxuICAgICAgICBhbnN3ZXJzOiBbXHJcbiAgICAgICAgICBcIjEgcGxhblwiLFxyXG4gICAgICAgICAgXCIyIHBsYW5cIixcclxuICAgICAgICAgIFwiMyBwbGFuXCIsXHJcbiAgICAgICAgICBcIjMrIHBsYW5cIlxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgXTtcclxuICAgIHRoaXMuc3RhdGUgPSB7IHN0ZXBJbmRleDogMSwgc2VsZWN0ZWRWYWx1ZTogJycsIHNlbGVjdGVkVmFsdWVUd286ICcnLCBhbmdsZTogNDUsIGxlZnQ6ICcxMzVweCcgfVxyXG4gICAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2xpY2suYmluZCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmhhbmRsZUNsaWNrVHdvID0gdGhpcy5oYW5kbGVDbGlja1R3by5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5zY3JvbGxhYmxlID0gdGhpcy5zY3JvbGxhYmxlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLnNlbGVjdGVkQW5zd2VycyA9IFtdO1xyXG4gIH1cclxuXHJcblxyXG4gIGhhbmRsZUNsaWNrKHZhbHVlLCBpbmRleCwgaWQpIHtcclxuICAgIGxldCBzZWxlY3RlZFZhbHVlID0gdmFsdWU7XHJcbiAgICBoaWdobGV0c3R5bGUgPSB7XHJcbiAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgY29sb3I6ICdibGFjaycsXHJcbiAgICAgIGZvbnRTaXplOiAnMTZweCdcclxuICAgIH1cclxuICAgIHRoaXMuc2VsZWN0ZWRBbnN3ZXJzLnB1c2godmFsdWUpO1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNlbGVjdGVkVmFsdWU6IHNlbGVjdGVkVmFsdWUgfSk7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVDbGlja1R3byh2YWx1ZTIsIGluZGV4LCBpZCkge1xyXG4gICAgbGV0IHNlbGVjdGVkVmFsdWUgPSB2YWx1ZTI7XHJcbiAgICBoaWdobGV0c3R5bGUyID0ge1xyXG4gICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgIGNvbG9yOiAnYmxhY2snLFxyXG4gICAgICBmb250U2l6ZTogJzE2cHgnXHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbGVjdGVkQW5zd2Vycy5wdXNoKHZhbHVlMik7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VsZWN0ZWRWYWx1ZVR3bzogc2VsZWN0ZWRWYWx1ZSB9KTtcclxuICB9XHJcblxyXG4gIHNjcm9sbGFibGUoZSkge1xyXG4gICAgaWYgKGUubmF0aXZlRXZlbnQub2Zmc2V0WCA+IDI3MCkge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgbGVmdDogJzI3MHB4JyB9KTtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFuZ2xlOiA5MCB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxlZnQ6IGUubmF0aXZlRXZlbnQub2Zmc2V0WCB9KTtcclxuICAgICAgdmFyIHZhbCA9IE1hdGguZmxvb3IoZS5uYXRpdmVFdmVudC5vZmZzZXRYIC8gMyk7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBhbmdsZTogTWF0aC5jZWlsKHZhbCAvIDUpICogNSB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgXHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250YWluZXIgXCI+XHJcbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwicm9vZl9zdWJoZWFkXCI+PGJ1dHRvbiBpZD1cImJhY2tidXR0b25cIiBvbkNsaWNrPXt0aGlzLnByb3BzLmJhY2suYmluZCh0aGlzLCAyKX0+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWFycm93LWxlZnRcIj48L2k+XHJcbiAgICAgICAgICA8L2J1dHRvbj5GYXN0aWdoZXRzaW5mb3JtYXRpb248L2gzPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIGNvbC1zbS0xMiBwYW5kaW5nX25vXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0yXCI+PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMCBwYW5kaW5nX25vXCIgaWQ9XCJwYWRkaW5nLWJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNCBwYW5kaW5nX25vXCI+XHJcbiAgICAgICAgICAgICAgPFF1aXpBcmVhIGhhbmRsZUNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSBkYXRhU2V0PXt0aGlzLmRhdGFTZXRbMF19IHNlbGVjdGVkPXt0aGlzLnN0YXRlLnNlbGVjdGVkVmFsdWV9IHN0eWxlPXtoaWdobGV0c3R5bGV9IC8+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNlwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogJzEyJScsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogJzkwJScsXHJcbiAgICAgICAgICAgICAgICB0b3A6ICc1MCUnXHJcbiAgICAgICAgICAgICAgfX0gc3JjPVwiLi9pbWcvZmxvb3JzLnBuZ1wiIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8Q29sb3JlZExpbmUgY29sb3I9XCJibGFja1wiIC8+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0yXCI+PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMCBwYW5kaW5nX25vXCIgaWQ9XCJwYWRkaW5nLWJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNCBwYW5kaW5nX25vXCI+XHJcbiAgICAgICAgICAgICAgPFF1aXpBcmVhIGhhbmRsZUNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrVHdvfSBkYXRhU2V0PXt0aGlzLmRhdGFTZXRbMV19IHNlbGVjdGVkPXt0aGlzLnN0YXRlLnNlbGVjdGVkVmFsdWVUd299IHN0eWxlPXtoaWdobGV0c3R5bGUyfSAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNlwiPlxyXG4gICAgICAgICAgICAgIDxpbWcgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogJzEyJScsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogJzkwJScsXHJcbiAgICAgICAgICAgICAgICB0b3A6ICc1MCUnXHJcbiAgICAgICAgICAgICAgfX0gc3JjPVwiLi9pbWcvZmlyc3Rob3VzZS5wbmdcIiAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxDb2xvcmVkTGluZSBjb2xvcj1cImJsYWNrXCIgLz5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTJcIj48L2Rpdj5cclxuICAgICAgICAgIHsvKiBvbkNsaWNrPXt0aGlzLnByb3BzLnF1ZXZhbC5iaW5kKHRoaXMsIHRoaXMuc3RhdGUuc2VsZWN0ZWRWYWx1ZSwgdGhpcy5zdGF0ZS5zZWxlY3RlZFZhbHVlVHdvKX0gKi99XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMCBwYW5kaW5nX25vXCIgaWQ9XCJuYXZiYXIyXCIgPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xMiBwYW5kaW5nX25vXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMTVweCAwIDE1cHggMCcgfX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlZpbGtlbiDDpHIgZmFzdGlnaGV0ZW5zIHVuZ2Vmw6RybGlnYSB0YWtsdXRuaW5nPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PiA8c3Bhbj4tIERyYSBpIHJlZ2xhZ2V0IGbDtnIgYXR0IMOkbmRyYSB0YWtldHMgdW5nZWbDpHJsaWdhIHRha2x1dG5pbmc8L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC05IHNjcm9sbFwiIHN0eWxlPXt7IHRleHRBbGlnbjogJ2NlbnRlcicsIHBhZGRpbmc6ICcyMHB4JyB9fT5cclxuICAgICAgICAgICAgICA8ZGl2IGlkPVwicmF0aW9cIiA+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicmF0aW8tY2VudGVyXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwicmF0aW8tbGVmdFwiIGNsYXNzTmFtZT17YHJvdGF0ZS1sZWZ0LSR7dGhpcy5zdGF0ZS5hbmdsZX1gfT48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJyYXRpby1yaWdodFwiIGNsYXNzTmFtZT17YHJvdGF0ZS1yaWdodC0ke3RoaXMuc3RhdGUuYW5nbGV9YH0+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBpZD1cInJhdGlvLXZhbHVlXCI+e3RoaXMuc3RhdGUuYW5nbGV9wrA8L2Rpdj5cclxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJyYXRpb1ZhbHVlXCIgaWQ9XCJyYXRpb1ZhbHVlXCIgdmFsdWU9XCIzNVwiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBpZD1cInJhdGlvLXNsaWRlclwiIGNsYXNzTmFtZT1cInNsaWRlci1jaGFydCB1aS1zbGlkZXJcIiBvbkNsaWNrPXt0aGlzLnNjcm9sbGFibGV9PlxyXG4gICAgICAgICAgICAgICAgPGEgc3R5bGU9e3sgb3V0bGluZTogJ25vbmUnLCBib3JkZXI6ICdub25lJyB9fSBvbkNsaWNrPXt0aGlzLnNjcm9sbGFibGV9PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInVpLXNsaWRlci1oYW5kbGUgdWktc2xpZGVyLWhhbmRsZS1hY3RpdmVcIiBzdHlsZT17eyBsZWZ0OiB0aGlzLnN0YXRlLmxlZnQgfX0+PC9kaXY+PC9hPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxDb2xvcmVkTGluZSBjb2xvcj1cImJsYWNrXCIgLz5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEyIGVzdGltYXRlXCIgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cclxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLnByb3BzLnF1ZXZhbC5iaW5kKHRoaXMsIHRoaXMuc3RhdGUuc2VsZWN0ZWRWYWx1ZSwgdGhpcy5zdGF0ZS5zZWxlY3RlZFZhbHVlVHdvLCB0aGlzLnN0YXRlLmFuZ2xlKX0gY2xhc3NOYW1lPVwic3VibWl0XCIgPk7DpHN0YTwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBRdWVzdGlvbihwcm9wcykge1xyXG4gIHZhciBzdHlsZSA9IHtcclxuICAgIGNvbG9yOiAnYmxhY2snLFxyXG4gICAgZm9udFNpemU6ICcxN3B4JyxcclxuICAgIHBhZGRpbmc6ICcxNXB4IDAgMTVweCAwJ1xyXG4gIH1cclxuICByZXR1cm4gKFxyXG4gICAgPGgxIHN0eWxlPXtzdHlsZX0+e3Byb3BzLmRhdGFTZXQucXVlc3Rpb259PC9oMT5cclxuICApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldE5leHRIdG1sRm9yKCkge1xyXG4gIGxhc3RJZCsrO1xyXG4gIHJldHVybiBgJHtsYXN0SWR9YDtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIEFuc3dlcihwcm9wcykge1xyXG4gIHZhciBzcGFuc3R5bGUgPSB7XHJcbiAgICBmb250U2l6ZTogJzE1cHgnXHJcbiAgfVxyXG4gIHJldHVybiAoXHJcblxyXG5cclxuICAgIDxkaXYgY2xhc3NOYW1lPVwicm91bmRFc3RpbWF0ZVwiIG9uQ2xpY2s9e3Byb3BzLmhhbmRsZUNsaWNrLmJpbmQodGhpcywgcHJvcHMuYW5zd2VyLCBwcm9wcy5jaG9pY2UsIGxhc3RJZCl9ID5cclxuICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPXtnZXROZXh0SHRtbEZvcigpfSBuYW1lPVwicmFkQW5zd2VyXCIgdmFsdWU9e3Byb3BzLmFuc3dlcn1cclxuICAgICAgICBjaGVja2VkPXtwcm9wcy5hbnN3ZXIgPT0gcHJvcHMuc2VsZWN0ZWR9IC8+XHJcbiAgICAgIDxsYWJlbCBodG1sRm9yPXtsYXN0SWR9ID48L2xhYmVsPlxyXG4gICAgICB7KHByb3BzLmFuc3dlciA9PSBwcm9wcy5zZWxlY3RlZCkgPyAoXHJcbiAgICAgICAgPHNwYW4gc3R5bGU9e3Byb3BzLnN0eWxlfT57cHJvcHMuYW5zd2VyfTwvc3Bhbj5cclxuICAgICAgKSA6IChcclxuICAgICAgICAgIDxzcGFuIHN0eWxlPXtzcGFuc3R5bGV9Pntwcm9wcy5hbnN3ZXJ9PC9zcGFuPlxyXG4gICAgICAgIClcclxuICAgICAgfVxyXG4gICAgPC9kaXY+XHJcblxyXG5cclxuICApO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gQW5zd2VyTGlzdChwcm9wcykge1xyXG4gIHZhciBhbnN3ZXJzID0gW11cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BzLmRhdGFTZXQuYW5zd2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgYW5zd2Vycy5wdXNoKDxBbnN3ZXIga2V5PXtpfSBjaG9pY2U9e2l9IHN0eWxlPXtwcm9wcy5zdHlsZX0gaGFuZGxlQ2xpY2s9e3Byb3BzLmhhbmRsZUNsaWNrfSBzZWxlY3RlZD17cHJvcHMuc2VsZWN0ZWR9IGFuc3dlcj17cHJvcHMuZGF0YVNldC5hbnN3ZXJzW2ldfSAvPilcclxuICB9XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXY+XHJcbiAgICAgIHthbnN3ZXJzfVxyXG4gICAgPC9kaXY+XHJcbiAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiBRdWl6QXJlYShwcm9wcykge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2PlxyXG4gICAgICA8UXVlc3Rpb24gZGF0YVNldD17cHJvcHMuZGF0YVNldH0gLz5cclxuICAgICAgPEFuc3dlckxpc3QgZGF0YVNldD17cHJvcHMuZGF0YVNldH0gc3R5bGU9e3Byb3BzLnN0eWxlfSBoYW5kbGVDbGljaz17cHJvcHMuaGFuZGxlQ2xpY2t9IHNlbGVjdGVkPXtwcm9wcy5zZWxlY3RlZH0gLz5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJvb2ZRdWVzdGlvbnM7XHJcbiJdfQ==
