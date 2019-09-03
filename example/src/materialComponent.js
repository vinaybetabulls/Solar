import React, { Component } from 'react';
import Modal from 'react-modal';
import SurfaceDragabbleComponent from './components/SurfaceDirectionDrag';
const matstyle = {
    padding: "30px 20px 20px 20px",
    margin: "5px 5px 50px 5px",
    border: "4px solid #f9f9f9",
    textAlign: "-webkit-center",
    borderRadius: "4px",
    boxShadow: "0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)",
    transition: "all 0.3s ease-out",
    WebkitTransform: "all 0.3s ease-out",
    textTransform: 'uppercase',
    color: '#064f70',
    fontSize: '15px'
}

const selectedStyle = {
    padding: "30px 20px 20px 20px",
    margin: "5px 5px 50px 5px",
    textAlign: "-webkit-center",
    borderRadius: "4px",
    boxShadow: "0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)",
    transition: "all 0.3s ease-out",
    WebkitTransform: "all 0.3s ease-out",
    border: "4px solid rgb(142, 226, 174)",
    textTransform: 'uppercase',
    color: '#064f70',
    fontWeight: 'bold',
    fontSize: '15px'
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
            modalIsOpen: false,
            material: '',
            validationOne: false,
            validationTwo: false,
            cost: '',
            surfaceDirection: '' 

        }
        window.scrollTo(0,0);
        Modal.setAppElement('body');
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.validate = this.validate.bind(this);
        this.direction = this.direction.bind(this);
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

    selected(material, cost) {
        this.setState({
            material: material,
            cost: cost,
            validationOne: false
        })
    }

    validate() {
        if (this.state.material === '') {
            this.setState({ validationOne: true });
        } else if (this.state.surfaceDirection === '') {
            this.setState({ validationTwo: true });
        }
    }
    direction(direction) {
        this.setState({ surfaceDirection: direction, validationTwo: false })
    }

    makeHref() { return 'https://www.digitak.se/' }

    render() {
        var link = <a href={this.makeHref('login')} target="_blank">här</a>;
        return (
            <div>
                <div className="container ">
                    <h3 className="roof_subhead">
                        Takinformation</h3>
                </div>
                <div className="col-md-12">
                    <div className="heading_text font-quicksand bold" >Vilket takmaterial har du idag</div>
                    <div className="container">
                        <div className="col-sm-12">
                            {
                                this.material.map((data, index) => {
                                    if (data.name === 'Solpaneler') {
                                        return (
                                            <div id='Solpaneler' className="col-sm-6 col-md-3  panding_no" key={index} onClick={this.solarPanel.bind(this, data.name, data.cost)} >
                                                <div className="onfocs_brdr1" style={matstyle}>
                                                    <img src={data.image} alt={data.name} className="img-responsive" />
                                                    <br /><p>{data.name} {this.state.solar}</p>
                                                    {this.state.solar ? (
                                                        <div>
                                                            <Modal
                                                                isOpen={this.state.modalIsOpen}
                                                                onAfterOpen={this.afterOpenModal}
                                                                onRequestClose={this.closeModal}
                                                                style={customStyles}
                                                                contentLabel="Example Modal">
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
                                            <div className="col-sm-6 col-md-3  panding_no" key={index} onClick={this.selected.bind(this, data.name, data.cost)} >
                                                <div className="onfocs_brdr1" style={(data.name == this.state.material) ? selectedStyle : matstyle}>
                                                    <img src={data.image} alt={data.name} className="img-responsive" />
                                                    <br />
                                                    <p>
                                                        {data.name}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    <div className="col-md-12 material" style={{ textAlign: 'center', padding: '30px' }}>
                        {this.state.validationOne ? (
                            <div className='validation'><span>Please select the material</span></div>
                        ) : (null)}
                    </div>
                </div>
                <hr className="material-seperation" />
                <div className="container">
                    <div className="col-md-12 heading_text font-quicksand bold" >VÄDERSTRECK</div>
                    <SurfaceDragabbleComponent direction={this.direction} />
                    <div className="col-md-12 material" style={{ textAlign: 'center', padding: '30px' }}>
                        {this.state.validationTwo ? (
                            <div className='validation'><span>Please select the roof direction</span></div>
                        ) : (null)}
                    </div>
                </div>

                <div className="col-sm-12 col-md-12 estimate" style={{ textAlign: 'center', padding: '30px' }} >
                    {this.state.material && this.state.surfaceDirection != '' ? (
                        <div className="flex justifyCenter">
                            <div className="padding1">
                                <button onClick={this.props.back.bind(this, 2)} className="submit" >Föregående</button>
                            </div>
                            <div className="padding1">
                                <button onClick={this.props.matval.bind(this, this.state.material, this.state.cost, this.state.surfaceDirection)} className="submit" >Nästa</button>
                            </div>
                        </div>
                    ) : (
                            <div className="flex justifyCenter">
                                <div className="padding1">
                                    <button onClick={this.props.back.bind(this, 2)} className="submit" >Föregående</button>
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
export default MaterialComponent;