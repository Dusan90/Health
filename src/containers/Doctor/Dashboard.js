import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Dashboard from '../../components/Doctor/Dashboard';
import { examID } from '../../actions/examActions';
import Header from '../../components/Main/Header';
import Nav from '../../components/Main/Navbar';

const token = sessionStorage.getItem('accessToken')
const access_token = 'Bearer '.concat(token)

class DoctorDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exams: [],
            clients: []
        } 
        
    }

    exams = () => {
        axios.get('http://0.0.0.0:8000/api/doctor/exams/', { headers: { Authorization: access_token }})
          .then(response => {
            const res = response.data.message.map((val) => {
              return {exam: val.id, client: val.client, created: val.created, subject: val.subject, status: val.status}
            });
            this.setState({exams: res})
        })
    }

    clients = () => {
      axios.get('http://0.0.0.0:8000/api/doctor/clients/', { headers: { Authorization: access_token }})
        .then(response => {
          const res = response.data.message.map((val) => {
            return {id: val.client_id, client: val.client}
          });
          this.setState({clients: res}) 
        })
    }

    handleClick = (e) => {
        this.props.dispatch(examID(e.currentTarget.dataset.id))
        this.props.history.push("/doctor/exam/detail")
    }

    componentDidMount() {
        this.exams()
        this.clients()
    }

    render() {
        return (
            <div className="container">
                <Header />
                <Nav />
                <Dashboard exams={this.state.exams} clients={this.state.clients} handleClick={this.handleClick}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      exam: state.exam
    }
  }
  
export default connect(mapStateToProps)(DoctorDashboard);