import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Loginadmin from './adminlogin';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom';

class AdminRoute extends Component
{
    constructor(props)
    {
        super(props)
    }
    render()
    {
        return(<div>
<Loginadmin/>

        </div>)
    }
}

export default AdminRoute;