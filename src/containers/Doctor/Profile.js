import React, { Component } from "react";
import axios from "axios";
import "../../assets/main/main.scss";
import Profile from "../../components/Doctor/Profile";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";

class DoctorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: [],
      doctors: [],
      prefixValue: "",
      descriptionValue: "",
      priceValue: null,
      token: sessionStorage.getItem("accessToken")
    };
  }

  handlePrefix = e => {
    this.setState({ prefixValue: e.target.value });
  };

  handleDescription = e => {
    this.setState({ descriptionValue: e.target.value });
  };

  handlePrice = e => {
    this.setState({ priceValue: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const access_token = "Bearer ".concat(this.state.token);
    const data = await fetch(
      "https://health-care-backend.herokuapp.com/api/doctor/profile/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token
        },
        body: JSON.stringify({
          prefix: this.state.prefixValue,
          description: this.state.descriptionValue,
          email_exam_price: this.state.priceValue
        })
      }
    );
    const jsonData = await data.json();
    console.log(jsonData);
    NotificationManager.success("Profile Updated!", "Successful!", 2000);
    this.handleDoctorProfile();
  };

  handleDoctorProfile = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://health-care-backend.herokuapp.com/api/doctor/profile/`, {
        headers: { Authorization: access_token }
      })
      .then(response => {
        return this.setState({ doctor: Object.values(response.data) });
      });
  };

  componentDidMount() {
    this.handleDoctorProfile();
  }

  render() {
    return (
      <div className="container">
        <Profile
          doctor={this.state.doctor}
          prefixValue={this.prefixValue}
          descriptionValue={this.descriptionValue}
          priceValue={this.priceValue}
          submitValue={this.submitValue}
          handlePrefix={this.handlePrefix}
          handleDescription={this.handleDescription}
          handlePrice={this.handlePrice}
          handleSubmit={this.handleSubmit}
        />
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
