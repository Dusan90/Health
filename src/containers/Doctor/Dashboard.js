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
        } 
        
    }

    exams = () => {
        axios.get('http://0.0.0.0:8000/api/doctor/exams/', { headers: { Authorization: access_token }})
          .then(response => {
            console.log(response.data);
            const res = response.data.message.map((val) => {
              return {exam: val.id, client: val.client, speciality: val.speciality, subject: val.subject}
            });
            console.log(res);
            this.setState({exams: res}) 
          })
    }

    handleClick = (e) => {
        this.props.dispatch(examID(e.currentTarget.dataset.id))
        this.props.history.push("/doctor/exam/detail")
    }

    componentDidMount() {
        this.exams()
    }

    render() {
        return (
            <div className="container">
                <Header />
                <Nav />
                <Dashboard exams={this.state.exams} handleClick={this.handleClick}/>
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