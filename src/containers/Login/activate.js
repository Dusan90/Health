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
    // axios
    //   .get(`https://healthcarebackend.xyz/api/auth/activate/${this.state.id}`)
    //   .then((response) => {
    //     console.log(response.data, "sta je bre ovo");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    var altPattern =
      "(?=^.{8,}$)((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"; // using quotes and new RegEx() syntax...
    var regex = new RegExp(altPattern);
    var str = this.state.id;
    if (str.match(altPattern) != null && regex.test(str) != null) {
      axios
        .get(`https://healthcarebackend.xyz/api/auth/activate/${str}`)
        .then((response) => {
          console.log(response.data, "sta je bre ovo");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("invalid");
    }
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
