import React from "react";
import "../../assets/auth/login.scss";
import { Link } from "react-router-dom";

const LoginUser = ({
  emailValue,
  passwordValue,
  submitted,
  handleEmail,
  handlePassword,
  handleSubmit,
  handleChange,
  handleChangeRmb,
  rememberMe,
}) => {
  return (
    <div className="mainLogin">
      <h1>Welcome Back!</h1>
      <h5>Not a Cdoctor user yet?</h5>
      <Link className="createAccount" to="/register">
        Create your account.
      </Link>
      <form className="login-form">
        <div className="email">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="emailValue"
            placeholder="name@gmail.com"
            value={!emailValue ? "" : emailValue}
            onChange={handleChange}
          />
        </div>
        <div className="password">
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            value={passwordValue}
            onChange={handlePassword}
          />
        </div>
        <div className="rememberForgot">
          <div onClick={handleChangeRmb}>
            <input
              name="rememberMe"
              checked={rememberMe}
              onChange={handleChange}
              type="checkbox"
            />{" "}
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <Link className="forget" to="/forgot-password">
            Forgot Password?
          </Link>
        </div>
        <div className="login-button">
          <button
            type="submit"
            className="btn"
            value={submitted}
            onClick={handleSubmit}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginUser;
