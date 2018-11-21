import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
var mainurl=require('./config.json');


class Textc extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userdata: ""
        }
        console.log(props);
console.log(cdaat.url);
        fetch('./config.json').then(function (response) {
            console.log(response)
        })
    }



    componentDidMount() {
        const main = this;
        var payload = {
            name: 'mahesh',
            email: 'maheshs.versatilemobitech111111@gmail.com',
            password: '123456',
            phone: '7386949079',
            type: 'USER'
        }



        fetch( mainurl.url+'users/registeruser', {
            method: "post", headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*"
            }, body: 'json=' + JSON.stringify(payload)
        })
            .then(function (response) {
                return response;
            })
            .then(function (response) {
                return response.json();


            }).then(function (data) {
                console.log(data)
                if (data.status == 400) {
                    main.setState({
                        userdata: data.message
                    })
                } else {

                    main.setState({
                        userdata: data.data
                    })
                }

            })
        /*
            method: 'POST',
          url: 'http://localhost:8080/users/',
         ,
          form: 
           { name: 'mahesh',
             email: 'maheshs.versatilemobitech1@gmail.com',
             password: '123456',
             phone: '7386949079',
             type: 'USER' }*/
        /*
              fetch(`/users/`,{method:"post"},)
           .then( function(response) {
             return response;
           })
           .then( function(response) {
           return response.json();
       	
       
           }).then( function(data) {
       
           console.log(data);
           	
         })
           */
    }
    render() {

        return (<div>
            {this.state.userdata}
        </div>);
    }



}

export default Textc;


