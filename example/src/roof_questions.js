import React, { Component } from 'react';
let lastId = 0;
var highletstyle = {
  fontSize: '15'
}
var highletstyle2 = {
  fontSize: '15'
};

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: "#aaa",
      backgroundColor: "#aaa",
      height: 1,
      width: '66%'
    }}
  />
);


class RoofQuestions extends Component {
  constructor(props) {
    super(props)
    this.queval = props.queval.bind(this);
    this.dataSet = [
      {
        question: "Vilken typ av fastighet bor du i?",
        answers: [
          "Radhus",
          "Villa",
          "Fritidshus",
          "Bostadsrättsförening",
          "Lantbruk"
        ]
      },
      {
        question: "Hur många våningar är fastigheten?",
        answers: [
          "1 plan",
          "2 plan",
          "3 plan",
          "3+ plan"
        ]
      }
    ];
    this.state = { stepIndex: 1, selectedValue: '', selectedValueTwo: '', angle: 45, left: '135px' }
    this.handleClick = this.handleClick.bind(this);

    this.handleClickTwo = this.handleClickTwo.bind(this);
    this.scrollable = this.scrollable.bind(this);
    this.selectedAnswers = [];
  }


  handleClick(value, index, id) {
    let selectedValue = value;
    highletstyle = {
      fontWeight: 'bold',
      color: 'black',
      fontSize: '16px'
    }
    this.selectedAnswers.push(value);
    this.setState({ selectedValue: selectedValue });
  }

  handleClickTwo(value2, index, id) {
    let selectedValue = value2;
    highletstyle2 = {
      fontWeight: 'bold',
      color: 'black',
      fontSize: '16px'
    }
    this.selectedAnswers.push(value2);
    this.setState({ selectedValueTwo: selectedValue });
  }

  scrollable(e) {
    if (e.nativeEvent.offsetX > 270) {
      this.setState({ left: '270px' });
      this.setState({ angle: 90 })
    } else {
      this.setState({ left: e.nativeEvent.offsetX });
      var val = Math.floor(e.nativeEvent.offsetX / 3);
      this.setState({ angle: Math.ceil(val / 5) * 5 })
    }
  }

  

  render() {
    return (
      <div>
        <div className="container ">
          <h3 className="roof_subhead"><button id="backbutton" onClick={this.props.back.bind(this, 2)}>
            <i className="fa fa-arrow-left"></i>
          </button>Fastighetsinformation</h3>
        </div>
        <div className="container col-sm-12 panding_no">
          <div className="col-sm-2"></div>
          <div className="col-sm-10 panding_no" id="padding-b">
            <div className="col-sm-4 panding_no">
              <QuizArea handleClick={this.handleClick} dataSet={this.dataSet[0]} selected={this.state.selectedValue} style={highletstyle} />

            </div>
            <div className="col-md-6">
              <img style={{
                position: 'absolute',
                left: '12%',
                width: '90%',
                top: '50%'
              }} src="./img/floors.png" />
            </div>
          </div>
          <ColoredLine color="black" />
          <div className="col-sm-2"></div>
          <div className="col-sm-10 panding_no" id="padding-b">
            <div className="col-sm-4 panding_no">
              <QuizArea handleClick={this.handleClickTwo} dataSet={this.dataSet[1]} selected={this.state.selectedValueTwo} style={highletstyle2} />
            </div>
            <div className="col-md-6">
              <img style={{
                position: 'absolute',
                left: '12%',
                width: '90%',
                top: '50%'
              }} src="./img/firsthouse.png" />
            </div>

          </div>
          <ColoredLine color="black" />
          <div className="col-sm-2"></div>
          {/* onClick={this.props.queval.bind(this, this.state.selectedValue, this.state.selectedValueTwo)} */}
          <div className="col-sm-10 panding_no" id="navbar2" >
            <div className="col-sm-12 panding_no">
              <div style={{ padding: '15px 0 15px 0' }}>
                <div>Vilken är fastighetens ungefärliga taklutning</div>
                <div> <span>- Dra i reglaget för att ändra takets ungefärliga taklutning</span></div>
              </div>
            </div>
            <div className="col-md-9 scroll" style={{ textAlign: 'center', padding: '20px' }}>
              <div id="ratio" >
                <div id="ratio-center"></div>
                <div id="ratio-left" className={`rotate-left-${this.state.angle}`}></div>
                <div id="ratio-right" className={`rotate-right-${this.state.angle}`}></div>
              </div>
              <div id="ratio-value">{this.state.angle}°</div>
              <input type="hidden" name="ratioValue" id="ratioValue" value="35" />
              <div id="ratio-slider" className="slider-chart ui-slider" onClick={this.scrollable}>
                <a style={{ outline: 'none', border: 'none' }} onClick={this.scrollable}>
                  <div className="ui-slider-handle ui-slider-handle-active" style={{ left: this.state.left }}></div></a></div>
            </div>
          </div>

          <ColoredLine color="black" />
          <div className="col-md-12 estimate" style={{ textAlign: 'center' }}>
            <button onClick={this.props.queval.bind(this, this.state.selectedValue, this.state.selectedValueTwo, this.state.angle)} className="submit" >Nästa</button>
          </div>
        </div>
      </div>

    )
  }
}


function Question(props) {
  var style = {
    color: 'black',
    fontSize: '17px',
    padding: '15px 0 15px 0'
  }
  return (
    <h1 style={style}>{props.dataSet.question}</h1>
  )
}

function getNextHtmlFor() {
  lastId++;
  return `${lastId}`;
}


function Answer(props) {
  var spanstyle = {
    fontSize: '15px'
  }
  return (


    <div className="roundEstimate" onClick={props.handleClick.bind(this, props.answer, props.choice, lastId)} >
      <input type="checkbox" id={getNextHtmlFor()} name="radAnswer" value={props.answer}
        checked={props.answer == props.selected} />
      <label htmlFor={lastId} ></label>
      {(props.answer == props.selected) ? (
        <span style={props.style}>{props.answer}</span>
      ) : (
          <span style={spanstyle}>{props.answer}</span>
        )
      }
    </div>


  );
}


function AnswerList(props) {
  var answers = []
  for (let i = 0; i < props.dataSet.answers.length; i++) {
    answers.push(<Answer key={i} choice={i} style={props.style} handleClick={props.handleClick} selected={props.selected} answer={props.dataSet.answers[i]} />)
  }
  return (
    <div>
      {answers}
    </div>
  )
}

function QuizArea(props) {
  return (
    <div>
      <Question dataSet={props.dataSet} />
      <AnswerList dataSet={props.dataSet} style={props.style} handleClick={props.handleClick} selected={props.selected} />
    </div>
  )
}


export default RoofQuestions;
