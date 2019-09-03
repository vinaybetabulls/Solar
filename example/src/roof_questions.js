import React, { Component } from 'react';
import DragabbleComponent from './components/DragabbleComponent';
import Context from './components/Context';
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
    borderRadius: '85px',
    zIndex: '90'
  }
};
var highletstyle = {
  fontSize: '15'
}
var highletstyle2 = {
  fontSize: '15'
};

class RoofQuestions extends Component {
  constructor(props) {
    super(props);
    window.scrollTo(0,0);
    this.dataSet = [
      {
        question: "Vilken typ av fastighet bor du i?",
        answers: [
          {
            image: "./img/Digitak_Radhus.png",
            name: "Radhus"
          },
          {
            image: "./img/Digitak_Villa.png",
            name: "Villa"
          },
          {
            image: "./img/Digitak_Fritidshus.png",
            name: "Fritidshus"
          },
          {
            image: "./img/Digitak_Bostadsra_Level.png",
            name: "Bostadsrätt"
          },
          {
            image: "./img/Digitak_Lantbruk.png",
            name: "Lantbruk"
          }
        ]
      },
      {
        question: "Hur många våningar är fastigheten?",
        answers: [
          {
            image: "./img/Digitak_1_Level.png",
            name: "1 plan"
          },
          {
            image: "./img/Digitak_2_Level.png",
            name: "2 plan"
          },
          {
            image: "./img/Digitak_3_Level.png",
            name: "3 plan"
          },
          {
            image: "./img/Digitak_3+_Level.png",
            name: "3+ plan"
          }
        ]
      }
    ];
    this.state = { modalIsOpen: false, stepIndex: 1, selectedValue: '', selectedValueTwo: '', angle: 45, left: '135px', validationOne: false, validation: false, popup: false }
    this.handleClick = this.handleClick.bind(this);
    this.roofangle = this.roofangle.bind(this);
    this.handleClickTwo = this.handleClickTwo.bind(this);
    this.validate = this.validate.bind(this);
    this.scrollable = this.scrollable.bind(this);
    this.selectedAnswers = [];
    this.openPopup = this.openPopup.bind(this);
    Modal.setAppElement('body');
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleClick(value) {
    let selectedValue = value;
    highletstyle = {
      fontWeight: 'bold',
      color: 'black',
      fontSize: '16px'
    }
    this.selectedAnswers.push(value);
    this.setState({ selectedValue: selectedValue, validationOne: false });
  }

  handleClickTwo(value2) {
    let selectedValue = value2;
    highletstyle2 = {
      fontWeight: 'bold',
      color: 'black',
      fontSize: '16px'
    }
    this.selectedAnswers.push(value2);
    this.setState({ selectedValueTwo: selectedValue, validation: false });
  }

  validate() {
    if (!this.state.selectedValue) {
      this.setState({ validationOne: true });
    } else if (!this.state.selectedValueTwo) {
      this.setState({ validation: true });
    }
  }

  scrollable(e) {
    if (e.nativeEvent.offsetX > 270) {
      this.setState({ left: '270px' });
      this.setState({ angle: 90 })
    } else {
      this.setState({ left: e.nativeEvent.offsetX });
      var val = Math.floor(e.nativeEvent.offsetX / 3);
      this.setState({ angle: Math.ceil(val / 5) * 5 })
    }
  }

  roofangle(roofAngle) {
    this.setState({ angle: roofAngle })
  }

  openPopup() {
    this.setState({ popup: true, modalIsOpen: true })
  }

  openModal() {
  }

  afterOpenModal() {
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <Context.Consumer>
        {
          value => {
            const { qusetionsval: queval, stepval: back } = value.actions;
            return (
              <div>
                <div className="container ">
                  <h3 className="roof_subhead">Fastighetsinformation</h3>
                </div>
                <div className="container roofing_type col-sm-12 panding_no">
                  <div className="col-sm-12 col-md-12" style={{
                    padding: '2em 0',
                    borderBottom: '1px solid #8888886e'
                  }}>
                    <div className="col-md-2"></div>
                    <div className="col-md-8 panding_no" id="navbar2" >
                      <div className="col-sm-12 col-md-12 panding_no uppercase text-blue align-text-center">
                        <div style={{ padding: '20px 0px 20px 0' }}>
                          <div className='bold font-quicksand'>Vilken är fastighetens ungefärliga taklutning ?</div>
                        </div>
                      </div>
                      <DragabbleComponent roofAngle={this.roofangle} />
                      <div className="col-md-12 col-sm-12 align-text-center slots-centering">
                        <div className="hiperLink" style={{ textDecoration: 'underline' }} onClick={this.openPopup}>Läs mer om taklutning</div>
                      </div>
                    </div>
                  </div>
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
                        <div className="heading">TAKLUTNING</div>
                        <div className="footer-popup questionsPage">
                          Dra i reglaget för att ändra takets ungefärliga taklutning.</div>
                        <div className="estimate ">
                          <button className="submit" onClick={this.closeModal}>stäng</button>
                        </div>
                      </Modal>
                    </div>
                  ) : (null)}
                  <div className="col-sm-12 panding_no" style={{
                    backgroundColor: '#eee', padding: '2em 0px 4em', boxShadow: '0 -3px 5px -3px rgba(0,0,0,.15)',
                    borderBottom: '1px solid #8888886e'
                  }}>
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10 panding_no" id="padding-b">
                      <QuizArea handleClick={this.handleClick} validation={this.state.validationOne} dataSet={this.dataSet[0]} selected={this.state.selectedValue} style={highletstyle} />
                    </div>
                  </div>
                  <div className="col-sm-12" style={{ padding: '4em 0 0 0' }}>
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10 panding_no" id="padding-b">
                      <QuizArea handleClick={this.handleClickTwo} validation={this.state.validation} dataSet={this.dataSet[1]} selected={this.state.selectedValueTwo} style={highletstyle2} />
                    </div>
                  </div>
                  <div className="col-sm-12 estimate" style={{ textAlign: 'center', padding: '30px' }} >
                    {this.state.selectedValue && this.state.selectedValueTwo ? (
                      <div className="flex justifyCenter">
                        <div className="padding1">
                          <button onClick={back.bind(this, 1)} className="submit" >Föregående</button>
                        </div>
                        <div className="padding1">
                          <button onClick={queval.bind(this, this.state.selectedValue, this.state.selectedValueTwo, this.state.angle)} className="submit" >Nästa</button>
                        </div>
                      </div>
                    ) : (
                        <div className="flex justifyCenter">
                          <div className="padding1">
                            <button onClick={back.bind(this, 1)} className="submit" >Föregående</button>
                          </div>
                          <div className="padding1">
                            <button onClick={this.validate} className="submit" >Nästa</button>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )
          }
        }
      </Context.Consumer>
    )
  }
}

function Question(props) {
  return (
    <div>
      <div className='roof-question font-quicksand'>{props.dataSet.question}</div>
      {props.validation ? (
        <div className="col-md-6 col-md-offset-3">
          <div className='validation'>
            <span>Please select One</span>
          </div>
        </div>
      ) : (null)}
    </div>
  )
}

function Answer(props) {
  var colorCode = {
    border: '4px solid #8ee2ae',
    color: '#064f70',
    fontWeight: 'bold',
    padding: "10px 0 10px",
    margin: "5px 5px 50px 5px",
    textAlign: "-webkit-center",
    borderRadius: "4px",
    boxShadow: "0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)",
    transition: "all 0.3s ease-out",
    WebkitTransform: "all 0.3s ease-out",
    minHeight: "190px",
    textTransform: 'uppercase',
    fontSize: '15px'
  }
  const stylestyle = {
    padding: "10px 0 10px",
    margin: "5px 5px 50px 5px",
    border: "4px solid #f9f9f9",
    textAlign: "-webkit-center",
    borderRadius: "4px",
    boxShadow: "0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)",
    transition: "all 0.3s ease-out",
    WebkitTransform: "all 0.3s ease-out",
    minHeight: "190px",
    textTransform: 'uppercase',
    color: 'rgb(6, 79, 112)',
    fontSize: '15px'
  }
  var appliedstyle = (props.answer.name === props.selected) ? colorCode : stylestyle
  return (
    <div className="col-sm-6 col-md-4 col-lg-2" key={props.choice} onClick={props.handleClick.bind(this, props.answer.name)}>
      <div className="onfocs_brdr b-white" style={appliedstyle}   >
        <img className="img-responsive" src={props.answer.image} alt={props.answer.name} />
        <p>{props.answer.name}</p>
      </div>
    </div>
  );
}

function AnswerList(props) {
  var answers = []
  for (let i = 0; i < props.dataSet.answers.length; i++) {
    answers.push(<Answer key={i} choice={i} style={props.style} handleClick={props.handleClick} selected={props.selected} answer={props.dataSet.answers[i]} />)
  }
  return (
    <div className="col-md-12 justifyCenter align-text-center padd-top-bot">
      {(props.dataSet.answers.length == 4) ?
        (
          <div>
            <div className="col-lg-2"></div>
            {answers}
            <div className="col-lg-2"></div>
          </div>
        ) :
        (
          <div>
            <div className="col-lg-1"></div>
            {answers}
            <div className="col-lg-1"></div>
          </div>
        )
      }
    </div>
  )
}

function QuizArea(props) {
  return (
    <div>
      <Question dataSet={props.dataSet} validation={props.validation} />
      <AnswerList dataSet={props.dataSet} style={props.style} handleClick={props.handleClick} selected={props.selected} />
    </div>
  )
}

export default RoofQuestions;