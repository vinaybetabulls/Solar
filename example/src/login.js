import React, { Component } from 'react'
var mainurl = require('./config.json');

const formleft = {
    paddingLeft: 0
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.validateField(event.target.name, event.target.value)
    }

    render() {
        return (
            <form onSubmit={this.props.loginsubmit.bind(this)} id="login">
                <h3>Login</h3>
                <input type="email" name="email" placeholder="Email*" className="form-control" onBlur={this.handleChange.bind(this)} />
                <span id="error">{this.props.EmailErrors}
                </span>
                <input type="password" placeholder="Password*" className="form-control" name="password" onBlur={this.handleChange.bind(this)} />
                <span id="error">{this.props.PasswordErrors}
                </span>
                <p className="text-right">  <a href=""><u>Forgot Password ?</u> </a></p>
                <div> <input type="submit" className='btn btn-info' id="buttonnew" value="Login" /> (or ) <a href="">signup here ? </a></div>
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
        fetch(mainurl.url + 'users/userLogin', {
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
                        userdata: data.message
                    })
                } else if (data.status == 200) {
                    var userdata;
                    if (data.data.type == "USER") {
                        userdata =
                            {
                                "type": data.data.type,
                                "estdet": data.data.estdet,
                                "updateon": data.data.updateon,
                                "cratedon": data.data.cratedon,
                                "email": data.data.email, "phone": data.data.phone, "name": data.data.name, "token": data.token
                            }
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
                    }
                    localStorage.setItem('userdata', JSON.stringify(userdata));
                    main.setState({
                        userdata: data.data
                    })
                    location.href = "/";
                }
            })
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let passwordValid = this.state.passwordValid;
        let emailValid = this.state.emailValid;
        switch (fieldName) {
            case 'email':
                emailValid = value.length >= 6;
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                this.setState({ formErrors: fieldValidationErrors, emailValid: emailValid, email: value });
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                this.setState({ formErrors: fieldValidationErrors, passwordValid: passwordValid, password: value });
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className="container login-top">
                <br />
                <div className="row" id="box" >
                    <div className="col-sm-2"></div>
                    <div className="col-sm-4" style={formleft}><img src="./img/signup_bg.jpg" className="img-responsive" alt="image" /></div><div className="col-sm-4">
                        <Login loginsubmit={this.loginsubmit.bind(this)} validateField={this.validateField.bind(this)}
                            EmailErrors={this.state.formErrors.email}
                            PasswordErrors={this.state.formErrors.password}
                        />
                    </div>
                    <div className="col-sm-2"></div>
                </div></div>
        )
    }
}

export default LoginSignup;