import React, { Component } from "react";
import VideoList from "../../components/Doctor/DoctorsVideoList";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
// import HamburgerDiv from "../../components/Main/HamburgerDiv";
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
        console.log(res);
        if (res.data.data.video.length !== 0) {
          const filteredVideo = res.data.data.video.length !== 0 ? res.data.data.video.filter(ex =>  ex.transaction['status'] !== 'Pending') : []
          const filtered = filteredVideo.filter(ex=>{
            return ex.status === 'Pending'
          })
          console.log(filteredVideo, filtered);
          this.setState({
            exams: filtered,
            loading: false,
          });
          if(filtered.length === 0){
            this.setState({
              messageOnScreen: "No consultations" })
          }
        }else{
          this.setState({messageOnScreen: 'No counsultations', exams: [],
          loading: false,})
        }
      })
      .catch((error) => {
        console.log(error.response, "error");
        this.setState({messageOnScreen: 'No counsultations', exams: [],
        loading: false,})
      });
  };

  handleClick = (id, type) => {
    if (type === "video") {
      this.props.history.push(`/doctor/video/exam/detail/${id}/#init`);
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
        {/* <HamburgerDiv /> */}

        <VideoList props={this.state} handleClick={this.handleClick} />
      </>
    );
  }
}

export default DoctorsVideoList;
