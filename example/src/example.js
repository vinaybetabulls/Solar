import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Estimation from './estimation';
import Login from './logedin/login'
import Registration from './logedin/registration'
import Textc from './text';
import Header from './header';
import Footer from './footer';
import Profile from './profile';
import Contactus from './contactus';
import Aboutus from './aboutus';
import Faq from './faq';
import Contractorsignup from './logedin/contractorsignup';
import Userslist1 from './admin_userlist';
import Contractorlist from './admin_contractorlist'
import AdminHome from './admin_home';
import Forgotpassword from './forgotpassword';
let data, userdata, logintest, admintoken, adminLogin;
class Routing extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("userdata") === null || localStorage.getItem("userdata") === undefined || localStorage.getItem("userdata") === "undefined") {
      admintoken = "";
      adminLogin = false;
      userdata = {
        "type": "",
        "organization_number": "",
        "address": "",
        "website": "",
        "estdet": [],
        "businessname": "",
        "updateon": "",
        "cratedon": "",
        "email": "", "phone": "", "name": "", "token": ""
      }
      logintest = false;
    } else {
      userdata = JSON.parse(localStorage.getItem("userdata"))
      logintest = true;
    }
    this.state = {
      Login: logintest,
      userdet: '',
      token: userdata.token,
      admintoken: admintoken,
      adminLogin: adminLogin
    }
  }

  loginmodefun(val) {
    this.setState({
      Login: val
    })
    window.location.reload();
  }

  render() {
    return (
      <React.Fragment>
        <Router >
          <div className="align-top">
            <Switch>
              <Route exact path='/' render={(props) => (<React.Fragment>
                <Header login={this.state.Login} headindex={1} />
                <Estimation loginmode={this.state.Login} loginmodefun={this.loginmodefun.bind(this)} />< Footer />
              </React.Fragment>
              )} />
              <Route exact path='/Login' render={(props) => (
                <React.Fragment>
                  <Header login={this.state.Login} headindex={2} />
                  <Login token={this.state.token} data={data} />
                  < Footer />
                </React.Fragment>
              )} />
              <Route exact path="/Register"
                render={(props) => (
                  <React.Fragment>
                    <Header login={this.state.Login} headindex={3} />
                    <Registration />
                    < Footer />
                  </React.Fragment>
                )} />
              <Route exact path="/Profile" render={(props) => (
                <React.Fragment>
                  <Header login={this.state.Login} headindex={4} />
                  <Profile />
                  < Footer /></React.Fragment>)}
              />
              <Route exact path="/Faq" render={(props) => (
                <div>
                  <Header login={this.state.Login} headindex={5} />
                  <Faq />
                  < Footer /></div>
              )} />
              <Route exact path="/Aboutus" render={(props) => (
                <React.Fragment>
                  <Header login={this.state.Login} headindex={6} />
                  <Aboutus />
                  < Footer /></React.Fragment>
              )}
              />
              <Route exact path="/Contact" render={(props) => (
                <React.Fragment>
                  <Header login={this.state.Login} headindex={7} />
                  <Contactus />
                  < Footer /></React.Fragment>
              )
              } />
              <Route exact path="/Forgotpassword" render={(props) => (
                <React.Fragment>
                  <Header login={this.state.Login} headindex={2} />
                  <Forgotpassword />
                  < Footer /></React.Fragment>
              )} />
              <Route exact path="/Contractor" render={(props) => (
                <React.Fragment>
                  <Header login={this.state.Login} headindex={8} />
                  <Contractorsignup />
                  < Footer /></React.Fragment>
              )} />
              <Route exact path='/text' render={(props) => (
                <React.Fragment>
                  <Header login={this.state.Login} />
                  <Textc token={this.state.token} data={data} />
                  < Footer /></React.Fragment>
              )} />
              <Route exact path='/userslist' render={(props) => (
                <Userslist1 token={this.state.token} data={data} />
              )} />
              <Route exact path='/contractorlist' render={(props) => (
                <Contractorlist token={this.state.token} data={data} />
              )} />
              <Route exact path='/admin' render={(props) => (
                <AdminHome token={this.state.token} data={data} />
              )} />
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}
ReactDOM.render(
  <Routing />
  , document.getElementById('app'));