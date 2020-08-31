import React, { Component } from "react";
import axios from "axios";
// import { connect } from "react-redux";
import Detail from "../../components/Doctor/DetailExam";
import Footer from "../../components/Main/Footer";
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
    };
    this.socket = new WebSocket(
      `wss://healthcarebackend.xyz/ws/message/${this.props.match.params.id}/`
    );
  }

  handleMessage = (e) => {
    this.setState({ messageValue: e.target.value });
  };

  detail = (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/doctor/exams/${id}/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        this.setState({ exam: this.state.exam.concat(response.data.data) });
      });
  };

  handleSubmit = (value) => {
    let id = this.props.match.params.id;
    this.doctorExam(id, value);
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
        }),
      }
    );
    const jsonData = await client.json();
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

      if (parsedEvent.exam_id === parseInt(id)) {
        this.correspondence(id);
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
          attachment: null,
        }),
      }
    );
    const jsonData = await client.json();
    if (jsonData.success) {
      this.correspondence(this.state.id);
      NotificationManager.success("Message Sent", "Successful!", 2000);
      this.socket.send({
        exam_id: this.state.id,
        message: this.state.messageValue,
      });
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
        let lastIn = response.data.data.reverse();

        this.setState({
          correspondence: res.reverse(),
          lastInArray: lastIn[lastIn.length - 1],
        });
        // var sender_obj = this.state.correspondence[0].sender;
        // this.props.dispatch(doctor(sender_obj));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

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
        />
        <div className="footerr">
          <Footer />
        </div>
      </>
    );
  }
}

export default DetailExam;
