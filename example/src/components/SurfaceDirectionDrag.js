import React from 'react';
import Slider from 'react-rangeslider'
var styles;
class Horizontal extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            value: 0,
            roof_direction: 'SYD 1'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.roofDirection = this.roofDirection.bind(this)
    }

    handleChangeStart() {
    };

    handleChange(v) {
        var _self = this;
        _self.setState({
            value: v,
            roof_direction: this.roofDirection(v)
        });
    };

    roofDirection(v) {
        switch (true) {
            // case (-90 <= v && v <= -59): return "VÄST";
            // case (-60 <= v && v <= -19): return "SYDVÄST";
            // case (-20 <= v && v <= 29): return "SYD";
            // case (30 <= v && v <= 69): return "SYDOST";
            // case (70 <= v && v <= 90): return "OST"
            // default: return "worst"
            case (-90 <= v && v <= -72): return "VÄST 1";
            case (-72 <= v && v <= -54): return "VÄST 2";
            case (-55 <= v && v <= -36): return "SYDVÄST 1";
            case (-37 <= v && v <= -18): return "SYDVÄST 2";
            case (-18 <= v && v <= -1): return "SYD 1";
            case (0 <= v && v <= 18): return "SYD 2";
            case (19 <= v && v <= 35): return "SYDOST 1";
            case (36 <= v && v <= 54): return "SYDOST 2";
            case (55 <= v && v <= 72): return "OST 1";
            case (72 <= v && v <= 90): return "OST 2"
            default: return "worst"
        }
    }
    handleChangeComplete() {
        this.props.handleClick(this.state.value);
    };

    render() {
        return (
            <div className="col-md-12">
                <div className='slider surface-slider padd-top-bot m-top-27'>
                    <div className="align-text-center bold">{this.state.roof_direction.match(/[a-zA-Z]+/g)}</div>
                    <Slider
                        min={-90}
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
                { id: 1, isDragging: false, left: 0, direction: 0, roof_direction: 'SYD 1' },
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
        list[index].direction = (Math.ceil(val / 5) * 5);
        if (list[index].direction > 90) {
            list[index].direction = 90
        } else if (list[index].direction < 0) {
            list[index].direction = 0
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
        lists[indexOne].direction = (e);
        let dir = lists[indexOne].direction;
        lists[indexOne].roof_direction = roofDirection(dir)

        function roofDirection(dir) {
            switch (true) {
                // case (-90 <= dir && dir <= -59): return "VÄST";
                // case (-60 <= dir && dir <= -19): return "SYDVÄST";
                // case (-20 <= dir && dir <= 29): return "SYD";
                // case (30 <= dir && dir <= 69): return "SYDOST";
                // case (70 <= dir && dir <= 90): return "OST"
                // default: return "worst"
                case (-90 <= dir && dir <= -72): return "VÄST 1";
                case (-72 <= dir && dir <= -54): return "VÄST 2";
                case (-55 <= dir && dir <= -36): return "SYDVÄST 1";
                case (-37 <= dir && dir <= -18): return "SYDVÄST 2";
                case (-18 <= dir && dir <= -1): return "SYD 1";
                case (0 <= dir && dir <= 18): return "SYD 2";
                case (19 <= dir && dir <= 35): return "SYDOST 1";
                case (36 <= dir && dir <= 54): return "SYDOST 2";
                case (55 <= dir && dir <= 72): return "OST 1";
                case (72 <= dir && dir <= 90): return "OST 2"
                default: return "worst"
            }
        }
        let clickedState = Object.assign(
            this.state, {
                list: lists
            });
        this.setState(clickedState);
        setTimeout(() => {
            this.props.direction(roofDirection(dir));
        }, 1000)
    };


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
                    direction={item.direction}
                    roof_direction={item.roof_direction}
                    isDragging={item.isDragging}
                    updateStateDragging={this.updateStateDragging.bind(this)}
                    scrollable={this.scrollable.bind(this)}
                />
            );
        }
        return (
            <div
                className="col-md-12 slots-centering"
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

        var primarySideRadiation, secondarySideRadiation, color, scolor;
        if (this.props.roof_direction == 'VÄST 1') {//west east
            primarySideRadiation = 84;
            secondarySideRadiation = 76;
        } else if (this.props.roof_direction == 'VÄST 2') {//southwest
            primarySideRadiation = 88;
            secondarySideRadiation = 72;
        } else if (this.props.roof_direction == 'SYDVÄST 1') {//southwest
            primarySideRadiation = 92;
            secondarySideRadiation = 68;
        } else if (this.props.roof_direction == 'SYDVÄST 2') {//southwest
            primarySideRadiation = 96;
            secondarySideRadiation = 64;
        } else if (this.props.roof_direction == 'SYD 1') {//south
            primarySideRadiation = 100;
            secondarySideRadiation = 60;
        } else if (this.props.roof_direction == 'SYD 2') {//south
            primarySideRadiation = 100;
            secondarySideRadiation = 60;
        } else if (this.props.roof_direction == 'SYDOST 1') {//southeast
            primarySideRadiation = 92;
            secondarySideRadiation = 64;
        } else if (this.props.roof_direction == 'SYDOST 2') {//southeast
            primarySideRadiation = 84;
            secondarySideRadiation = 68;
        } else if (this.props.roof_direction == 'OST 1') {//southeast
            primarySideRadiation = 72;
            secondarySideRadiation = 84;
        } else if (this.props.roof_direction == 'OST 2') {//southeast
            primarySideRadiation = 76;
            secondarySideRadiation = 84;
        }

        if (primarySideRadiation == '100') {
            color = '#E89600';
        } else if (primarySideRadiation == '96') {
            color = '#FFA500';
        } else if (primarySideRadiation == '92') {
            color = '#FFAD17';
        } else if (primarySideRadiation == '88') {
            color = '#FFB52E';
        } else if (primarySideRadiation == '84') {
            color = '#FFBD45';
        } else if (primarySideRadiation == '76') {
            color = '#FFC55C';
        } else if (primarySideRadiation == '72') {
            color = '#FFCD73';
        } else if (primarySideRadiation == '68') {
            color = '#FFD68B';
        } else if (primarySideRadiation == '64') {
            color = '#FFDEA2';
        } else if (primarySideRadiation == '60') {
            color = '#FFE6B9';
        }
        if (secondarySideRadiation == '100') {
            scolor = '#E89600';
        } else if (secondarySideRadiation == '96') {
            scolor = '#FFA500';
        } else if (secondarySideRadiation == '92') {
            scolor = '#FFAD17';
        } else if (secondarySideRadiation == '88') {
            scolor = '#FFB52E';
        } else if (secondarySideRadiation == '84') {
            scolor = '#FFBD45';
        } else if (secondarySideRadiation == '76') {
            scolor = '#FFC55C';
        } else if (secondarySideRadiation == '72') {
            scolor = '#FFCD73';
        } else if (secondarySideRadiation == '68') {
            scolor = '#FFD68B';
        } else if (secondarySideRadiation == '64') {
            scolor = '#FFDEA2';
        } else if (secondarySideRadiation == '60') {
            scolor = '#FFE6B9';
        }

        return (
            <React.Fragment>
                <div className="col-md-1"></div>
                <div className="col-md-5 direction">
                    <Horizontal handleClick={this.props.scrollable} />
                </div>
                <div className="col-md-6">
                    <div className="col-md-12 col-sm-12 border-box px2 mb2 sm-mb0 news">
                        <div className="calc-roof flex items-center justify-center mx-auto mt2">
                            <span className="calc-roof-direction calc-roof-direction--north h4 top-0 text-blue bold ">N</span>
                            <span className="calc-roof-direction calc-roof-direction--south h4 bottom-0 text-blue bold">S</span>
                            <span className="calc-roof-direction calc-roof-direction--west h4 left-0 text-blue bold west">W</span>
                            <span className="calc-roof-direction calc-roof-direction--east h4 right-0 text-blue bold east">E</span>
                            {/* <img className="calc-roof-img js-calc-roof-img"
                                src="https://www.utellus.se/wp-content/themes/utellus/images/roof.svg" alt="roof" style={{ transform: `rotate(${this.props.direction}deg)` }} /> */}
                            <ul className="directions-list" style={{ transform: `rotate(${this.props.direction}deg)` }}>
                                <li className="Upper-list" style={{ background: `${scolor}` }}>{secondarySideRadiation}</li>
                                <li className="lower-list" style={{ background: `${color}` }}>{primarySideRadiation}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

export default DropArea;