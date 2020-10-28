import React, { Component } from "react";
import axios from "axios";
import Profile from "../../components/Doctor/Profile";
import Nav from "../../components/Main/Navbar";
import Header from "../../components/Main/Header";
// import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { HamburgerDiv } from "../../components/Main/HamburgerDiv";

const options = [
  { value: "RSD", label: "RSD" },
  { value: "EUR", label: "EUR" },
  { value: "USD", label: "USD" },
];

class DoctorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: [],
      selectEmail: "",
      selectVideo: "",
      selectVideoFollow: "",
      token: sessionStorage.getItem("accessToken"),
      FirstName: '',
      LastName: '',
      PhoneNum: '',
      TimeStart: '',
      TimeEnd: '',
      EmailVisit: '',
      VideoVisit: '',
      VideoFollowUp: '',
      Biography: '',
      attach: '',
      currentStatus: '',
      Email: ''
    };
  }

  

  handleSelect = (statusValue) => {
    let { value } = statusValue;
    this.setState({ selectEmail: value });
  };

  handleSelect2 = (statusValue) => {
    let { value } = statusValue;
    this.setState({ selectEmail: value });
  };

  handleSelect3 = (statusValue) => {
    let { value } = statusValue;
    this.setState({ selectEmail: value });
  };

  

  handleSubmit = async (e) => {
    e.preventDefault();
    let form_data = new FormData();
form_data.append("user.first_name", this.state.FirstName);
form_data.append("user.last_name", this.state.LastName);
form_data.append("user.phone", this.state.PhoneNum);
form_data.append("biography", this.state.Biography);
form_data.append("email_exam_price", this.state.EmailVisit);
form_data.append("web_exam_price", this.state.VideoVisit);
form_data.append("web_exam_follow_price", this.state.VideoFollowUp);
form_data.append("image", this.state.attach);
form_data.append("status", this.state.currentStatus);

const access_token = "Bearer ".concat(this.state.token);
let url = 'https://healthcarebackend.xyz/api/doctor/profile/';

const data = axios.put(url, form_data, {
  headers: {
    'content-type': 'multipart/form-data',
    Authorization: access_token,
  }
})


    console.log('submiting');
    // const access_token = "Bearer ".concat(this.state.token);
    // const data = await fetch(
    //   `https://healthcarebackend.xyz/api/doctor/profile/`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: access_token,
    //     },
    //     body: JSON.stringify({
    //       first_name: this.state.FirstName,
    //       last_name: this.state.LastName,
    //       phone: this.state.PhoneNum,
    //       biography: this.state.Biography,
    //       email_exam_price: parseInt(this.state.EmailVisit),
    //       web_exam_price: parseInt(this.state.VideoVisit),
    //       web_exam_follow_price: parseInt(this.state.VideoFollowUp),
    //       image: this.state.attach,
    //       status: '',
    //     }),
    //   }
    // );
    const jsonData = await data;
    console.log(jsonData, "profile changed");
    if(jsonData.data.success){
      NotificationManager.success("Profile Updated!", "Successful!", 2000);
      this.handleDoctorProfile();
    }
  };

  handleDoctorProfile = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/doctor/profile/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response, "doc profileee");

        return this.setState({ doctor: [response.data.data], currentStatus: response.data.data.status });
      });
  };

  componentDidMount() {
    this.handleDoctorProfile();
  }

  handleChange = (e) =>{
    this.setState({[e.target.id]: e.target.value})
  } 

  addAttach= (e) =>{
    this.setState({attach: e.target.files[0]})
    var output = document.querySelector('.docImage');
    output.src = URL.createObjectURL(e.target.files[0]);
  }

  render() {
    console.log(this.state);
    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <HamburgerDiv/>
        <Profile
          status={options}
          doctor={this.state.doctor}
          handleSubmit={this.handleSubmit}
          handleSelect={this.handleSelect}
          handleSelect2={this.handleSelect2}
          handleSelect3={this.handleSelect3}
          props={this.state}
          handleChange={this.handleChange}
          addAttach={this.addAttach}
        />
      </>
    );
  }
}

// const mapStateToProps = state => {
//   const doctor = state.getIn(["doctorReducer", "doctor"]);

//   return {
//     doctor
//   };
// };

export default DoctorProfile;
