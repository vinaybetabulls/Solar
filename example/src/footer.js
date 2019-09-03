import React, { Component } from 'react';
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px 15px 23px',
    fontSize: '16px',
    width: '50%',
    borderRadius: '85px'
  }
};
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false,
      modalIsOpen: false,
      date: new Date()
    }

    this.modalpopup = this.modalpopup.bind(this)
    Modal.setAppElement('body');
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  modalpopup() {
    this.setState({ popup: true, modalIsOpen: true })
  }

  render() {
    return (
      <div>
        {this.state.popup ? (
          <div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal">

              <div>
                <button style={{ float: 'right', color: '#8ee2ae', backgroundColor: '#fff', border: 'none', margin: '0 75px', fontSize: '20px' }} onClick={this.closeModal}>X</button>
              </div>
              <div className="heading">Kontakta oss</div>
              <div className="footer-popup row text-center troble_sec">
                <a id="left-help-button" href="tel:+0763949564"><i className="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp;
   Ring Digitak -  076-3949564</a>
                <a id="left-help-button" href="mailto:info@digitak.se?">@ Maila oss - info@digitak.se </a></div>
              <div className="estimate ">
                <button className="submit" onClick={this.closeModal}>stäng</button>
              </div>

            </Modal>
          </div>
        ) : (null)}

        <section >
          <div id="helpus">
            <div className="row text-center troble_sec" >
              <button id="left-help-button" onClick={this.modalpopup}>Kontakta oss </button>
            </div>
            <div className="text-center troble_sec f17">
              Har du frågor eller stött på problem? Tryck på kontakt så <br /> återkommer vi så fort som möjligt.
              </div>
          </div>
        </section>
        <div id="bottomfoo"><span>Copyright &copy; {this.state.date.getFullYear()} Digisolar.All rights reserved</span></div>
      </div>
    );
  }
}

export default Footer;