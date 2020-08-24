import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/main/navbar.scss";
import { GoPerson } from "react-icons/go";
import { NotificationManager } from "react-notifications";
import axios from "axios";

const Nav = ({
  register,
  login,
  handleLogout,
  isLoggedIn,
  handleDashboardDoctor,
  handleDashboardClient,
  doctor,
  selectValue,
}) => {
  const [curentDoc, setcurentDoc] = useState({});
  const handleSubmit = async (e) => {
    let { value } = e.target;
    const access_token = "Bearer ".concat(
      sessionStorage.getItem("accessToken")
    );
    const data = await fetch(
      `https://healthcarebackend.xyz/api/doctor/profile/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
        body: JSON.stringify({
          prefix: "",
          description: "",
          email_exam_price: null,
          web_exam_price: null,
          status: value,
        }),
      }
    );
    const jsonData = await data.json();
    if (jsonData.success) {
      NotificationManager.success("Profile Updated!", "Successful!", 2000);
      handleDoctorProfile();
    }
  };
  {
  }
  useEffect(() => {
    if (sessionStorage.getItem("is_doctor") === "true") {
      handleDoctorProfile();
    }
  }, []);
  const handleDoctorProfile = async () => {
    const access_token = "Bearer ".concat(
      sessionStorage.getItem("accessToken")
    );
    axios
      .get(`https://healthcarebackend.xyz/api/doctor/profile/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        return setcurentDoc(response.data.data);
      });
  };
  let dashboardLink = null;
  let curDoc = null;
  let selectStatus = null;
  const isDoctor = sessionStorage.getItem("is_doctor");
  if (isDoctor === "true") {
    dashboardLink = (
      <Link
        to="/dashboard-doctor"
        className="doc-dash"
        onClick={() => handleDashboardDoctor}
      >
        Dashboard
      </Link>
    );
    curDoc = (
      <div className="topProfile">
        <p>
          {doctor.prefix} {doctor.doctor}
        </p>
        <div className="mainProfile">
          <div className="profile">
            <GoPerson className="icon" />
          </div>

          <div
            className="onlineDot"
            style={{
              background:
                curentDoc.status !== "Available"
                  ? "lightgray"
                  : "rgb(0, 197, 0)",
            }}
          ></div>
        </div>
      </div>
    );
    selectStatus = (
      <select name="status" id="status" onChange={handleSubmit}>
        <option value="">{curentDoc.status}</option>
        <option
          value="Available"
          hidden={curentDoc.status === "Available" && true}
        >
          Available
        </option>
        <option
          defaultValue="Away"
          hidden={curentDoc.status === "Away" && true}
        >
          Away
        </option>
        <option value="Offline" hidden={curentDoc.status === "Offline" && true}>
          Offline
        </option>
      </select>
    );
  } else {
    dashboardLink = (
      <Link
        to="/dashboard-client"
        className="cli-dash"
        onClick={() => handleDashboardClient}
      >
        Dashboard
      </Link>
    );
    curDoc = (
      <div className="topProfile">
        <p>{doctor}</p>
        <div className="mainProfile">
          <div className="profile">
            <GoPerson className="icon" />
          </div>

          <div className="onlineDot"></div>
        </div>
      </div>
    );
  }
  return (
    <nav className="nav">
      {!isLoggedIn && (
        <ul className="nav navbar-nav ">
          <li className="li-reg">
            <Link to="/register" onClick={register} className="register">
              Sign Up
            </Link>
          </li>
          <li className="li-log">
            <Link to="/login" onClick={login} className="login">
              Join Now
            </Link>
          </li>
        </ul>
      )}
      {isLoggedIn && (
        <ul className="nav navbar-nav">
          <li>{dashboardLink}</li>
          <li className="userName">{curDoc}</li>
          <li className="selectStatus">{selectStatus}</li>

          <li>
            <Link to="/logout" onClick={handleLogout}>
              Log Out
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => {
  const user = state.getIn(["authReducer", "user"]);
  const isLoggedIn = state.getIn(["authReducer", "isLoggedIn"]);
  const doctor = state.getIn(["docReducer", "doctor"]);

  return {
    user,
    isLoggedIn,
    doctor,
  };
};

export default connect(mapStateToProps)(Nav);
