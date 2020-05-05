import React, { Component } from "react";
import axios from "axios";

export class activate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
    };
  }

  test = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/auth/activate/${this.state.id}`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response);
      });
  };

  componentDidMount() {
    this.test();
    // const access_token = "Bearer ".concat(this.state.token);
    // axios
    //   .get(`https://healthcarebackend.xyz/api/auth/activate/${this.state.id}`, {
    //     headers: { Authorization: access_token },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   });
  }
  render() {
    console.log(this.state.id);

    return <div>hello</div>;
  }
}

export default activate;
