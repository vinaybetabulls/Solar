import React from 'react';
import Slider from 'react-rangeslider'
var styles;
class Horizontal extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }

  handleChangeStart() {
  };

  handleChange(v) {
    var _self = this;
    _self.setState({
      value: v
    });
  };

  handleChangeComplete() {
    this.props.handleClick(this.state.value);
  };

  render() {
    return (
      <div className="col-lg-8 col-md-12 col-lg-offset-2">
        <div className='slider padd-top-bot'>
          <Slider
            min={0}
            max={90}
            value={this.state.value}
            onChangeStart={this.handleChangeStart}
            onChange={this.handleChange}
            onChangeComplete={this.handleChangeComplete}
          />
        </div>
      </div>
    )
  }
}

class DropArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { id: 1, isDragging: false, left: 0, angle: 0 },
      ]
    };
    this.scrollable = this.scrollable.bind(this)
  }

  onDragOver(e) {
    e.preventDefault();
    return false;
  }

  onDrop(e) {
    var obj = JSON.parse(e.dataTransfer.getData('application/json'));
    let list = this.state.list;
    let index = this.state.list.findIndex((item) => item.id === obj.id);
    list[index].isDragging = false;
    list[index].left = (e.clientX - obj.x);
    let val = Math.floor((e.clientX - obj.x) / 3);
    list[index].angle = (Math.ceil(val / 5) * 5);
    if (list[index].angle > 90) {
      list[index].angle = 90
    } else if (list[index].angle < 0) {
      list[index].angle = 0
    }
    let newState = Object.assign(
      this.state, {
        list: list
      });
    this.setState(newState);
    e.preventDefault();
  }
  scrollable(e) {
    let lists = this.state.list;
    let indexOne = this.state.list.findIndex((item) => item.id === lists[0].id);
    lists[indexOne].angle = (e);
    let clickedState = Object.assign(
      this.state, {
        list: lists
      });
    this.setState(clickedState);
    this.props.roofAngle(lists[indexOne].angle);
  }

  updateStateDragging(id, isDragging) {
    let list = this.state.list;
    let index = this.state.list.findIndex((item) => item.id === id);
    list[index].isDragging = isDragging;
    let newState = Object.assign(
      this.state, {
        list: list
      });
    this.setState(newState);
  }

  render() {
    let items = [];
    for (let item of this.state.list) {
      items.push(
        <Draggable
          ref={"node_" + item.id}
          key={item.id}
          id={item.id}
          left={item.left}
          width={item.width}
          angle={item.angle}
          isDragging={item.isDragging}
          updateStateDragging={this.updateStateDragging.bind(this)}
          scrollable={this.scrollable.bind(this)}
        />
      );
    }
    return (
      <div
        className="col-sm-12 align-text-center drop-area"
        onDragOver={this.onDragOver.bind(this)}
        onDrop={this.onDrop.bind(this)} >
        {items}
      </div>
    );
  }
};

class Draggable extends React.Component {
  onMouseDown(e) {
    var elm = document.elementFromPoint(e.clientX, e.clientY);
    if (elm.className !== 'resizer') {
      this.props.updateStateDragging(this.props.id, true);
    }
  }
  onMouseUp(e) {
    this.props.updateStateDragging(this.props.id, false);
  }
  onDragStart(e) {
    const nodeStyle = this.refs.node.style;
    e.dataTransfer.setData('application/json', JSON.stringify({
      id: this.props.id,
      x: e.clientX - parseInt(nodeStyle.left),
    }));
  }
  onDragEnd(e) {
    this.props.updateStateDragging(this.props.id, false);
  }

  render() {
    if (this.props.left > 269) {
      styles = {
        left: '269px',
        width: this.props.width,
      };
    } else if (this.props.left < 0) {
      styles = {
        left: '0px',
        width: this.props.width,
      };
    } else {
      styles = {
        left: this.props.left,
        width: this.props.width,
      };
    }

    return (
      <div>
        <div className="col-md-2"></div>
        <div className="  scroll" style={{ textAlign: 'center', padding: '20px' }}>
          <div id="ratio" >
            <div id="ratio-center"></div>
            <div id="ratio-left" className={`rotate-left-${this.props.angle}`} style={{ transform: `rotate(${this.props.angle}deg)` }}></div>
            <div id="ratio-right" className={`rotate-right-${this.props.angle}`} style={{ transform: `rotate(-${this.props.angle}deg)` }}></div>
          </div>
          <div id="ratio-value">{this.props.angle}° </div>
          <input type="hidden" name="ratioValue" id="ratioValue" ref='myInput' value={this.props.angle} />
          <Horizontal handleClick={this.props.scrollable} />
        </div>
        <div className="col-md-3">
        </div>
      </div>
    );
  }
};


export default DropArea
