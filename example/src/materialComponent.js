import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
const matstyle = {
    padding: "30px 20px 20px 20px",
    margin: "5px 5px 50px 5px",
    border: "1px solid #f9f9f9",
    textAlign: "-webkit-center",
    borderRadius: "4px",
    boxShadow: "0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)",
    transition: "all 0.3s ease-out",
    WebkitTransform: "all 0.3s ease-out"



}
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
        width: '50%'
    }
};

class MaterialComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepIndex: 1,
            finished: false,
            clear: {},
            previous: {},
            next: {},
            solar: false,
            modalIsOpen: false
        }
        Modal.setAppElement('body');
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.material = [{
            image: "./img/mat1.png",
            name: "Lertegeltak",
            cost: 220
        },
        {
            image: "./img/mat2.png",
            name: "Plåt",
            cost: 170
        },
        {
            image: "./img/mat3.png",
            name: "Betongtegeltak",
            cost: 200
        },
        {
            image: "./img/mat4.png",
            name: "Solpaneler",
            cost: 0
        },
        {
            image: "./img/mat5.png",
            name: "Falsad plåt / Bandad Plåt",
            cost: 400
        },
        {
            image: "./img/pulpettak.jpg",
            name: "Papptak",
            cost: 85
        }]
    }
    openModal() {

    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    materialchoose(name) {
        alert(name)
    }
    solarPanel(name, value, e) {
        this.setState({
            solar: true,
            modalIsOpen: true
        })
    }
    makeHref() { return 'https://www.digitak.se/' }
    render() {
        var link = <a href={this.makeHref('login')} target="_blank">här</a>;
        return (<div>
            <div className="container "> <h3 className="roof_subhead"><button id="backbutton" onClick={this.props.back.bind(this, 3)}><i className="fa fa-arrow-left"></i>
            </button>Vilket takmaterial vill du byta till?</h3>
            </div>
            <div className="container">
                <div className="col-sm-12">

                    {
                        this.material.map((data, index) => {
                            if (data.name === 'Solpaneler') {
                                return (
                                    <div id='Solpaneler' className="col-sm-3  panding_no" key={index} onClick={this.solarPanel.bind(this, data.name, data.cost)} >
                                        <div className="onfocs_brdr1" style={matstyle}>
                                            <img src={data.image} className="img-responsive" />
                                            <br /><p><b>{data.name} {this.state.solar}</b></p>
                                            {this.state.solar ? (
                                                <div>
                                                    {/* <button onClick={this.openModal}>Open Modal</button> */}
                                                    <Modal
                                                        isOpen={this.state.modalIsOpen}
                                                        onAfterOpen={this.afterOpenModal}
                                                        onRequestClose={this.closeModal}
                                                        style={customStyles}
                                                        contentLabel="Example Modal"
                                                    >
                                                        <div>
                                                            <button style={{ float: 'right', color: '#fff', backgroundColor: '#0A539C', border: 'none' }} onClick={this.closeModal}>X</button>
                                                        </div>

                                                        <div style={{ width: '100%', padding: '40px 0 0' }}>
                                                            Digitak estimerar endast priser för <b>takomläggningar</b>. Vårt solcellsbolag Digisolar kan ge dig pris för solcellsinstallation. För att komma till Digisolar klicka {link}
                                                        </div>

                                                    </Modal>
                                                </div>

                                            ) : (null)}

                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="col-sm-3  panding_no" key={index} onClick={this.props.matval.bind(this, data.name, data.cost)} > <div className="onfocs_brdr1" style={matstyle}><img src={data.image} className="img-responsive" />
                                        <br /><p><b>{data.name}</b></p> </div></div>
                                )
                            }
                        })
                    }


                </div>
            </div>
        </div>)
    }
}
export default MaterialComponent;