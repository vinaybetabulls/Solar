import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

//var mainurl=require('../config.js');

const formleft = {
    paddingLeft: 0
}




class Csignup extends Component {
    constructor(props) {
        super(props);

        //  console.log(this.props)
    }

    handleChange(event) {


        this.props.validateField(event.target.name, event.target.value)
    }

    render() {


        return (

            <form onSubmit={this.props.signupnsubmit} id="Csignup">
                <h3>Register</h3>
                <p>Get Started already now</p>

                <div className="alert alert-danger" hidden={(this.props.responseerror == "")}>
                    {this.props.responseerror}
                </div>
                <p>Account Information</p>
                <input type="text" name="name" className="form-control" placeholder="Name*" onBlur={this.handleChange.bind(this)} required />

                <span id="error">{this.props.nameErrors}
                </span>

                <input type="text" name="phone" className="form-control" placeholder="Phone*" onBlur={this.handleChange.bind(this)} required />
                <span id="error">{this.props.PhoneErrors}
                </span>
                <input type="email" name="email" className="form-control" placeholder="Email*" onBlur={this.handleChange.bind(this)} required />

                <span id="error">{this.props.EmailErrors}
                </span>
                <input type="password" name="password" className="form-control" placeholder="Password*" onBlur={this.handleChange.bind(this)} required />
                <span id="error">{this.props.PasswordErrors}
                </span>


                <p className="accnt_info">Contractor Information</p>
                <input type="text" name="businessname" className="form-control" placeholder="Business Name*" onBlur={this.handleChange.bind(this)} required />

               

                <input type="text" name="website" className="form-control" placeholder="Website(optional)" onBlur={this.handleChange.bind(this)} />
                
                <input type="text" name="address" className="form-control" placeholder="Address*" onBlur={this.handleChange.bind(this)} required />

                
                <input type="text" name="organizer" className="form-control" placeholder="Organizer*" onBlur={this.handleChange.bind(this)} required />
              





                <div> <input type="checkbox" required />   I Agree to <a href="">Terms & Conditions</a></div>

                <div>  <input type="submit" id="buttonnew" className="btn btn-info" value="Signup" disabled={(this.props.nameErrors == "" && this.props.EmailErrors == "" && this.props.PhoneErrors == "" && this.props.PasswordErrors == "") ? false : true} /></div>
               
            </form>



        );
    }

}



class Contractorsignup extends Component {
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
            responseerror: "",
            website: "",
            businessname: "",
            address: "",
            organizer: ""

        };
    }

    loginsubmit(event) {
        // this.compleatevalidation();
        // alert('A name was submitted: ' + this.state.email+'password'+this.state.email);
        event.preventDefault();



    }

    signupsubmit(event) {
        event.preventDefault();



        if (this.state.formErrors.email == "" && this.state.formErrors.name == "" && this.state.formErrors.phone == "" && this.state.formErrors.password == "") {
           


            const main = this;
            var payload = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phone: this.state.phone,
               businessname: this.state.businessname,

                website: this.state.website,
                address: this.state.address,
                organization_number: this.state.organizer,
                type: 'CONTRACTOR'

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
                            userdata: data.message,
                            responseerror: data.message
                        })
                    } else if (data.status == 200) {


                        alert("Contractor Registration Successfull");
                         location.href = "/Contractor";
                        
/*
                        main.setState({
                            userdata: data.data,
                            responseerror: ""
                        })
                        localStorage.setItem('userdata', JSON.stringify(data.data));
                        localStorage.setItem('token', data.token);
                        location.href = "/";
*/

                    }

                })





        } else {
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
                this.setState({ formErrors: fieldValidationErrors, emailValid: emailValid, email: value });
                console.log(emailValid)

                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : 'Password contain minimum 6 charecters';
                this.setState({ formErrors: fieldValidationErrors, passwordValid: passwordValid, password: value });
                console.log(passwordValid);
                break;
            case 'phone':
                phonevalid = value.length >= 10;
                fieldValidationErrors.phone = phonevalid ? '' : ' Phone number contain minimum 10 charecters';
                this.setState({ formErrors: fieldValidationErrors, phonevalid: phonevalid, phone: value });
                console.log(phonevalid);
                break;
            case 'name':
                namevalid = value.length >= 3;
                fieldValidationErrors.name = namevalid ? '' : ' name contain minimum 3 charecters';
                this.setState({ formErrors: fieldValidationErrors, namevalid: namevalid, name: value });
                console.log(namevalid);
                break;
            case 'businessname':
                this.setState({ businessname: value });
                console.log(value);
                break;
            case 'website':
                this.setState({  website: value });
                console.log(value);
                break;
            case 'address':
                this.setState({ address: value });
                console.log(value);
                break;
            case 'organizer':
                this.setState({ organizer: value });
                console.log(value);
                break;
            default:
                break;
        }




    }

    render() {
        return (


            <div className="container login-top">
                <br />
                <div className="row csignup" id="box" >
                    <div className="col-sm-12  test1" style={formleft}><img src="./img/contractor_signup-banner.jpg" className="img-responsive" />
                       <div className="form_top1">
                        {/*<Login loginsubmit={this.loginsubmit}  validateField={this.validateField.bind(this)} />*/}
                        <Csignup signupnsubmit={this.signupsubmit.bind(this)}
                            nameErrors={this.state.formErrors.name}
                            PhoneErrors={this.state.formErrors.phone}
                            EmailErrors={this.state.formErrors.email}
                            PasswordErrors={this.state.formErrors.password}

                            signupValid={this.state.signupValid}
                            validateField={this.validateField.bind(this)}
                            responseerror={this.state.responseerror}


                        />
                    </div>
                    </div></div></div>

        )
    }
}



export default Contractorsignup;