import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
var CurrencyFormat = require('react-currency-format');
var Loader = require('react-loader');
//var mainurl=require('config.js');
var options = {
    lines: 8,
    length: 20,
    width: 10,
    radius: 20,
    scale: 1.00,
    corners: 1,
    color: '#2e6da4',
    opacity: 0.25,
    rotate: 0,
    height: 7,
    direction: 1,
    speed: 1,
    trail: 60,
    fps: 20,
    zIndex: 2e9,
    top: '50%',
    left: '50%',
    shadow: false,
    hwaccel: false,
    position: 'absolute'
};
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
const margin = {
    marginTop: "10px"
}
const formleft = {
    paddingLeft: 0
}
let Roofprice = 0;
let costofmaterial = 0;
let costoflabour = 0;
let costofcontainer = 0;
let area = 0;
class Areaestimate extends Component {
    constructor(props) {
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
            text: 'Estimerar pris...'
        }
        costofmaterial = parseFloat(this.props.materialcost) * parseFloat(this.props.area);
        costoflabour = parseFloat(this.props.roofstylecost) * parseFloat(this.props.area);
        area = parseFloat(this.props.area);

        if (this.props.material == "Papptak") {
            costofmaterial = 85 * parseFloat(this.props.area);
            if (this.props.area < 70) {
                costoflabour = 220 * parseFloat(this.props.area);
            } else if (this.props.area > 70 && this.props.area < 1000) {
                costoflabour = 190 * parseFloat(this.props.area);
            } else if (this.props.area > 1000) {
                costoflabour = 100 * parseFloat(this.props.area);
            }
        }
        costofcontainer = 8000;
        Roofprice = parseFloat(costofcontainer) + parseFloat(costoflabour) + parseFloat(costofmaterial);
        if (this.props.logedin == true) {
            if (this.props.area == "" || this.props.style == "" || this.props.material == "") {
                alert("Something Went wrong please try again");

            } else {
                this.SendEstimation(this);
            }
        }
    }

    signupsubmit(event) {
        event.preventDefault();
        if (this.state.formErrors.email == "" && this.state.formErrors.name == "" && this.state.formErrors.phone == "" && this.state.formErrors.password == "") {

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
                    if (data.status == 400) {
                        main.setState({
                            responceerrorsignup: data.message
                        })
                    } else if (data.status == 200) {
                        localStorage.setItem('userdata', JSON.stringify(data.data));
                        localStorage.setItem('token', data.token);

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
        //  this.compleatevalidation();
        // alert('A name was submitted: ' + this.state.email+'password'+this.state.email);

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

        fetch('users/userLogin', {
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
                if (data.status == 400) {
                    main.setState({
                        responceerrorlogin: data.message
                    })
                } else if (data.status == 200) {
                    var userdata;

                    main.setState({
                        responceerrorlogin: ""
                    })

                    if (data.data.type == "USER") {
                        userdata =
                            {
                                "type": data.data.type,
                                "estdet": data.data.estdet,
                                "updateon": data.data.updateon,
                                "cratedon": data.data.cratedon,
                                "email": data.data.email, "phone": data.data.phone, "name": data.data.name, "token": data.token
                            }
                        var payload = {
                            area: main.props.area,
                            coordinates: main.props.coordinates,
                            slope: main.props.style,
                            estimatedamount: Roofprice,
                            material: main.props.material,
                            slopecost: main.props.roofstylecost,
                            materialcost: main.props.materialcost,
                            labour: costoflabour,
                            address: main.props.address,
                            email: data.data.email,
                            property_type: main.props.property_type,
                            floors: main.props.floors,
                            roof_pitch: main.props.roof_pitch
                        }
                        fetch('users/estimation', {
                            method: "post",
                            crossDomain: true,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                "Access-Control-Request-Headers": "*",
                                "Access-Control-Request-Method": "*",

                            }, body: 'json=' + JSON.stringify(payload) + '&token=' + data.token
                        })
                            .then(function (response) {
                                return response;
                            })
                            .then(function (response) {
                                return response.json();
                            }).then(function (data) {

                                if (data.status == 400) {
                                    main.setState({
                                        responceerror: data.message
                                    })
                                } else if (data.status == 200) {

                                    main.setState({
                                        responceerror: ""
                                    })
                                }
                            })
                    } else if (data.data.type == "CONTRACTOR") {
                        userdata = {
                            "type": data.data.type,
                            "organization_number": data.data, organization_number,
                            "address": data.data.address,
                            "website": data.data.website,
                            "businessname": data.data.businessname,
                            "updateon": data.data.updateon,
                            "cratedon": data.data.cratedon,
                            "email": data.data.email, "phone": data.data.phone, "name": data.data.name, "token": data.toke
                        }
                    }       //         estimation
                    localStorage.setItem('userdata', JSON.stringify(userdata));
                    localStorage.setItem('token', data.toke);
                    main.setState({
                        userdata: data.data
                    })
                    main.props.loginmodefun(true);
                    //location.href = "/";
                }
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
                phonevalid = value.length == 10;
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
    haveaccountfunction() {
        this.setState({
            haveaccount: !this.state.haveaccount
        })
    }

    SendEstimation() {
        var token = localStorage.getItem("token");
        var email = JSON.parse(localStorage.getItem("userdata")).email;
        var payload = {
            area: this.props.area,
            coordinates: JSON.stringify(this.props.coordinates),
            slope: this.props.style,
            estimatedamount: Roofprice,
            material: this.props.material,
            slopecost: this.props.roofstylecost,
            materialcost: this.props.materialcost,
            labour: costoflabour,
            address: this.props.address,
            email: email

        }


        fetch('users/estimation', {
            method: "post",
            crossDomain: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",

            }, body: 'json=' + JSON.stringify(payload) + '&token=' + token
        })
            .then(function (response) {
                return response;
            })
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                localStorage.setItem('userdata', JSON.stringify(data));

                /* if (data.status == 400) {
                     main.setState({
                         userdata: data.message
                     })
                 } else if (data.status == 200) {
                    alert("dtaasaved");
                  
                 }
 */
            })
    }

    date() {
        this.setState({ date })
    }
    render() {
        if (this.props.logedin == true) {

            this.SendEstimation.bind(this);
            setTimeout(() => {
                this.setState({
                    text: 'Letar leverantörer i ditt område'
                })
            }, 2000);
            setTimeout(() => {
                this.setState({
                    loaded: true
                })
            }, 5000);
            //  console.log(localStorage.getItem("userdata"));
            return (
                <div>
                    {!this.state.loaded ? (
                        <div className="container-fluid">
                            <Loader loaded={this.state.loaded} options={options} className="spinner" />
                            <div className="loaderText"><p>{this.state.text}</p></div>
                        </div>
                    ) : (<div>
                        <div className="container" style={{ marginTop: 20 }} >

                            <div className="col-sm-8" style={{ paddingTop: 0 }}><div id="estimateright">
                                <h2 ><b>Ditt prisförslag är färdigt</b></h2>
                                <h3 id="eststep2"><strong>Adress </strong>: {this.props.address}</h3>
                                <h3 id="eststep2"><strong>Fastighetstyp: <b>{this.props.property_type}</b></strong></h3>
                                <h3 id="eststep2"><strong>Taklutning: <b>{this.props.floors}</b></strong></h3>
                                <h3 id="eststep2"><b>Att byta ditt tak till ett <b>{this.props.material}</b> skulle kosta uppskattningsvis:
</b></h3>
                               


                                <Solarpanel data={this.props.material} />





                                {/*}

            <div>Din kontaktperson kommer att kontakta dig för att berätta mer om fördelarna med att ta hjälp av Digitak för upphandlandet av din takomläggning</div>

            <div class="test4">
                <Contact />
            </div>
            <h2 data-toggle="modal" className="include_estimatn" data-target="#myModal" style={matstyle.h2}>Vad är inkluderat i kostnadsförslaget?</h2>
            <div>
                <p className="view_estimtn" style={matstyle.formmargin} > <Link to="/Profile">Mina takberäkningar</Link></p></div>
                <div class="test4">
                    <Contact/>
                </div>*/}
                                {/*}
            <div id="myModal" className="modal fade" role="dialog">
                <div className="modal-dialog">


                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title cstm_mdtitle">Roof estimaton Includes </h4>
                        </div>
                        <div className="modal-body cstm_mdbody">

                            <h2>Vad är inkluderat i ditt kostnadsförslag</h2>
                            <p><b>Vad baseras kostnadsförslaget på?</b></p>
                            <p>Ditt kostnadsförslag är baserat på dom uppgifter du fyllde i genom vår takberäknare och baseras på följande faktorer:</p>
                            <p><ul><li> Takets storlek 📐</li><li>Takets design ✍️</li>
                            <li>Takets material 🏠</li></ul></p>
                            <p><b>Vad ingår?</b></p>
                            <p><ul>
                                <li>Etablering och byggnadsställning 🚧</li>
                                <li>Material som krävs för din takomläggning 🔨</li>
                                <li>Allt arbete som krävs för etablering, rivning, omläggning och grovstädning. 👷</li>
                                <li>Container 📦</li>
                                <li>Transporter och tippavgifter 🚛</li>

                            </ul></p>
                            <p><b>Vad händer nu?</b></p>
                            <p>Ditt kostnadsförslag är en estimering baserat på de uppgifter vi har om ditt hushåll just nu. Vi kommer att kontakta dig för att ställa uppföljande frågor om ditt tak och du kommer då att erbjudas en kostnadsfri takbesiktning. Efter att vi har gjort en fysisk takgenomgång kommer vi att ge dig en offert på din fastighet som du kan välja att gå vidare med eller avfärda. Inga krav finns på motprestation från köparens sida.</p>





                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>

            */}
                            </div></div>
                            <div className="col-sm-4" ><div id="estimateleft" className="pm_details">
                                <img src="./img/logo.png" />
                                <p className="pro_mng">Din kontaktperson</p>
                                <img src="./img/pro_mng.png" className="img-circle" />
                                <p>Gustav Dafnäs</p>
                                <p>+46763949564</p>
                                <p>info@digitak.se</p>

                            </div></div>

                            <div className="row"><div className="col-sm-8"> <MiddleContent /></div></div>

                            <Gridview
                                area={this.props.area}
                                coordinates={JSON.stringify(this.props.coordinates)}
                                slope={this.props.style}
                                estimatedamount={Roofprice}
                                material={this.props.material}
                                slopecost={this.props.roofstylecost}
                                materialcost={this.props.materialcost}
                                labour={costoflabour}
                                address={this.props.address}
                                email={JSON.parse(localStorage.getItem("userdata")).email}

                            />
                        </div>
                    </div>)
                    }</div>
            )
        } else {
            return (
                <div>
                    <div className="container-fluid bg-white">
                        <div className="shdow_wt">
                            <div className="row ">
                                <div className="col-sm-12 text-center login_txt">
                                    <img src="./img/logo.png" />
                                    <h3>Din prisuppskattning är färdig!</h3>
                                    <h4>Vi har nu genererat din prisuppskattning baserat på följande uppgifter:</h4>

                                </div>
                                <div className="col-sm-12 text-center registrn_add  login_txt">
                                    <p><span className="addres_txt">Adress :</span> {this.props.address}</p>
                                    <p><span className="addres_txt">Fastighetstyp :</span> {this.props.property_type}</p>
                                    <p><span className="addres_txt">Taklutning :</span> {this.props.floors}</p>
                                    <p><span className="addres_txt">Storlek tak :</span>{parseFloat(area.toFixed(1))} kvadratmeter</p>
                                    <p><span className="addres_txt">Takdesign :</span> {this.props.style} </p>
                                    <p><span className="addres_txt">Önskat material :</span>  {this.props.material}</p>
                                    <h4>Vänligen skriv in din e-postadress för att få tillgång till din prisuppskattning</h4>
                                </div>

                            </div>

                            <div className="row form_bottom1">

                                <div className="col-sm-12">

                                    <div className="form_top2"><div >
                                        < GetDetails haveaccountfunction={this.haveaccountfunction.bind(this)}
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
                                <img src="./img/bootm-im.jpg" className="img-responsive" />
                            </div>
                        </div>
                    </div>
                </div>
            )

        }
    }
}


class Solarpanel extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        if (this.props.data == "Solpaneler") {
            return (<div>

                <h4 >{parseFloat(area.toFixed(1))} (m²) <span>Exklusive ROT avdrag</span></h4>
                <div className="separet_width">
                    <h4><img src="./img/check-mark.png" /><b>Solcellspaneler</b> </h4>
                    <h4><img src="./img/check-mark.png" /><b>Installation </b></h4>
                </div>
                <div>Din kontaktperson kommer att kontakta dig för att berätta mer om fördelarna med att ta hjälp av Digitak för upphandlandet av din takomläggning</div>

            </div>)

        } else {
            return (<div>

                <h4 className="price_font"><b> <CurrencyFormat style={{ fontSize: 30 }} value={parseFloat(Roofprice.toFixed(0))} displayType={'text'} thousandSeparator={' '} />
                    <span className="price_separator" style={{ fontSize: 30 }}> SEK</span></b></h4>
                <h4 >{parseFloat(area.toFixed(1))} (m²) <span>Exklusive ROT avdrag</span></h4>
                <div className="separet_width">
                    <h4><img src="./img/check-mark.png" /><b>Arbete</b> </h4>
                    <h4><img src="./img/check-mark.png" /><b>Material </b></h4>
                    <h4><img src="./img/check-mark.png" /><b>Transport & Tippavgifter</b> </h4>
                </div>
                <div>Din kontaktperson kommer att kontakta dig för att berätta mer om fördelarna med att ta hjälp av Digitak för upphandlandet av din takomläggning</div>
            </div>)

        }
    }
}

class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            time: "",
            startDate: ""
        }

    }

    contactdate(event) {
        alert(this.refs.googleInput.value);
        this.setState({
            date: event.target.name
        })
    }

    contacttime(event) {
        this.setState({
            time: event.target.name
        })
    }

    datetimeservice(valdate, valtime, valemail) {
        var valemail = JSON.parse(localStorage.getItem("userdata")).email;
        var token = localStorage.getItem("token");
        var payload = {
            valdate: valdate,
            valtime: valtime,
            email: valemail

        }

        fetch('users/connecttimes', {
            method: "post",
            crossDomain: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",

            }, body: 'json=' + JSON.stringify(payload) + '&token=' + token
        })
            .then(function (response) {
                return response;
            })
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                if (data.status == 400) {
                    main.setState({
                        responceerror: data.message
                    })
                } else if (data.status == 200) {
                    alert(data.message);
                }
            })
    }

    get_date(event) {
        this.setState({
            startDate: event.target.value
        })
    }

    get_time(event) {
        this.setState({
            startDate: event.target.value
        })
    }

    contactfunc(event) {
        event.preventDefault();
        this.datetimeservice(this.state.startDate, this.state.time);
        //console.log(this.refs.dateinput.value + "---" + this.refs.timeInput.value);
        // console.log((new Date(this.state.date)).toString());
    }


    render() {
        return (<div id="contactus" className="row" >
            <div><h3 className="info_contact">Om du vill kan du själv välja en tid som passar dig <br />att bli kontaktad
</h3></div>
            <br />
            <form onSubmit={this.contactfunc.bind(this)}>
                <div className="col-sm-12 text-center">

                    {/* <input type="text" id="datepicker" ref="dateinput" className="form-control" required />
<input type="date"  ref="dateinput" className="form-control" required />
                </div>

                <div className="col-sm-3" ><input type="time" className="form-control" ref="googleInput" title="Formate 12:00:Am/Pm" id="" required /></div>
                <div className="col-sm-2" ><button className="btn btn-primary" type="submit">Reach Us</button>
*/}
                    <span className="valid_dag">Välj dag :</span> <input type="date" ref="dateinput" required="" id="contact-input" onChange={this.get_date.bind(this)} required />
                    <span className="valid_dag">Välj tid :</span>  <select ref="timeinput" className="time-filed" onChange={this.get_time.bind(this)} required>
                        <option value="Tid">Tid</option>
                        <option value="01:00:00">1:00</option>
                        <option value="02:00:00">2:00</option>
                        <option value="03:00:00">3:00</option>
                        <option value="04:00:00">4:00</option>
                        <option value="05:00:00">5:00</option>
                        <option value="06:00:00">6:00</option>
                        <option value="07:00:00">7:00</option>
                        <option value="08:00:00">8:00</option>
                        <option value="09:00:00">9:00</option>
                        <option value="10:00:00">10:0</option>
                        <option value="11:00:00">11:00</option>
                        <option value="12:00:00">12:00</option>
                        <option value="13:00:00">13:00</option>
                        <option value="14:00:00">14:00</option>
                        <option value="15:00:00">15:00</option>
                        <option value="16:00:00">16:00</option>
                        <option value="17:00:00">17:00</option>
                        <option value="18:00:00">18:00</option>
                        <option value="19:00:00">19:00</option>
                        <option value="20:00:00">20:00</option>
                        <option value="21:00:00">21:00</option>
                        <option value="22:00:00">22:00</option>
                        <option value="23:00:00">23:00</option>
                        <option value="24:00:00">24:00</option>
                    </select>
                    <button type="submit" id="contact-input-button" >Boka tid</button></div>


            </form>

        </div>)
    }
}
/*
class GetDetails extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {


        this.props.validateField(event.target.name, event.target.value)
    }

    render() {
        if (this.props.haveaccount) {
            return (

                <form onSubmit={this.props.signupnsubmit} id="signup" style={matstyle.formmargin}>
                    <span className="alert alert-danger" hidden={(this.props.responceerrorsignup == "")}>
                        {this.props.responceerrorsignup}
                    </span>
                    <input type="text" name="name" className="form-control input-namebg" placeholder="Name*" onBlur={this.handleChange.bind(this)} required />

                    <span id="error">{this.props.nameErrors}
                    </span>

                    <input type="text" name="phone" className="form-control input-phonebg" placeholder="Phone*" onBlur={this.handleChange.bind(this)} required />
                    <span id="error">{this.props.PhoneErrors}
                    </span>
                    <input type="email" name="email" className="form-control input-bg" placeholder="Email*" onBlur={this.handleChange.bind(this)} required />

                    <span id="error">{this.props.EmailErrors}
                    </span>
                    <input type="password" name="password" className="form-control input-bg1" placeholder="Password*" onBlur={this.handleChange.bind(this)} required />
                    <span id="error">{this.props.PasswordErrors}
                    </span>



                    <div className="form-group" style={margin}>  <input type="submit" id="buttonnew" className="btn btn-info" value="Estimate" />
                        <button type="btn" className="signup-btn" onClick={this.props.haveaccountfunction.bind(this)}   > Sign in here ?</button></div>
                </form>)

        } else {

            return (
                <form onSubmit={this.props.loginsubmit.bind(this)} id="login" style={matstyle.formmargin}>

                    <div className="alert alert-danger" hidden={(this.props.responceerrorlogin == "")} >
                        {this.props.responceerrorlogin}
                    </div>
                    <input type="email" name="email" placeholder="Email*" className="form-control input-bg" onBlur={this.handleChange.bind(this)} required />

                    <span id="error">{this.props.EmailErrors}
                    </span>
                    <input type="password" placeholder="Password*" className="form-control input-bg1" name="password" onBlur={this.handleChange.bind(this)} required />
                    <span id="error">{this.props.PasswordErrors}
                    </span>
                    {<p className="text-right">  <a href="/Forgotpassword"><u>Forgot Password ?</u> </a></p>}<br />
                    <div> <input type="submit" className='btn' id="buttonnew" value="Login" /> <button className="forgot_log signup-btn" onClick={this.props.haveaccountfunction.bind(this)}  >(or) signup here ? </button></div>

                </form>)
        }
    }
}
*/



// latest code old one commented 

class GetDetails extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {
        this.props.validateField(event.target.name, event.target.value)
    }
    render() {
        return (<form onSubmit={this.props.loginsubmit.bind(this)} id="login" style={matstyle.formmargin}>

            <div className="alert alert-danger" hidden={(this.props.responceerrorlogin == "")} >
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

class MiddleContent extends Component {
    render() {
        return (<div className="middleContent">
            <h4><b>Begär kostnadsfri offert från våra anslutna takläggare</b></h4>
            <p>Om du vill kan vi hjälpa dig att samla in mer detaljerade offerter från våra anslutna takläggare. Genom att klicka “Begär offert” förbinder du dig inte att gå vidare med en eventuell affär. Dina kontaktuppgifter kommer dock skickas till de bolag du önskar offert av. Bolagen kommer därefter att höra av sig till dig och för att boka tid för en offertbesiktning. Vanligtvis är besiktningen inbokad och klar efter två arbetsdagar.
</p>

        </div>)
    }
}

class Gridview extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    Send_details_roofer(id) {
        //  alert(id);
        this.SendRoofdetailsRoofer(id);

        // if(id=='ROOF001')
        // {
        //     var btn=document.getElementById("ROOF001");
        //     btn.setAttribute("disabled", "disabled");
        //     btn.setAttribute("style", "background-color: #ccc;");
        //     btn.innerHTML="Invantär offert...";

        // }else if(id=='ROOF002'){

        //     var btn=document.getElementById("ROOF002");
        //     btn.setAttribute("disabled", "disabled");
        //     btn.setAttribute("style", "background-color: #ccc;");
        //     btn.innerHTML="Invantär offert...";

        // }else if(id=='ROOF003'){
        //     var btn=document.getElementById("ROOF003");
        //     btn.setAttribute("disabled", "disabled");
        //     btn.setAttribute("style", "background-color: #ccc;");
        //     btn.innerHTML="Invantär offert...";

        // }else if(id=='ROOF004'){
        //     //alert(id);
        //     //ReactDOM.refs.ROOF004.value = 'Disabled';
        //   var btn=document.getElementById("ROOF004");
        //   btn.setAttribute("disabled", "disabled");
        //   btn.setAttribute("style", "background-color: #ccc;");
        //   btn.innerHTML="Invantär offert...";

        // }
        // console.log(res)
    }
    SendRoofdetailsRoofer(id) {
        var valemail = JSON.parse(localStorage.getItem("userdata")).email;
        var phone = JSON.parse(localStorage.getItem("userdata")).phone
        var token = localStorage.getItem("token");

        var estimation = {
            phone: phone,
            email: valemail,
            name: JSON.parse(localStorage.getItem("userdata")).name,
            area: this.props.area,
            coordinates: this.props.coordinates,
            material: this.props.material,
            slope: this.props.slope,
            estimatedamount: this.props.estimatedamount,
            slopecost: this.props.slopecost,
            materialcost: this.props.materialcost,
            labour: this.props.materialcost,
            address: this.props.address,
            rooferid: id
            // created_date:{type:Date ,default:Date.now }
        }

        var res = fetch('users/roofers_data', {
            method: "post",
            crossDomain: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",

            }, body: 'json=' + JSON.stringify(estimation) + '&token=' + token
        })
            .then(function (response) {
                return response;
            })
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                if (data.status == 400) {
                    main.setState({
                        responceerror: data.message
                    })
                    return data;
                } else if (data.status == 200) {
                    var btn = document.getElementById(id);
                    btn.setAttribute("disabled", "disabled");
                    btn.setAttribute("style", "background-color: #ccc;");
                    btn.innerHTML = "Inväntar offert...";
                    return data
                    //   ReactDOM.refs.id.value = 'Disabled';

                    //ReactDOM.findDOMNode()
                    // alert(data.message);
                }
            })
    }


    render() {
        return (<div >
            <div className="row">
                <div className="col-sm-2">
                    <img src="./img/gota.png" className="img-responsive tak-image" />
                </div>
                <div className="col-sm-2 header">
                    <p><b>Göta Tak AB</b></p>
                </div>
                <div className="col-sm-5">
                    <p> <img src="./img/check-mark.png" className="tick" />Professionella takläggare sedan 2007</p>
                    <p> <img src="./img/check-mark.png" className="tick" /> Familjeföretag i andra generationen med specialisering på tak</p>
                    <p> <img src="./img/check-mark.png" className="tick" /> Långa garantier på material och arbete</p>
                </div>
                <div className="col-sm-3">
                    <button className="btn btn-primary tak-btn" id="ROOF001" ref="ROOF001" onClick={this.Send_details_roofer.bind(this, 'ROOF001')}>Begär offert</button>
                </div></div>
            <div>
                <hr />
            </div>
            <div className="row">
                <div className="col-sm-2">
                    <img src="./img/laggarna.png" className="img-responsive tak-image" />
                </div>
                <div className="col-sm-2 header">
                    <p><b>JF Takläggarna AB</b></p>
                </div>
                <div className="col-sm-5">
                    <p> <img src="./img/check-mark.png" className="tick" />Professionella takläggare sedan 2011</p>
                    <p> <img src="./img/check-mark.png" className="tick" /> 20 års garanti på material 10 års garanti på arbete</p>
                    <p> <img src="./img/check-mark.png" className="tick" />Stor erfarenhet av att jobba med företag och BRF</p>
                </div>
                <div className="col-sm-3">
                    <button className="btn btn-primary tak-btn" id="ROOF002" ref="ROOF002" onClick={this.Send_details_roofer.bind(this, 'ROOF002')} >Begär offert</button>
                </div></div>
            <hr />
            <div className="row">
                <div className="col-sm-2">
                    <img src="./img/northpower.jpg" className="img-responsive tak-image" />
                </div>
                <div className="col-sm-2 header">
                    <p><b>Northpower Takentrepenader AB</b></p>
                </div>
                <div className="col-sm-5">
                    <p> <img src="./img/check-mark.png" className="tick" />Lång erfarenhet av papptak på allt från villor till industrilokaler</p>
                    <p> <img src="./img/check-mark.png" className="tick" />Marknadens längsta garantier</p>
                </div>
                <div className="col-sm-3">
                    <button className="btn btn-primary tak-btn" id="ROOF003" ref="ROOF003" onClick={this.Send_details_roofer.bind(this, 'ROOF003')} >Begär offert</button>
                </div></div>
            <hr />
            <div className="row">
                <div className="col-sm-2">
                    <img src="./img/dandre.png" className="img-responsive tak-image" />
                </div>
                <div className="col-sm-2 header">
                    <p><b>Danderyds Hantverksgrupp AB</b></p>
                </div>
                <div className="col-sm-5">
                    <p> <img src="./img/check-mark.png" className="tick" />Professionella takläggare sedan 2012  </p>
                    <p> <img src="./img/check-mark.png" className="tick" />150 genomförda takbyten i år </p>
                    <p> <img src="./img/check-mark.png" className="tick" />Långa garantier på material och arbete</p>
                </div>
                <div className="col-sm-3">
                    <button className="btn btn-primary tak-btn" ref="ROOF004" id="ROOF004" onClick={this.Send_details_roofer.bind(this, 'ROOF004')} >Begär offert</button>
                </div></div>
            <div className="row"></div>
        </div>)
    }
}

export default Areaestimate;