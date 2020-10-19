import React, { Component } from "react";
import VideoList from "../../components/Doctor/DoctorsVideoList";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import HamburgerDiv from "../../components/Main/HamburgerDiv";
import axios from "axios";

export class DoctorsVideoList extends Component {
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
    this.paginatedExams();
  }

  paginatedExams = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/exams/doctor/`, {
        headers: { Authorization: access_token },
      })
      .then((res) => {
        if (res.data.data.video.length !== 0) {
          this.setState({
            exams: res.data.data.video,
            loading: false,
          });
        } else {
          this.setState({
            messageOnScreen: "No Video",
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
    if (type === "video") {
      this.props.history.push(`/doctor/video/exam/detail/${id}/#init`);
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

        <VideoList props={this.state} handleClick={this.handleClick} />
      </>
    );
  }
}

export default DoctorsVideoList;
