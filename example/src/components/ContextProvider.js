
import React, { Component } from 'react';
import Context from './Context';

class ContextProvider extends Component {
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
            panelsCount: ''
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

    materialval(value, cost) {
        sessionStorage.setItem('materialCost', cost);
        sessionStorage.setItem('roofmaterial', value);
        sessionStorage.setItem('componentindex', 4);
        window.location.href = "/#steg4"
        this.setState({
            componentindex: 4,
            roofmaterial: sessionStorage.getItem('roofmaterial'),
            materialCost: sessionStorage.getItem('materialCost'),
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

    panelTypes(panel, battery, count, packetName) {
        sessionStorage.setItem('panel', panel);
        sessionStorage.setItem('battery', battery);
        sessionStorage.setItem('panelsCount', count);
        sessionStorage.setItem('packetName', packetName);
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
                panelsCount: sessionStorage.getItem('panelsCount')

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
        return (
            <Context.Provider value={{
                state: this.state,
                actions: {
                    qusetionsval: this.qusetionsval,
                    stepval: this.stepval,
                    materialval: this.materialval,
                    panelTypes: this.panelTypes,
                    areaEstimetack: this.areaEstimetack,
                    matquestionval: this.matquestionval
                }
            }}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default ContextProvider;