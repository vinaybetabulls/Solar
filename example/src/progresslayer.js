import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepIndex: 1,
            finished: false,
            clear: {},
            previous: {},
            next: {}
        }
    }

  
    


   
    render() {


        return (<div>
            <div id="buttons">
                <button id="delete-button" className="btn btn-info" style={this.state.clear} >Clear</button>
                <button onClick={this.props.handlePre} className="btn btn-info" style={this.state.previous} >pre</button>
                <button onClick={this.props.handleNext} disabled={this.state.finished} className="btn btn-info" style={this.state.next}  >next</button>

                {
                    this.state.stepIndex
                }
            </div>
        </div>)
    }
}
export default Progress;