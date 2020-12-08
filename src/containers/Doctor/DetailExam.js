import React, { Component } from "react";
import axios from "axios";
// import { connect } from "react-redux";
import Detail from "../../components/Doctor/DetailExam";
import { NotificationManager } from "react-notifications";

class DetailExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      statusValue: "",
      selectedStatus: "",
      token: sessionStorage.getItem("accessToken"),
      id: "",
      correspondence: [],
      lastInArray: null,
      replyClicked: false,
      messageValue: "",
      selectedFile: null,
      doctor: '',
      declineReason: '',
      report: ""
    };
    this.socket = new WebSocket(
      `wss://healthcarebackend.xyz/ws/message/${this.props.match.params.id}/`
    );
  }

  handleMessage = (e) => {

    document.querySelector('.messageTextInput').style.height = `${e.target.scrollHeight}px`
    this.setState({ messageValue: e.target.value });
  };

  detail = (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/doctor/exams/${id}/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response, 'current');
        this.setState({ exam: this.state.exam.concat(response.data.data), doctor: response.data.data.doctor });
        let mess = document.getElementById('messageMainText')
        let messageDiv = document.querySelector('.messageDiv')
        console.log(mess);
        if(mess.scrollHeight < 300){
          mess.style.height = `${mess.scrollHeight}px`
          messageDiv.style.height = `${mess.scrollHeight + 20}px`
        }else{
          mess.style.height = '300px'
        }
      });
  };

  handleSubmit = (value) => {
    let id = this.props.match.params.id;
    if(value !== 'Decline'){
      this.doctorExam(id, value);
    }
  };

  handleReplyClick = () => {
    this.setState({ replyClicked: !this.state.replyClicked });
  };

  newMessage = () => {
    this.setState({ replyClicked: true });
  };

  handleStatus = (statusValue) => {
    this.setState({ statusValue });
    let { value } = statusValue;
    this.setState({ selectedStatus: value });
    this.handleSubmit(value);
  };

  onChangeHandler = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
    });
  };

  doctorExam = async (id, value) => {
    console.log(id, value);
    const access_token = "Bearer ".concat(this.state.token);
    const client = await fetch(
      `https://healthcarebackend.xyz/api/doctor/exams/${id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: JSON.stringify({
          status: value,
          decline_notes: this.state.declineReason,
          report: this.state.report
        }),
      }
    );
    const jsonData = await client.json();
    console.log(jsonData);
    jsonData.success && window.location.reload();

    return jsonData;
  };

  componentWillUnmount() {
    this.socket.close();
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.setState({ id: id });
    this.detail(id);
    this.correspondence(id);
    this.socket.onopen = () => {
      console.log("connected");
    };
    this.socket.onmessage = (event) => {
      let parsedEvent = JSON.parse(event.data);
      console.log(parsedEvent);
      if (parsedEvent.exam_id === parseInt(id)) {
        window.location.reload()

      }
    };
  }

  

  handleSubmitSend = (e) => {
    if (this.state.messageValue) {
      this.sendMessage();
      this.setState({ messageValue: "", replyClicked: false });
    } else {
      NotificationManager.error("Empty Fields", "Failed!", 2000);
    }
    // this.props.history.push(`/doctor/exam/correspondence/${this.state.id}`);
  };

  sendMessage = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    // const data = new FormData()
    // data.append('file', this.state.selectedFile, this.state.selectedFile.name)
    const client = await fetch(
      `https://healthcarebackend.xyz/api/doctor/exams/${this.state.id}/message/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;",
          Authorization: access_token,
        },
        body: JSON.stringify({
          message: this.state.messageValue,
          attachment: this.state.selectedFile,
        }),
      }
    );
    const jsonData = await client.json();
    if (jsonData.success) {
      // this.correspondence(this.state.id);
      NotificationManager.success("Message Sent", "Successful!", 2000);
      this.socket.send({
        exam_id: this.state.id,
        message: this.state.messageValue,
      });
      window.location.reload()
    }

    return jsonData;
  };

  correspondence = (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/doctor/exams/${id}/messages/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        const res = response.data.data.map((val) => {
          return {
            id: val.id,
            sender: val.sender,
            created: val.created,
            message: val.message,
            attachment: val.attachment,
          };
        });
        // let lastIn = response.data.data.reverse();

        let resort = res.sort(
          (a, b) => Date.parse(a.created) - Date.parse(b.created)
        );

        this.setState({
          correspondence: resort,
          lastInArray: res[res.length - 1],
        });
        // var sender_obj = this.state.correspondence[0].sender;
        // this.props.dispatch(doctor(sender_obj));
      }).then(() =>{
        let textar = [...document.querySelectorAll('.message')]
        textar.map(ex =>{
          if (ex.clientHeight < ex.scrollHeight){
            console.log(ex);
            let imageDiv = document.createElement("div");
            imageDiv.id = "imageDiv";
            imageDiv.onclick = function() { 
             
              ex.scrollHeight < 300 ? ex.style.height = `${ex.scrollHeight}px` : ex.style.height = '300px' };
            let parentOfElement = ex.parentElement.previousSibling
            // parentOfElement.insertBefore(imageDiv, parentOfElement.firstChild);
            console.log(parentOfElement);
            parentOfElement.appendChild(imageDiv)

          }
        })
    
      })
      .catch((error) => {
        console.log(error.response);
      
      });
  };

  declineReason = (e)=>{
    this.setState({declineReason: e.target.value})
    e.target.style.height = '300px'
    // e.target.style.height = `${e.target.scrollHeight}px`
    
  }

  saveReason = () =>{
    let id = this.props.match.params.id;
    this.doctorExam(id, this.state.selectedStatus)
  }

  report= (e) =>{
    this.setState({report: e.target.value})
    e.target.style.height = '300px'
    // e.target.style.height = `${e.target.scrollHeight}px`
  }

  saveReport= () =>{
    let id = this.props.match.params.id;
    let value = 'Finish'
    this.doctorExam(id, value)

  }

  handleReport = () =>{
    console.log('hy');
      this.setState({displayReport: true})

  } 

  resetValue = () =>{
    this.setState({value: ''})
    let inputMessage = document.querySelector(".inputMessage")
    let yourMessage = document.getElementById("yourMessage")
    yourMessage.style.height = "30px";
  inputMessage.style.height = '30px'
  }

  

  render() {
    return (
      <>
        <Detail
          exam={this.state.exam}
          handleStatus={this.handleStatus}
          handleReplyClick={this.handleReplyClick}
          handleSubmitSend={this.handleSubmitSend}
          props={this.state}
          onChangeHandler={this.onChangeHandler}
          handleMessage={this.handleMessage}
          newMessage={this.newMessage}
          declineReason={this.declineReason}
          saveReason={this.saveReason}
          report={this.report}
          saveReport={this.saveReport}
          handleReport={this.handleReport}
          resetValue={this.resetValue}
        />
      </>
    );
  }
}

export default DetailExam;
