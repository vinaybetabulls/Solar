import React, { Component } from 'react';
import { totalmem } from 'os';
const matstyle = {
    padding: 10,
    margin: 5,
    border: "1px solid #ccc",
    textAlign: "center",
    formmargin: { margin: 10, color: "#fff" },
    signup: {
        color: "#5bc0de",
        cursor: "pointer"
    },
    h2: {
        cursor: "pointer"
    }
}

let Roofprice = 0, costofmaterial = 0,
    costoflabour = 0, costofcontainer = 0,
    Area = 0;

class LoginEstimate extends Component {
    constructor(props) {
        window.scrollTo(0, 0);
        super(props);
        this.state = {
            stepIndex: 1,
            finished: false,
            clear: {},
            previous: {},
            next: {},
            haveaccount: false,
            email: '',
            password: '',
            name: '',
            phone: '',
            emailValid: false,
            passwordValid: false,
            formErrors: { email: '', password: '', name: '', phone: '' },
            phonevalid: false,
            namevalid: false,
            loginValid: false,
            signupValid: false,
            rooferrormessage: "",
            responceerror: "",
            responceerrorlogin: "",
            responceerrorsignup: "",
            date: new Date(),
            loaded: false,
            text: 'Estimerar pris...',
        }
        this.changeRoute = this.changeRoute.bind(this);
        costofmaterial = parseFloat(this.props.materialcost) * parseFloat(this.props.area);
        costoflabour = parseFloat(this.props.roofstylecost) * parseFloat(this.props.area);
        //area = parseFloat(this.props.area);
        function degrees_to_radians(degrees) {
            var pi = Math.PI;
            return degrees * (pi / 180);
        }
        var cosangle = Math.cos(degrees_to_radians(25));
        Area = (this.props.area / cosangle);
        if (this.props.material === "Papptak") {
            // costofmaterial = 85 * parseFloat(Area);
            costofmaterial = 85 * parseFloat(Area);
            if (Area < 70) {
                costoflabour = 220 * parseFloat(Area);
            } else if (Area > 70 && Area < 1000) {
                costoflabour = 190 * parseFloat(Area);
            } else if (Area > 1000) {
                costoflabour = 100 * parseFloat(Area);
            }
        }
        costofcontainer = 8000;
        Roofprice = parseFloat(costofcontainer) + parseFloat(costoflabour) + parseFloat(costofmaterial);
        // if (this.props.logedin === true) {
        //     if (this.props.area === "" || this.props.style === "" || this.props.material ==="") {
        //         alert("Something Went wrong please try again");
        //     } else {
        //         this.SendEstimation(this);
        //     }
        // }
        var Total_roof_area= sessionStorage.getItem('roofarea');
        var solar_roof_area = JSON.parse(sessionStorage.getItem('roofAreaPkt')).normalRoofArea;
        var normal_roof_area=Total_roof_area- solar_roof_area;
        var cost_of_solar_roof_tiles = solar_roof_area * this.props.panel_cost;
        var cost_of_normal_roof_tiles = normal_roof_area*this.props.panel_cost;
        var Cost_of_material = cost_of_solar_roof_tiles + cost_of_normal_roof_tiles;
        var labor_cost = Total_roof_area * 250 ;
        var floorPlan = ((this.props.floors).split("plan")[0]).trim();
        var floor = parseInt(floorPlan);
        var skylift=0;
        if(floor <=2) {
            skylift=0;
        }
        else if(floor >= 3){
            skylift = 5200;
        }
        var Cost_of_electrician = 6000;
        var Cost_of_cable = 540;
        var Cost_of_transport = 10000;
        var Cost_of_container = 10000;
        var capcity_price = 0
        var cost_of_invertor =0;
        if( this.props.pannel_name === 'Midsommar soltak') {
            
         cost_of_invertor = Total_roof_area * this.props.pannel_capacity;
        }
        else if(this.props.pannel_name == 'Bendars sunwave palema') {
            cost_of_invertor = Total_roof_area * this.props.pannel_capacity;
        }
            if(cost_of_invertor < 4000 ) {
                capcity_price = 9560
            }
         if(cost_of_invertor>4001 && cost_of_invertor<5000){
                capcity_price = 9660
            }
            if(cost_of_invertor>5001 && cost_of_invertor<7000) {
                capcity_price = 11500
            }
            if(cost_of_invertor>7001 && cost_of_invertor<8000) {
                capcity_price = 11830
            }
            if(cost_of_invertor>8001 && cost_of_invertor<10000) {
                capcity_price = 12760
            }
            if(cost_of_invertor>10001 && cost_of_invertor<15000) {
                capcity_price = 11350
            }
            if(cost_of_invertor>15001 && cost_of_invertor<17000) {
                capcity_price = 11620
            } 
            if(cost_of_invertor>17001 && cost_of_invertor<25000) {
                capcity_price = 16100
            }
            if(cost_of_invertor>25001 && cost_of_invertor<27600) {
                capcity_price = 16100
            }
            if(cost_of_invertor>27600) {
                capcity_price = 20000
            }
        
        
        var Cost_of_solar_roof_installation_before_tax = Cost_of_material + cost_of_invertor + Cost_of_cable + Cost_of_container + Cost_of_transport + Cost_of_electrician + skylift;
        var Digisolar_commission = (Cost_of_solar_roof_installation_before_tax * 15) / 100;
        if(Digisolar_commission > 15000) {
            Digisolar_commission = 15000;
        }
        var Cost_of_solar_roof_installatio_with_commission = Cost_of_solar_roof_installation_before_tax + Digisolar_commission;
        var Tax_on_solar_roof_installation = (Cost_of_solar_roof_installatio_with_commission * 25) / 100;
        var Cost_of_solar_roof_installation_after_tax = Cost_of_solar_roof_installatio_with_commission + Tax_on_solar_roof_installation;
        var Display_cost_of_solar_roof_installation = (Cost_of_solar_roof_installation_after_tax * 93) / 100;
        var Solar_incentives = (Display_cost_of_solar_roof_installation * 20) / 100;
        var Battery_cost = 84485;

        var Tax_on_battery = (84485 * 25) / 100
        
        var Battery_cost_after_tax = Battery_cost + Tax_on_battery;
        var Battery_incentives = 50000;
        var Cost_of_solar_roof_installation_after_incentives =Display_cost_of_solar_roof_installation - Solar_incentives;
        var Cost_of_battery_after_incentives = Battery_cost_after_tax - Battery_incentives;
        var Final_cost = Cost_of_solar_roof_installation_after_incentives + Cost_of_battery_after_incentives;
    }

    loginsubmit(event) {
        event.preventDefault();
        const main = this;
        var payload = {
            email: this.state.email,
            phone: this.state.phone,
            // password: this.state.password,
            password: '123456',
            type: 'USER'
        }

        console.log(JSON.stringify(payload))
        fetch('http://localhost:80/users/userLogin', {
            method: "post", headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*"
            }, body: 'json=' + JSON.stringify(payload)
        })
            .then(function (response) {
                return response;
            })
            .then(function (response) {
                console.log(response)
                return response.json();
            }).then(function (data) {
                if (data.status === 400) {
                    main.setState({
                        responceerrorlogin: data.message
                    })
                } else if (data.status === 200) {
                    var userdata;
                    main.setState({
                        responceerrorlogin: ""
                    })

                    if (data.data.type === "USER") {
                        userdata =
                            {
                                "type": data.data.type,
                                "estdet": data.data.estdet,
                                "updateon": data.data.updateon,
                                "cratedon": data.data.cratedon,
                                "email": data.data.email, "phone": data.data.phone, "name": data.data.name, "token": data.token
                            }
                        // var payload = {
                        //     area: main.props.area,
                        //     coordinates: main.props.coordinates,
                        //     slope: main.props.style,
                        //     estimatedamount: Roofprice,
                        //     material: main.props.material,
                        //     slopecost: main.props.roofstylecost,
                        //     materialcost: main.props.materialcost,
                        //     labour: costoflabour,
                        //     address: main.props.address,
                        //     email: data.data.email,
                        //     property_type: main.props.property_type,
                        //     floors: main.props.floors,
                        //     roof_pitch: main.props.roof_pitch,
                        //     power: main.props.power,
                        //     e_consumption: main.props.e_consumption
                        // }
                        // fetch('users/estimation', {
                        //     method: "post",
                        //     crossDomain: true,
                        //     headers: {
                        //         'Content-Type': 'application/x-www-form-urlencoded',
                        //         "Access-Control-Request-Headers": "*",
                        //         "Access-Control-Request-Method": "*",

                        //     }, body: 'json=' + JSON.stringify(payload) + '&token=' + data.token
                        // }).then(function (response) {
                        //     return response;
                        // }).then(function (response) {
                        //     return response.json();
                        // }).then(function (data) {

                        //     if (data.status === 400) {
                        //         main.setState({
                        //             responceerror: data.message
                        //         })
                        //     } else if (data.status === 200) {

                        //         main.setState({
                        //             responceerror: ""
                        //         })
                        //     }
                        // })
                    } else if (data.data.type === "CONTRACTOR") {
                        userdata = {
                            "type": data.data.type,
                            "organization_number": data.data, organization_number,
                            "address": data.data.address,
                            "website": data.data.website,
                            "businessname": data.data.businessname,
                            "updateon": data.data.updateon,
                            "cratedon": data.data.cratedon,
                            "email": data.data.email, "phone": data.data.phone, "name": data.data.name, "token": data.token
                        }
                    }       //         estimation
                    localStorage.setItem('userdata', JSON.stringify(userdata));
                    localStorage.setItem('token', data.token);
                    main.setState({
                        userdata: data.data
                    })
                    main.props.loginmodefun(true);
                    main.changeRoute(main);
                }
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    changeRoute() {
        this.props.areaEstimetack(this);
    }

    signupsubmit(event) {
        event.preventDefault();
        if (this.state.formErrors.email === "" && this.state.formErrors.name === "" && this.state.formErrors.phone === "" && this.state.formErrors.password === "") {

            const main = this;
            var est = {
                area: this.props.area,
                coordinates: this.props.coordinates,
                slope: this.props.style,
                estimatedamount: Roofprice,
                material: this.props.material,
                slopecost: this.props.roofstylecost,
                materialcost: this.props.materialcost,
                labour: costoflabour,
                address: this.props.address
            }

            var payload = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phone: this.state.phone,
                type: 'USER',
                estdet: est
            }

            fetch(`users/registeruser`, {
                method: "post", headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Access-Control-Request-Headers": "*",
                    "Access-Control-Request-Method": "*"
                }, body: 'json=' + JSON.stringify(payload)
            })
                .then(function (response) {
                    return response;
                })
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    if (data.status === 400) {
                        main.setState({
                            responceerrorsignup: data.message
                        })
                    } else if (data.status === 200) {
                        localStorage.setItem('userdata', JSON.stringify(data.data));
                        localStorage.setItem('token', data.data.token);

                        main.setState({
                            userdata: data.data,
                            responceerrorsignup: ""
                        })
                        main.props.loginmodefun(true);
                    }
                })
        } else {
            alert("Please Fill All Mandatory Fields ");
        }
    }

    haveaccountfunction() {
        this.setState({
            haveaccount: !this.state.haveaccount
        })
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let passwordValid = this.state.passwordValid;
        let phonevalid = this.state.phonevalid;
        let namevalid = this.state.namevalid;
        let emailValid = this.state.emailValid;

        switch (fieldName) {
            case 'email':
                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                emailValid = value.length >= 6;
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                this.setState({ formErrors: fieldValidationErrors, emailValid: emailValid, email: value });
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                this.setState({ formErrors: fieldValidationErrors, passwordValid: passwordValid, password: value });
                break;
            case 'phone':
                phonevalid = value.length === 10;
                fieldValidationErrors.phone = phonevalid ? '' : 'phone number  is too short';
                this.setState({ formErrors: fieldValidationErrors, phonevalid: phonevalid, phone: value });
                break;
            case 'name':
                namevalid = value.length >= 6;
                fieldValidationErrors.name = namevalid ? '' : ' is too short';
                this.setState({ formErrors: fieldValidationErrors, namevalid: namevalid, name: value });
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                <div className="container-fluid bg-white">
                    <div className="shdow_wt">
                        <div className="row ">
                            <div className="col-sm-12 text-center login_txt">
                                <img src="./img/disolar_logo_black.png" alt='logo' />
                                <h3>Din prisuppskattning är färdig!</h3>
                                <h4>Vi har nu genererat din prisuppskattning baserat på följande uppgifter:</h4>
                            </div>
                            <div className="col-sm-12 text-center registrn_add  login_txt">
                                <p><span className="addres_txt">Adress :</span> {this.props.address}</p>
                                <p><span className="addres_txt">Fastighetstyp :</span> {this.props.property_type}</p>
                                <p><span className="addres_txt">Taklutning :</span> {this.props.roof_pitch} °</p>
                                <p><span className="addres_txt">Takmaterial :</span>  {this.props.material}</p>
                                <p><span className="addres_txt">Årlig elförbrukning :</span> {this.props.e_consumption}</p>
                                <p><span className="addres_txt">Huvudsäkring :</span> {this.props.power}</p>
                                <h4>Vänligen skriv in din e-postadress för att få tillgång till din prisuppskattning</h4>
                            </div>
                        </div>
                        <div className="row form_bottom1">
                            <div className="col-sm-12">
                                <div className="form_top2"><div >
                                    <GetDetails haveaccountfunction={this.haveaccountfunction.bind(this)}
                                        haveaccount={this.state.haveaccount}
                                        loginsubmit={this.loginsubmit.bind(this)}
                                        signupnsubmit={this.signupsubmit.bind(this)}
                                        responceerror={this.state.responceerror}
                                        responceerrorlogin={this.state.responceerrorlogin}
                                        responceerrorsignup={this.state.responceerrorsignup}
                                        validateField={this.validateField.bind(this)}
                                    /></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="btmimg">
                            <img src="./img/bootm-im.jpg" alt='bottom' className="img-responsive" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class GetDetails extends Component {
    handleChange(event) {
        this.props.validateField(event.target.name, event.target.value)
    }

    render() {
        return (<form onSubmit={this.props.loginsubmit.bind(this)} id="login" style={matstyle.formmargin}>
            <div className="alert alert-danger" hidden={(this.props.responceerrorlogin === "")} >
                {this.props.responceerrorlogin}
            </div>
            <input type="email" name="email" placeholder="E-postadress*" className="form-control input-bg" onBlur={this.handleChange.bind(this)} required />

            <span id="error">{this.props.EmailErrors}
            </span>
            <input type="text" name="phone" className="form-control input-phonebg" placeholder="Telefonnummer*" onBlur={this.handleChange.bind(this)} required />
            <span id="error">{this.props.PhoneErrors}
            </span>
            {/*} <input type="password" placeholder="Password*" className="form-control input-bg1" name="password" onBlur={this.handleChange.bind(this)} required />
        <span id="error">{this.props.PasswordErrors}
    </span> 
        {<p className="text-right">  <a href="/Forgotpassword"><u>Forgot Password ?</u> </a></p>}*/}<br />
            <div> <input type="submit" className='form-control btn-primary' value="Vidare" /></div>

        </form>)
    }
}
export default LoginEstimate;