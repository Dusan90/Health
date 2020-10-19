import React from "react";
import Select from "react-select";
import "../../assets/auth/register.scss";

const RegisterUser = ({
  userType,
  emailValue,
  firstNameValue,
  lastNameValue,
  passwordValue,
  addressValue,
  birthDateValue,
  EmailPrice,
  WebPrice,
  prefixValue,
  specOptions,
  specValue,
  submitValue,
  handleEmail,
  handleFirstName,
  handleLastName,
  handlePass,
  handleAddress,
  handleBirthDate,
  handleEmailPrice,
  handleWebPrice,
  handlePrefix,
  handleSpec,
  handleSubmit,
  changeTextToDate,
  handleGenderRadio,
  handleUserType,
  handleConfPass,
  handlePhoneNumber,
  props,
}) => {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: "40px",
      border: "1.7px solid #fa9551",
      borderRadius: "10px",
      width: "250px",
      marginLeft: "2px",
      background: "white",
      color: "#666666",
    }),
  };
  return (
    <div className="mainRegisterDiv">
      <div className="radioDiv">
        <h1 className="head">Are you a doctor or a client?</h1>
        <div className="checkingInputs">
          <div className="doctorORClient">
            <input
              className="doctorRadio"
              type="checkbox"
              name="userType"
              value="doctor"
              id="r1"
              checked={props.userType === "doctor" ? true : false}
              onChange={() => handleUserType("doctor")}
              style={{}}
            />
            <label htmlFor="r1" className="doctorLabel">
              Doctor
            </label>
            <input
              className="clientRadio"
              type="checkbox"
              name="userType"
              id="r2"
              value="client"
              checked={props.userType === "client" ? true : false}
              onChange={() => handleUserType("client")}
            />
            <label htmlFor="r2" className="clientLabel">
              Client
            </label>
          </div>
          <div className="gender">
            <div className="maleGender">
              <input
                className="maleRadio"
                type="radio"
                name="userType"
                value="Male"
                id="M"
                onChange={() => handleGenderRadio("M")}
              />
              <label htmlFor="M" className="Male">
                Male
              </label>
            </div>
            <div className="femaleGender">
              <input
                className="femaleRadio"
                type="radio"
                name="userType"
                id="F"
                value="Female"
                onChange={() => handleGenderRadio("F")}
              />
              <label htmlFor="F" className="Female">
                Female
              </label>
            </div>
          </div>
        </div>
      </div>
      <form className="register-form">
        {userType === "doctor" && (
          <div className="Pricing">
            <div className="EmailPrice">
              <label htmlFor="EmailPrice">Email Exam Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="20"
                id="EmailPrice"
                value={EmailPrice}
                onChange={handleEmailPrice}
              />
            </div>
            <div className="WebPrice">
              <label htmlFor="WebPrice">Web Exam Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="40"
                id="WebPrice"
                value={WebPrice}
                onChange={handleWebPrice}
              />
            </div>
          </div>
        )}
        <div
          className="firstLastGender"
          // style={{
          //   margin: userType === "client" ? "60px 0 20px 0" : "0 0 20px 0",
          // }}
        >
          <div className="reg-name">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="John"
              id="firstname"
              value={firstNameValue}
              onChange={handleFirstName}
            />
          </div>
          <div className="reg-surname">
            <label htmlFor="lastname">Last Name</label>

            <input
              type="text"
              className="form-control"
              placeholder="Doe"
              id="lastname"
              value={lastNameValue}
              onChange={handleLastName}
            />
          </div>
        </div>
        <div className="regPass">
          <div className="reg-email">
            <label htmlFor="email">E-mail</label>

            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@gmail.com"
              value={emailValue}
              onChange={handleEmail}
            />
          </div>
          <div className="address">
            <label htmlFor="address">Address</label>

            <input
              type="text"
              className="form-control"
              placeholder="Your address"
              id="address"
              value={addressValue}
              onChange={handleAddress}
            />
          </div>
        </div>

        {userType === "client" && (
          <>
            <div className="clientsBinfo">
              <div className="reg-pass">
                <label htmlFor="pwd">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="**********"
                  id="pwd"
                  value={passwordValue}
                  onChange={handlePass}
                />
              </div>
              <div className="date">
                <label htmlFor="birthdate">Birth Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="birthdate"
                  placeholder="DD/MM/YY"
                  onFocus={changeTextToDate}
                  value={birthDateValue}
                  onChange={handleBirthDate}
                />
              </div>
            </div>
            <div className="confirmAndPhone">
              <div className="conf-pass">
                <label htmlFor="pwd">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  placeholder="**********"
                  value={props.confPasswordValue}
                  onChange={handleConfPass}
                />
              </div>
              <div className="Phone">
                <label htmlFor="phone">Phone number (optional)</label>
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  placeholder="111 222 333"
                  // onFocus={changeTextToDate}
                  value={props.phoneNumber}
                  onChange={handlePhoneNumber}
                />
              </div>
            </div>
          </>
        )}
        {userType === "doctor" && (
          <>
            <div className="doctorsBinfo">
              <div className="prefix">
                <label htmlFor="firstname">Prefix</label>

                <input
                  type="text"
                  className="form-control"
                  id="prefix"
                  placeholder="Dr, Mr..."
                  value={prefixValue}
                  onChange={handlePrefix}
                />
              </div>
              <div className="spec">
                <label htmlFor="speciality">Speciality</label>
                <Select
                  type="text"
                  id="speciality"
                  value={specValue}
                  options={specOptions}
                  styles={customStyles}
                  onChange={handleSpec}
                />
              </div>
            </div>
          </>
        )}
        <div className="register-button">
          <button
            type="submit"
            className="btn"
            value={submitValue}
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
