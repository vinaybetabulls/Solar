import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

//var mainurl=require('../config.js');

const formleft = {
    paddingLeft: 0
}


class Login extends Component {
    constructor(props) {
        super(props);
        // this.state = { email: '', password: '', emailValid: false, passwordValid: false, formErrors: { email: '', password: '' } };

        this.handleChange = this.handleChange.bind(this);
        //  this.loginsubmit = this.loginsubmit.bind(this);
    }

    handleChange(event) {


        this.props.validateField(event.target.name, event.target.value)

        //this.setState({[event.target.name]: event.target.value}); 
        /* console.log(event.target.name);
                   console.log(event.target.value);

*/
        // console.log(this.props.state);
        //this.setState({ email: event.target.value, name: event.target.name });
        //validateField(event.target.name,event.target.value);
        //this.setState([event.target.name])this.validateField(event.target.name, event.target.value)
        //console.log(:event.target.value,this.state.formErrors);
        //  alert(event.target.name);

    }
    /*
        loginsubmit(event) {
            this.compleatevalidation();
            // alert('A name was submitted: ' + this.state.email+'password'+this.state.email);
            event.preventDefault();
        }
    */
    loginvalidationverify() {
        if (this.state.emailValid && this.state.passwordValid) {
            console.log("success");
        }
    }



    render() {
        return (
            <form onSubmit={this.props.loginsubmit.bind(this)} id="login">
                <h3>Login</h3>
                <input type="email" name="email" placeholder="Email*" className="form-control input-bg" onBlur={this.handleChange.bind(this)} />


                <input type="password" placeholder="Password*" className="form-control input-bg1" name="password" onBlur={this.handleChange.bind(this)} />

                <p className="text-right">  <a href=""><u>Forgot Password ?</u> </a></p>
                <div> <input type="submit" className='btn btn-info' id="buttonnew" value="Login" /> (or ) <a href="">signup here ? </a></div>

            </form>
        )
    }
}



class Signup extends Component {
    constructor(props) {
        super(props);

      //  console.log(this.props)
    }

    handleChange(event) {


        this.props.validateField(event.target.name, event.target.value)
    }

    render() {


        return (

            <form onSubmit={this.props.signupnsubmit} id="signup" className="form-horizontal ">
                

    {/* <div className="alert alert-danger" hidden={(this.props.responseerror=="")}> 
    {this.props.responseerror}
  </div>*/}
                <input type="text" name="name" className="form-control input-namebg" placeholder="Name*"  onBlur={this.handleChange.bind(this)} required/>

                <span id="error">{this.props.nameErrors}
                </span>

                <input type="text" name="phone" className="form-control input-phonebg" placeholder="Phone*" onBlur={this.handleChange.bind(this)} required/>
                 <span id="error">{this.props.PhoneErrors}
                </span>
                <input type="email" name="email" className="form-control input-bg" placeholder="Email*" onBlur={this.handleChange.bind(this)} required/>

                  <span id="error">{this.props.EmailErrors}
                </span>
                <input type="password" name="password" className="form-control input-bg1" placeholder="Password*" onBlur={this.handleChange.bind(this)} required/>
                <span id="error">{this.props.PasswordErrors}
                </span>





                <div> <input type="checkbox" required/>   <label>I Agree to <a href="">Terms & Conditions</a></label></div>

<br/><div >
    <input type="submit" id="buttonnew"  className="btn btn-info" value="Signup"   disabled={(this.props.nameErrors=="" && this.props.EmailErrors=="" && this.props.PhoneErrors=="" && this.props.PasswordErrors=="") ? false : true   } />
                <Link to="login"><button type="btn" className="signup-btn">Sign in here</button> </Link>
</div>
                <br/>
            </form>



        );
    }

}



class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            phone: '',
            emailValid: false,
            passwordValid: false,
            formErrors: { email: '', password: '', name: '', phone: '' },
            phonevalid: false,
            namevalid: false,
            loginValid:false,
            signupValid:false,
            responseerror:""
        };
    }

    loginsubmit(event) {
       // this.compleatevalidation();
        // alert('A name was submitted: ' + this.state.email+'password'+this.state.email);
        event.preventDefault();



    }

    signupsubmit(event) {
        event.preventDefault();
        


if(this.state.formErrors.email=="" && this.state.formErrors.name=="" && this.state.formErrors.phone=="" && this.state.formErrors.password=="")
    {
alert("success");


  const main = this;
        var payload = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            type: 'USER'
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
                console.log(data)
                if (data.status == 400) {
                    main.setState({
                        userdata: data.message,
                        responseerror:data.message
                    })
                } else if(data.status == 200) {

                    main.setState({
                        userdata: data.data,
                        responseerror:""
                    })
localStorage.setItem('userdata',JSON.stringify(data.data));
localStorage.setItem('token',data.token);
location.href="/";


                }

            })





    }else{
        alert("Please Fill All Mandatory Fields ");
    }

       
      //  this.compleatevalidation();
        // alert('A name was submitted: ' + this.state.email+'password'+this.state.email);

    }

    validateField(fieldName, value) {
        console.log(fieldName + "-" + value);
        console.log(this.state.formErrors);

        let fieldValidationErrors = this.state.formErrors;
        let passwordValid = this.state.passwordValid;
        let phonevalid = this.state.phonevalid;
        let namevalid = this.state.namevalid;
        let emailValid = this.state.emailValid;

        switch (fieldName) {
            case 'email':

                //emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                emailValid = value.length >= 6;

                fieldValidationErrors.email = emailValid ? '' : 'Invalid Email';
                this.setState({ formErrors: fieldValidationErrors, emailValid: emailValid,email:value });
                console.log(emailValid)

                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : 'Password contain minimum 6 charecters';
                this.setState({ formErrors: fieldValidationErrors, passwordValid: passwordValid,password:value });
                console.log(passwordValid);
                break;
            case 'phone':
                phonevalid = value.length >= 10;
                fieldValidationErrors.phone = phonevalid ? '' : ' Phone number contain minimum 10 charecters';
                this.setState({ formErrors: fieldValidationErrors, phonevalid: phonevalid,phone:value });
                console.log(phonevalid);
                break;
            case 'name':
                namevalid = value.length >= 3;
                fieldValidationErrors.name = namevalid ? '' : 'Name contain minimum 3 charecters';
                this.setState({ formErrors: fieldValidationErrors, namevalid: namevalid,name:value });
                console.log(namevalid);
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
                                    <img src="./img/disolar_logo_black.png"  alt="image"/>
                     <h3>DIN PRISUPPSKATTNING ÄR FÄRDIG!</h3>
                     <h5><b>VI HAR NU GENERERAT DIN PRISUPPSKATTNING BASERAT PÅ FÖLJANDE UPPGIFTER</b>
</h5>
                 <h4><b>Logga in eller registrera ett konto för att få tillgång till din prisuppskattning</b></h4>
                                </div>
                                {/*<div className="col-sm-12 text-center registrn_add  login_txt">
                                    <p><span className="addres_txt">Address :</span> dummy text of the printing and t</p>
                                    <p><span className="addres_txt">Address :</span> dummy text of the printing and t</p>
                                    <p><span className="addres_txt">Address :</span> dummy text of the printing and t</p>
                                    <p><span className="addres_txt">Address :</span> dummy text of the printing and t</p>
                                     <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h4>
                                </div>*/}
                        </div>
                        <div className="row">
                                
                                <div className="col-sm-12">
                                     <Signup signupnsubmit={this.signupsubmit.bind(this)}
                            nameErrors={this.state.formErrors.name}
                            PhoneErrors={this.state.formErrors.phone}
                            EmailErrors={this.state.formErrors.email}
                            PasswordErrors={this.state.formErrors.password}

                            signupValid={this.state.signupValid}
                            validateField={this.validateField.bind(this)}
                            responseerror={this.state.responseerror}


                        />                       </div>
                     
                                </div>
                </div>
                                           
                        <div className="row">
                            <div className="btmimg">
                                 <img src="./img/bootm-im.jpg" className="img-responsive"  alt="image"/>
                            </div>
                        </div>
                    </div>
            </div>
          

        )
    }
}



export default Registration;