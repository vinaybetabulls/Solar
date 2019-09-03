import React, { Component } from 'react';
import DragabbleComponent from './components/ElectricityMaterialDarggable';
import Modal from 'react-modal';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '20px 15px',
        fontSize: '16px',
        width: '50%',
        borderRadius: '20px',
        border: '2px solid rgb(142, 226, 174)',
        position: 'absolute'
    }
};
const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: "#aaa",
            backgroundColor: "#aaa",
            height: 1,
            width: '100%'
        }}
    />
);
var highletstyle = {
    fontSize: '15px'
};

class MaterialQuestions extends Component {
    constructor(props) {
        super(props);
        window.scrollTo(0, 0);
        Modal.setAppElement('body');
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.matquestionval = props.matquestionval.bind(this);
        this.dataSet = [
            {
                question: "Hur stor är din årliga elförbrukning? <para> - 	Ange din totala elförbrukning i kWh genom att justera reglaget. Om du inte vet din årliga elförbrukning kan du använda våra fördefinierade värden.",
                answers: [
                    '7,000 kWh -  Normalt radhus/villa med fjärrvärme',
                    '13,000 kWh - Normal villa med värmepump',
                    '25,000 kWh - Normal villa med direktverkande el'

                ]
            },
            {
                question: "Hur stor är din huvudsäkring? <para>	- Storleken på din huvudsäkring hittar du i ditt proppskåp på huvudströmbrytaren, automatströmbrytaren eller på din elräkning. Dom flesta radhus och villor har en huvudsäkring på 16-25 Amp.",
                answers: [
                    ' 16A',
                    ' 20A',
                    ' 25A',
                    ' 35A',
                    ' 50A',
                    ' 63A',
                    'Vet ej'
                ]
            }
        ];

        this.state = { popupTwo: false, popup: false, modalIsOneOpen: false, modalIsTwoOpen: false, stepIndex: 1, selectedValue: '', selectedValueTwo: '', angle: '1000', left: '135px', validationOne: false, validation: false }
        this.handleClick = this.handleClick.bind(this);
        this.handleClickTwo = this.handleClickTwo.bind(this);
        this.validate = this.validate.bind(this);
        this.scrollable = this.scrollable.bind(this);
        this.electricy = this.electricy.bind(this);
        this.selectedAnswers = [];
    }

    handleClick(value, index, id) {
        let selectedValue = value;
        highletstyle = {
            fontWeight: 'bold',
            color: 'black',
            fontSize: '16px'
        }
        this.selectedAnswers.push(value);
        this.setState({ selectedValue: selectedValue, validationOne: false });
    }

    handleClickTwo(value2, index, id) {
        let selectedValue = value2;
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

    electricy(angle) {
        this.setState({ angle: angle, selectedValue: angle + ' kWh', validationOne: false });
    }

    openPopup(popup) {
        if (popup === 'one') {
            this.setState({ popup: true, modalIsOneOpen: true })
        } else if (popup === 'two') {
            this.setState({ popupTwo: true, modalIsTwoOpen: true })
        }
    }

    openModal() {
    }

    afterOpenModal() {
    }

    closeModal() {
        this.setState({ modalIsOneOpen: false, modalIsTwoOpen: false });
    }

    render() {
        var style = {
            color: '#064f70',
            fontSize: '20px',
            fontFamily: 'quicksand',
            textTransform: 'uppercase',
            fontWeight: 'bold'
        }
        return (
            <div>
                <div className="container ">
                    <h3 className="roof_subhead">Elförbrukning och säkring </h3>
                </div>
                <div className="container panding_no material_questions_page">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 panding_no" id="padding-b">
                        <div className="panding_no">
                            <div>
                                <div style={{ alignItems: 'center', paddingBottom: '15px' }}>
                                    <div className="col-md-12 panding_no align-text-center">
                                        <h1 style={style}>{this.dataSet[0].question.split('<para>')[0]}</h1>
                                    </div>
                                    <div className="col-md-12 align-text-center padding1">
                                        <button style={{ border: 'none', backgroundColor: '#0A539C', 'borderRadius': '5px', color: '#fff', padding: '8px 25px 8px 25px' }} >{this.state.angle} kWh</button>
                                    </div>
                                </div>
                                <div>
                                    <div id="electriciy_draggable" className="col-md-12" style={{ pad: '1em' }}>
                                        <DragabbleComponent electricy={this.electricy} />
                                    </div>

                                    <div className="col-md-12 col-sm-12 align-text-center slots-centering">
                                        <a className="hiperLink" style={{ textDecoration: 'underline', fontFamily: 'Quicksand' }} onClick={this.openPopup.bind(this, 'one')}>Läs mer om elförbrukning</a>
                                    </div>
                                    {this.state.popup ? (
                                        <div>
                                            <Modal
                                                isOpen={this.state.modalIsOneOpen}
                                                onAfterOpen={this.afterOpenModal}
                                                onRequestClose={this.closeModal}
                                                style={customStyles}
                                                contentLabel="Example Modal">
                                                <div className="col-md-12 panding_no">
                                                    <div className="boka-heading">ELFÖRBRUKNING</div>
                                                    <div className="f-right">
                                                        <button className="close-button " onClick={this.closeModal}>X</button>
                                                    </div>
                                                </div>
                                                <div className="footer-popup questionsPage">
                                                    Ange din totala elförbrukning i kWh genom att justera reglaget. Om du inte vet din årliga elförbrukning kan du använda våra fördefinierade värden.
                                                </div>
                                                <div className='questionsPage pt-none'>
                                                    <ul>
                                                        <li>6000 kWh – Normal villa med fjärrvärme</li>
                                                        <li>13.000 kWh – Normal villa med värmepump</li>
                                                        <li>25.000 kWh – Normal villa med direktverkande el</li>
                                                    </ul>
                                                </div>
                                                <div className="estimate ">
                                                    <button className="submit" onClick={this.closeModal}>stäng</button>
                                                </div>
                                            </Modal>
                                        </div>
                                    ) : (null)}
                                    <div className="col-md-12 material" style={{ textAlign: 'center', padding: '30px' }}>
                                        {this.state.validationOne ? (
                                            <div className='validation'><span>Please select Electricity cosumption</span></div>
                                        ) : (null)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2"></div>
                    <ColoredLine color="black" />
                    <div className="col-sm-12">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-10 panding_no" id="padding-b">
                            <div className="panding_no">
                                <QuizAreaTwo handleClick={this.handleClickTwo} validation={this.state.validation} dataSet={this.dataSet[1]} selected={this.state.selectedValueTwo} style={highletstyle} />
                                <div className="col-md-12 col-sm-12 align-text-center">
                                    <a className="hiperLink" style={{ textDecoration: 'underline', fontFamily: 'Quicksand' }} onClick={this.openPopup.bind(this, 'two')}>Läs mer om huvudsäkring</a>
                                </div>
                                {this.state.popupTwo ? (
                                    <div>
                                        <Modal
                                            isOpen={this.state.modalIsTwoOpen}
                                            onAfterOpen={this.afterOpenModal}
                                            onRequestClose={this.closeModal}
                                            style={customStyles}
                                            contentLabel="Example Modal">
                                            <div className="col-md-12 panding_no">
                                                <div className="boka-heading">HUVUDSÄKRING</div>
                                                <div className="f-right">
                                                    <button className="close-button " onClick={this.closeModal}>X</button>
                                                </div>
                                            </div>
                                            <div className="footer-popup questionsPage">
                                                Storleken på din huvudsäkring hittar du i ditt proppskåp på huvudströmbrytaren, automatströmbrytaren eller på din elräkning. Dom flesta radhus och villor har en huvudsäkring på 16-25 Amp.
                                            </div>
                                            <div className="estimate ">
                                                <button className="submit" onClick={this.closeModal}>stäng</button>
                                            </div>
                                        </Modal>
                                    </div>
                                ) : (null)}
                            </div>
                        </div>
                        <div className="col-sm-1"></div>
                    </div>
                </div>
                <div className="col-md-12 estimate" style={{ textAlign: 'center' }} >
                    {this.state.selectedValue && this.state.selectedValueTwo ? (
                        <div className="flex justifyCenter">
                            <div className="padding1">
                                <button onClick={this.props.back.bind(this, 3)} className="submit" >Föregående</button>
                            </div>
                            <div className="padding1">
                                <button onClick={this.props.matquestionval.bind(this, this.state.selectedValue, this.state.selectedValueTwo)} className="submit" >Nästa</button>
                            </div>
                        </div>
                    ) : (
                            <div className="flex justifyCenter">
                                <div className="padding1">
                                    <button onClick={this.props.back.bind(this, 3)} className="submit" >Föregående</button>
                                </div>
                                <div className="padding1">
                                    <button onClick={this.validate} className="submit" >Nästa</button>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        )
    }
}

function QuestionTwo(props) {
    var style = {
        color: '#064f70',
        fontSize: '20px',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '15px', paddingTop: '2em', justifyContent: 'center' }}>
                <div className="col-md-12 panding_no align-text-center">
                    <h1 className="font-quicksand" style={style}>{props.dataSet.question.split('<para>')[0]}</h1>
                </div>
            </div>
            <div className="col-md-12 material" style={{ textAlign: 'center', padding: '30px' }}>
                {props.validation ? (
                    <div className='validation'><span>Please select the Power consumption</span></div>
                ) : (null)}
            </div>
        </div>
    )
}

function AnswerTwo(props) {
    var colors = ['#C4C4C4', '#3585C1', '#F9D155', 'rgb(158, 241, 168)', 'rgb(234, 163, 163)', '#000000', '#FFFFFF'];
    var colorCode = {
        border: '4px solid #8ee2ae',
        color: '#064f70',
        fontWeight: 'bold',
        padding: "30px 10px 30px",
        margin: "5px 5px 50px 5px",
        textAlign: "-webkit-center",
        borderRadius: "4px",
        boxShadow: "0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)",
        transition: "all 0.3s ease-out",
        WebkitTransform: "all 0.3s ease-out",
        minHeight: "90px",
        color: '#585858',
        background: colors[props.choice],
        textTransform: 'uppercase'
    }

    const stylestyle = {
        padding: "30px 0",
        margin: "5px 5px 50px 5px",
        border: "2px solid #f9f9f9",
        textAlign: "-webkit-center",
        borderRadius: "4px",
        boxShadow: "0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)",
        transition: "all 0.3s ease-out",
        WebkitTransform: "all 0.3s ease-out",
        minHeight: "90px",
        color: '#585858',
        background: colors[props.choice],
        textTransform: 'uppercase'
    }
    var appliedstyle = (props.answer === props.selected) ? colorCode : stylestyle;
    return (
        <div className="col-sm-4 col-md-2 panding_no" key={props.choice} onClick={props.handleClick.bind(this, props.answer)}>
            {(props.answer === props.selected) ? (
                <div className='onfocs_brdr' style={appliedstyle}>
                    <h3 className="bold">{props.answer}</h3>
                </div>) : (
                    <div className='onfocs_brdr' style={appliedstyle}>
                        <h3>{props.answer}</h3>
                    </div>
                )
            }
            <br />
        </div>
    );
}

function AnswerListTwo(props) {
    var answers = [];
    for (let i = 0; i < props.dataSet.answers.length; i++) {
        answers.push(<AnswerTwo key={i} choice={i} style={props.style} handleClick={props.handleClick} selected={props.selected} answer={props.dataSet.answers[i]} />)
    }
    return (
        <div className="col-sm-12 col-md-12 panding_no">
            <div className="col-md-12 col-sm-12 color_cards" style={{ justifyContent: 'center' }}>{answers}</div>
        </div>
    )
}

function QuizAreaTwo(props) {
    return (
        <div className="col-sm-12 col-md-12 panding_no">
            <QuestionTwo dataSet={props.dataSet} validation={props.validation} />
            <AnswerListTwo dataSet={props.dataSet} style={props.style} handleClick={props.handleClick} selected={props.selected} />
        </div>
    )
}

export default MaterialQuestions;