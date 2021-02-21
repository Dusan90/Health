import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import { userLoggedOut } from "../../actions/authActions";
import axios from 'axios'

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = async () => {
    // let { value } = e.target;
    const access_token = "Bearer ".concat(
      sessionStorage.getItem("accessToken")
    );
    // e.preventDefault();
    let form_data = new FormData();
form_data.append("user.first_name", '');
form_data.append("user.last_name", '');
form_data.append("user.phone", '');
form_data.append("biography", '');
form_data.append("email_exam_price", '');
form_data.append("web_exam_price", '');
form_data.append("web_exam_follow_price", '');
form_data.append("image", '');
form_data.append("organization", '');
form_data.append("start_hour", '');
form_data.append("end_hour", '');
form_data.append("email_currency", '');
  form_data.append("web_currency", '');
  form_data.append("web_follow_up_currency", '');
  form_data.append("speciality", this.props.location.spec);
form_data.append("status", "Offline");
form_data.append("waiting_room_price", '');
form_data.append("waiting_room_currency", '');

form_data.append("web_exam_status", '');
form_data.append("email_exam_status", '');
  form_data.append("waiting_room_status", '');
  form_data.append("web_exam_follow_status", '');


let url = 'https://healthcarebackend.xyz/api/doctor/profile/';

const data = axios.put(url, form_data, {
  headers: {
    'content-type': 'multipart/form-data',
    Authorization: access_token,
  }
})


    console.log('submiting');
    const jsonData = await data;
    console.log(jsonData, "profile changed");
    if(jsonData.data.success){
    }
  };




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

  // handleSubmit = async () => {
  //   const access_token = "Bearer ".concat(
  //     sessionStorage.getItem("accessToken")
  //   );
  //   const data = await fetch(
  //     `https://healthcarebackend.xyz/api/doctor/profile/`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: access_token,
  //       },
  //       body: JSON.stringify({
  //         prefix: "",
  //         description: "",
  //         email_exam_price: null,
  //         web_exam_price: null,
  //         status: "Offline",
  //       }),
  //     }
  //   );
  //   const jsonData = await data.json();
  //   console.log(jsonData, "profile changed");
  //   // jsonData.success &&
  //   //   NotificationManager.success("Profile Updated!", "Successful!", 2000);
  // };

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
