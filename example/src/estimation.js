import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './mapcomponent';
import Header from './header';
import Progress from './progresslayer';
import Steps from './cstepper';
import StyleComponent from './styleComponent';
import MaterialComponent from './materialComponent';
import Areaestimate from './areaestimate';
import RoofQuestions from './roof_questions';


import GoogleMapDrawFilter from 'react-google-map-draw-filter';

const style = {
  marginTop: 0,
  marginBottom: 30,
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentindex: 1,
      finished: false,
      roofarea: 0,
      roofstyle: "",
      material: "",
      materialCost: 0,
      roofstylecost: 0,
      Roofaddress: "",
      roofadress: "",
      coordinates: "",
    }
  }

  componentWillMount() {
    this.setState({
      componentindex: 1
    })
  }
  area1(v, address, coordinates) {

    this.setState({
      componentindex: 2,
      roofarea: v,
      Roofaddress: address,
      coordinates: coordinates,


    })



  }
  stylevalue(value, cost) {
    this.setState({
      componentindex: 3,
      roofstyle: value,
      roofstylecost: cost
    }
    )
  }


  materialval(value, cost) {
    this.setState({
      componentindex: 5,
      roofmaterial: value,
      materialCost: cost
    })
  }

  qusetionsval(type, floor, angle) {
    this.setState({
      componentindex: 4,
      property_type: type,
      floors: floor,
      roof_pitch: angle

    })
  }



  handlePre(val) {
    if (this.state.componentindex > 1)
      this.setState({ componentindex: this.state.componentindex - 1 })
    alert(this.state.componentindex);
  }

  handleNext() {


    if (this.state.finished == false) {
      this.setState({
        componentindex: this.state.componentindex + 1,
        finished: this.state.componentindex >= 3
      })

      alert(this.state.componentindex);
    }
  }


  stepval(val) {

    this.setState({ componentindex: val })
  }

  render() {
    switch (this.state.componentindex) {
      case 1:
        return (<div ref={(ref) => this._div = ref}>
          {/* <Steps  stepindex={this.state.componentindex}   /> */}

          <App area={this.area1.bind(this)} stepindex={this.state.componentindex} roofaddress={this.state.Roofaddress} />
          {/* <Progress handlePre={this.handlePre.bind(this)} handleNext={this.handleNext.bind(this)} /> */}</div>)
        break;
      case 2:
        return (<div>
          <Steps stepindex={this.state.componentindex} />
          <div className="container-fluid" style={style} >
            <StyleComponent styval={this.stylevalue.bind(this)} back={this.stepval.bind(this)} />

          </div>

          {/* <Progress handlePre={this.handlePre.bind(this)} handleNext={this.handleNext.bind(this)} />*/}</div>)
        break;
      case 3:
        return (<div>
          <Steps stepindex={this.state.componentindex} />
          <div className="container-fluid" >

            <RoofQuestions queval={this.qusetionsval.bind(this)} back={this.stepval.bind(this)}></RoofQuestions>
          </div>
          {/*Progress handlePre={this.handlePre.bind(this)} handleNext={this.handleNext.bind(this)} /> */}


        </div>)
        break;

      case 4:
        return (<div>
          <Steps stepindex={this.state.componentindex} />
          <div className="container-fluid" style={style}   >
            <MaterialComponent matval={this.materialval.bind(this)} back={this.stepval.bind(this)} />

          </div>

          {/*Progress handlePre={this.handlePre.bind(this)} handleNext={this.handleNext.bind(this)} /> */}</div>)
        break;
      case 5:
        return (<div>
          <Steps stepindex={this.state.componentindex} />
          <div className="container-fluid" style={style}   >
            <Areaestimate

              material={this.state.roofmaterial}
              materialcost={this.state.materialCost}
              style={this.state.roofstyle}
              area={this.state.roofarea}
              roofstylecost={this.state.roofstylecost}
              logedin={this.props.loginmode}
              address={this.state.Roofaddress}
              loginmodefun={this.props.loginmodefun}
              coordinates={this.state.coordinates}
              property_type={this.state.property_type}
              floors={this.state.floors}
              roof_pitch={this.state.roof_pitch}
            />

          </div>
          {/*Progress handlePre={this.handlePre.bind(this)} handleNext={this.handleNext.bind(this)} /> */}


        </div>)
        break;

    }
  }
}
export default Main

/*
ReactDOM.render(<Main />, document.getElementById('app'));*/