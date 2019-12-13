import React, { Component } from 'react';
import Dashboard from '../../components/Doctor/Dashboard';

class DoctorDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        } 
    }

    render() {
        return (
            <div className="container">
                <Dashboard />
            </div>
        )
    }
}

export default DoctorDashboard;