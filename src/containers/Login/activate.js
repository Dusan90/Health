import React, { Component } from "react";
import axios from "axios";

export class activate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
    };
  }

  getResponse = async () => {
    axios
      .get(`https://healthcarebackend.xyz/api/auth/activate/${this.state.id}`)
      .then((response) => {
        console.log(response.data, "sta je bre ovo");
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
