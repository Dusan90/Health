import React, { Component } from "react";
import axios from "axios";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import VideoReq from "../../components/Client/VideoReq";
import { connect } from "react-redux";
import { doctor } from "../../actions/examActions";
import { NotificationManager } from "react-notifications";
import moment from "moment";
import { HamburgerDiv } from "../../components/Main/HamburgerDiv";

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
      currentSpec: '',
      resetDoctorSelect: null,
      isClicked: false,
      startDate: new Date(),
      reservedDate: '',
      doctorsPrice: "",
      clientId: null,
      attachments: '',
      doctorsExams: [],
      excludeTime: [],
      currency: null,
      color: ''
    };
  }

  handleDateChange = (date) => {
    let clickedDate = moment(date).format("YYYY-MM-DDTHH:mm:ss");
    let DDate = moment(date).format("YYYY-MM-DD");
    this.setState({ startDate: date, reservedDate: clickedDate });
    let excludeTime = this.state.doctorsExams && this.state.doctorsExams.filter((ex) => {
      if (moment(ex.appointed_date).format("YYYY-MM-DD") === DDate) {
        return ex;
      } else {
        return null;
      }
    });
    this.setState({ excludeTime });
  };

  handleSpeciality = (e) => {
    let filteredDoctors = this.state.doctors.filter(
      (doctor) => doctor.spec === e.label
    );
    console.log(filteredDoctors);

    this.setState({
      specialSP: e.value,
      specDoctor: filteredDoctors,
      resetDoctorSelect: null,
      currentSpec: ''
    });
  };

  handleDoctor = (e) => {
    console.log(e);
    this.props.dispatch(doctor(e));
    let startTime = e.startTime ? e.startTime.slice(0, -3) : ""
    let endTime = e.endTime ? e.endTime.slice(0, -3) : ""
console.log(e);
    const docsSpec = this.state.specialities.filter((spec) => {return spec.label === e.spec})
    console.log(this.state.specialities);
    this.setState({ doctor_id: e.iD, doctorsPrice: e.price, currency: e.currency, startTime, endTime});
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/web/doc/${e.iD}/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response);
        let data = response.data.data && response.data.data.filter((data) => {
          return (
            moment(data.appointed_date).format("YYYY-MM-DD") >=
            moment(new Date()).format("YYYY-MM-DD")
          );
        });
        this.setState({ doctorsExams: data });
      })
      .then(() => {
        let DDate = moment(new Date()).format("YYYY-MM-DD");
        let excludeTime =this.state.doctorsExams && this.state.doctorsExams.filter((ex) => {
          if (moment(ex.appointed_date).format("YYYY-MM-DD") === DDate) {
            return ex;
          } else {
            return null;
          }
        });
        this.setState({ excludeTime });
      });
    this.setState({ resetDoctorSelect: e, specialSP: docsSpec[0].value, currentSpec: docsSpec[0].label });
  };

  handleSubject = (e) => {
    this.setState({ subject: e.target.value });
  };

  handleMessage = (e) => {
    this.setState({ notes: e.target.value });
  };

  handleSubmit = async (e) => {
    const access_token = "Bearer ".concat(this.state.token);
    this.setState({color: 'red'})
    if (
      this.state.specialSP &&
      this.state.doctor_id &&
      this.state.subject &&
      this.state.notes &&
      this.state.reservedDate
    ) {
      this.setState({ isClicked: true });
      let form_data = new FormData();
      form_data.append("client", this.state.clientId);
      form_data.append("speciality", this.state.specialSP);
      form_data.append("doctor", this.state.doctor_id);
      form_data.append("subject", this.state.subject);
      form_data.append("attachments", this.state.attachments);
      form_data.append("appointed_date", this.state.reservedDate);
      form_data.append("notes", this.state.notes);
      form_data.append("price", '');

    
      
      const access_token = "Bearer ".concat(this.state.token);
      let url = 'https://healthcarebackend.xyz/api/web/client/initiate/';
      
      const data = axios.post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: access_token,
        }
      })
      
      
      const jsonData = await data;
      console.log(jsonData);
      if(jsonData.data.success){
        // this.setState({ doctorsPrice: jsonData.data.price });
        this.toCheckout();
      }
    
      return data;
      // const response = await fetch(
      //   "https://healthcarebackend.xyz/api/web/client/initiate/",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",

      //       Authorization: access_token,
      //     },
      //     body: JSON.stringify({
      //       client: this.state.clientId,
      //       speciality: this.state.specialSP,
      //       doctor: this.state.doctor_id,
      //       subject: this.state.subject,
      //       notes: this.state.notes,
      //       appointed_date: this.state.reservedDate,
      //       price: "",
      //       attachments: this.state.attachments,
      //     }),
      //   }
      // );
      // const data = await response.json();
      // if (data.success) {
      //   this.setState({ doctorsPrice: data.data.price });
      //   this.toCheckout();
      // }
      // console.log(data, "post video requesttttt");

      // return data;
    } else {
      NotificationManager.error(
        "Empty Fielde Or You Did Not Set Time And Date",
        "Failed!",
        4000
      );
    }
  };

  toCheckout = async () => {
    if(this.state.doctorsPrice !== '0.00'){
      return this.props.history.push({
        pathname: "/checkout",
        // search: "?query=abc",
        state: { price: this.state.doctorsPrice, 
          currency: this.state.currency },
      });
    }else{
      return this.props.history.push("/dashboard-client")

    }
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
    axios
      .get("https://healthcarebackend.xyz/api/specialities/")
      .then((response) => {
        console.log(response, 'spec');
        const res = response.data.data.map((val) => {
          return { value: val.id, iD: val.speciality_id, label: val.name };
        });
        this.setState({ specialities: res });
      });
    axios
      .get("https://healthcarebackend.xyz/api/doctor/list/")
      .then((response) => {
        console.log(response);
        const res = response.data.data.map((val) => {
          return {
            value: val.id,
            iD: val.id,
            label: val.doctor,
            spec: val.speciality,
            price: val.web_exam_price,
            currency: val.web_currency,
            startTime: val.start_hour,
            endTime: val.end_hour
          };
        });
        this.setState({ doctors: res });
        if(this.props.location.state){
        response.data.data.filter(doctor =>{
            if (doctor.id === this.props.location.state.doctorId){
             const test = {
                value: doctor.id,
                iD: doctor.id,
                label: doctor.doctor,
                spec: doctor.speciality,
                price: doctor.web_exam_price,
                currency: doctor.web_currency,
                startTime: doctor.start_hour,
                endTime: doctor.end_hour
              }
              this.handleDoctor(test)
            }
          })
        }
      })
  }

  handleAttach = (e) =>{
    const propertyValues = Object.values(e.target.files);

    this.setState({attachments: propertyValues})
  }

  render() {
    console.log(this.state.doctorsPrice)
    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <HamburgerDiv />
        <VideoReq
          handleSpeciality={this.handleSpeciality}
          handleDoctor={this.handleDoctor}
          handleSubject={this.handleSubject}
          handleSubmit={this.handleSubmit}
          handleMessage={this.handleMessage}
          handleDateChange={this.handleDateChange}
          handleAttach={this.handleAttach}
          props={this.state}
        />
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
