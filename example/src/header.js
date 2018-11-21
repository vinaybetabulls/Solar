
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

//import mapimage from './download.jpg'

import Img from 'react-image';


class Header extends Component {
  constructor(props) {
    super(props);

  }
  logout() {
    localStorage.clear();
    location.href = "/";
  }


  render() {

    return (
      <div className="example2">
        <nav className="navbar navbar-default custm-nav ">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar2">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="https://digitak.se"><img src="./img/logo.png" alt="Dispute Bills" />
              </a>
            </div>
            <div id="navbar2" className="navbar-collapse collapse">
              <Checklogin login={this.props.login} logout={this.logout.bind(this)} headindex={this.props.headindex} />
            </div>

          </div>
        </nav>
      </div>
    );
  }
}

class Checklogin extends Component {
  constructor(props) {
    super(props)
  }

  render() {






    if (this.props.login == true) {
      return (<ul className="nav navbar-nav navbar-right nav-ul">
        <li > <a href="https://www.digitak.se/" id="header_menu" >Tillbaka till startsidan</a></li>
        {/*}
        <li className={this.props.headindex == 6 ? "active" : ""} > <a href="https://www.digitak.se/">Start</a></li>
        <li className={this.props.headindex == 6 ? "active" : ""} > <a href="https://www.digitak.se/blogs/">Takbloggen</a></li>
        <li><Link to='/Contractor'>För hantverkare</Link></li>
        <li className={this.props.headindex == 6 ? "active" : ""} > <a href="https://digitak.se/about-us/">Om oss</a></li>


        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Mitt konto <span className="caret"></span></a>
          <ul className="dropdown-menu" role="menu">

            <li><Link to='/Profile' >Mina takberäkningar</Link></li>
            <li><a onClick={this.props.logout}>Logga ut</a></li>

          </ul>
        </li>

*/}

      </ul>)
    } else {

      console.log(this.props);
      return (<ul className="nav navbar-nav navbar-right nav-ul">
        <li > <a href="https://www.digitak.se/" id="header_menu" >Tillbaka till startsidan</a></li>
        {/*}
        <li className={this.props.headindex == 6 ? "active" : ""} > <a href="https://www.digitak.se/">Start</a></li>
        <li className={this.props.headindex == 6 ? "active" : ""} > <a href="https://www.digitak.se/blogs/">Takbloggen</a></li>
        <li className={this.props.headindex == 8 ? "active" : ""} ><Link to='/Contractor'>För hantverkare</Link></li>

        <li className={this.props.headindex == 6 ? "active" : ""} > <a href="https://digitak.se/about-us/">Om oss</a></li>
        <li className={this.props.headindex == 5 ? "active" : ""} ><a href="https://www.digitak.se/vanliga-fragor/">Vanliga frågor</a></li>

        <li className={this.props.headindex == 2 ? "active" : ""} ><Link to='/login'>Logga in</Link></li>
*/}
      </ul>)
    }

  }
}

export default Header;
