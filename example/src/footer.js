import React, { Component } from 'react';
/*
import mail1 from './img/mail1.png';
import phone1 from './img/phone1.png';
import location1 from './img/location1.png';
import facebook from './img/facebook.png';
import google from './img/google.png';
import printerst from './img/printerst.png';
import twitter from './img/twitter.png';
import youtube from './img/youtube.png';

import aboutus_banner from './img/aboutus-banner.jpg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';*/


class Footer extends Component {
  render() {
    return (
      <div>

        <section >
          <div id="helpus">

            <h2 className="text-center">Vill du prata med en riktig person?</h2>

            <div className="row text-center troble_sec">
              <a id="left-help-button" href="tel:+0763949564"><i className="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;


   Ring Digitak -  076-3949564</a><a id="left-help-button" href="mailto:info@digitak.se?">@ Maila oss - info@digitak.se </a></div>
          </div>
        </section>

        <div id="bottomfoo"><span>Copyright &copy; 2018 Digitak.All rights reserved</span></div>

      </div>
    );
  }
}

export default Footer;