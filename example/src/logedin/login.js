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
      
    }

    handleChange(event) {


        this.props.validateField(event.target.name, event.target.value)
    }



    loginvalidationverify() {
        if (this.state.emailValid && this.state.passwordValid) {
        }
    }

    render() {
        return (
            <form onSubmit={this.props.loginsubmit.bind(this)} id="login" className="form-horizontal">
               
                
                  <div className="alert alert-danger" hidden={(this.props.responseerror=="")}>
    {this.props.responseerror}
  </div>        
    <div className="form-group">
        <input type="email" name="email" placeholder="Email*"  className="form-control input-bg" onBlur={this.handleChange.bind(this)} required/>
        <span id="error">{this.props.EmailErrors}</span>
    </div>
    <div className="form-group">
        <input type="password" placeholder="Password*" className="form-control input-bg1" name="password" onBlur={this.handleChange.bind(this)} required/>
        <span id="error">{this.props.PasswordErrors}</span>
    </div>
    <div className="form-group">
        <p className="text-right">  <a href="/Forgotpassword"><u>Forgot Password ?</u> </a></p>
    </div>
     
               <div className="form-group"> <div> <input type="submit" className='btn btn-info' id="buttonnew" value="Login" /> 
              
                 <Link to="/Register"><button  className="signup-btn">signup here ?</button></Link></div></div>
               
            </form>
        )
    }
}
class LoginSignup extends Component {
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
            loginValid: false,
            signupValid: false,
            responseerror:""
        };

    }




    loginsubmit(event) {
        event.preventDefault();
        
        const main = this;
        
        var payload = {
            email: this.state.email,
            password: this.state.password,
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
                        userdata: data.message,
                        responseerror:data.message
                    })
                } else if(data.status == 200) {
                    var userdata;
if(data.data.type=="USER")
    {
             userdata=
{"type":data.data.type,
"estdet":data.data.estdet,
"updateon":data.data.updateon,
"cratedon":data.data.cratedon,
"email":data.data.email,"phone":data.data.phone,"name":data.data.name,"token":data.token}
    }else if(data.data.type=="CONTRACTOR")
{
    userdata={"type":data.data.type,
"organization_number":data.data,organization_number,
"address":data.data.address,
"website":data.data.website,
"businessname":data.data.businessname,
"updateon":data.data.updateon,
"cratedon":data.data.cratedon,
"email":data.data.email,"phone":data.data.phone,"name":data.data.name,"token":data.toke}
}


            
localStorage.setItem('userdata',JSON.stringify(userdata));
localStorage.setItem('token',data.token);
                    main.setState({
                        userdata: data.data,
                        responseerror:""
                    })

                    location.href="/";
                }

            })
    }


    signupsubmit(event) {
        event.preventDefault();
        alert("ok");
        this.compleatevalidation();
        // alert('A name was submitted: ' + this.state.email+'password'+this.state.email);

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

                fieldValidationErrors.email = emailValid ? '' : 'Invalid email ';
                this.setState({ formErrors: fieldValidationErrors, emailValid: emailValid, email: value });

                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : 'Password have minimum 6 charecters ';
                this.setState({ formErrors: fieldValidationErrors, passwordValid: passwordValid, password: value });
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
                                    <h3>Välkommen tillbaka!</h3>
                                    <h4>Logga in för att få tillgång till dinå prisuppskattningar</h4>
                                </div>
                        </div>
                        <div className="row text-center ">
                                
                                <div className="col-sm-12">

                    <div className="form_top1">
                        <Login loginsubmit={this.loginsubmit.bind(this)} validateField={this.validateField.bind(this)}
                            EmailErrors={this.state.formErrors.email}
                            PasswordErrors={this.state.formErrors.password}
                            responseerror={this.state.responseerror}

                        />
                        {/* <Signup signupnsubmit={this.signupsubmit}
                            nameErrors={this.state.formErrors.name}
                            PhoneErrors={this.state.formErrors.phone}
                            EmailErrors={this.state.formErrors.email}
                            PasswordErrors={this.state.formErrors.password}

                            signupValid={this.state.signupValid}
                            validateField={this.validateField.bind(this)}


                        /> */}
                    </div>
                                 </div>
                        
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



export default LoginSignup;