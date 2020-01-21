import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Detail from "../../components/Client/DetailExam";

class ClientDetailExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: [],
      statusValue: "",
      selectedStatus: "",
      token: sessionStorage.getItem("accessToken")
    };
  }

  detail = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        `http://health-care-backend.herokuapp.com/api/client/exams/${this.props.examID}/`,
        { headers: { Authorization: access_token } }
      )
      .then(response => {
        this.setState({ exam: Object.values(response.data) });
      });
  };

  handleLink = () => {
    this.props.history.push("/client/exam/correspondence");
  };

  handleLinkMessage = () => {
    this.props.history.push("/client/exam/message");
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

const mapStateToProps = state => {
  const examID = state.getIn(["examReducer", "examID"]);
  return {
    examID
  };
};

export default connect(mapStateToProps)(ClientDetailExam);
