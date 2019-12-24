import React, { Component } from 'react';
import Dashboard from '../../components/Client/Dashboard';

class ClientDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exams: [],
        } 
    }

    initiate = () => {
        this.props.history.push('/initiate');
    }

    componentDidMount(){
        this.clientExams();
    }

    clientExams = async () => {
        const data = await fetch('http://0.0.0.0:8000/api/client/exams/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
        });
        const jsonData = await data.json();
        console.log(jsonData)
        this.setState({exams: jsonData})

    }

    render() {
        return (
            <div className="container">
                <Dashboard 
                    initiate={this.initiate}
                    clientExams={this.clientExams}
                />
            </div>
        )
    }
}

export default ClientDashboard;
