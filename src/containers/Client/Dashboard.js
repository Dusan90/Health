import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import { examID } from "../../actions/examActions";
import Dashboard from "../../components/Client/Dashboard";

class ClientDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: [],
      token: sessionStorage.getItem("accessToken")
    };
  }

  initiate = () => {
    this.props.history.push("/initiate");
  };

  componentDidMount() {
    this.exams();
  }

  exams = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get("http://health-care-backend.herokuapp.com/api/client/exams/", {
        headers: { Authorization: access_token }
      })
      .then(response => {
        const res = response.data.message.map(val => {
          return {
            exam: val.id,
            doctor: val.doctor,
            subject: val.subject,
            status: val.status
          };
        });
        this.setState({ exams: res });
      });
  };

  handleClick = e => {
    this.props.dispatch(examID(e.currentTarget.dataset.id));
    this.props.history.push("/client/exam/detail");
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
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    exam: state.exam
  };
};

export default connect(mapStateToProps)(ClientDashboard);
