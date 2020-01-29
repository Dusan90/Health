import React, { Component } from "react";
import axios from "axios";
import "../../assets/main/main.scss";
import DProfile from "../../components/Doctor/DoctorsProfile";
import { connect } from "react-redux";

class DoctorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: [],
      token: sessionStorage.getItem("accessToken")
    };
  }

  hanldeDoctorsProfile = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`http://127.0.0.1:8000/api/doctor/profile/${this.props.doctor}`, {
        headers: { Authorization: access_token }
      })
      .then(response => {
        return this.setState({ doctor: Object.values(response.data) });
      });
  };

  componentDidMount() {
    this.hanldeDoctorsProfile();
  }

  render() {
    console.log(this.state.doctor);
    console.log(this.props);
    console.log(this.props.doctor);

    return (
      <div className="container">
        <DProfile doctor={this.state.doctor} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const doctor = state.getIn(["doctorReducer", "doctor"]);
  return {
    doctor
  };
};

export default connect(mapStateToProps)(DoctorProfile);
