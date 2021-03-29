import React, { Component } from "react";
import DoctorsAlertsComp from "../../components/Doctor/DoctorsAlertsComp";
import axios from "axios";
import moment from 'moment'

export class Alerts extends Component {
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
        // this.peopleInWaitingRoom(current.id);
        this.paginatedExams();
      });
  };

  paginatedExams = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/exams/doctor/`, {
        headers: { Authorization: access_token },
      })
      .then((res) => {
        console.log(res);
        if (
          res.data.data.mail.length !== 0 ||
          res.data.data.video.length !== 0
        ) {
          const filteredMail =
            res.data.data.mail.length !== 0
              ? res.data.data.mail.filter(
                  (ex) => ex.transaction["status"] !== "Pending" && !ex.is_read
                )
              : [];
          const filteredVideo =
            res.data.data.video.length !== 0
              ? res.data.data.video.filter(
                  (ex) => ex.transaction["status"] !== "Pending" && !ex.is_read
                )
              : [];
          let combineExams = filteredMail.concat(filteredVideo);
          if (combineExams.length === 0) {
            this.setState({ messageOnScreen: "No alerts" });
          }
          const alertSorted = [...combineExams].sort((a, b) => moment(b.created) - moment(a.created))
          console.log(alertSorted);
          this.setState({
            exams: alertSorted,
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error.response, "error");
        this.setState({ loading: false });
      });
  };

  // peopleInWaitingRoom = async (id) => {
  //   const access_token = "Bearer ".concat(this.state.token);
  //   axios
  //     .get(`https://healthcarebackend.xyz/api/queue/${id}/list/`, {
  //       headers: { Authorization: access_token },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       if(response.data.data.queue !== 0){
  //       const filtered = response.data.data.queue.filter(ex =>{
  //         return ex.status === 'In the queue'
  //       })
  //         this.setState({
  //           exams: filtered,
  //           loading: false,
  //         });
  //         if(filtered.length === 0){
  //             this.setState({messageOnScreen: 'No alerts'})
  //         }
  //       }
  //       else{
  //         this.setState({messageOnScreen: 'No alerts', exams: [],
  //       loading: false})
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //       this.setState({messageOnScreen: 'No alerts', exams: [],
  //       loading: false,})
  //     });
  // };

  handleClick = async (id, type) => {

    if(type === 'mail'){
          this.props.history.push(`/doctor/exam/detail/${id}/`);
      }
    if(type === 'video'){
        this.props.history.push(`doctor/video/exam/detail/${id}/#init`);
      }
  };

  
  render() {
    return (
      <>
        <DoctorsAlertsComp props={this.state} handleClick={this.handleClick} />
      </>
    );
  }
}

export default Alerts;
