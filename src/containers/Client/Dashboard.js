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
    this.connect();
    this.exams();
  }

  exams = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get("https://health-care-backend.herokuapp.com/api/client/exams/", {
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

  connect = () => {
    var ws = new WebSocket(
      "https://health-care-backend.herokuapp.com/ws/exam/status/"
    );
    let that = this;
    var connectInterval;
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
      this.setState({ ws: ws });
    };
    ws.onmessage = e => {
      // listen to data sent from the websocket server
      this.exams();
      const message = JSON.parse(e.data);
      this.state.exams.map(exam => {
        if (exam.exam === message.id) {
          var state = message.status;
          let new_exam = Object.assign({ ...exam }, exam);
          new_exam.status = state;
          return { new_exam };
        } else {
          console.log("Does not exist.");
        }
      });
    };
    ws.onclose = e => {
      console.log(
        `Socket is closed. Reconnect will be attempted in ${Math.min(
          10000 / 1000,
          (that.timeout + that.timeout) / 1000
        )} second.`,
        e.reason
      );
      that.timeout = that.timeout + that.timeout; //increment retry interval
      connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //c
      // automatically try to reconnect on connection loss
    };
    ws.onerror = err => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      ws.close();
    };
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
