import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Record from "../../components/Doctor/Record";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";

class ClientRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: [],
      details: "",
      teraphy: "",
      condition: "",
      token: sessionStorage.getItem("accessToken")
    };
  }

  record = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        `http://127.0.0.1:8000/api/doctor/client-records/${this.props.clientID}/`,
        { headers: { Authorization: access_token } }
      )
      .then(response => {
        return this.setState({ record: Object.values(response.data)[0] });
      });
  };

  handleRecord = async e => {
    e.preventDefault();
    const access_token = "Bearer ".concat(this.state.token);
    const data = await fetch(
      `http://127.0.0.1:8000/api/doctor/client-records/${this.props.clientID}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token
        },
        body: JSON.stringify({
          details: this.state.details,
          teraphy_history: this.state.teraphy_history,
          medical_conditions: this.state.medical_conditions
        })
      }
    );
    const jsonData = await data.json();
    console.log(jsonData);
  };

  handleDetails = e => {
    this.setState({ details: e.target.value });
  };

  handleTeraphy = e => {
    this.setState({ teraphy: e.target.value });
  };

  handleCondition = e => {
    this.setState({ condition: e.target.value });
  };

  componentDidMount() {
    this.record();
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Nav />
        <Record
          record={this.state.record}
          detailsValue={this.state.details}
          teraphyValue={this.state.teraphy}
          conditionValue={this.state.condition}
          handleDetails={this.handleDetails}
          handleTerpahy={this.handleTeraphy}
          handleCondition={this.handleCondition}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const clientID = state.getIn(["clientReducer", "clientID"]);
  return {
    clientID
  };
};

export default connect(mapStateToProps)(ClientRecord);
