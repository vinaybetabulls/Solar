
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
const mapstyle={
    width:"100%",
    height:"400px"


}
class Contact extends Component {
    constructor(props) {
        super(props)


        this.state = {
            date: new Date(),
            time: ""
        }

    }

    contactdate(event) {


        alert(this.refs.googleInput.value);

        this.setState({
            date: event.target.name
        })
    }

    contacttime(event) {

        alert(event.target.name);
        this.setState({
            time: event.target.name
        })
    }


    datetimeservice(valdate, valtime, valemail) {
        var valemail = JSON.parse(localStorage.getItem("userdata")).email;
        var token = localStorage.getItem("token");

        var payload = {
            valdate: valdate,
            valtime: valtime,
            email: valemail

        }

        fetch(mainurl.url + 'users/connecttimes', {
            method: "post",
            crossDomain: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",

            }, body: 'json=' + JSON.stringify(payload) + '&token=' + token
        })
            .then(function (response) {
                return response;
            })
            .then(function (response) {
                return response.json();


            }).then(function (data) {

                if (data.status == 400) {
                    main.setState({
                        responceerror: data.message
                    })
                } else if (data.status == 200) {
                    alert("dtaasaved");

                }

            })
    }
    contactfunc(event) {

        event.preventDefault();
        this.datetimeservice(this.refs.dateinput.value, this.refs.googleInput.value)
    



    }




    render() {
        return (<div id="contactus"  >
            <div id="aboutus-image"><div className="container about_txt"><h2>Contact us</h2><p>Contrary to popular belief, Lorem Ipsum is not simply random text. </p>
            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. </p>

<p>Contrary to popular belief, Lorem Ipsum is not simply random text. </p>

</div></div>
           <section>
       <div className="container">
           <div id="contactus-text">
        <h2 >Head</h2>
        <h4>Contrary to popular belief, Lorem Ipsum is not simply random text</h4>
        <h4 >Contrary to popular belief, Lorem Ipsum is not simply random text</h4>
        <h4 >Contrary to popular belief, Lorem Ipsum is not simply random text</h4>
</div>
</div>
           </section>
         <div className="container"><h3 >Find us</h3></div>
           <div>

               <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.39757369508!2d25.426806322419676!3d59.44615054777371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692fc596b38b4e1%3A0xc5602a1b2a678b42!2sBuilding+Materials+kaluplus!5e0!3m2!1sen!2sin!4v1519103601985" style={mapstyle} ></iframe>
               </div>

            

        </div>)
    }
}
export default Contact