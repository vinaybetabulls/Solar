import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom';
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

let data;
let userdata;
let logintest;
let admintoken;
let adminLogin;
class Routing extends Component {
  constructor(props) {
    super(props)

    if (localStorage.getItem("userdata") == undefined || localStorage.getItem("userdata") == "undefined") {

      admintoken = "";
      adminLogin = false;


    }


    if (localStorage.getItem("userdata") == undefined || localStorage.getItem("userdata") == "undefined") {
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

    //sessionStorage.setItem('key', 'value');

    // Get saved data from sessionStorage


  }

  loginmodefun(val) {
    this.setState({
      Login: val
    })

  }
  render() {

    return (<div>



      <Router >
        <div className="align-top">

          <Switch>


            {/*  user */}
            <Route exact path='/' render={(props) => (<div>
              <Header login={this.state.Login} headindex={1} />
              <Estimation loginmode={this.state.Login} loginmodefun={this.loginmodefun.bind(this)} />< Footer /> </div>
            )} />


            <Route exact path='/Login' render={(props) => (
              <div>
                <Header login={this.state.Login} headindex={2} />
                <Login token={this.state.token} data={data} />
                < Footer /></div>
            )} />



            <Route exact path="/Register"
              render={(props) => (

                <div>
                  <Header login={this.state.Login} headindex={3} />
                  <Registration />
                  < Footer />
                </div>
              )} />


            <Route exact path="/Profile" render={(props) => (
              <div>
                <Header login={this.state.Login} headindex={4} />
                <Profile />
                < Footer /></div>)}
            />




            <Route exact path="/Faq" render={(props) => (
              <div>
                <Header login={this.state.Login} headindex={5} />
                <Faq />
                < Footer /></div>
            )} />

            <Route exact path="/Aboutus" render={(props) => (
              <div>
                <Header login={this.state.Login} headindex={6} />
                <Aboutus />
                < Footer /></div>
            )}
            />

            <Route exact path="/Contact" render={(props) => (
              <div>
                <Header login={this.state.Login} headindex={7} />
                <Contactus />
                < Footer /></div>
            )

            } />


            <Route exact path="/Forgotpassword" render={(props) => (
              <div>
                <Header login={this.state.Login} headindex={2} />
                <Forgotpassword />

                < Footer /></div>
            )} />

            <Route exact path="/Contractor" render={(props) => (
              <div>
                <Header login={this.state.Login} headindex={8} />
                <Contractorsignup />
                < Footer /></div>
            )} />


            {/*
            <Route exact path="/Admin" render={(props) => (
              <div>
                <Header login={this.state.Login} />

                <Loginadmin /> < Footer /></div>)} />
*/}

            <Route exact path='/text' render={(props) => (
              <div>
                <Header login={this.state.Login} />
                <Textc token={this.state.token} data={data} />
                < Footer /></div>
            )} />


            <Route exact path='/userslist' render={(props) => (
              <div>

                <Userslist1 token={this.state.token} data={data} />
              </div>
            )} />

            <Route exact path='/contractorlist' render={(props) => (
              <div>

                <Contractorlist token={this.state.token} data={data} />
              </div>
            )} />

            <Route exact path='/admin' render={(props) => (
              <div>

                <AdminHome token={this.state.token} data={data} />
              </div>
            )} />









          </Switch>

        </div>

      </Router>




    </div>);
  }
}



ReactDOM.render(
  <Routing />
  , document.getElementById('app'));