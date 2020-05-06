import React, { Component } from "react";
import axios from "axios";

export class activate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      token: this.props.match.params.token,
    };
  }

  getResponse = async () => {
    axios
      .get(
        // `https://healthcarebackend.xyz/api/auth/activate/Ng-5g9-5876c62c37a57294a4f1/`
        `/https\:\/\/healthcarebackend\.xyz\/api\/auth\/activate\/${this.state.id}-${this.state.token}/`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getResponse();
  }
  render() {
    console.log(this.props);

    return <div>hello</div>;
  }
}

export default activate;
