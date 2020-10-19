import React, { Component } from "react";
import "../../assets/main/hamburgerDiv.scss";
import MyPatientsWhite from "../../icons/My_Patients_white.svg";
import burger from "../../icons/burger.svg";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import videoImg from "../../icons/icon_Video_Appointment_white.svg";
import consultationImg from "../../icons/icon_My-Consultations_white.png";
import doctorsImg from "../../icons/icon_my-profile_doctor_white_23px.png";
import clientsImg from '../../icons/icon_my_profile_client_white_23px.svg'
import calendar from "../../icons/icon_calendar_white.svg";
import alert from "../../icons/icon_alerts_white.svg";
// import logOutImg from "../../icons/icon_Log_Out_white.svg";
import settingsImg from "../../icons/icon_settings_white.svg";
// import waitingRoomImg from "../../icons/icon_Waiting_Room_white.svg";
// import emailImg from "../../icons/icon_Email_white.svg";

export class HamburgerDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hamburger: false,
      current: sessionStorage.getItem("is_doctor"),
    };
  }

  handleHam = () => {
    this.setState({ hamburger: !this.state.hamburger });
  };
  render() {
    return this.state.current === "true" ? (
      <div className="hamburger">
        <div className="hamNprofil">
          <div className="ham" onClick={this.handleHam}>
            <img src={burger} alt="burger" />
          </div>
          <div className="rightNavIcons">
            <div>
              <Link
                to="/dashboard-doctor"
                className="linksPatients"
                //   onClick={hnlMyConsultations}
              >
                <img
                  src={consultationImg}
                  className="dashboardIcon"
                  alt="my consultation"
                />

                {this.state.hamburger && <p>Dashboard</p>}
              </Link>
            </div>
            <div className="patientsNav">
              <Link to="/doctors-clients" className="linksPatients">
                <img
                  src={MyPatientsWhite}
                  className="iconNav"
                  alt="My patients"
                />
                {this.state.hamburger && <p>My Patients</p>}
              </Link>
            </div>
            {/* <div className="calendarNav"> */}
            {/* <div
                  style={{
                    display: props.state.numOfMessages === 0 ? "none" : "block",
                  }}
                className="numOfMessages"
              >
                <p>{props.state.numOfMessages}</p>
              </div> */}
            <div>
              <Link to="/doctor/calendar" className="links">
                <img
                  src={calendar}
                  className="calendarIcon"
                  alt="My patients"
                />
                {this.state.hamburger && <p>Calendar</p>}
              </Link>
            </div>
            {/* </div> */}
            <div className="alertsNav">
              <img src={alert} className="iconNav" alt="My patients" />
              {this.state.hamburger && <p>Alerts</p>}
            </div>
            <div>
              <Link to='/doctors-settings' className="linksPatients">
                <img
                  src={settingsImg}
                  className="profileIcon"
                  alt="settings img"
                />
                {this.state.hamburger && <p>Settings</p>}
              </Link>
            </div>
            <div>
              <Link to="doctor/profile/" className="linksPatients">
                <img
                  src={doctorsImg}
                  className="profileIcon"
                  alt="doctors img"
                />
                {this.state.hamburger && <p>Profile</p>}
              </Link>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="hamburger">
        <div className="hamNprofil">
          <div className="ham" onClick={this.handleHam}>
            <img src={burger} alt="burger" />
          </div>
          <div className="rightNavIcons">
            <div>
              <Link
                to="/dashboard-client"
                className="linksPatients"
                //   onClick={hnlMyConsultations}
              >
                <img
                  src={consultationImg}
                  className="dashboardIcon"
                  alt="my consultation"
                />

                {this.state.hamburger && <p>Dashboard</p>}
              </Link>
            </div>
            <div>
              <Link to="/client/profile/" className="linksPatients">
                <img
                  src={clientsImg}
                  className="profileIcon"
                  alt="doctors img"
                />
                {this.state.hamburger && <p>Profile</p>}
              </Link>
            </div>
            <div>
              <Link to='/client-settings' className="linksPatients">
                <img
                  src={settingsImg}
                  className="profileIcon"
                  alt="settings img"
                />
                {this.state.hamburger && <p>Settings</p>}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const doctor = state.getIn(["docReducer", "doctor"]);
  return {
    doctor,
  };
};

export default connect(mapStateToProps)(HamburgerDiv);
