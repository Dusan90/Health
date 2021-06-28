import React from "react";
import "../assets/auth/login.scss";
import { Link } from "react-router-dom";
import cLogo from "../icons/c+.svg";
import seen from '../icons/password-seen.svg'
import hidden from '../icons/password-hidden.svg'
import Loading from "../icons/c+.svg";


const AdminLogin = ({
    emailValue,
    passwordValue,
    submitted,
    handleEmail,
    handlePassword,
    handleSubmit,
    handleChange,
    handleChangeRmb,
    rememberMe,
    handleImage1,
    seePass1,
    props
}) => {
    return (
        <div className="mainLogin">
            {props.loading && <img
                src={Loading}
                className="loading"
                alt="loading..."
                style={{ width: "150px" }}
            />}
            <img src={cLogo} className="logo" alt="cLogo" />
            <h1>Log in</h1>
            {/* <h5>Not a Cdoctor user yet?</h5>
      <Link className="createAccount" to="/register">
        Create your account
      </Link> */}
            <form className="login-form">
                <div className="email">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="emailValue"
                        value={!emailValue ? "" : emailValue}
                        onChange={handleChange}
                    />
                </div>
                <div className="password">
                    <label htmlFor="pwd">Password</label>
                    <div>
                        <input
                            type={seePass1 ? 'text' : "password"}
                            className="form-control"
                            id="pwd"
                            value={passwordValue}
                            onChange={handlePassword}
                        />
                        <img onClick={handleImage1} src={seePass1 ? seen : hidden} alt="img" />
                    </div>
                </div>
                {/* <div className="rememberForgot">
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
        </div> */}
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

export default AdminLogin;
