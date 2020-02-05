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
      token: sessionStorage.getItem("accessToken"),
      id: this.props.match.params.id
    };
  }

  record = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        `https://health-care-backend.herokuapp.com/api/doctor/client-records/${this.state.id}/`,
        { headers: { Authorization: access_token } }
      )
      .then(response => {
        console.log(response);

        return this.setState({ record: Object.values(response.data)[0] });
      });
  };

  handleRecord = async () => {
    // e.preventDefault();
    const access_token = "Bearer ".concat(this.state.token);
    const data = await fetch(
      `https://health-care-backend.herokuapp.com/api/doctor/client-records/${this.state.id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token
        },
        body: JSON.stringify({
          details: this.state.details,
          teraphy_history: this.state.teraphy,
          medical_conditions: this.state.condition
        })
      }
    );
    const jsonData = await data.json();
    console.log(jsonData);
    this.record();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handleRecord();
    this.setState({ details: "", teraphy: "", condition: "" });
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
          handleDetails={this.handleDetails}
          handleTerpahy={this.handleTeraphy}
          handleCondition={this.handleCondition}
          handleSubmit={this.handleSubmit}
          props={this.state}
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
