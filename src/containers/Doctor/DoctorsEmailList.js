import React, { Component } from "react";
import EmailList from "../../components/Doctor/DoctorsEmailList";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import HamburgerDiv from "../../components/Main/HamburgerDiv";
import axios from "axios";
import { connect } from "react-redux";

export class DoctorsEmailList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: [],
      loading: true,
      messageOnScreen: "",
      token: sessionStorage.getItem("accessToken"),
      mail: [],
      doctorCurent: "",
    };
  }

  componentDidMount() {
    this.handleDoctorProfile();
  }

  paginatedExams = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/exams/doctor/`, {
        headers: { Authorization: access_token },
      })
      .then((res) => {
        if (res.data.data.mail.length !== 0) {
          this.setState({
            exams: res.data.data.mail,
            loading: false,
          });
        } else {
          this.setState({
            messageOnScreen: "No Email",
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error.response, "error");
        this.setState({ loading: false });
      });
  };

  handleClick = (id, type) => {
    if (type === "mail") {
      this.props.history.push(`/doctor/exam/detail/${id}`);
    }
  };

  getUnreadMessages = async (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/exams/doctor/${id}/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response, "response");
        const unreadMessages = response.data.data.filter((ex) => {
          if (ex.messages.length !== 0) {
            return (
              ex.messages[ex.messages.length - 1].sender !==
              `${this.state.doctorCurent.prefix} ${this.state.doctorCurent.doctor}`
            );
          } else {
            return ex;
          }
        });

        console.log(unreadMessages, "od nzm ni ja");
        const unreadIds = unreadMessages.map((ex) => ex.exam.id);
        this.setState({ mail: unreadIds });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  handleDoctorProfile = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/doctor/profile/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        let current = response.data.data;
        // this.peopleInWaitingRoom(current.id);

        this.setState({
          doctorCurent: current,
        });
        this.paginatedExams();
        this.getUnreadMessages(this.state.doctorCurent.id);
      });
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

        <EmailList props={this.state} handleClick={this.handleClick} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const doctor = state.getIn(["docReducer", "doctor"]);

  return {
    doctor,
  };
};

export default connect(mapStateToProps)(DoctorsEmailList);
