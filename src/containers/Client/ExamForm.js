import React, { Component } from "react";
import Header from "../../components/Main/Header";
import InitiateExam from "../../components/Client/ExamForm";
import Nav from "../../components/Main/Navbar";
import axios from "axios";
import { connect } from "react-redux";
import { doctor } from "../../actions/examActions";
import { NotificationManager } from "react-notifications";
// import { HamburgerDiv } from "../../components/Main/HamburgerDiv";

class ExamForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      specialities: [],
      doctors: [],
      filtered: [],
      subject: "",
      message: "",
      submitted: false,
      price: null,
      currentSpec: '',
      doctor_id: null,
      token: sessionStorage.getItem("accessToken"),
      specDoctor: [],
      specialSP: [],
      resetDoctorSelect: null,
      attach: '',
      currency: null,
      color: '',
      emailExamStatus: true,
      transaction_id: ''
      // isClicked: false
    };
  }

  handleAttach = (e) =>{
    // const propertyValues = Object.values(e.target.files);

    // this.setState({attach: propertyValues})
    this.setState({attach: e.target.files[0]})
  }

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
    console.log(e);
    if(e.email_exam_status !== "True"){
      this.setState({emailExamStatus: false});
      NotificationManager.error("This Doctor doesn't provide this services", "Warning", 2000) 
    }
    const docsSpec = this.state.specialities.filter((spec) => {return spec.label === e.spec})
    this.props.dispatch(doctor(e));
    this.setState({ doctor_id: e.iD, price: e.price, currency: e.currency });
    this.setState({ resetDoctorSelect: e,
      specialSP: docsSpec[0].value,
      currentSpec: docsSpec[0].label

    });
  };

  handleSubject = (e) => {
    this.setState({ subject: e.target.value });
  };

  handleMessage = (e) => {
    this.setState({ message: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({color: 'red'})
    if(this.state.emailExamStatus){
      if (
        this.state.specialSP &&
        this.state.doctor_id &&
        this.state.subject &&
        this.state.message 
      ) {
        let form_data = new FormData();
        form_data.append("speciality", this.state.specialSP);
        form_data.append("doctor", this.state.doctor_id);
        form_data.append("subject", this.state.subject);
        form_data.append("attachment", this.state.attach);
        form_data.append("message", this.state.message);
  
  
        const access_token = "Bearer ".concat(this.state.token);
        let url = 'https://healthcarebackend.xyz/api/client/initiate/';
        
        const data = axios.post(url, form_data, {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: access_token,
          }
        })
        
        
        const jsonData = await data;
        console.log(jsonData);
        this.setState({transaction_id: jsonData.data.data.transaction})
        if(jsonData.data.success){
          this.toCheckout();
        }
      
        return data;
        // this.setState({ isClicked: true });
        // const response = await fetch(
        //   "https://healthcarebackend.xyz/api/client/initiate/",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: access_token,
        //     },
        //     body: JSON.stringify({
        //       speciality: this.state.specialSP,
        //       doctor: this.state.doctor_id,
        //       subject: this.state.subject,
        //       message: this.state.message,
        //       attachments: this.state.attach
        //     }),
        //   }
        // );
        // const data = await response.json();
        // if (data.success) {
        //   this.toCheckout();
        // }
        // console.log(data, "data examform");
        // return data;
      } else {
        NotificationManager.error("Empty Fields", "Failed!", 2000);
      }
    } else{
      NotificationManager.error("This Doctor doesn't provide this services", "Warning", 2000)
    }
  };

  clearFile=() =>{
    this.setState({attach: ''})
    document.getElementById('useForCleaning').value = ''
  }

  toCheckout = async () => {
    if(this.state.price !== '0.00'){
      return this.props.history.push({
        pathname: "/checkout",
        // search: "?query=abc",
        state: { price: this.state.price, currency: this.state.currency, transaction_id: this.state.transaction_id },
      });

    }else{
      this.props.history.push("/dashboard-client")
    }
  };

  componentDidMount() {
    axios
      .get("https://healthcarebackend.xyz/api/specialities/")
      .then((response) => {
        console.log(response, "examform");

        const res = response.data.data.map((val) => {
          return { value: val.id, iD: val.speciality_id, label: val.name };
        });
        this.setState({ specialities: res });
      });
    axios
      .get("https://healthcarebackend.xyz/api/doctor/list/")
      .then((response) => {
        console.log(response, "examform2");
        if (response.data.data) {
          const res = response.data.data.map((val) => {
            return {
              value: val.id,
              iD: val.id,
              label: val.doctor,
              spec: val.speciality,
              price: val.email_exam_price,
              currency: val.email_currency,
              email_exam_status: val.email_exam_status
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
                    price: doctor.email_exam_price,
                    currency: doctor.email_currency,
                    email_exam_status: doctor.email_exam_status
                  }
                  this.handleDoctor(test)
                }
              })
            }
        } else {
          NotificationManager.warning(
            `${response.data.message}`,
            "Failed!",
            2000
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
  console.log(this.state.emailExamStatus);
    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        {/* <HamburgerDiv /> */}
        <InitiateExam
          specialities={this.state.specialities}
          subject={this.state.subject}
          message={this.state.message}
          submitted={this.state.submitted}
          handleSpeciality={this.handleSpeciality}
          handleDoctor={this.handleDoctor}
          handleSubject={this.handleSubject}
          handleSubmit={this.handleSubmit}
          handleMessage={this.handleMessage}
          props={this.state}
          specDoctor={this.state.specDoctor}
          resetDoctorSelect={this.state.resetDoctorSelect}
          handleAttach={this.handleAttach}
          clearFile={this.clearFile}
          // isClicked={this.state.isClicked}
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

export default connect(mapStateToProps)(ExamForm);
