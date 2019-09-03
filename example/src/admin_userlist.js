import React, { Component } from 'react';
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
        }).then(function (response) {
            return response;
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            main.setState({
                userdata: data.data
            })
        })
    }

    render() {
        var single = this.state.userdata;
        return (
            <div className="">
                <table className="table" ref="main" id="example" ><thead><tr>
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
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
class Usertab extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <tr>
                <td>{this.props.sno + 1}</td>
                <td>{this.props.data.name}</td>
                <td>{this.props.data.email}</td>
                <td>{this.props.data.phone}</td>
                <td>
                    <button type="button" className="btn btn-info " data-toggle="modal" data-target={"#esitimations" + this.props.sno} >User tracess({this.props.data.estdet.length})</button>
                    <div className="modal fade" id={"esitimations" + this.props.sno} role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content" style={{ width: '700px' }}>
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">x</button>
                                    <h4 className="modal-title">Modal Header</h4>
                                </div>
                                <div className="modal-body">
                                    <EstimatedDet data={this.props.data.estdet} index={this.props.sno} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>)
    }
}

class EstimatedDet extends Component {
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
                                        <div className="col-sm-12"><div className="col-sm-6">Area</div> <div className="col-sm-6">{(parseFloat(res.area)).toFixed(2)}</div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Coordinates</div> <div className="col-sm-6" style={{ wordBreak: 'break-word' }}><p>{res.coordinates}</p></div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Estimatedamount</div> <div className="col-sm-6">{(parseFloat(res.estimatedamount)).toFixed(2)}</div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Material</div> <div className="col-sm-6">{res.material} </div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Property type</div> <div className="col-sm-6">{res.property_type} </div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Floors</div> <div className="col-sm-6">{res.floors} </div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Roof pitch</div> <div className="col-sm-6">{res.roof_pitch}° </div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Power consumption</div> <div className="col-sm-6">{res.power} </div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Electricity consumption</div> <div className="col-sm-6">{res.e_consumption}</div></div>

                                        <div className="col-sm-12">
                                            <hr style={{
                                                display: 'block',
                                                overflow: 'hidden',
                                                borderStyle: 'inset',
                                                borderWidth: '1px'
                                            }} />
                                        </div>
                                        <div className="col-sm-12"><div className="col-sm-6">Cost of solar Installation</div> <div className="col-sm-6">{res.solar_installation_cost} SEK</div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Supervisor Commission</div> <div className="col-sm-6">{res.supervisor_commission} SEK</div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Digisolar Commission</div> <div className="col-sm-6">{res.digisolar_commission} SEK</div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Cost of solar installation with commission</div> <div className="col-sm-6">{res.solar_installation_With_commission} SEK</div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Cost of solar installation after tax</div> <div className="col-sm-6">{res.solar_installation_after_tax} SEK</div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Display cost of solar installation</div> <div className="col-sm-6">{res.display_cost} SEK</div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Solar incentives</div> <div className="col-sm-6">{res.solar_incentives} SEK</div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Battery cost</div> <div className="col-sm-6">{res.battery_cost} SEK</div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Battery cost after tax</div> <div className="col-sm-6">{res.battery_cost_after_tax} SEK</div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Battery incentives</div> <div className="col-sm-6">{res.battery_incentives} SEK</div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Cost of solar installation after incentives</div> <div className="col-sm-6">{res.solar_intallation_after_commission} SEK</div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Cost of battery after incentives</div> <div className="col-sm-6">{res.battery_after_incentives} SEK</div></div>
                                        <div className="col-sm-12"><div className="col-sm-6">Final cost</div> <div className="col-sm-6">{res.final_cost} SEK</div></div>
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