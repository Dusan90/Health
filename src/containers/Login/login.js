import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../components/Main/Header";
import LoginUser from "../../components/Auth/Login";
import Nav from "../../components/Main/Navbar";
import { userLogin, userLoggedIn } from "../../actions/authActions";
import Footer from "../../components/Main/Footer";
import { NotificationManager } from "react-notifications";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: "",
      passwordValue: "",
      submitted: false,
      is_doctor: false,
      invalid: false,
      rememberMe: false,
    };
  }

  handlePassword = (e) => {
    this.setState({ passwordValue: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.userLogin();
    const { emailValue, rememberMe } = this.state;
    localStorage.setItem("rememberMe", rememberMe);
    localStorage.setItem("emailValue", rememberMe ? emailValue : "");
  };

  userLogin = async () => {
    const data = await fetch(
      "https://health-care-backend.herokuapp.com/api/auth/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.emailValue,
          password: this.state.passwordValue,
        }),
      }
    );

    const jsonData = await data.json();
    // console.log(jsonData);

    if (
      jsonData.detail === "Invalid credentials" ||
      jsonData.detail === "User does not exist" ||
      jsonData.error
    ) {
      NotificationManager.error("Invalid Credentials", "Failed!", 2000);
    } else if (
      this.state.emailValue === "" ||
      this.state.passwordValue === ""
    ) {
      NotificationManager.error("All Fields Are Required", "Failed!", 2000);
    } else {
      if (jsonData.is_doctor) {
        this.setState({ is_doctor: true });
      } else {
        this.setState({ is_doctor: false });
      }
      this.props.dispatch(userLogin(jsonData.data));
      if (jsonData.data.access_token) {
        sessionStorage.setItem("accessToken", jsonData.data.access_token);
        sessionStorage.setItem("expiresIn", jsonData.data.expires_in);
        sessionStorage.setItem("is_doctor", this.state.is_doctor);
        localStorage.setItem("refreshToken", jsonData.data.refresh_token);
        this.props.dispatch(userLoggedIn());
      }
      this.redirectUser();
      return jsonData;
    }
  };

  redirectUser = () => {
    if (this.props.isLoggedIn) {
      if (this.state.is_doctor) {
        this.props.history.push("/dashboard-doctor");
      } else {
        this.props.history.push("/dashboard-client");
      }
    } else {
      this.props.history.push("/login");
    }
  };

  componentDidMount() {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const emailValue = rememberMe ? localStorage.getItem("emailValue") : "";
    this.setState({ emailValue, rememberMe });
  }

  handleChange = (e) => {
    const input = e.target;
    const value = input.type === "checkbox" ? input.checked : input.value;
    this.setState({ [input.name]: value });
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
        <LoginUser
          emailValue={this.state.emailValue}
          passwordValue={this.state.passwordValue}
          submitted={this.state.submitted}
          handleEmail={this.handleEmail}
          handlePassword={this.handlePassword}
          handleSubmit={this.handleSubmit}
          handleRememberClick={this.handleRememberClick}
          rememberMe={this.state.rememberMe}
          handleChange={this.handleChange}
        />
        <div>
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const user = state.getIn(["authReducer", "user"]);
  const isLoggedIn = state.getIn(["authReducer", "isLoggedIn"]);
  // console.log(isLoggedIn, user, "Loginnnnnnnn");

  return {
    user,
    isLoggedIn,
  };
};

export default connect(mapStateToProps)(Login);
