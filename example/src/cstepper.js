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
    {
      image: "./img/style.png",
      name: "Välj din takstil",
      arrow: "fa fa-angle-double-right fa-3x text-right",
      stepindex: 2


    },
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
      <div>
        <Stepper steps={[{ title: 'Map' }, { title: 'Slope' }, { title: 'Material' }, { title: 'Estimation' }]} activeStep={this.props.stepindex} titleTop="Hi" />
      </div>
    );
  }
}
/*
class CStepper extends Component
{


    
    render() {
  return (
    <div>
      <Stepper steps={ [{title: 'Map'}, {title: 'Slope'}, {title: 'Material'}, {title: 'Estimation'}] } activeStep={ 2 }  titleTop="Hi" />
    </div>
  );
}
}
*/

const selectcolor = {
  color: "#5cb85c",
  border: { border: "2px solid rgb(10,83,156)" },
  topborder: { borderTop: "2px solid rgb(10,83,156)" }
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
      image: "./img/style.png",
      name: "Välj din takstil",
      arrow: "fa fa-angle-double-right fa-3x text-right",
      stepindex: 2


    },
    {
      image: "./img/property-information.png",
      name: "Fastighetsinformation",
      arrow: "fa fa-angle-double-right fa-3x text-right",
      stepindex: 3


    },
    {
      image: "./img/material.png",
      name: "Välj material",
      arrow: "fa fa-angle-double-right fa-3x text-right",
      stepindex: 4


    },
    {
      image: "./img/estimate.png",
      name: "Prisuppskattning färdig",
      arrow: "",
      stepindex: 5


    }]
  }
  render() {
    return (<div className="container" >

      {/*

<h2 className="text-center roofing_head"><b>Digitaks takberäknare</b></h2> */}
      <br />
      <div className="md-stepper-horizontal orange">


        {

          this.steps.map((data, index) => {

            var stepstyle = (this.props.stepindex >= data.stepindex) ? selectcolor : unselect;

            return (<div className="md-step active editable" key={index}  >

              <div className="md-step-circle" style={stepstyle.border} ><span><img src={data.image} className="img-responsive" /></span></div>
              <div className="md-step-title"><p id="stepstext" style={stepstyle}   >{data.name}</p></div>
              <div className="md-step-bar-left" style={stepstyle.topborder} ></div>
              <div className="md-step-bar-right" style={stepstyle.topborder}  ></div>
            </div>)
          })


        }
        {/*
  this.steps.map((data,index)=>
  {

var stepstyle=(this.props.stepindex==data.stepindex) ? selectcolor : unselect ;

    return(<div key={index} className="col-sm-3 text-center"><div className="col-sm-12" id="fullstep">
      
      <div  id="stepstyle"  > <div ><img src={data.image}  className="img-responsive" /></div></div>
      <div  width="50%"  id="arrowicon"  style={stepstyle}  > <i className={data.arrow} aria-hidden="true"></i>
  
  </div></div><p id="stepstext"  style={stepstyle}  >{data.name}</p>
</div>)
  })*/
        }



      </div>


    </div>




    )
  }
}



export default Steps;