import React, { Component } from "react";
import axios from "axios";
import Detail from "../../components/Client/DetailExam";
import { NotificationManager } from "react-notifications";

class ClientDetailExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      statusValue: "",
      selectedStatus: "",
      token: sessionStorage.getItem("accessToken"),
      id: this.props.match.params.id,
      correspondence: [],
      lastInArray: null,
      replyClicked: false,
      messageValue: "",
      selectedFile: null,
      doctor: '',
      client: ''
    };
    this.socket = new WebSocket(
      `wss://healthcarebackend.xyz/ws/message/${this.props.match.params.id}/`
    );
  }

  handleStatus = (statusValue) => {
    this.setState({ statusValue });
    let { value, label } = statusValue;
    console.log(value, label);
    this.setState({ selectedStatus: value });
    this.handleCancel(value);
  };

  handleCancel = async (value) => {
    const access_token = "Bearer ".concat(this.state.token);
    const doctor = await fetch(
      `https://healthcarebackend.xyz/api/client/exams/${this.state.id}/`,
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
    const jsonData = await doctor.json();
    // this.toRefund();
    console.log(jsonData);
    jsonData.success && this.props.history.push("/dashboard-client");
    return jsonData;
  };

  detail = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/client/exams/${this.state.id}/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response, "detailex");

        this.setState({ exam: this.state.exam.concat(response.data.data), doctor: response.data.data.doctor });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  componentWillUnmount() {
    this.socket.close();
    
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.detail();
    this.correspondence(id);

    this.socket.onopen = () => {
      console.log("connected");
    };
    this.socket.onmessage = (event) => {
      let parsedEvent = JSON.parse(event.data);

      if (parsedEvent.exam_id === parseInt(id)) {
        this.correspondence(id);
      }
      console.log(parsedEvent);
    };
    const access_token = "Bearer ".concat(this.state.token);

    axios
      .get(`https://healthcarebackend.xyz/api/client/profile/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        let name = `${response.data.data.user.first_name} ${response.data.data.user.last_name}`
        return this.setState({ client: name });
      })
  }

  handleMessage = (e) => {
    this.setState({ messageValue: e.target.value });
  };

  handleReplyClick = () => {
    this.setState({ replyClicked: !this.state.replyClicked });
  };

  newMessage = () => {
    this.setState({ replyClicked: true });
  };

  onChangeHandler = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
    });
  };

  handleSubmitSend = (e) => {
    if (this.state.messageValue) {
      this.sendMessage();
      this.setState({ messageValue: "", replyClicked: false });
    } else {
      NotificationManager.error("Empty Fields", "Failed!", 2000);
    }
  };

  sendMessage = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    const client = await fetch(
      `https://healthcarebackend.xyz/api/client/exams/${this.state.id}/message/`,
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
      this.correspondence(this.state.id);
      NotificationManager.success("Message Sent", "Successful!", 2000);
      this.socket.send({
        exam_id: this.state.id,
        message: this.state.messageValue,
      });
    }
    console.log(jsonData);
    console.log(client);

    return jsonData;
  };

  correspondence = (id) => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/client/exams/${id}/messages/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response, "correspondence");

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
        this.setState({
          correspondence: res,
          lastInArray: res[res.length - 1],
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  render() {
    console.log(this.state.client);
    return (
      <>
        <Detail
          exam={this.state.exam}
          props={this.state}
          handleStatus={this.handleStatus}
          onChangeHandler={this.onChangeHandler}
          handleMessage={this.handleMessage}
          newMessage={this.newMessage}
          handleReplyClick={this.handleReplyClick}
          handleSubmitSend={this.handleSubmitSend}
        />
      </>
    );
  }
}

export default ClientDetailExam;
