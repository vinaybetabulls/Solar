import React, { Component } from 'react';
import App from './mapcomponent';
import Steps from './cstepper';
import MaterialComponent from './materialComponent';
import Areaestimate from './areaestimate';
import RoofQuestions from './roof_questions';
import MaterialQuestions from './material_questions';
import LoginEstimate from './loginEstimation';
import PanelTypes from './panelTypes';
import Provider from './components/ContextProvider';

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
      e_consumption: '',
      power: '',
      location: '',
      panel: '',
      battery: '',
      panelsCount: '',
      surfaceDirection: '',
      annualoutput: ''
    }
  }

  componentWillMount() {
    var index = sessionStorage.getItem('componentindex');
    if (index && index !== '' && index !== 'undefined' && index !== 'null') {
      this.setState({
        componentindex: index,
        location: ''
      });
    } else {
      sessionStorage.setItem('componentindex', 1);
      this.setState({
        componentindex: 1,
        location: ''
      });
    }
  }

  area1(v, address, coordinates) {
    var json = coordinates;
    var obj = JSON.parse(json);
    var coordinate = obj.map(function (o, v) {
      return Math.round(parseFloat(o));
    });
    sessionStorage.setItem('coordinates', coordinate.toString());
    sessionStorage.setItem('Roofaddress', address);
    sessionStorage.setItem('roofarea', v);
    sessionStorage.setItem('componentindex', 2);
    window.location.href = "/#steg2";
    this.setState({
      location: '/#steg2',
      componentindex: 2,
      roofarea: v,
      Roofaddress: address,
      coordinates: coordinates
    })
  }

  qusetionsval(type, floor, angle) {
    sessionStorage.setItem('property_type', type);
    sessionStorage.setItem('floors', floor);
    sessionStorage.setItem('roof_pitch', angle);
    sessionStorage.setItem('componentindex', 3);
    window.location.href = "/#steg3"
    this.setState({
      componentindex: 3,
      property_type: type,
      floors: floor,
      roof_pitch: angle,
      location: "/#steg3"
    })
  }

  materialval(value, cost, direction) {
    sessionStorage.setItem('materialCost', cost);
    sessionStorage.setItem('roofmaterial', value);
    sessionStorage.setItem('surfaceDirection', direction);
    sessionStorage.setItem('componentindex', 4);
    window.location.href = "/#steg4"
    this.setState({
      componentindex: 4,
      roofmaterial: sessionStorage.getItem('roofmaterial'),
      materialCost: sessionStorage.getItem('materialCost'),
      surfaceDirection: sessionStorage.getItem('surfaceDirection'),
      location: "/#steg4"
    })
  }

  matquestionval(type, floor) {
    sessionStorage.setItem('e_consumption', type);
    sessionStorage.setItem('power', floor);
    sessionStorage.setItem('componentindex', 5);
    window.location.href = "/#steg5";
    this.setState({
      componentindex: 5,
      e_consumption: sessionStorage.getItem('e_consumption'),
      power: sessionStorage.getItem('power'),
      location: "/#steg5"
    })
  }

  panelTypes(panel, battery, count, packetName, annualoutput) {
    sessionStorage.setItem('panel', panel);
    sessionStorage.setItem('battery', battery);
    sessionStorage.setItem('panelsCount', count);
    sessionStorage.setItem('packetName', packetName);
    sessionStorage.setItem('annualoutput', annualoutput);
    if (this.props.loginmode) {
      sessionStorage.setItem('componentindex', 7);
      this.areaEst = this.areaEstimetack.bind(this);
      this.areaEst(this);
      this.setState({
        componentindex: 7,
        e_consumption: sessionStorage.getItem('e_consumption'),
        power: sessionStorage.getItem('power'),
        roofmaterial: sessionStorage.getItem('roofmaterial'),
        materialCost: sessionStorage.getItem('materialCost'),
        Roofaddress: sessionStorage.getItem('Roofaddress'),
        coordinates: sessionStorage.getItem('coordinates'),
        roofarea: sessionStorage.getItem('roofarea'),
        property_type: sessionStorage.getItem('property_type'),
        floors: sessionStorage.getItem('floors'),
        roof_pitch: sessionStorage.getItem('roof_pitch'),
        panel: sessionStorage.getItem('panel'),
        battery: sessionStorage.getItem('battery'),
        panelsCount: sessionStorage.getItem('panelsCount'),
        annualoutput: sessionStorage.getItem('annualoutput')
      })
    } else {
      sessionStorage.setItem('componentindex', 6);
      window.location.href = "/#steg6",
        this.setState({
          componentindex: 6,
          e_consumption: sessionStorage.getItem('e_consumption'),
          power: sessionStorage.getItem('power'),
          roofmaterial: sessionStorage.getItem('roofmaterial'),
          materialCost: sessionStorage.getItem('materialCost'),
          Roofaddress: sessionStorage.getItem('Roofaddress'),
          coordinates: sessionStorage.getItem('coordinates'),
          roofarea: sessionStorage.getItem('roofarea'),
          property_type: sessionStorage.getItem('property_type'),
          floors: sessionStorage.getItem('floors'),
          roof_pitch: sessionStorage.getItem('roof_pitch'),
          panel: sessionStorage.getItem('panel'),
          battery: sessionStorage.getItem('battery'),
          panelsCount: sessionStorage.getItem('panelsCount'),
          roofAreaPkt: JSON.parse(sessionStorage.getItem('roofAreaPkt')),
          location: "/#steg6"
        })
    }
  }

  areaEstimetack() {

    window.location.href = "/#tack";
    sessionStorage.setItem('componentindex', 7);
    this.setState({
      componentindex: 6,
      location: "/#tack",
      roofmaterial: sessionStorage.getItem('roofmaterial'),
      materialCost: sessionStorage.getItem('materialCost'),
      Roofaddress: sessionStorage.getItem('Roofaddress'),
      coordinates: sessionStorage.getItem('coordinates'),
      roofstyle: sessionStorage.getItem('roofstyle'),
      roofstylecost: sessionStorage.getItem('roofstylecost'),
      roofarea: sessionStorage.getItem('roofarea'),
      property_type: sessionStorage.getItem('property_type'),
      floors: sessionStorage.getItem('floors'),
      roof_pitch: sessionStorage.getItem('roof_pitch')
    });
  }

  handlePre(val) {
    if (this.state.componentindex > 1)
      this.setState({ componentindex: this.state.componentindex - 1 })
  }

  handleNext() {
    if (this.state.finished == false) {
      this.setState({
        componentindex: this.state.componentindex + 1,
        finished: this.state.componentindex >= 7
      })
    }
  }

  stepval(val) {
    if (val === 1) {
      window.location.href = "/";
    } else {
      window.location.href = "/#steg" + val;
      this.setState({ location: "/#steg" + val, componentindex: val })
    }
    sessionStorage.setItem('componentindex', val);
  }


  render() {
    switch (window.location.hash) {
      case '':
        sessionStorage.setItem('componentindex', 1);
        return (
          <div ref={(ref) => this._div = ref}>
            <Steps stepindex={parseInt(sessionStorage.getItem('componentindex')) + 1} />
            <App area={this.area1.bind(this)} stepindex={this.state.componentindex} roofaddress={(sessionStorage.getItem('Roofaddress') === null) ? this.state.Roofaddress : sessionStorage.getItem('Roofaddress')} />
          </div>
        )
      case '/':
        return (<div ref={(ref) => this._div = ref}>
          <Steps stepindex={parseInt(sessionStorage.getItem('componentindex')) + 1} />
          <App area={this.area1.bind(this)} stepindex={this.state.componentindex} roofaddress={(sessionStorage.getItem('Roofaddress') === null) ? this.state.Roofaddress : sessionStorage.getItem('Roofaddress')} />
        </div>)
      case '/#':
        return (<div ref={(ref) => this._div = ref}>
          <Steps stepindex={parseInt(sessionStorage.getItem('componentindex')) + 1} />
          <App area={this.area1.bind(this)} stepindex={this.state.componentindex} roofaddress={(sessionStorage.getItem('Roofaddress') === null) ? this.state.Roofaddress : sessionStorage.getItem('Roofaddress')} />
        </div>)
      case '#steg2':
        sessionStorage.setItem('componentindex', 2);
        return (
          <Provider>
            <Steps stepindex={parseInt(sessionStorage.getItem('componentindex')) + 1} />
            <div className="container-fluid panding_no" >
              <RoofQuestions />
            </div>
          </Provider>
        )
      case '#steg3':
        sessionStorage.setItem('componentindex', 3);
        return (
          <Provider>
            <React.Fragment>
              <Steps stepindex={parseInt(sessionStorage.getItem('componentindex')) + 1} />
              <div className="container-fluid" style={style}   >
                <MaterialComponent matval={this.materialval.bind(this)} back={this.stepval.bind(this)} />
              </div>
            </React.Fragment>
          </Provider>
        )
      case '#steg4':
        sessionStorage.setItem('componentindex', 4);
        return (
          <Provider>
            <React.Fragment>
              <Steps stepindex={parseInt(sessionStorage.getItem('componentindex')) + 1} />
              <div className="container-fluid" style={style}   >
                <MaterialQuestions matquestionval={this.matquestionval.bind(this)} back={this.stepval.bind(this)} />
              </div>
            </React.Fragment>
          </Provider>
        )

      case '#steg5':
        sessionStorage.setItem('componentindex', 5);
        return (<Provider>
          <React.Fragment>
            <Steps stepindex={parseInt(sessionStorage.getItem('componentindex')) + 1} />
            <div className="container-fluid stegs_map" style={style}   >
              <PanelTypes roofarea={(this.state.roofarea != '' && this.state.roofarea != 0) ? this.state.roofarea : sessionStorage.getItem('roofarea')} e_consumption={(this.state.e_consumption != '' && typeof this.state.e_consumption != 'undefined') ? this.state.e_consumption : sessionStorage.getItem('e_consumption')}
                panelTypes={this.panelTypes.bind(this)} back={this.stepval.bind(this)}
                panel={(this.state.panel != '' && typeof this.state.panel != 'undefined') ? this.state.panel : sessionStorage.getItem('panel')}
                e_consumption={(this.state.e_consumption != '' && typeof this.state.e_consumption != 'undefined') ? this.state.e_consumption : sessionStorage.getItem('e_consumption')}
                roof_pitch={(this.state.roof_pitch != '' && typeof this.state.roof_pitch != 'undefined') ? this.state.roof_pitch : sessionStorage.getItem('roof_pitch')}
                surfaceDirection={(this.state.surfaceDirection != '' && typeof this.state.surfaceDirection != 'undefined') ? this.state.surfaceDirection : sessionStorage.getItem('surfaceDirection')}
                panelsCount={(this.state.panelsCount != '' && typeof this.state.panelsCount != 'undefined') ? this.state.panelsCount : sessionStorage.getItem('panelsCount')}
                location={(sessionStorage.getItem('Roofaddress') === null) ? this.state.Roofaddress : sessionStorage.getItem('Roofaddress')}
              />
            </div>
          </React.Fragment>
        </Provider>)
      case '#steg6':
        sessionStorage.setItem('componentindex', 6);
        if (this.props.loginmode === false) {
          return (<Provider>
            <React.Fragment>
              <Steps stepindex={parseInt(sessionStorage.getItem('componentindex')) + 1} />
              <div className="container-fluid" style={style}>
                {alert(this.props.panel_cost)}
                <LoginEstimate
                  location={this.state.location}
                  material={(this.state.roofmaterial != '' && typeof this.state.roofmaterial != 'undefined') ? this.state.roofmaterial : sessionStorage.getItem('roofmaterial')}
                  materialcost={(this.state.materialCost != '' && this.state.materialCost != 0) ? this.state.materialCost : sessionStorage.getItem('materialCost')}
                  area={(this.state.roofarea != '' && this.state.roofarea != 0) ? this.state.roofarea : sessionStorage.getItem('roofarea')}
                  logedin={this.props.loginmode}
                  address={this.state.Roofaddress != '' ? this.state.Roofaddress : sessionStorage.getItem('Roofaddress')}
                  loginmodefun={this.props.loginmodefun}
                  coordinates={this.state.coordinates != '' ? this.state.coordinates : sessionStorage.getItem('coordinates')}
                  property_type={(this.state.property_type != '' && typeof this.state.property_type != 'undefined') ? this.state.property_type : sessionStorage.getItem('property_type')}
                  floors={(this.state.floors != '' && typeof this.state.floors != 'undefined') ? this.state.floors : sessionStorage.getItem('floors')}
                  roof_pitch={(this.state.roof_pitch != '' && typeof this.state.roof_pitch != 'undefined') ? this.state.roof_pitch : sessionStorage.getItem('roof_pitch')}
                  e_consumption={(this.state.e_consumption != '' && typeof this.state.e_consumption != 'undefined') ? this.state.e_consumption : sessionStorage.getItem('e_consumption')}
                  power={(this.state.power != '' && typeof this.state.power != 'undefined') ? this.state.power : sessionStorage.getItem('power')}
                  areaEstimetack={this.areaEstimetack.bind(this)}
                  style={this.state.roofstyle}
                  roofstylecost={this.state.roofstylecost}
                  panel={(this.state.panel != '' && typeof this.state.panel != 'undefined') ? this.state.panel : sessionStorage.getItem('panel')}
                  battery={(this.state.battery != '' && typeof this.state.battery != 'undefined') ? this.state.battery : sessionStorage.getItem('battery')}
                  panelsCount={(this.state.panelsCount != '' && typeof this.state.panelsCount != 'undefined') ? this.state.panelsCount : sessionStorage.getItem('panelsCount')}
                  surfaceDirection={(this.state.surfaceDirection != '' && typeof this.state.surfaceDirection != 'undefined') ? this.state.surfaceDirection : sessionStorage.getItem('surfaceDirection')}
                  roofAreaPkt= {(JSON.parse(sessionStorage.getItem('roofAreaPkt')))}
                  panel_cost= {parseInt(sessionStorage.getItem('panel_cost'))}
                  pannel_name = {sessionStorage.getItem('pannel_name')}
                  pannel_capacity = {sessionStorage.getItem('pannel_capacity')}
                  battery = {sessionStorage.getItem('battery')}
                  solarIncentives = {sessionStorage.getItem('solarIncentives')}
                  batteryIncentvies = {sessionStorage.getItem('battbatteryIncentiveser')}
                  finalCost = {sessionStorage.getItem('final_cost')}
                />
              </div>
            </React.Fragment>
          </Provider>)
        } else {
          this.panelTypes.bind(this);
        }

      case '#tack':
        sessionStorage.setItem('componentindex', 7);
        return (
          <Provider>
            <React.Fragment>
              <Steps stepindex={parseInt(sessionStorage.getItem('componentindex')) + 1} />
              <div className="container-fluid panding_no" style={{ marginTop: '20px' }}   >
                <Areaestimate
                  location={this.state.location}
                  material={(this.state.roofmaterial != '' && typeof this.state.roofmaterial != 'undefined') ? this.state.roofmaterial : sessionStorage.getItem('roofmaterial')}
                  materialcost={(this.state.materialCost != '' && this.state.materialCost != 0) ? this.state.materialCost : sessionStorage.getItem('materialCost')}
                  area={(this.state.roofarea != '' && this.state.roofarea != 0) ? this.state.roofarea : sessionStorage.getItem('roofarea')}
                  logedin={this.props.loginmode}
                  address={this.state.Roofaddress != '' ? this.state.Roofaddress : sessionStorage.getItem('Roofaddress')}
                  loginmodefun={this.props.loginmodefun}
                  coordinates={this.state.coordinates != '' ? this.state.coordinates : sessionStorage.getItem('coordinates')}
                  property_type={(this.state.property_type != '' && typeof this.state.property_type != 'undefined') ? this.state.property_type : sessionStorage.getItem('property_type')}
                  floors={(this.state.floors != '' && typeof this.state.floors != 'undefined') ? this.state.floors : sessionStorage.getItem('floors')}
                  roof_pitch={(this.state.roof_pitch != '' && typeof this.state.roof_pitch != 'undefined') ? this.state.roof_pitch : sessionStorage.getItem('roof_pitch')}
                  e_consumption={(this.state.e_consumption != '' && typeof this.state.e_consumption != 'undefined') ? this.state.e_consumption : sessionStorage.getItem('e_consumption')}
                  power={(this.state.power != '' && typeof this.state.power != 'undefined') ? this.state.power : sessionStorage.getItem('power')}
                  areaEstimetack={this.areaEstimetack.bind(this)}
                  style={this.state.roofstyle}
                  roofstylecost={this.state.roofstylecost}
                  componentindex={sessionStorage.getItem('componentindex')}
                  panel={(this.state.panel != '' && typeof this.state.panel != 'undefined') ? this.state.panel : sessionStorage.getItem('panel')}
                  battery={(this.state.battery != '' && typeof this.state.battery != 'undefined') ? this.state.battery : sessionStorage.getItem('battery')}
                  panelsCount={(this.state.panelsCount != '' && typeof this.state.panelsCount != 'undefined') ? this.state.panelsCount : sessionStorage.getItem('panelsCount')}
                  packetName={sessionStorage.getItem('packetName')}
                  surfaceDirection={(this.state.surfaceDirection != '' && typeof this.state.surfaceDirection != 'undefined') ? this.state.surfaceDirection : sessionStorage.getItem('surfaceDirection')}
                  annualoutput={(this.state.annualoutput != '' && typeof this.state.annualoutput != 'undefined') ? this.state.annualoutput : sessionStorage.getItem('annualoutput')}
                  roofaddress={(sessionStorage.getItem('Roofaddress') === null) ? this.state.Roofaddress : sessionStorage.getItem('Roofaddress')}
                  packetName={sessionStorage.getItem('packetName')}
                  
                  pannel_capacity = {sessionStorage.getItem('pannel_capacity')}
                  battery1 = {sessionStorage.getItem('battery')}
                  solarIncentives = {sessionStorage.getItem('solarIncentives')}
                  batteryIncentvies = {sessionStorage.getItem('battbatteryIncentiveser')}
                  finalCost = {sessionStorage.getItem('final_cost')}
                />
              </div>
            </React.Fragment>
          </Provider>
        )
      default:
        return (
          <Provider>
            <React.Fragment>
              <Steps stepindex={parseInt(sessionStorage.getItem('componentindex')) + 1} />
              <App area={this.area1.bind(this)} stepindex={this.state.componentindex} roofaddress={this.state.Roofaddress} />
            </React.Fragment>
          </Provider>
        )
    }
  }
}
export default Main