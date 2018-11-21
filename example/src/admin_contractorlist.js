import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'


class Contractorlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userdata: []
        }

        var main = this;
        fetch('admin/contractor', {
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
        return (<table className="table" id="example"><thead><tr>

            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>button</th>
        </tr>
        </thead>
            <tbody>
                {
                    single.map((datata, key) => {
                        return (<Contractor data={datata} key={key} />

                        )
                    })}
            </tbody>

        </table>)



    }
}
class Contractor extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (<tr><td>1</td><td>{this.props.data.name}</td><td>{this.props.data.email}</td><td>{this.props.data.phone}</td><td>5</td></tr>)
    }
}

export default Contractorlist;