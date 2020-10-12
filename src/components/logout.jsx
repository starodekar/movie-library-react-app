import React, { Component } from 'react';
import auth from '../services/authService'

class Logout extends Component {
    state = {  }

    componentDidMount() {
        auth.logout();
        window.location = '/';
    }

    render() { 
        return ( <h1>Logout</h1> );
    }
}
 
export default Logout;