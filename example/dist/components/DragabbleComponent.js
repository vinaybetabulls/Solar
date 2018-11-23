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

},{"react":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9KeW90aGkvRGlnaXRha18yMDE4XzExXzA3KDEpL0Rvd25sb2FkIEZyb20gU2VydmVyL0RpZ2l0YWtfMjAxOF8xMV8xNC9leGFtcGxlL3NyYy9jb21wb25lbnRzL0RyYWdhYmJsZUNvbXBvbmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkNBa0IsT0FBTzs7OztBQUV6QixJQUFJLE1BQU0sQ0FBQzs7OztJQUdMLFFBQVE7WUFBUixRQUFROztBQUNELFdBRFAsUUFBUSxDQUNBLEtBQUssRUFBRTswQkFEZixRQUFROztBQUVWLCtCQUZFLFFBQVEsNkNBRUosS0FBSyxFQUFFOztBQUViLFFBQUksQ0FBQyxLQUFLLEdBQUc7QUFDWCxVQUFJLEVBQUUsQ0FDSixFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FDaEQ7S0FDRixDQUFDO0dBQ0g7O2VBVEcsUUFBUTs7V0FVRixvQkFBQyxDQUFDLEVBQUU7QUFDWixPQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsYUFBTyxLQUFLLENBQUM7S0FDZDs7O1dBRUssZ0JBQUMsQ0FBQyxFQUFFO0FBQ1IsVUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFDakUsVUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDM0IsVUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQUMsSUFBSTtlQUFLLElBQUksQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUU7T0FBQSxDQUFDLENBQUM7QUFD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LHdCQUF3QixFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQUFBQztVQUN2Rjs7Y0FBRyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQUFBQztZQUM1QywwQ0FBSyxHQUFHLEVBQUUsTUFBTSxBQUFDO0FBQ2YsdUJBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQUFBQztBQUNqQyxnQkFBRSxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQUFBQztBQUM1Qix1QkFBUyxFQUFDLDREQUE0RDtBQUN0RSxtQkFBSyxFQUFFLE1BQU0sQUFBQztBQUNkLHlCQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUM7QUFDekMsdUJBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQUFBQztBQUNyQyx5QkFBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDO0FBQ3pDLHVCQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUMsR0FBTztXQUFJO1NBQU07T0FDeEQsQ0FJTjtLQUNIOzs7U0FqRUcsU0FBUztHQUFTLG1CQUFNLFNBQVM7O0FBa0V0QyxDQUFDOztxQkFHYSxRQUFRIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcblxyXG52YXIgc3R5bGVzO1xyXG5cclxuLy8gZHJvcCBhcmVhIENvbXBvbmVudFxyXG5jbGFzcyBEcm9wQXJlYSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBsaXN0OiBbXHJcbiAgICAgICAgeyBpZDogMSwgaXNEcmFnZ2luZzogZmFsc2UsIGxlZnQ6IDAsIGFuZ2xlOiAwIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9O1xyXG4gIH1cclxuICBvbkRyYWdPdmVyKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIG9uRHJvcChlKSB7XHJcbiAgICB2YXIgb2JqID0gSlNPTi5wYXJzZShlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCdhcHBsaWNhdGlvbi9qc29uJykpO1xyXG4gICAgbGV0IGxpc3QgPSB0aGlzLnN0YXRlLmxpc3Q7XHJcbiAgICBsZXQgaW5kZXggPSB0aGlzLnN0YXRlLmxpc3QuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBvYmouaWQpO1xyXG4gICAgbGlzdFtpbmRleF0uaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgbGlzdFtpbmRleF0ubGVmdCA9IChlLmNsaWVudFggLSBvYmoueCk7XHJcbiAgICBsZXQgdmFsID0gTWF0aC5mbG9vcigoZS5jbGllbnRYIC0gb2JqLngpIC8gMyk7XHJcbiAgICBsaXN0W2luZGV4XS5hbmdsZSA9IChNYXRoLmNlaWwodmFsIC8gNSkgKiA1KTtcclxuICAgIGlmKGxpc3RbaW5kZXhdLmFuZ2xlID4gOTApIHtcclxuICAgICAgbGlzdFtpbmRleF0uYW5nbGUgPSA5MFxyXG4gICAgfSBlbHNlIGlmKGxpc3RbaW5kZXhdLmFuZ2xlIDwgMCkge1xyXG4gICAgICAgIGxpc3RbaW5kZXhdLmFuZ2xlID0gMFxyXG4gICAgICB9XHJcbiAgICBsZXQgbmV3U3RhdGUgPSBPYmplY3QuYXNzaWduKFxyXG4gICAgICB0aGlzLnN0YXRlLCB7XHJcbiAgICAgICAgbGlzdDogbGlzdFxyXG4gICAgICB9KTtcclxuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuICBzY3JvbGxhYmxlKGUpIHtcclxuICAgICAgbGV0IGxpc3RzID0gdGhpcy5zdGF0ZS5saXN0O1xyXG4gICAgICBsZXQgaW5kZXhPbmUgPSB0aGlzLnN0YXRlLmxpc3QuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBsaXN0c1swXS5pZCk7XHJcbiAgICAgIGxpc3RzW2luZGV4T25lXS5sZWZ0ID0gKGUubmF0aXZlRXZlbnQub2Zmc2V0WCk7XHJcbiAgICAgIGxldCB2YWx1ZSA9IE1hdGguZmxvb3IoKGUubmF0aXZlRXZlbnQub2Zmc2V0WCkgLyAzKTtcclxuICAgICAgbGlzdHNbaW5kZXhPbmVdLmFuZ2xlID0gKE1hdGguY2VpbCh2YWx1ZSAvIDUpICogNSk7XHJcbiAgICAgIGlmKGxpc3RzW2luZGV4T25lXS5hbmdsZSA+IDkwKSB7XHJcbiAgICAgICAgbGlzdHNbaW5kZXhPbmVdLmFuZ2xlID0gOTBcclxuICAgICAgfSBlbHNlIGlmKGxpc3RzW2luZGV4T25lXS5hbmdsZSA8IDApIHtcclxuICAgICAgICBsaXN0c1tpbmRleE9uZV0uYW5nbGUgPSAwXHJcbiAgICAgIH1cclxuICAgICAgbGV0IGNsaWNrZWRTdGF0ZSA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgICAgdGhpcy5zdGF0ZSwge1xyXG4gICAgICAgICAgbGlzdDogbGlzdHNcclxuICAgICAgICB9KTtcclxuICAgICAgdGhpcy5zZXRTdGF0ZShjbGlja2VkU3RhdGUpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlU3RhdGVEcmFnZ2luZyhpZCwgaXNEcmFnZ2luZykge1xyXG4gICAgbGV0IGxpc3QgPSB0aGlzLnN0YXRlLmxpc3Q7XHJcbiAgICBsZXQgaW5kZXggPSB0aGlzLnN0YXRlLmxpc3QuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBpZCk7XHJcbiAgICBsaXN0W2luZGV4XS5pc0RyYWdnaW5nID0gaXNEcmFnZ2luZztcclxuICAgIGxldCBuZXdTdGF0ZSA9IE9iamVjdC5hc3NpZ24oXHJcbiAgICAgIHRoaXMuc3RhdGUsIHtcclxuICAgICAgICBsaXN0OiBsaXN0XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBsZXQgaXRlbXMgPSBbXTtcclxuICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5zdGF0ZS5saXN0KSB7XHJcbiAgICAgIGl0ZW1zLnB1c2goXHJcbiAgICAgICAgPERyYWdnYWJsZVxyXG4gICAgICAgICAgcmVmPXtcIm5vZGVfXCIgKyBpdGVtLmlkfVxyXG4gICAgICAgICAga2V5PXtpdGVtLmlkfVxyXG4gICAgICAgICAgaWQ9e2l0ZW0uaWR9XHJcbiAgICAgICAgICBsZWZ0PXtpdGVtLmxlZnR9XHJcbiAgICAgICAgICB3aWR0aD17aXRlbS53aWR0aH1cclxuICAgICAgICAgIGFuZ2xlPXtpdGVtLmFuZ2xlfVxyXG4gICAgICAgICAgaXNEcmFnZ2luZz17aXRlbS5pc0RyYWdnaW5nfVxyXG4gICAgICAgICAgdXBkYXRlU3RhdGVEcmFnZ2luZz17dGhpcy51cGRhdGVTdGF0ZURyYWdnaW5nLmJpbmQodGhpcyl9XHJcbiAgICAgICAgICBzY3JvbGxhYmxlPXt0aGlzLnNjcm9sbGFibGUuYmluZCh0aGlzKX1cclxuICAgICAgICAvPlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImRyb3AtYXJlYVwiXHJcbiAgICAgICAgb25EcmFnT3Zlcj17dGhpcy5vbkRyYWdPdmVyLmJpbmQodGhpcyl9XHJcbiAgICAgICAgb25Ecm9wPXt0aGlzLm9uRHJvcC5iaW5kKHRoaXMpfSA+XHJcbiAgICAgICAge2l0ZW1zfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG59O1xyXG5cclxuXHJcbi8vIGRyYWdnYWJsZSBDb21wb25lbnRcclxuY2xhc3MgRHJhZ2dhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgb25Nb3VzZURvd24oZSkge1xyXG4gICAgdmFyIGVsbSA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xyXG4gICAgaWYgKGVsbS5jbGFzc05hbWUgIT09ICdyZXNpemVyJykge1xyXG4gICAgICB0aGlzLnByb3BzLnVwZGF0ZVN0YXRlRHJhZ2dpbmcodGhpcy5wcm9wcy5pZCwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uTW91c2VVcChlKSB7XHJcbiAgICB0aGlzLnByb3BzLnVwZGF0ZVN0YXRlRHJhZ2dpbmcodGhpcy5wcm9wcy5pZCwgZmFsc2UpO1xyXG4gIH1cclxuICBvbkRyYWdTdGFydChlKSB7XHJcbiAgICBjb25zdCBub2RlU3R5bGUgPSB0aGlzLnJlZnMubm9kZS5zdHlsZTtcclxuICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ2FwcGxpY2F0aW9uL2pzb24nLCBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIGlkOiB0aGlzLnByb3BzLmlkLFxyXG4gICAgICB4OiBlLmNsaWVudFggLSBwYXJzZUludChub2RlU3R5bGUubGVmdCksXHJcbiAgICB9KSk7XHJcbiAgfVxyXG4gIG9uRHJhZ0VuZChlKSB7XHJcbiAgICB0aGlzLnByb3BzLnVwZGF0ZVN0YXRlRHJhZ2dpbmcodGhpcy5wcm9wcy5pZCwgZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgaWYgKHRoaXMucHJvcHMubGVmdCA+IDI2OSkge1xyXG4gICAgICBzdHlsZXMgPSB7XHJcbiAgICAgICAgbGVmdDogJzI2OXB4JyxcclxuICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCxcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5sZWZ0IDwgMCkge1xyXG4gICAgICBzdHlsZXMgPSB7XHJcbiAgICAgICAgbGVmdDogJzBweCcsXHJcbiAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMud2lkdGgsXHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdHlsZXMgPSB7XHJcbiAgICAgICAgbGVmdDogdGhpcy5wcm9wcy5sZWZ0LFxyXG4gICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTkgc2Nyb2xsXCIgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJywgcGFkZGluZzogJzIwcHgnIH19PlxyXG4gICAgICAgIDxkaXYgaWQ9XCJyYXRpb1wiID5cclxuICAgICAgICAgIDxkaXYgaWQ9XCJyYXRpby1jZW50ZXJcIj48L2Rpdj5cclxuICAgICAgICAgIDxkaXYgaWQ9XCJyYXRpby1sZWZ0XCIgY2xhc3NOYW1lPXtgcm90YXRlLWxlZnQtJHt0aGlzLnByb3BzLmFuZ2xlfWB9PjwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBpZD1cInJhdGlvLXJpZ2h0XCIgY2xhc3NOYW1lPXtgcm90YXRlLXJpZ2h0LSR7dGhpcy5wcm9wcy5hbmdsZX1gfT48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGlkPVwicmF0aW8tdmFsdWVcIj57dGhpcy5wcm9wcy5hbmdsZX3CsCA8L2Rpdj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJyYXRpb1ZhbHVlXCIgaWQ9XCJyYXRpb1ZhbHVlXCIgdmFsdWU9e3RoaXMucHJvcHMuYW5nbGV9IC8+XHJcbiAgICAgICAgPGRpdiBpZD1cInJhdGlvLXNsaWRlclwiIGNsYXNzTmFtZT1cInNsaWRlci1jaGFydCB1aS1zbGlkZXJcIiBvbkNsaWNrPXt0aGlzLnByb3BzLnNjcm9sbGFibGV9PlxyXG4gICAgICAgICAgPGEgc3R5bGU9e3sgb3V0bGluZTogJ25vbmUnLCBib3JkZXI6ICdub25lJyB9fT5cclxuICAgICAgICAgICAgPGRpdiByZWY9e1wibm9kZVwifVxyXG4gICAgICAgICAgICAgIGRyYWdnYWJsZT17dGhpcy5wcm9wcy5pc0RyYWdnaW5nfVxyXG4gICAgICAgICAgICAgIGlkPXsnaXRlbV8nICsgdGhpcy5wcm9wcy5pZH1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpdGVtIHVuc2VsZWN0YWJsZSB1aS1zbGlkZXItaGFuZGxlIHVpLXNsaWRlci1oYW5kbGUtYWN0aXZlXCJcclxuICAgICAgICAgICAgICBzdHlsZT17c3R5bGVzfVxyXG4gICAgICAgICAgICAgIG9uTW91c2VEb3duPXt0aGlzLm9uTW91c2VEb3duLmJpbmQodGhpcyl9XHJcbiAgICAgICAgICAgICAgb25Nb3VzZVVwPXt0aGlzLm9uTW91c2VVcC5iaW5kKHRoaXMpfVxyXG4gICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXt0aGlzLm9uRHJhZ1N0YXJ0LmJpbmQodGhpcyl9XHJcbiAgICAgICAgICAgICAgb25EcmFnRW5kPXt0aGlzLm9uRHJhZ0VuZC5iaW5kKHRoaXMpfT48L2Rpdj48L2E+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuXHJcblxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRHJvcEFyZWFcclxuIl19
