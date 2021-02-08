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
      .get(`https://healthcarebackend.xyz/api/queue/${id}/list/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response);
        if(response.data.data.queue !== 0){
        const filtered = response.data.data.queue.filter(ex =>{
          return ex.status === 'In the queue'
        })
          this.setState({
            exams: filtered,
            loading: false,
          });
          if(filtered.length === 0){
              this.setState({messageOnScreen: 'No counsultations'})
          }
        }
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
    console.log(this.state.messageOnScreen);
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
