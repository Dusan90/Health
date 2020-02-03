import React, { Component } from "react";
import axios from "axios";
import Detail from "../../components/Client/DetailExam";

class ClientDetailExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      statusValue: "",
      selectedStatus: "",
      token: sessionStorage.getItem("accessToken"),
      id: this.props.match.params.id
    };
  }

  detail = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        `https://health-care-backend.herokuapp.com/api/client/exams/${this.state.id}/`,
        {
          headers: { Authorization: access_token }
        }
      )
      .then(response => {
        this.setState({ exam: Object.values(response.data) });
      });
  };

  handleLink = () => {
    this.props.history.push(`/client/exam/correspondence/${this.state.id}`);
  };

  handleLinkMessage = () => {
    this.props.history.push(`/client/exam/message/${this.state.id}`);
  };

  componentDidMount() {
    this.detail();
  }

  render() {
    return (
      <div className="container">
        <Detail
          exam={this.state.exam}
          handleLink={this.handleLink}
          handleLinkMessage={this.handleLinkMessage}
        />
      </div>
    );
  }
}

export default ClientDetailExam;
