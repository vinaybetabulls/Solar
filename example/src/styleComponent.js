import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const stylestyle = {
    padding: "30px 20px 20px 20px",
    margin: "5px 5px 50px 5px",
    border: "1px solid #f9f9f9",
    textAlign: "-webkit-center",
    borderRadius: "4px",
    boxShadow: "0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)",
    transition: "all 0.3s ease-out",
    WebkitTransform: "all 0.3s ease-out",
    minHeight:"190px"
}
const textstyle = {
    marginTop: 10,
    marginBottom: 10,
}
class StyleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stepIndex: 1,
            finished: false,
            clear: {},
            previous: {},
            next: {}
        }


        this.styles = [{
            image: "./img/choose1.png",
            name: "Sadeltak",
            cost: 600
        },
        {
            image: "./img/choose2.png",
            name: "Valmat tak",
            cost: 1000
        },

        {
            image: "./img/choose4.png",
            name: "Brutet Tak​",
            cost: 1000
        },
        {
            image: "./img/choose3.png",
            name: "Halvvalmat tak",
            cost: 820,

        }, {
            image: "./img/pulpettak_style.jpg",
            name: "Pulpettak",
            cost: 600
        }]

    }


    stchoose(name) {
        alert(name)
    }
    render() {


        return (
            <div className="container mt-5">

                <div style={textstyle}> <h3 className="roof_subhead"><button id="backbutton" onClick={this.props.back.bind(this, 1)}><i className="fa fa-arrow-left"></i>

                </button>Vilken design har ditt tak?</h3>
                </div>
                <div className="row justify-content-center">
                    <div className="col-sm-1"></div>

                    {
                        this.styles.map((data, index) => {
                            return (<div className="col-sm-2 " key={index} onClick={this.props.styval.bind(this, data.name, data.cost)} > <div className="onfocs_brdr" style={stylestyle}   ><img className="img-responsive" src={data.image} />
                                <br />
                                <p>{data.name}</p> </div>

                            </div>
                            )
                        })
                    }



                </div></div>)
    }
}
export default StyleComponent;