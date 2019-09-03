import React, { Component } from 'react';
import Userslist1 from './admin_userlist';
import Contractorlist from './admin_contractorlist';
import Adminlogin from './admin_login';
import { parse } from 'qs';
let admintoken, adminLogin;

const closestyle = {
    width: 0,
    main: { marginLeft: 0 }
}
const openstyle = {
    width: 200,
    main: { marginLeft: 200 }
}
const bodystyle = {
    paddingTop: 50
}

class AdminHome extends Component {
    constructor(props) {
        super(props);
        var locationname = parse(location.search.substr(1)).page;
        if (localStorage.getItem("aurthenticate") == undefined || localStorage.getItem("aurthenticate") == "undefined") {
            admintoken = "";
            adminLogin = false;
        } else {
            var userdata = JSON.parse(localStorage.getItem("aurthenticate"))
            adminLogin = true;
            admintoken = userdata.token;
        }

        this.state = {
            style: openstyle,
            headindex: 1,
            location: locationname,
            adminlogin: adminLogin,
            token: admintoken
        }
    }

    componentDidMount() {
        // $('#example').DataTable();
    }

    open1() {
        this.setState({
            style: openstyle
        })
    }

    close1() {
        this.setState({
            style: closestyle
        })
    }

    changeNave1(val) {
        this.setState({
            headindex: val
        })
    }

    logout() {
        localStorage.clear();
        location.reload();
    }

    render() {
        if ((this.state.location == "USER" || this.state.location == "CONTRACTOR") && this.state.token != "" && this.state.adminlogin == true) {
            return (
                <div>
                    <Navigation style={this.state.style} open={this.open1.bind(this)} />
                    <Sidenav style={this.state.style} sdebaridex={this.state.headindex}
                        close={this.close1.bind(this)}
                        close={this.close1.bind(this)}
                        changeNave={this.changeNave1.bind(this)}
                        logout={this.logout.bind(this)}
                    />
                    <div id="main" style={this.state.style.main}>
                        <div className="col-md-12" style={bodystyle}>
                            <div>
                                {(() => {
                                    switch (this.state.location) {
                                        case "USER":
                                            return <Userslist1 />
                                            break;
                                        case "CONTRACTOR":
                                            return <Contractorlist />
                                            break;
                                        case "LOGIN":
                                            return <Contractorlist />
                                            break;
                                        default:
                                            return null
                                    }
                                })()}
                            </div>
                        </div>
                    </div>
                </div>)
        } else {
            return (< Adminlogin />)
        }
    }
}

class Navigation extends Component {
    constructor(props) {
        super()
    }
    render() {
        return (<nav className="navbar navbar-default navbar-fixed-top">
            <div style={this.props.style.main}>
                <ul className="nav navbar-nav">
                    <li><a>
                        <span onClick={this.props.open.bind(this)}>
                            <i className="fa fa-bars "></i>
                            open
                        </span>
                    </a>
                    </li>
                </ul>
            </div>
        </nav>)
    }
}

class Sidenav extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div id="mySidenav" className="sidenav" style={this.props.style}>
                <div style={{ width: '200px' }}>
                    <a href="javascript:void(0)" className="closebtn" onClick={this.props.close.bind(this)} >X</a>
                </div>
                <a href="/admin?page=CONTRACTOR">CONTRACTORS</a>
                <a href="/admin?page=USER">USERS</a>
                <a href="javascript:void(0)" onClick={this.props.logout.bind(this)}>LOGOUT</a>
            </div>
        )
    }
}
export default AdminHome;