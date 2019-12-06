import React, { Component } from 'react';
import Dashboard from '../../components/Client/Dashboard';

class ClientDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        } 
    }

    initiate = () => {
        this.props.history.push('/initiate');
    }

    render() {
        return (
            <div className="container">
                <Dashboard 
                    initiate={this.initiate}
                />
            </div>
        )
    }
}

export default ClientDashboard;
