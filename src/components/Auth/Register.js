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
  npiNumValue,
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
  handleNpiNum,
  handlePrefix,
  handleSpec,
  handleSubmit,
  changeTextToDate,
  handleGenderRadio
}) => {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: "30px",
      "min-height": "30px",
      border: "1.5px solid #96aebd",
      width: "200px",
      "border-radius": "5px",
      background: "#f1f5f8",
      color: "#4092c2"
    })
  };
  return (
    <form className="register-form">
      {userType === "doctor" && (
        <div className="npi">
          <input
            type="text"
            pattern="[0-9]*"
            className="form-control"
            placeholder="NPI number"
            id="npi"
            value={npiNumValue}
            onChange={handleNpiNum}
          />
        </div>
      )}
      <div
        className="firstLastGender"
        style={{
          margin: userType === "client" ? "60px 0 20px 0" : "0 0 20px 0"
        }}
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
        {userType === "client" && (
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
        )}
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
        <div className="reg-pass">
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            value={passwordValue}
            onChange={handlePass}
          />
        </div>
      </div>

      {userType === "client" && (
        <div className="clientsBinfo">
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
          <div className="date">
            <label htmlFor="birthdate">Birtth Date</label>
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
  );
};

export default RegisterUser;
