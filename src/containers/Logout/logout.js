import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import { userLoggedOut } from "../../actions/authActions";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.handleLogout();
  }

  componentDidUpdate() {
    this.handleLogout();
  }

  handleLogout = (e) => {
    this.handleSubmit();
    sessionStorage.clear();
    // localStorage.clear();
    localStorage.removeItem("refreshToken");
    this.props.dispatch(userLoggedOut());
    this.redirectUser();
  };

  handleSubmit = async () => {
    const access_token = "Bearer ".concat(
      sessionStorage.getItem("accessToken")
    );
    const data = await fetch(
      `https://healthcarebackend.xyz/api/doctor/profile/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: JSON.stringify({
          prefix: "",
          description: "",
          email_exam_price: null,
          web_exam_price: null,
          status: "Offline",
        }),
      }
    );
    const jsonData = await data.json();
    console.log(jsonData, "profile changed");
    // jsonData.success &&
    //   NotificationManager.success("Profile Updated!", "Successful!", 2000);
  };

  redirectUser = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="container">
        <Header />
        <Nav handleLogout={this.handleLogout} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const user = state.get("user");
  const isLoggedIn = state.get("isLoggedIn");
  console.log(isLoggedIn, user, "logOutttttttt");

  return {
    user,
    isLoggedIn,
  };
};

export default connect(mapStateToProps)(Logout);
