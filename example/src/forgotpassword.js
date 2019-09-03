import React, { Component } from 'react'

const formleft = {
    paddingLeft: 0,
    Forgot: {
        width: "50%"

    }, forgottop: {
        textAlign: "-webkit-center"
    }, fobutton: {
        borderRadius: "5px !important",
        height: "40px !important",
        margin: "9px 0px",
        background: "#000",
        fontSize: "16px",
        border: "none",
        marginRight: "10px"
    }
}

class Forgot extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.validateField(event.target.name, event.target.value);
    }

    loginvalidationverify() {
        if (this.state.emailValid && this.state.passwordValid) {
        }
    }

    render() {
        return (
            <form onSubmit={this.props.forgotsubmit.bind(this)} id="login">
                <h3>Forgot Password</h3>
                <input type="email" name="email" placeholder="Email*" className="form-control" onBlur={this.handleChange.bind(this)} />
                <div>
                    <input type="submit" className='btn btn-info' style={formleft.fobutton} value="Forgot Password" />
                </div>
            </form>
        )
    }
}
class Forgotpassword extends Component {
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
            signupValid: false
        };
    }

    forgotsubmit(event) {
        event.preventDefault();
        const main = this;
        var payload = {
            email: this.state.email,
            type: 'USER'
        }

        fetch('/forgotpass', {
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
                    alert("Please Provide Registered Email Id");
                } else if (data.status == 200) {
                    var payload_data = { email: data.data.email, password: data.data.Password, name: data.data.name }
                    fetch('https://digitak.se/send_mail.php', {
                        method: "post", headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            "Access-Control-Request-Headers": "*",
                            "Access-Control-Request-Method": "*"
                        }, body: 'json=' + JSON.stringify(payload_data)
                    }).then(function (response) {
                        return response;
                    })
                        .then(function (response) {
                            return response.json();
                        }).then(function (data) {
                            if (data.status == 400) {
                                alert(data.message);
                            } else if (data.status == 200) {
                                alert(data.message);

                            }
                        })
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
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                this.setState({ formErrors: fieldValidationErrors, emailValid: emailValid, email: value });
            default:
                break;
        }
    }

    render() {
        return (
            <div className="container" style={formleft.forgottop}>
                <br />
                <div className="row" id="box" style={formleft.Forgot} >
                    {/* <div className="col-sm-2"></div>
                  <div className="col-sm-4" style={formleft}><img src="./img/signup_bg.jpg" className="img-responsive" /></div><div className="col-sm-4"> */}
                    <Forgot forgotsubmit={this.forgotsubmit.bind(this)} validateField={this.validateField.bind(this)}
                        EmailErrors={this.state.formErrors.email}
                        PasswordErrors={this.state.formErrors.password}

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
                {/* <div className="col-sm-2"></div>
                    </div>*/}</div>

        )
    }
}



export default Forgotpassword;