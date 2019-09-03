import React, { Component } from 'react';

class Adminlogin extends Component {
    constructor(props) {
        super(props);
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
            <form onSubmit={this.props.loginsubmit.bind(this)} id="login">
                <h3>Login</h3>
                <div className="alert alert-danger" hidden={(this.props.responseerror == "")}>
                    {this.props.responseerror}
                </div>
                <input type="email" name="email" placeholder="Email*" className="form-control" onBlur={this.handleChange.bind(this)} required />
                <span id="error">{this.props.EmailErrors}
                </span>
                <input type="password" placeholder="Password*" className="form-control" name="password" onBlur={this.handleChange.bind(this)} required />
                <span id="error">{this.props.PasswordErrors}
                </span>
                <div> <input type="submit" className='btn btn-info' id="buttonnew" value="Login" /></div>
            </form>
        )
    }
}
class Loginadmin extends Component {
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
            responseerror: ""
        };

    }

    loginsubmit(event) {
        event.preventDefault();
        const main = this;
        var payload = {
            email: this.state.email,
            password: this.state.password,
            type: 'ADMIN'
        }

        fetch('admin/adminLogin', {
            method: "post", headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*"
            }, body: 'json=' + JSON.stringify(payload)
        }).then(function (response) {
            return response;
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.status == 400) {
                main.setState({
                    userdata: data.message,
                    responseerror: data.message
                })
            } else if (data.status == 200) {
                var userdata;
                userdata = { "email": data.data.email, "name": data.data.name, "token": data.token }
                localStorage.setItem('aurthenticate', JSON.stringify(userdata));
                localStorage.setItem('token', data.token);
                main.setState({
                    userdata: data.data,
                    responseerror: "",
                })
                location.href = "/admin?page=USER";
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
            <div className="container">
                <div className="col-sm-12">  <div className="col-sm-4"> </div>
                    <div className="col-sm-4">
                        <div className="row adminlogin" id="box" >
                            <Adminlogin loginsubmit={this.loginsubmit.bind(this)} validateField={this.validateField.bind(this)}
                                EmailErrors={this.state.formErrors.email}
                                PasswordErrors={this.state.formErrors.password}
                                responseerror={this.state.responseerror}
                            /></div>
                    </div></div></div>
        )
    }
}

export default Loginadmin;