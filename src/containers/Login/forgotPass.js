import React, { Component } from "react";
import Forgot from "../../components/Auth/forgotPass";
import Nav from "../../components/Main/Navbar";
import Header from "../../components/Main/Header";
import Footer from "../../components/Main/Footer";

export class forgotPass extends Component {
  constructor(prosp) {
    super(prosp);
    this.state = {
      userEmail: "",
      message: null,
      newPassword: "",
      confPassword: "",
    };
  }

  handleChange = (e) => {
    this.setState({ userEmail: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.userCheck();
  };

  userCheck = async () => {
    const data = await fetch("https://healthcarebackend.xyz/api/auth/reset/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.userEmail,
      }),
    });

    const jsonData = await data.json();
    console.log(jsonData);
    if (jsonData.success) {
      this.setState({ message: jsonData.message });
    } else {
      this.setState({ message: jsonData.message });
    }
  };
  render() {
    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <Forgot
          props={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
          <Footer />
        </div>
      </>
    );
  }
}

export default forgotPass;
