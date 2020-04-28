import React from "react";
import "../../assets/auth/forgotPass.scss";
import { Link } from "react-router-dom";

function forgotPass({ props, handleChange, handleSubmit }) {
  return (
    <div className="mainForgotPass">
      <div
        className="forgot"
        style={{ display: props.message ? "none" : "block" }}
      >
        <h2>Forgot your password?</h2>
        <p>
          Tell us your email address, and we'll get you back on track in no
          time.
        </p>
        <label htmlFor="email">Email Address</label>
        <br />
        <input
          type="text"
          id="email"
          placeholder="Enter your Email Address"
          value={props.userEmail}
          onChange={handleChange}
        />
        <br />
        <button onClick={handleSubmit}>Confirm email</button>
        <div className="mainGoBackDiv">
          <Link to="/login" className="goBack">
            Back to sing in
          </Link>
        </div>
      </div>
      <div
        className="message"
        style={{ display: props.message ? "block" : "none" }}
      >
        <h3>{props.message}</h3>
      </div>
    </div>
  );
}

export default forgotPass;
