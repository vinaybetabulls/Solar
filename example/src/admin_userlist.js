import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';


class Userslist1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userdata: []
        }

        var main = this;
        fetch('admin/users', {
            method: "get", headers: {

                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*"
            }
        })
            .then(function (response) {
                return response;
            })
            .then(function (response) {
                return response.json();


            }).then(function (data) {


                main.setState({
                    userdata: data.data
                })
                /*
                  if (data.status == 400) {
                      main.setState({
                          userdata: data.message,
                          responseerror:data.message
                      })
                  } else if(data.status == 200) {
  main.setState({
      userdata:data.data
  })
  
  
  
                  }*/

            })

    }

    render() {
        var single = this.state.userdata
        return (<div className="container"><table className="table" id="example" ><thead><tr>

            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>View trace</th>
        </tr>
        </thead>
            <tbody>
                {
                    single.map((datata, key) => {
                        return (<Usertab data={datata} key={key} sno={key} />

                        )
                    })}
            </tbody>

        </table></div>)

    }
}
class Usertab extends Component {
    constructor(props) {
        super(props)



    }
    render() {
        return (<tr><td>{this.props.sno + 1}</td><td>{this.props.data.name}</td><td>{this.props.data.email}</td><td>{this.props.data.phone}</td><td>


            <button type="button" className="btn btn-info " data-toggle="modal" data-target={"#esitimations" + this.props.sno} >User tracess({this.props.data.estdet.length})</button>


            <div className="modal fade" id={"esitimations" + this.props.sno} role="dialog">
                <div className="modal-dialog">


                    <div className="modal-content" style={{ width: '700px' }}>
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">x</button>
                            <h4 className="modal-title">Modal Header</h4>
                        </div>
                        <div className="modal-body">


                            <Estimated_det data={this.props.data.estdet} index={this.props.sno} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>


        </td></tr>)
    }
}

class Estimated_det extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        var singledata = this.props.data

        return (<div>


            <div className="panel-group" id="accordion">

                {

                    singledata.map((res, key) => {
                        return (

                            <div className="panel panel-default" key={key}>


                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                        <a data-toggle="collapse" data-parent="#accordion" href={"#collapse" + this.props.index + key} >{moment(res.created_date).format('DD-MMMM-YYYY HH:mm:ss')}</a>
                                    </h4>
                                </div>
                                <div id={"collapse" + this.props.index + key} className="panel-collapse collapse">
                                    <div className="panel-body">
                                        <div className="col-sm-12"><div className="col-sm-6">Address</div> <div className="col-sm-6">{res.address} </div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">area</div> <div className="col-sm-6">{(parseFloat(res.area)).toFixed(2)}</div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">coordinates</div> <div className="col-sm-12" style={{wordBreak: 'break-word'}}><p>{res.coordinates}</p></div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">estimatedamount</div> <div className="col-sm-6">{(parseFloat(res.estimatedamount)).toFixed(2)}</div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">material</div> <div className="col-sm-6">{res.material} </div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">slope/tak</div> <div className="col-sm-6">{res.slope} </div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">property_type</div> <div className="col-sm-6">{res.property_type} </div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">floors</div> <div className="col-sm-6">{res.floors} </div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">roof_pitch</div> <div className="col-sm-6">{res.roof_pitch}° </div></div>

                                    </div>
                                </div>


                            </div>)
                    })
                }

            </div>
        </div>)
    }

}

export default Userslist1;