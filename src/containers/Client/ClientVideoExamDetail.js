import React, { Component } from "react";
import axios from "axios";
import DetailVideo from "../../components/Client/ClientVideoExamDetail";
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { connectToWebSocket } from "../../actions/connectToWebSocketAction";


// const connection = new WebSocket("wss://healthcarebackend.xyz/wss/video/");
// var Peer = require("simple-peer");

class ClientVideoExamDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      statusValue: "",
      selectedStatus: "",
      token: sessionStorage.getItem("accessToken"),
      id: this.props.match.params.id,
      appointedDate: "",
      YourNumber: null,
      doctorsVideoId: null,
      startVideo: false,
      value: "",
      width: 700,
      height: 500,
      x: 0,
      y: 0,
      hover: false,
      showChat: false,
      video: true,
      audio: true,
    };
    this.socket = new WebSocket(
      `wss://healthcarebackend.xyz/ws/message/${this.props.match.params.id}/`
    );
  }

  handleJoinRoom = (uid) => {    
    this.props.history.push({pathname: `/room/${this.props.match.params.id}`,
    state: uid});
  };

  handleStatus = (statusValue) => {
    this.setState({ statusValue });
    let { value, label } = statusValue;
    console.log(value, label);
    this.setState({ selectedStatus: value });
    this.handleCancel(value);
  };

  handleCancel = async (value) => {
    const access_token = "Bearer ".concat(this.state.token);
    let clientCancel = await fetch(
      `https://healthcarebackend.xyz/api/web/client/${this.state.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: JSON.stringify({
          status: value,
        }),
      }
    );
    let jsonData = await clientCancel.json();
    console.log(jsonData);
    jsonData.success === true && this.props.history.push("/dashboard-client");

    return jsonData;
  };

  componentWillUnmount() {
    this.socket.close();
  }

  detail = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/web/client/${this.state.id}/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          exam: [response.data.data],
          appointedDate: response.data.data.appointed_date,
        });

        let mess = document.getElementById('messageMainText')
        let messageDiv = document.querySelector('.messageDiv')
        let queue = document.getElementById('imageDiv1')
        console.log(mess);
        if(mess.scrollHeight > 100){
          mess.style.height = `${mess.scrollHeight}px`
          messageDiv.style.height = `${mess.scrollHeight + 60}px` 
          queue.style.display = 'block'
        }
        if(response.data.data.report){
          let textare = document.querySelector('.reportTextForExtend')
          console.log(textare.scrollHeight);
          if(textare.scrollHeight <= 150){
            let divsquare = document.getElementById('imageDiv2')
            divsquare.style.display = 'none'
          }
        }else{ 
          let divsquare = document.getElementById('imageDiv2')
          divsquare.style.display = 'none'
        }

        if(response.data.data.decline_notes){
          let textare = document.querySelector('.reasonTextForExtend')
          console.log(textare.scrollHeight);
          if(textare.scrollHeight <= 150){
            let divsquare = document.getElementById('imageDiv3')
            divsquare.style.display = 'none'
          }
        }else{
          let divsquare = document.getElementById('imageDiv3')
          divsquare.style.display = 'none'
        }
      });
  };

  connect = () => {
    if(!sessionStorage.getItem('socketConnected')){
      this.props.connectToWebSocket(new WebSocket(
        `wss://healthcarebackend.xyz/ws/dashboard/client/${this.state.id}/`
      ))
      this.props.connection.onopen = () => {
        console.log("connected to port");
        sessionStorage.setItem('socketConnected', 'true');
  
      };
    }
      this.props.connection.onmessage = (e) => {
        console.log(e);
           const message = JSON.parse(e.data);
        if (JSON.parse(e.data).modified) {
          NotificationManager.error("Exam modified", "New Alert!", 2000);
        }
        if(message.id === JSON.parse(this.state.id) && message.exam_type === "video" ){
          this.detail()
      }}
  };

  extendreport= (e) =>{
    console.log(e.target);
    // const textar = document.getElementById('textarea')
    let textar = document.querySelector('.reportTextForExtend')
    console.log(textar.scrollHeight, textar.clientHeight);
    if(textar.clientHeight === 150){
      textar.style.height = `${textar.scrollHeight}px`
    }else {
      textar.style.height = '150px'
    }
  }
  
  extendreport2= (e) =>{
    console.log(e.target);
    // const textar = document.getElementById('textarea')
    let textar = document.querySelector('.reasonTextForExtend')
    console.log(textar.scrollHeight, textar.clientHeight);
    if(textar.clientHeight === 150){
      textar.style.height = `${textar.scrollHeight}px`
    }else {
      textar.style.height = '150px'
    }
  }

  handleExtendDiv = () =>{
    let mess = document.getElementById('messageMainText')
    let messageDiv = document.querySelector('.messageDiv')
    // let square = document.getElementById('imageDiv1')
    console.log(mess);
      if(mess.clientHeight > 100){
        mess.style.height = '100px'
        messageDiv.style.height = `${160}px`
      }else{
        mess.style.height = `${mess.scrollHeight}px`
        messageDiv.style.height = `${mess.scrollHeight + 60}px`
      }
}

  componentDidMount() {
    this.detail();
    this.socket.onopen = () => {
      console.log("connected");
    };
    this.socket.onmessage = (event) => {
      let parsedEvent = JSON.parse(event.data);
      console.log(parsedEvent);
      if (parsedEvent.exam_id === parseInt(this.state.id)) {
        // window.location.reload()
        this.detail();
      }
    };
    setTimeout(() => {
      this.connect()
    });
    };
  

  handleDivClose = () => {
    this.setState({ startVideo: false });
  };


  render() {
    console.log(this.state.selectedStatus, this.state.statusValue);
    return (
      <>
        <DetailVideo
          exam={this.state.exam}
          handleCancel={this.handleCancel}
          props={this.state}
          handleStatus={this.handleStatus}
          handleJoinRoom={this.handleJoinRoom}
          handleExtendDiv={this.handleExtendDiv}
          extendreport={this.extendreport}
          extendreport2={this.extendreport2}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(ClientVideoExamDetail);
