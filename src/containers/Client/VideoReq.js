import React, { Component } from "react";
import axios from "axios";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import VideoReq from "../../components/Client/VideoReq";
import { connect } from "react-redux";
import { doctor } from "../../actions/examActions";
import { NotificationManager } from "react-notifications";
import moment from "moment";
// import { HamburgerDiv } from "../../components/Main/HamburgerDiv";

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
      startDate: '',
      reservedDate: '',
      doctorsPrice: "",
      clientId: null,
      attachments: '',
      doctorsExams: [],
      excludeTime: [],
      currency: null,
      color: '',
      webExamStatus: true,
      workingHoursArray: [],
      selectedDateForStart: '',
      selectedDateForEnd: '',
      excludeDate: '',
      selectedWorkingHours: [],
      transaction_id: '',
      whichDayIsIt: '',
      clickDay: ''
    };
  }

  handleDateChange = (date) => {
    let clickedDate = moment(date).format("YYYY-MM-DDTHH:mm:ss");
    let DDate = moment(date).format("YYYY-MM-DD");
    let selectedWorkingHours = this.state.workingHoursArray.length !== 0 && this.state.workingHoursArray.filter(ex =>{
      return ex.day === (moment(date).isoWeekday() - 1) 
    })
    this.setState({ startDate: date, reservedDate: clickedDate });
    if(this.state.workingHoursArray.length !== 0 && this.state.workingHoursArray[0]['day'] === 7){
      let selecteddate = moment(date).format('YYYY-MM-DD')
      let selectedDateForStart = selecteddate + 'T' + this.state.workingHoursArray[0]['start_hour']; 
      let selectedDateForEnd = selecteddate + "T" + this.state.workingHoursArray[0]['end_hour']; 
      this.setState({
        selectedDateForEnd, selectedDateForStart, whichDayIsIt: this.state.workingHoursArray[0]['day']
      })
    }else if (selectedWorkingHours && selectedWorkingHours.length !== 0){
      let selecteddate = moment(date).format('YYYY-MM-DD')
      let selectedDateForStart = selecteddate + 'T' + selectedWorkingHours[0]['start_hour']; 
      let selectedDateForEnd = selecteddate + "T" + selectedWorkingHours[0]['end_hour']; 
      this.setState({
        selectedDateForEnd, selectedDateForStart,
        selectedWorkingHours})
    }else if (this.state.workingHoursArray !== 0 && this.state.workingHoursArray.some(ex => ex.day === 8)){
      const sorted = this.state.workingHoursArray.sort((a,b) => b.day - a.day)
       let selecteddate = moment(date).format('YYYY-MM-DD')
      let selectedDateForStart = selecteddate + 'T' + sorted[0]['start_hour']; 
      let selectedDateForEnd = selecteddate + "T" + sorted[0]['end_hour']; 
      this.setState({
        selectedDateForEnd, selectedDateForStart, whichDayIsIt: sorted[0]['day'], selectedWorkingHours: []
      })
    }else{
      this.setState({selectedDateForEnd: '', selectedDateForStart: '', selectedWorkingHours: []})
      
    }
    let excludeTime = this.state.doctorsExams && this.state.doctorsExams.filter((ex) => {
      if (moment(ex.appointed_date).format("YYYY-MM-DD") === DDate && (ex.status === 'Pending' || ex.status === 'Appointed')) {
        return ex;
      } else {
        return null;
      }
    });
    this.setState({ excludeTime, clickDay: (moment(date).isoWeekday() - 1) });
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
    if(e.web_exam_status !== "True"){
      this.setState({webExamStatus: false});
      NotificationManager.error("This Doctor doesn't provide this services", "Warning", 2000) 
    }
    this.props.dispatch(doctor(e));
    // let startTime = e.startTime ? e.startTime.slice(0, -3) : ""
    // let endTime = e.endTime ? e.endTime.slice(0, -3) : ""
console.log(e);
    const docsSpec = this.state.specialities.filter((spec) => {return spec.label === e.spec})
    console.log(this.state.specialities);
    this.setState({ doctor_id: e.iD, doctorsPrice: e.price, currency: e.currency,
      //  startTime, endTime
      });
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
          if (moment(ex.appointed_date).format("YYYY-MM-DD") === DDate && (ex.status === 'Pending' || ex.status === 'Appointed')) {
            return ex;
          } else {
            return null;
          }
        });
        this.setState({ excludeTime });
      });
    this.setState({ resetDoctorSelect: e, specialSP: docsSpec[0].value, currentSpec: docsSpec[0].label });
    this.workingHoursForDoctor(e.iD)
  };

  handleSubject = (e) => {
    this.setState({ subject: e.target.value });
  };

  handleMessage = (e) => {
    this.setState({ notes: e.target.value });
  };

  handleSubmit = async (e) => {
    this.setState({color: 'red'})
    if(this.state.webExamStatus){
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
          this.setState({transaction_id: jsonData.data.data.transaction})
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
    }else{
      NotificationManager.error("This Doctor doesn't provide this services", "Warning", 2000) 
    }
  };

  toCheckout = async () => {
    if(this.state.doctorsPrice !== '0.00'){
      return this.props.history.push({
        pathname: "/checkout",
        // search: "?query=abc",
        state: { price: this.state.doctorsPrice, 
          currency: this.state.currency, transaction_id: this.state.transaction_id },
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

  workingHoursForDoctor = (id) =>{
    const access_token = "Bearer ".concat(this.state.token);
    
    axios
      .get(`https://healthcarebackend.xyz/api/client/schedule/${id}/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        this.setState({workingHoursArray: response.data.data})
      })
  }

  clearFile=()=>{
    this.setState({attachments: ''})
    document.getElementById('useForCleaning').value = ''
  }

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
            // startTime: val.start_hour,
            // endTime: val.end_hour,
            web_exam_status: val.web_exam_status
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
                // startTime: doctor.start_hour,
                // endTime: doctor.end_hour,
                web_exam_status: doctor.web_exam_status
              }
              this.handleDoctor(test)
            }
          })
        }
      })
  }

  handleAttach = (e) =>{
    // const propertyValues = Object.values(e.target.files);
    // console.log(propertyValues);
    // this.setState({attachments: propertyValues})
    this.setState({attachments: e.target.files[0]})
  }

  showDisabledMessage = () =>{
    NotificationManager.error("Please select Doctor first", "Warning", 3000) 
  }

  render() {
    console.log(this.state.excludeTime);
    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        {/* <HamburgerDiv /> */}
        <VideoReq
          handleSpeciality={this.handleSpeciality}
          handleDoctor={this.handleDoctor}
          handleSubject={this.handleSubject}
          handleSubmit={this.handleSubmit}
          handleMessage={this.handleMessage}
          handleDateChange={this.handleDateChange}
          handleAttach={this.handleAttach}
          props={this.state}
          clearFile={this.clearFile}
          showDisabledMessage={this.showDisabledMessage}
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
