import React, { Component } from "react";
import QueueList from "../../components/Doctor/DoctorsQueueList";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import HamburgerDiv from "../../components/Main/HamburgerDiv";
import axios from "axios";

export class DoctorsQueueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: [],
      loading: true,
      messageOnScreen: "",
      token: sessionStorage.getItem("accessToken"),
    };
  }

  componentDidMount() {
    this.handleDoctorProfile();
  }

  handleDoctorProfile = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/doctor/profile/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        let current = response.data.data;
        this.peopleInWaitingRoom(current.id);
      });
  };

  peopleInWaitingRoom = async (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/queue/today/${id}/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response);

        this.setState({
          exams: response.data.data.queue,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  handleClick = (id, type) => {
    if (type === "queue") {
      this.props.history.push(`/doctor/processing/video/exam/${id}/#init`);
    }
  };

  render() {
    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <HamburgerDiv />

        <QueueList props={this.state} handleClick={this.handleClick} />
      </>
    );
  }
}

export default DoctorsQueueList;
