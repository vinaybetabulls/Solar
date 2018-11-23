import React from 'react';

var styles;

// drop area Component
class DropArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        { id: 1, isDragging: false, left: 0, angle: 0 },
      ],
    };
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
    if(list[index].angle > 90) {
      list[index].angle = 90
    } else if(list[index].angle < 0) {
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
      lists[indexOne].left = (e.nativeEvent.offsetX);
      let value = Math.floor((e.nativeEvent.offsetX) / 3);
      lists[indexOne].angle = (Math.ceil(value / 5) * 5);
      if(lists[indexOne].angle > 90) {
        lists[indexOne].angle = 90
      } else if(lists[indexOne].angle < 0) {
        lists[indexOne].angle = 0
      }
      let clickedState = Object.assign(
        this.state, {
          list: lists
        });
      this.setState(clickedState);
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
        className="drop-area"
        onDragOver={this.onDragOver.bind(this)}
        onDrop={this.onDrop.bind(this)} >
        {items}
      </div>
    );
  }
};


// draggable Component
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
      <div className="col-md-9 scroll" style={{ textAlign: 'center', padding: '20px' }}>
        <div id="ratio" >
          <div id="ratio-center"></div>
          <div id="ratio-left" className={`rotate-left-${this.props.angle}`}></div>
          <div id="ratio-right" className={`rotate-right-${this.props.angle}`}></div>
        </div>
        <div id="ratio-value">{this.props.angle}° </div>
        <input type="hidden" name="ratioValue" id="ratioValue" value={this.props.angle} />
        <div id="ratio-slider" className="slider-chart ui-slider" onClick={this.props.scrollable}>
          <a style={{ outline: 'none', border: 'none' }}>
            <div ref={"node"}
              draggable={this.props.isDragging}
              id={'item_' + this.props.id}
              className="item unselectable ui-slider-handle ui-slider-handle-active"
              style={styles}
              onMouseDown={this.onMouseDown.bind(this)}
              onMouseUp={this.onMouseUp.bind(this)}
              onDragStart={this.onDragStart.bind(this)}
              onDragEnd={this.onDragEnd.bind(this)}></div></a></div>
      </div>



    );
  }
};


export default DropArea
