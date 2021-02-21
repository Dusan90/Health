import React, { Component } from "react";
import "../../assets/main/hamburgerDiv.scss";
import MyPatientsWhite from "../../icons/My_Patients_white.svg";
import burger from "../../icons/burger.svg";
import { connect } from "react-redux";
import {compose}  from "redux"
import { Link, withRouter } from "react-router-dom";
import axios from 'axios'
import doctorOnline from "../../icons/icon_my_profile_doctor_on-line_46px.svg";
import clientOnline from "../../icons/icon_my_profile_client_on-line_46px.svg";
import doctorOffline from "../../icons/icon_my_profile_doctor_off-line_46px.svg";
import clientOffline from "../../icons/icon_my_profile_client_off-line_46px.svg";

import Dashboard from '../../icons/sideIcons/icon_menu_my-consultations.svg'
import MyPatients from '../../icons/sideIcons/icon_menu_my-patients.svg'
import Calendar from '../../icons/sideIcons/icon_menu_calendar.svg'
import Alert from '../../icons/sideIcons/icon_menu_alerts.svg'
import Profile from '../../icons/sideIcons/icon_menu_my-profile_doctor.svg'
import Settings from '../../icons/sideIcons/icon_menu_settings.svg'
import LogOut from '../../icons/sideIcons/icon_menu_log-out.svg'
import Doctors from '../../icons/sideIcons/icon_client_menu_doctor.svg'



// import videoImg from "../../icons/icon_Video_Appointment_white.svg";
import consultationImg from "../../icons/icon_My-Consultations_white.png";
import doctorsImg from "../../icons/icon_my-profile_doctor_white_23px.png";
import clientsImg from '../../icons/icon_my_profile_client_white_23px.svg'
import calendar from "../../icons/icon_calendar_white.svg";
import alert from "../../icons/icon_alerts_white.svg";
import doctorsImg2 from '../../icons/icon_doctor_2_white.svg'
// import logOutImg from "../../icons/icon_Log_Out_white.svg";
import settingsImg from "../../icons/icon_settings_white.svg";
// import waitingRoomImg from "../../icons/icon_Waiting_Room_white.svg";
// import emailImg from "../../icons/icon_Email_white.svg";

export class HamburgerDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hamburger: true,
      current: sessionStorage.getItem("is_doctor"),
      currentDoc: '',
      fullName: '',
      fullNameClient: '',
      currentClient: ''
    };
  }

  handleClickImage = (e) => {
    window.open(e.target.src)
  
}

  handleHam = () => {
    this.setState({ hamburger: !this.state.hamburger });
  };

  componentDidMount(){
      const access_token = "Bearer ".concat(
        sessionStorage.getItem("accessToken")
      );
      sessionStorage.getItem("is_doctor") === 'true' && axios
        .get(`https://healthcarebackend.xyz/api/doctor/profile/`, {
          headers: { Authorization: access_token },
        })
        .then((response) => {
          const fullName = `${response.data.data.user.first_name} ${response.data.data.user.last_name} `
          return this.setState({currentDoc: response.data.data, fullName})
        });
  
        sessionStorage.getItem("is_doctor") !== 'true' && axios
        .get(`https://healthcarebackend.xyz/api/client/profile/`, {
          headers: { Authorization: access_token },
        })
        .then((response) => {
          const fullNameClient = `${response.data.data.user.first_name} ${response.data.data.user.last_name} `
            return this.setState({currentClient: response.data.data, fullNameClient})
        });
        }

  render() {
    return this.state.current === "true" ? (
       <div
        className="sideNav"
        // style={{
        //   left: this.state.hamburger ? "0px" : "-300px",
        //   opacity: this.state.hamburger ? "0.7" : "0",
        // }}
      >
        <div className="sideProfile">
          <div className="mainProfile">
            <div className="profile">
              {/* <GoPerson className="icon" /> */}

              {this.state.currentDoc && this.state.currentDoc.image.includes('default')  ?
                this.state.currentDoc.status === "Available" ? (
                <img src={doctorOnline} alt="online doctor" />
              ) : (
                <img src={doctorOffline} alt="offline doctor" />
              ) :
              <img style={{borderRadius: '50%', background:'white'}} onClick={ (e) => this.handleClickImage(e)} src={`https://healthcarebackend.xyz${this.state.currentDoc.image}`} alt="#"/>
              }

            </div>
            {/* <div
              className="onlineDot"
              // style={{
              //   background:
              //     this.state.doctorCurent.status !== "Available"
              //       ? "lightgray"
              //       : "green",
              // }}
            ></div> */}
          </div>
          <p>
            {this.state.fullName}
          </p>
        </div>
        <Link className="sideVideo"
        to='/dashboard-doctor'
            // onClick={() => this.props.history.push('/dashboard-doctor')}
         >
          <span className="video">
            <img src={Dashboard} alt="icon"/>
            {/* <FaVideo className="icon" /> */}
          </span>
          <h2>Dashboard</h2>
        </Link>
        <Link className="sideEmail" 
        to="/doctors-clients"
        // onClick={hnlClick}
        // onClick={() => this.props.history.push("/doctors-clients")}

        >
          <span className="email">
            <img src={MyPatients} alt="icon"/>

            {/* <IoIosMail className="icon" /> */}
          </span>
          <h2>My Patients</h2>
        </Link>
        <Link className="sideWaitingRoom" 
        to="/doctor/calendar"
        // onClick={hnlWaitingClick}
        // onClick={() => this.props.history.push("/doctor/calendar")}

        >
          <span className="clock">
          <img src={Calendar} alt="icon"/>

            {/* <GoClock className="icon" /> */}
          </span>
          <h2>Calendar</h2>
        </Link>
        <div className="sideMyCounsultation" 
        // onClick={hnlMyConsultations}
        // onClick={() => this.props.history.push('/dashboard-doctor')}

        >
          <span>
          <img src={Alert} alt="icon"/>

            {/* <GoFileDirectory className="icon" /> */}
          </span>
          <h2>Alerts</h2>
        </div>
        <Link
        to="/doctor/profile/"
          className="sideMyAccount"
          // onClick={() => this.props.history.push("/doctor/profile/")}

        >
          <span>
          <img src={Profile} alt="icon"/>

            {/* <FaUser /> */}
          </span>
          <h2>Profile</h2>
        </Link>
        <Link className="sideHelp"
        to="/doctors-settings"
            // onClick={() => this.props.history.push('/doctors-settings')}

        > 
          <span className="help">
          <img src={Settings} alt="icon"/>

            {/* <IoIosSettings className="icon" /> */}
          </span>
          <h2>Settings</h2>
        </Link>
        <Link className="sideFaq"
          to={{pathname: '/logout', spec: this.state.currentDoc.speciality}}
            // onClick={() => this.props.history.push('/logout')}
        >
          <span className="faq">
          <img src={LogOut} alt="icon"/>

            {/* <MdChatBubble className="icon" /> */}
          </span>
          <h2>Log Out</h2>
        </Link>
      </div> 
      // <div className="hamburger">
      //   <div className="hamNprofil">
      //     <div className="ham" onClick={this.handleHam}>
      //       <img src={burger} alt="burger" />
      //     </div>
      //     <div className="rightNavIcons">
      //       <div>
      //         <Link
      //           to="/dashboard-doctor"
      //           className="linksPatients"
      //           //   onClick={hnlMyConsultations}
      //         >
      //           <img
      //             src={consultationImg}
      //             className="dashboardIcon"
      //             alt="my consultation"
      //           />

      //           {this.state.hamburger && <p>Dashboard</p>}
      //         </Link>
      //       </div>
      //       <div className="patientsNav">
      //         <Link to="/doctors-clients" className="linksPatients">
      //           <img
      //             src={MyPatientsWhite}
      //             className="iconNav"
      //             alt="My patients"
      //           />
      //           {this.state.hamburger && <p>My Patients</p>}
      //         </Link>
      //       </div>
      //       {/* <div className="calendarNav"> */}
      //       {/* <div
      //             style={{
      //               display: props.state.numOfMessages === 0 ? "none" : "block",
      //             }}
      //           className="numOfMessages"
      //         >
      //           <p>{props.state.numOfMessages}</p>
      //         </div> */}
      //       <div>
      //         <Link to="/doctor/calendar" className="links">
      //           <img
      //             src={calendar}
      //             className="calendarIcon"
      //             alt="My patients"
      //           />
      //           {this.state.hamburger && <p>Calendar</p>}
      //         </Link>
      //       </div>
      //       {/* </div> */}
      //       <div className="alertsNav">
      //         <img src={alert} className="iconNav" alt="My patients" />
      //         {this.state.hamburger && <p>Alerts</p>}
      //       </div>
      //       <div>
      //         <Link to="/doctor/profile/" className="linksPatients">
      //           <img
      //             src={doctorsImg}
      //             className="profileIcon"
      //             alt="doctors img"
      //           />
      //           {this.state.hamburger && <p>Profile</p>}
      //         </Link>
      //       </div>
      //       <div>
      //         <Link to='/doctors-settings' className="linksPatients">
      //           <img
      //             src={settingsImg}
      //             className="profileIcon"
      //             alt="settings img"
      //           />
      //           {this.state.hamburger && <p>Settings</p>}
      //         </Link>
      //       </div>
           
      //     </div>
      //   </div>
      // </div>
    ) : (

      <div
        className="sideNav"
        // style={{
        //   left: this.state.hamburger ? "0px" : "-300px",
        //   opacity: this.state.hamburger ? "0.7" : "0",
        // }}
      >
        <div className="sideProfile">
          <div className="mainProfile">
            <div className="profile">
              {/* <GoPerson className="icon" /> */}

              {this.state.currentClient && this.state.currentClient.image.includes('default')  ?
                <img src={clientOnline} alt="online client" />
                : (<img style={{borderRadius: '50%', background:'white'}} onClick={ (e) => this.handleClickImage(e)} src={`https://healthcarebackend.xyz${this.state.currentClient.image}`} alt="#"/>)
              }

            </div>
            {/* <div
              className="onlineDot"
              // style={{
              //   background:
              //     this.state.doctorCurent.status !== "Available"
              //       ? "lightgray"
              //       : "green",
              // }}
            ></div> */}
          </div>
          <p>
            {this.state.fullNameClient}
          </p>
        </div>
        <Link className="sideVideo"
        to='/dashboard-client'
            // onClick={() => this.props.history.push("/dashboard-client")}
         >
          <span className="video">
            <img src={Dashboard} alt="icon"/>
            {/* <FaVideo className="icon" /> */}
          </span>
          <h2>Dashboard</h2>
        </Link>
        <Link className="sideEmail" 
        to="/client/Doctor-list/"
        // onClick={hnlClick}
        // onClick={() => this.props.history.push("/client/Doctor-list/")}

        >
          <span className="email">
            <img src={Doctors} alt="icon"/>

            {/* <IoIosMail className="icon" /> */}
          </span>
          <h2>Doctors</h2>
        </Link>
        {/* <div className="sideWaitingRoom" 
       
        onClick={() => this.props.history.push("/doctor/calendar")}

        >
          <span className="clock">
          <img src={Calendar} alt="icon"/>

         
          </span>
          <h2>Calendar</h2>
        </div> */}
        <div className="sideMyCounsultation" 
        // onClick={hnlMyConsultations}
        // onClick={() => this.props.history.push('/dashboard-doctor')}

        >
          <span>
          <img src={Alert} alt="icon"/>

            {/* <GoFileDirectory className="icon" /> */}
          </span>
          <h2>Alerts</h2>
        </div>
        <Link
        to="/client/profile/"
          className="sideMyAccount"
          // onClick={() => this.props.history.push("/client/profile/")}

        >
          <span>
          <img src={Profile} alt="icon"/>

            {/* <FaUser /> */}
          </span>
          <h2>Profile</h2>
        </Link>
        <Link to='/client-settings' className="sideHelp"
            // onClick={() => this.props.history.push('/client-settings')}

        > 
          <span className="help">
          <img src={Settings} alt="icon"/>

            {/* <IoIosSettings className="icon" /> */}
          </span>
          <h2>Settings</h2>
        </Link>
        <Link to='/logout' className="sideFaq"
        >
          <span className="faq">
          <img src={LogOut} alt="icon"/>

            {/* <MdChatBubble className="icon" /> */}
          </span>
          <h2>Log Out</h2>
        </Link>
      </div> 



      // <div className="hamburger">
      //   <div className="hamNprofil">
      //     <div className="ham" onClick={this.handleHam}>
      //       <img src={burger} alt="burger" />
      //     </div>
      //     <div className="rightNavIcons">
      //     <div>
      //         <Link
      //           to="/dashboard-client"
      //           className="linksPatients"
      //           //   onClick={hnlMyConsultations}
      //         >
      //           <img
      //             src={consultationImg}
      //             className="dashboardIcon"
      //             alt="my consultation"
      //           />

      //           {this.state.hamburger && <p>Dashboard</p>}
      //         </Link>
      //       </div>
      //     <div>
      //         <Link
      //           to="/client/Doctor-list/"
      //           className="linksPatients"
      //           //   onClick={hnlMyConsultations}
      //         >
      //           <img
      //             src={doctorsImg2}
      //             className="doctorsIcon"
      //             alt="Doctors"
      //           />

      //           {this.state.hamburger && <p>Doctors</p>}
      //         </Link>
      //       </div>
           
      //       <div>
      //         <Link to="/client/profile/" className="linksPatients">
      //           <img
      //             src={clientsImg}
      //             className="profileIcon"
      //             alt="doctors img"
      //           />
      //           {this.state.hamburger && <p>Profile</p>}
      //         </Link>
      //       </div>
      //       <div>
      //         <Link to='/client-settings' className="linksPatients">
      //           <img
      //             src={settingsImg}
      //             className="profileIcon"
      //             alt="settings img"
      //           />
      //           {this.state.hamburger && <p>Settings</p>}
      //         </Link>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  const doctor = state.getIn(["docReducer", "doctor"]);
  return {
    doctor,
  };
};

export default compose( withRouter, connect(mapStateToProps))(HamburgerDiv);
