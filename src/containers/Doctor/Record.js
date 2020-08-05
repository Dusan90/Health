import React, { Component } from "react";
import axios from "axios";
import Record from "../../components/Doctor/Record";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import Footer from "../../components/Main/Footer";

class ClientRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: null,
      curentDoc: "",
      doctor: "",
      speciality: "",
      doctorID: "",
      diagnose: "",
      prescribingDate: "",
      medicationNotes: "",
      medicationName: "",
      report: "",
      tests: "",
      token: sessionStorage.getItem("accessToken"),
      id: this.props.match.params.id,
    };
  }

  record = () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(
        `https://healthcarebackend.xyz/api/doctor/report/${this.state.id}/`,
        {
          headers: { Authorization: access_token },
        }
      )
      .then((response) => {
        console.log(response, "nzm ni ja sta");

        return this.setState({
          record: response.data.data,
        });
      });
  };

  handleRecord = async () => {
    // e.preventDefault();
    const access_token = "Bearer ".concat(this.state.token);
    const data = await fetch(
      `https://healthcarebackend.xyz/api/doctor/report/${this.state.id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: JSON.stringify({
          record: this.state.id,
          doctor: this.state.doctorID,
          speciality: this.state.doctorID,
          diagnose: this.state.diagnose,
          report: this.state.report,
          tests: this.state.tests,
          medication_prescribing_date: this.state.prescribingDate,
          medication_name: this.state.medicationName,
          medication_notes: this.state.medicationNotes,
        }),
      }
    );
    const jsonData = await data.json();
    console.log(jsonData);
    this.record();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.handleRecord();
    this.setState({
      report: "",
      tests: "",
      diagnose: "",
      medicationName: "",
      medicationNotes: "",
      prescribingDate: "",
    });
  };

  handleReport = (e) => {
    this.setState({ report: e.target.value });
  };

  handlePrescribtionDate = (e) => {
    this.setState({ prescribingDate: e.target.value });
  };

  handleMedicationName = (e) => {
    this.setState({ medicationName: e.target.value });
  };

  handleMedicationNotes = (e) => {
    this.setState({ medicationNotes: e.target.value });
  };

  handleTests = (e) => {
    this.setState({ tests: e.target.value });
  };

  handleDiagnose = (e) => {
    this.setState({ diagnose: e.target.value });
  };

  handleDoctorProfile = async () => {
    const access_token = "Bearer ".concat(this.state.token);
    axios
      .get(`https://healthcarebackend.xyz/api/doctor/profile/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        // console.log(response);

        return this.setState({
          curentDoc: response.data.data.doctor,
          speciality: response.data.data.speciality,
          doctorID: response.data.data.id,
        });
      });
  };

  componentDidMount() {
    this.record();
    // this.records();
    this.handleDoctorProfile();
  }

  render() {
    console.log(this.state.record);
    return (
      <>
        <div className="header">
          <div>
            <Header />
            <Nav />
          </div>
        </div>
        <Record
          record={this.state.record}
          handleReport={this.handleReport}
          handleTests={this.handleTests}
          handleDiagnose={this.handleDiagnose}
          handleSubmit={this.handleSubmit}
          handlePrescribtionDate={this.handlePrescribtionDate}
          handleMedicationName={this.handleMedicationName}
          handleMedicationNotes={this.handleMedicationNotes}
          props={this.state}
        />
        <div className="footerr">
          <Footer />
        </div>
      </>
    );
  }
}

export default ClientRecord;
