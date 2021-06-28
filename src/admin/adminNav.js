import React, { Component } from "react";
import "../assets/main/hamburgerDiv.scss";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import doctorOnline from "../icons/icon_my_profile_doctor_on-line_46px.svg";
import doctorOffline from "../icons/icon_my_profile_doctor_off-line_46px.svg";
import Dashboard from "../icons/sideIcons/icon_menu_my-consultations.svg";
import MyPatients from "../icons/sideIcons/icon_menu_my-patients.svg";
import LogOut from "../icons/sideIcons/icon_menu_log-out.svg";

export class HamburgerDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hamburger: true,
      current: sessionStorage.getItem("is_doctor"),
      currentDoc: "",
      fullName: "",
      fullNameClient: "",
      currentClient: "",
      currentActive: "",
    };
  }

  handleClickImage = (e) => {
    window.open(e.target.src);
  };

  handleHam = () => {
    this.setState({ hamburger: !this.state.hamburger });
  };

  currentPage = (page) => {
    this.setState({ currentActive: page });
  };

  componentDidUpdate() {
    if (this.props.history) {
      if (this.state.currentActive !== this.props.history.location.pathname) {
        this.setState({ currentActive: this.props.history.location.pathname });
      }
    }
  }

  componentDidMount() {
    const access_token = "Bearer ".concat(
      sessionStorage.getItem("accessToken")
    );
    sessionStorage.getItem("is_doctor") === "true" &&
      axios
        .get(`https://healthcarebackend.xyz/api/doctor/profile/`, {
          headers: { Authorization: access_token },
        })
        .then((response) => {
          const fullName = `${response.data.data.user.first_name} ${response.data.data.user.last_name} `;
          return this.setState({
            currentDoc: response.data.data,
            fullName,
            currentActive: window.location.href,
          });
        });

    sessionStorage.getItem("is_doctor") !== "true" &&
      axios
        .get(`https://healthcarebackend.xyz/api/client/profile/`, {
          headers: { Authorization: access_token },
        })
        .then((response) => {
          const fullNameClient = `${response.data.data.user.first_name} ${response.data.data.user.last_name} `;
          return this.setState({
            currentClient: response.data.data,
            fullNameClient,
            currentActive: window.location.href,
          });
        });
  }

  render() {
    return (
      this.state.current !== "true" && (
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

                {/* {this.state.currentDoc &&
                  this.state.currentDoc.image.includes("default") ? (
                  this.state.currentDoc.status === "Available" ? (
                    <img src={doctorOnline} alt="online doctor" />
                  ) : (
                    <img src={doctorOffline} alt="offline doctor" />
                  )
                ) : (
                  <img
                    style={{ borderRadius: "50%", background: "white" }}
                    onClick={(e) => this.handleClickImage(e)}
                    src={`https://healthcarebackend.xyz${this.state.currentDoc.image}`}
                    alt="#"
                  />
                )} */}
              </div>
            </div>
            <p>{this.state.fullName}</p>
          </div>
          <Link
            onClick={() => {
              this.currentPage("/admin")
            }}
            className={`sideEmail ${this.state.currentActive.includes("/admin") && this.props.drawerClick === 'Drawer1' && "active"
              }`}
            to={{ pathname: "/admin", state: { pageChanged: 'Drawer1' } }}
          >
            <span className="email">
              <img src={MyPatients} alt="icon" />

              {/* <IoIosMail className="icon" /> */}
            </span>
            <h2>Single users</h2>
          </Link>
          <Link
            onClick={() => {
              setTimeout(() => {
                this.currentPage("/admin")
              })
            }}
            className={`sideWaitingRoom ${this.state.currentActive.includes("/admin") && this.props.drawerClick === 'Drawer2' && "active"
              }`}
            to={{ pathname: "/admin", state: { pageChanged: 'Drawer2' } }}

          >
            <span className="clock">
              <img src={Dashboard} alt="icon" />

              {/* <GoClock className="icon" /> */}
            </span>
            <h2>Organizations</h2>
          </Link>

          <Link
            className="sideFaq"
            to={{ pathname: "/logout", spec: this.state.currentDoc.speciality }}
          >
            <span className="faq">
              <img src={LogOut} alt="icon" />
            </span>
            <h2>Log Out</h2>
          </Link>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => {
  const history = state.getIn(["trackHistoryReducer", "history"]);
  return {
    history,
  };
};

export default compose(withRouter, connect(mapStateToProps))(HamburgerDiv);
