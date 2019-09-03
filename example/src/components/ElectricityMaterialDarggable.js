import React from 'react';
import Slider from 'react-rangeslider'
var styles;
class Horizontal extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            value: 1000
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
        })
    };

    handleChangeComplete() {
        this.props.handleClick(this.state.value);
    };

    render() {
        return (
            <div className='slider padd-top-bot'>
                <Slider
                    min={0}
                    max={50000}
                    step={100}
                    value={this.state.value}
                    onChangeStart={this.handleChangeStart}
                    onChange={this.handleChange}
                    onChangeComplete={this.handleChangeComplete}
                />
            </div>
        )
    }
}

class EDropArea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [
                { id: 1, isDragging: false, left: 0, angle: 1000 },
            ],
        };
        this.scrollable = this.scrollable.bind(this);

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
        let value = Math.floor((e.nativeEvent.offsetX) / 3);
        list[index].angle = (Math.ceil(value / 5) * 1000);
        let newState = Object.assign(
            this.state, {
                list: list
            });
        this.setState(newState);
        e.preventDefault();
        this.props.electricy(list[index].angle);
    }

    scrollable(e) {

        let lists = this.state.list;
        let indexOne = this.state.list.findIndex((item) => item.id === lists[0].id);
        lists[indexOne].angle = (e);

        let clickedState = Object.assign(
            this.state, {
                list: lists
            });
        this.props.electricy(lists[indexOne].angle);
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
                <EDraggable
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
                className="col-md-12  drop-area" style={{ padding: '0px' }}
                onDragOver={this.onDragOver.bind(this)}
                onDrop={this.onDrop.bind(this)} >
                {items}
            </div>
        );
    }
};

class EDraggable extends React.Component {

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
        if (this.props.left > 595) {
            styles = {
                left: '595px',
                width: this.props.width,
                position: 'absolute'
            };
        } else if (this.props.left < 0) {
            styles = {
                left: '0px',
                width: this.props.width,
                position: 'absolute'
            };
        } else {
            styles = {
                left: this.props.left,
                width: this.props.width,
                position: 'absolute'
            };
        }

        return (
            <div>
                <Horizontal handleClick={this.props.scrollable} />
            </div>

        );
    }
};

export default EDropArea