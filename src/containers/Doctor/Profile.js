import React, { Component } from 'react';
import axios from 'axios';
import "../../assets/main.scss";
import Profile from '../../components/Doctor/Profile';
import { connect } from 'react-redux';

const token = sessionStorage.getItem('accessToken')
const access_token = 'Bearer '.concat(token)

class DoctorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          doctor: [],
          doctors: []
        };
    }

    editProfile = async () => {
        const data = await fetch('http://0.0.0.0:8000/api/doctor/profile/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token
              },
            body: JSON.stringify({
                prefix: this.state.prefixValue,
                description: this.state.descriptionValue,
                email_exam_price: this.state.price
            })
        });

        const jsonData = await data.json();
        console.log(jsonData)
    }

    handleDoctorProfile = async () => {
        axios.get(`http://0.0.0.0:8000/api/doctor/profile/`, { headers: { Authorization: access_token }})
            .then(response => {
                return this.setState({doctor: Object.values(response.data)})
        })
        const data = await fetch('http://0.0.0.0:8000/api/doctor/profile/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token
              },
            body: JSON.stringify({
                prefix: this.state.prefixValue,
                description: this.state.descriptionValue,
                email_exam_price: this.state.price
            })
        });
    }

    componentDidMount() {
        this.handleDoctorProfile()

    }

    render() {
        console.log(this.state.doctors)
        return (
            <div className="container">
                <Profile doctor={this.state.doctor} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const doctor = state.getIn(['doctorReducer', 'doctor']);
    return {
        doctor,
    }
  }

export default connect(mapStateToProps)(DoctorProfile);
