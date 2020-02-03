import React, { Component } from "react";
import axios from "axios";
import Dashboard from "../../components/Doctor/Dashboard";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";

class DoctorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: [],
      clients: [],
      record: [],
      token: sessionStorage.getItem("accessToken"),
      pending: "",
      openPending: false,
      value: ""
    };
  }

  exams = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get("https://health-care-backend.herokuapp.com/api/doctor/exams/", {
        headers: { Authorization: access_token }
      })
      .then(response => {
        const res = response.data.message.map(val => {
          return {
            id: val.id,
            client: val.client,
            created: val.created,
            subject: val.subject,
            status: val.status
          };
        });
        this.setState({ exams: res });
        this.setState({
          pending: [...this.state.exams.filter(res => res.status === "Pending")]
        });
      });
  };

  clients = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get("https://health-care-backend.herokuapp.com/api/doctor/clients/", {
        headers: { Authorization: access_token }
      })
      .then(response => {
        const res = response.data.message.map(val => {
          return { id: val.client_id, client: val.client };
        });
        this.setState({ clients: res });
      });
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

  handleClick = id => {
    this.props.history.push(`/doctor/exam/detail/${id}`);
  };

  handleClient = id => {
    this.props.history.push(`/doctor/record/detail/${id}`);
  };

  hnlClick = () => {
    this.setState({ openPending: !this.state.openPending });
  };

  escBtn = e => {
    if (e.keyCode === 27) {
      this.setState({ openPending: false });
    }
  };

  componentDidMount() {
    this.exams();
    this.clients();
    window.addEventListener("keydown", this.escBtn);
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Nav />
        <Dashboard
          websocket={this.ws}
          exams={this.state.exams}
          clients={this.state.clients}
          handleClick={this.handleClick}
          handleClient={this.handleClient}
          pending={this.state.pending}
          hnlClick={this.hnlClick}
          props={this.state}
          handleKeyPress={this.handleKeyPress}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default DoctorDashboard;
