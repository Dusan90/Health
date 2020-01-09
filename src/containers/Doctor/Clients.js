import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Dashboard from '../../components/Doctor/Dashboard';
import Header from '../../components/Main/Header';
import Nav from '../../components/Main/Navbar';


class DoctorClients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            token: sessionStorage.getItem('accessToken')
        } 
        
    }

    clients = () => {
        const access_token = 'Bearer '.concat(this.state.token)
        axios.get('http://0.0.0.0:8000/api/doctor/clients/', { headers: { Authorization: access_token }})
          .then(response => {
            console.log(response.data);
            const res = response.data.message.map((val) => {
              return {id: val.client_id, client: val.client}
            });
            console.log(res);
            this.setState({clients: res}) 
          })
    }

    componentDidMount() {
        this.clients()
    }

    render() {
        return (
            <div className="container">
                <Header />
                <Nav />
                <Dashboard clients={this.state.clients}/>
            </div>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//       exam: state.exam
//     }
// }
  
export default (DoctorClients);