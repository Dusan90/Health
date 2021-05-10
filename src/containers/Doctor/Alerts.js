import React, { Component } from "react";
import DoctorsAlertsComp from "../../components/Doctor/DoctorsAlertsComp";
import axios from "axios";
import moment from 'moment'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NotificationManager } from "react-notifications";


import { connectToWebSocket } from "../../actions/connectToWebSocketAction";

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
        setTimeout(() => {
          this.connect(current.id)
        });
        // this.peopleInWaitingRoom(current.id);
        this.paginatedExams();
      });
  };

  paginatedExams = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/doctor/notifications/`, {
        headers: { Authorization: access_token },
      })
      .then((res) => {
        console.log(res);
        const sort = res.data.data.sort((a,b) => Date.parse(b.created) - Date.parse(a.created))
        this.setState({exams: sort, loading: false})
      })
      .catch((error) => {
        console.log(error.response, "error");
        this.setState({ loading: false, messageOnScreen: 'No alerts', exams: [] });
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

  connect = (id) => {
    if(!sessionStorage.getItem('socketConnected')){
      this.props.connectToWebSocket(new WebSocket(
        `wss://healthcarebackend.xyz/ws/dashboard/doctor/${id}/`
      ))
      this.props.connection.onopen = () => {
        console.log("connected to port");
        sessionStorage.setItem('socketConnected', 'true');
  
      };
    }
      this.props.connection.onmessage = (e) => {
        console.log(e.data);
        if (JSON.parse(e.data).content && !JSON.parse(e.data).is_read) {
          NotificationManager.info(`${JSON.parse(e.data).content}`, "New Alert!", 5000);
        }
        this.paginatedExams()
  }}

  handleClick = async (id, type, notifId) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/doctor/notifications/${notifId}`, {
        headers: { Authorization: access_token },
      })
      .then((res) => {
        console.log(res);
      })

    if(type === 'mail'){
          this.props.history.push(`/doctor/exam/detail/${id}/`);
      }
    if(type === 'video'){
        this.props.history.push(`doctor/video/exam/detail/${id}/#init`);
      }
  };

  handleDelete = async (id) =>{
    const access_token = "Bearer ".concat(this.state.token);
    console.log(id);
      let data = axios.delete(`https://healthcarebackend.xyz/api/doctor/notifications/${id}/`, {
        headers: {
          Authorization: access_token
        }
      });
      const jsonData = await data
      console.log(jsonData);
      this.paginatedExams()
  }

  
  render() {
    return (
      <>
        <DoctorsAlertsComp props={this.state} handleClick={this.handleClick} handleDelete={this.handleDelete} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const connection = state.getIn(["connectToWebSocketReducer", "connection"]);
  return {
    connection,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ connectToWebSocket: connectToWebSocket }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
