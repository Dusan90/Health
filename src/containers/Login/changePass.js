import React, { Component } from "react";
import ChangePass from "../../components/Auth/changePass";
import { NotificationManager } from "react-notifications";
import Nav from "../../components/Main/Navbar";
import Header from "../../components/Main/Header";
import Footer from "../../components/Main/Footer";

export class changePass extends Component {
  constructor(prosp) {
    super(prosp);
    this.state = {
      newPassword: "",
      confPassword: "",
      id: this.props.match.params.id,
      pass: this.props.match.params.pas,
    };
  }

  handleNewPassword = (e) => {
    this.setState({ newPassword: e.target.value });
  };

  handleConfPassword = (e) => {
    this.setState({ confPassword: e.target.value });
  };

  handleChangePassSubmit = (e) => {
    e.preventDefault();
    if (this.state.newPassword === this.state.confPassword) {
      this.changePass();
    } else {
      NotificationManager.error(
        "Confirmation password is not identical",
        "Failed!",
        2000
      );
    }
  };

  changePass = async () => {
    const data = await fetch(
      `https://healthcarebackend.xyz/api/auth/password-reset/${this.state.id}/${this.state.pass}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: this.state.newPassword,
          password: this.state.confPassword,
        }),
      }
    );

    const jsonData = await data.json();
    console.log(jsonData);
  };

  render() {
    console.log(
      this.state.id,
      this.state.pass,
      this.state.newPassword,
      this.state.confPassword
    );

    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <ChangePass
          handleNewPassword={this.handleNewPassword}
          handleConfPassword={this.handleConfPassword}
          handleChangePassSubmit={this.handleChangePassSubmit}
          props={this.state}
        />
        <div>
          <Footer />
        </div>
      </>
    );
  }
}

export default changePass;
