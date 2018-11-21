import React, { Component } from 'react';

class Profile extends Component {
    constructor(props) {
        super(props)
        var userdata = "";
        var name = "";
        var Phone = "";
        var Email = "";
        if (localStorage.getItem("userdata") == "undefined" || localStorage.getItem("userdata") == undefined) {
            this.userdata = ""


        } else {

            this.userdata = JSON.parse(localStorage.getItem("userdata"));
            this.name = this.userdata.name;
            this.Phone = this.userdata.email;
            this.Email = this.userdata.phone;


        }
    }
    render() {

        return (
            <div id="profile">
               
                <div className="container"  >
                    <div className="col-sm-12" ><div id="" hidden>

                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Name</td><td> <input type="text" className="form-control" value={this.name} readOnly /> </td><td>Email</td><td> <input type="text" className="form-control" value={this.Email} readOnly /></td>

                                </tr>
                                <tr>
                                    <td>Phone</td><td> <input type="text" value={this.Phone} className="form-control" readOnly /> </td>
                                    <td></td><td> <button className="btn btn-primary">Submit</button></td>

                                </tr>
                            </tbody>

                        </table>

                    </div></div>
                    <div className="col-sm-12"><div id="">
                        <h2 ><b>{this.props.address}</b></h2>
                        <h3 className="text-center"><b>Your Roofing Estimation</b></h3>



                        <table className="table"><thead><tr>
                            <th>S.No</th><th>Style</th><th>Material</th><th>Area</th><th>Estimated Price</th></tr>
                        </thead>


                            <Estimation data={this.userdata.estdet} />
                        </table>



                    </div></div>


                    <div className="col-sm-12">


                    </div>
                </div>
            </div>



        )

    }

}
class Estimation extends Component {
    constructor(props) {
        super(props)

        var resdata = props.data;
        console.log(props.data[0]);

    }
    render() {
        return (<tbody>
            {
                this.props.data.map((value, key) => {
                    return (<tr key={key}><td>{key + 1}</td><td key={key}>{value.slope}</td><td>{value.material}</td><td>{value.area}</td><td>{value.estimatedamount}</td></tr>)

                })

            }


        </tbody>)
    }

}


export default Profile;