import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Stepper from 'react-stepper-horizontal';

class CStepper extends Component {

  constructor(props) {
    super(props)

    this.steps = [{
      image: "./img/map.png",
      name: "Markera ut ditt tak",
      arrow: "fa fa-angle-double-right fa-3x text-right",
      stepindex: 1

    },
    // {
    //   image: "./img/style.png",
    //   name: "Välj din takstil",
    //   arrow: "fa fa-angle-double-right fa-3x text-right",
    //   stepindex: 2


    // },
    {
      image: "./img/material.png",
      name: "Välj material",
      arrow: "fa fa-angle-double-right fa-3x text-right",
      stepindex: 3


    },
    {
      image: "./img/estimate.png",
      name: "Prisuppskattning",
      arrow: "",
      stepindex: 4


    }]
  }

  render() {
    return (
      <Stepper steps={[{ title: 'Map' }, { title: 'Slope' }, { title: 'Material' }, { title: 'Estimation' }]} activeStep={this.props.stepindex} titleTop="Hi" />
    );
  }
}

const selectcolor = {
  color: "#5cb85c",
  border: { border: "2px solid rgb(10,83,156)", backgroundColor: '#c3e0ce' },
  topborder: { borderTop: "2px solid rgb(10,83,156)" },
}

const currentselectcolor = {
  color: "#5cb85c",
  border: { border: "2px solid rgb(10,83,156)", backgroundColor: 'rgb(10, 83, 156)' },
  topborder: { borderTop: "2px solid rgb(10,83,156)" },
}

const unselect = {
  color: "#000"
}

class Steps extends Component {
  constructor(props) {
    super(props)

    this.steps = [{
      image: "./img/map.png",
      name: "Markera ut ditt tak",
      arrow: "fa fa-angle-double-right fa-3x text-right",
      stepindex: 1

    },
    {
      image: "./img/property-information.png",
      name: "Fastighetsinformation",
      arrow: "fa fa-angle-double-right fa-3x text-right",
      stepindex: 3
    },
    {
      image: "./img/material.png",
      name: "Takinformation",
      arrow: "fa fa-angle-double-right fa-3x text-right",
      stepindex: 4
    },
    {
      image: "./img/electricity.png",
      name: " Elförbrukning & säkring  ",
      arrow: "fa fa-angle-double-right fa-3x text-right",
      stepindex: 5
    },
    {
      image: "./img/electricity.png",
      name: " Solpanel & Batteri  ",
      arrow: "fa fa-angle-double-right fa-3x text-right",
      stepindex: 6
    },
    {
      image: "./img/estimate.png",
      name: "Prisuppskattning färdig",
      arrow: "",
      stepindex: 7
    }]
  }
  render() {
    return (
      <div className="container" >
        <br />
        <div className="md-stepper-horizontal orange">
          {
            this.steps.map((data, index) => {
              var stepstyle = (this.props.stepindex > data.stepindex) ? selectcolor : (this.props.stepindex === data.stepindex) ? currentselectcolor : unselect;
              return (<div className="md-step active editable" key={index}  >
                <div className="md-step-circle" style={stepstyle.border}>
                  <span>
                    <img src={data.image} alt={data.name} className="img-responsive stepper-icon" />
                  </span>
                </div>
                <div className="md-step-title">
                  <p className="stepstext" style={stepstyle}>{data.name}</p>
                </div>
                <div className="md-step-bar-left" style={stepstyle.topborder} ></div>
                <div className="md-step-bar-right" style={stepstyle.topborder}  ></div>
              </div>)
            })
          }
        </div>
      </div>
    )
  }
}

export default Steps;