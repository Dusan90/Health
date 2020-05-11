import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/main/navbar.scss";
import { GoPerson } from "react-icons/go";

const Nav = ({
  register,
  login,
  handleLogout,
  isLoggedIn,
  handleDashboardDoctor,
  handleDashboardClient,
  doctor,
}) => {
  let dashboardLink = null;
  let curDoc = null;
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
                doctor.status !== "Available" ? "lightgray" : "rgb(0, 197, 0)",
            }}
          ></div>
        </div>
      </div>
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
