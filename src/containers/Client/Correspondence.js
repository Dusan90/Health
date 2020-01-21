import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import CorrespondenceMessage from "../../components/Client/Correspondence";
import { doctor } from "../../actions/examActions";

class ClientCorrespondence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correspondence: [],
      messageValue: "",
      token: sessionStorage.getItem("accessToken")
    };
  }

  correspondence = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        `http://health-care-backend.herokuapp.com/api/client/exams/${this.props.examID}/messages`,
        { headers: { Authorization: access_token } }
      )
      .then(response => {
        const res = response.data.messages.map(val => {
          return {
            id: val.id,
            sender: val.sender,
            created: val.created,
            message: val.message,
            attachment: val.attachment
          };
        });
        console.log(res, "data");
        this.setState({ correspondence: res });
        var sender_obj = this.state.correspondence[0].sender;
        this.props.dispatch(doctor(sender_obj));
      });
  };

  handleMessage = e => {
    this.setState({ messageValue: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ messageValue: "" });
    this.correspondence();
  };

  componentDidMount() {
    this.correspondence();
  }

  render() {
    return (
      <div className="container">
        <CorrespondenceMessage
          correspondence={this.state.correspondence}
          messageValue={this.state.messageValue}
          handleMessage={this.handleMessage}
          submitValue={this.state.submitValue}
          handleSubmit={this.handleSubmit}
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

export default connect(mapStateToProps)(ClientCorrespondence);
