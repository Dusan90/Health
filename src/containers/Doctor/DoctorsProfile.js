import React, { Component } from 'react';
import axios from 'axios';
import "../../assets/main.scss";
import DProfile from '../../components/Doctor/DoctorsProfile';
import { connect } from 'react-redux';

const token = sessionStorage.getItem('accessToken')
const access_token = 'Bearer '.concat(token)

class DoctorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          doctor: []
        };
    }

    hanldeDoctorsProfile = () => {
        axios.get(`http://0.0.0.0:8000/api/doctor/profile/${this.props.doctor}`, { headers: { Authorization: access_token }})
              .then(response => {
                  return this.setState({doctor: Object.values(response.data)})
        })
    }

    componentDidMount() {
        this.hanldeDoctorsProfile()
        
    }

    render() {
        console.log(this.state.doctors)
        return (
            <div className="container">
                <DProfile doctor={this.state.doctor}/>
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
