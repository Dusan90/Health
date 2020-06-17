import React, { Component } from "react";
import axios from "axios";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import Footer from "../../components/Main/Footer";
import VideoReq from "../../components/Client/VideoReq";
import { connect } from "react-redux";
import { doctor } from "../../actions/examActions";
import { NotificationManager } from "react-notifications";
import moment from "moment";

// let ws = new WebSocket("ws://localhost:8080/");

// let zauzeto = [
//   {
//     date: moment("2020-06-16T15:30").format("YYYY-MM-DD"),
//     time: new Date("2020-06-16T15:30"),
//   },
//   {
//     date: moment("2020-06-16T16:30").format("YYYY-MM-DD"),
//     time: new Date("2020-06-16T14:30"),
//   },
//   {
//     date: moment("2020-06-17T14:30").format("YYYY-MM-DD"),
//     time: new Date("2020-06-17T14:30"),
//   },
//   {
//     date: moment("2020-06-18T13:30").format("YYYY-MM-DD"),
//     time: new Date("2020-06-18T13:30"),
//   },
// ];

class ClientVideoReq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      specialities: [],
      doctors: [],
      filtered: [],
      subject: "",
      notes: "",
      submitted: false,
      price: null,
      doctor_id: null,
      token: sessionStorage.getItem("accessToken"),
      specDoctor: [],
      specialSP: [],
      resetDoctorSelect: null,
      isClicked: false,
      startDate: new Date(),
      reservedDate: "",
      doctorsPrice: "",
      clientId: null,
      attachments: null,
      // testDate: [],
    };
  }

  handleDateChange = (date) => {
    let clickedDate = moment(date).format("YYYY-MM-DDTHH:mm:ss");
    // let DDate = moment(date).format("YYYY-MM-DD");
    this.setState({ startDate: date, reservedDate: clickedDate });
    // let nesto = zauzeto.filter((za) => {
    //   if (za.date === DDate) {
    //     return za;
    //   }
    // });
    // this.setState({ testDate: nesto });
  };

  handleSpeciality = (e) => {
    let filteredDoctors = this.state.doctors.filter(
      (doctor) => doctor.spec === e.label
    );

    this.setState({
      specialSP: e.value,
      specDoctor: filteredDoctors,
      resetDoctorSelect: null,
    });
  };

  handleDoctor = (e) => {
    this.props.dispatch(doctor(e));
    console.log(e);

    this.setState({ doctor_id: e.iD, doctorsPrice: e.price });
    this.setState({ resetDoctorSelect: e });
  };

  handleSubject = (e) => {
    this.setState({ subject: e.target.value });
  };

  handleMessage = (e) => {
    this.setState({ notes: e.target.value });
  };

  handleSubmit = async (e) => {
    const access_token = "Bearer ".concat(this.state.token);
    if (
      this.state.specialSP &&
      this.state.doctor_id &&
      this.state.subject &&
      this.state.notes &&
      this.state.reservedDate
    ) {
      this.setState({ isClicked: true });
      const response = await fetch(
        "https://healthcarebackend.xyz/api/web/client/initiate/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

            Authorization: access_token,
          },
          body: JSON.stringify({
            client: this.state.clientId,
            speciality: this.state.specialSP,
            doctor: this.state.doctor_id,
            subject: this.state.subject,
            notes: this.state.notes,
            appointed_date: this.state.reservedDate,
            price: "",
            attachments: this.state.attachments,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        this.setState({ doctorsPrice: data.data.price });
        this.toCheckout();
        // ws.send(this.state.doctor_id);
      }
      console.log(data, "post video requesttttt");

      return data;
    } else {
      NotificationManager.error(
        "Empty Fielde Or You Did Not Set Time And Date",
        "Failed!",
        4000
      );
    }
  };

  toCheckout = async () => {
    return this.props.history.push({
      pathname: "/checkout",
      // search: "?query=abc",
      state: { price: this.state.doctorsPrice },
    });
  };

  handleClientProfile = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/client/profile/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response.data.data, "profile of client");

        return this.setState({ clientId: response.data.data.id });
      });
  };

  componentDidMount() {
    this.handleClientProfile();
    // this.connect();
    axios
      .get("https://healthcarebackend.xyz/api/specialities/")
      .then((response) => {
        // console.log(response, "videoReq ");

        const res = response.data.data.map((val) => {
          return { value: val.id, iD: val.speciality_id, label: val.name };
        });
        this.setState({ specialities: res });
      });
    axios
      .get("https://healthcarebackend.xyz/api/doctor/list")
      .then((response) => {
        // console.log(response, "videoReq2");

        const res = response.data.data.map((val) => {
          return {
            value: val.id,
            iD: val.doctor_id,
            label: val.doctor,
            spec: val.speciality,
            price: val.price,
          };
        });
        this.setState({ doctors: res });
      });
  }

  // connect = () => {
  //   ws.onopen = () => {
  //     // on connecting, do nothing but log it to the console
  //     console.log("connected to port 8080");
  //   };
  // };

  render() {
    // console.log(this.state.testDate, "reserveddate");

    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <VideoReq
          handleSpeciality={this.handleSpeciality}
          handleDoctor={this.handleDoctor}
          handleSubject={this.handleSubject}
          handleSubmit={this.handleSubmit}
          handleMessage={this.handleMessage}
          handleDateChange={this.handleDateChange}
          props={this.state}
        />
        <div className="footerr">
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const doctor = state.getIn(["doctorReducer", "doctor"]);
  return {
    doctor,
    price: state.price,
  };
};

export default connect(mapStateToProps)(ClientVideoReq);
