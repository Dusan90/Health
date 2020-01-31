import React, { Component } from "react";
import axios from "axios";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import Dashboard from "../../components/Client/Dashboard";

class ClientDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: [],
      token: sessionStorage.getItem("accessToken"),
      dataFromServer: ""
    };
  }

  initiate = () => {
    this.props.history.push("/initiate");
  };

  componentDidMount() {
    this.exams();

    // const ws = new WebSocket("ws://localhost:8080");
    // // ws.send("hello from ...");
    // ws.onopen = e => {
    //   console.log(e);
    //   console.log(this.state.exams);

    //   // on connecting, do nothing but log it to the console
    //   console.log("connected");
    // };

    // ws.onmessage = evt => {
    //   // listen to data sent from the websocket server
    //   const message = JSON.parse(evt.data);
    //   this.setState({ dataFromServer: message });
    //   console.log("TRDT", message);
    // };

    // ws.onclose = () => {
    //   console.log("disconnected");
    //   // automatically try to reconnect on connection loss
    // };
  }

  exams = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get("http://127.0.0.1:8000/api/client/exams/", {
        headers: { Authorization: access_token }
      })
      .then(response => {
        const res = response.data.message.map(val => {
          return {
            id: val.id,
            doctor: val.doctor,
            created: val.created,
            subject: val.subject,
            status: val.status
          };
        });
        this.setState({ exams: res });
      });
  };

  handleClick = id => {
    this.props.history.push(`/client/exam/detail/${id}`);
  };

  handleChange = e => {
    if (e.target.value === "earliest") {
      let hy = this.state.exams;
      let sort = hy.sort(
        (a, b) => Date.parse(a.created) - Date.parse(b.created)
      );
      this.setState({ exams: sort });
    } else {
      let hello = this.state.exams;
      let resort = hello.sort(
        (a, b) => Date.parse(b.created) - Date.parse(a.created)
      );
      this.setState({ exams: resort });
    }
  };

  render() {
    return (
      <div className="container">
        <Header />
        <Nav />
        <Dashboard
          initiate={this.initiate}
          exams={this.state.exams}
          handleClick={this.handleClick}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default ClientDashboard;
