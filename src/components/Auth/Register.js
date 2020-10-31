import React from "react";
import Select from "react-select";
import "../../assets/auth/register.scss";
import seen from '../../icons/password-seen.svg'
import hidden from '../../icons/password-hidden.svg'

const RegisterUser = ({
  userType,
  handleEmail,
  handleFirstName,
  handleLastName,
  handlePass,
  handleAddress,
  handleBirthDate,
  handleSpec,
  handleSubmit,
  handleGenderRadio,
  handleUserType,
  handleConfPass,
  handlePhoneNumber,
  handleOrganization,
  handleImage1,
  handleImage2,
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
        <div
          className="firstLastGender"
        >
          <div className="reg-name">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              value={props.firstNameValue}
              onChange={handleFirstName}
            />
          </div>
          <div className="reg-surname">
            <label htmlFor="lastname">Last Name</label>

            <input
              type="text"
              className="form-control"
              id="lastname"
              value={props.lastNameValue}
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
              value={props.emailValue}
              onChange={handleEmail}
            />
          </div>
          { userType === "client" ? <div className="address">
            <label htmlFor="address">Address</label>

            <input
              type="text"
              className="form-control"
              id="address"
              value={props.addressValue}
              onChange={handleAddress}
            />
          </div> : <div className="address">
                <label htmlFor="phone">Phone number</label>
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  // onFocus={changeTextToDate}
                  value={props.phoneNumber}
                  onChange={handlePhoneNumber}
                />
              </div>}
        </div>

        {userType === "client" && (
          <>
            <div className="clientsBinfo">
              <div className="reg-pass">
                <label htmlFor="pwd">Password</label>
                <div>
                <input
                  type={props.seePass1 ? 'text' : "password"}
                  className="form-control"
                  id="pwd"
                  value={props.passwordValue}
                  onChange={handlePass}
                />
                <img onClick={handleImage1}  src={props.seePass1 ? seen : hidden } alt="img"/>

                </div>
              </div>
              <div className="date">
                <label htmlFor="birthdate">Birth Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="birthdate"
                  // onFocus={changeTextToDate}
                  value={props.birthDateValue}
                  onChange={handleBirthDate}
                />
              </div>
            </div>
            <div className="confirmAndPhone">
              <div className="conf-pass">
                <label htmlFor="pwd">Confirm Password</label>
                <div>
                <input
                  type={props.seePass2 ? 'text' : "password"}
                  className="form-control"
                  id="pwd"
           
                  value={props.confPasswordValue}
                  onChange={handleConfPass}
                />
                <img onClick={handleImage2}  src={props.seePass2 ? seen : hidden } alt="img"/>

                </div>
              </div>
              <div className="Phone">
                <label htmlFor="phone">Phone number</label>
                <input
                  type="number"
                  className="form-control"
                  id="phone"
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
           <div className="clientsBinfo">
              <div className="reg-pass">
                <label htmlFor="pwd">Password</label>
                <div>
                <input
                     type={props.seePass1 ? 'text' : "password"}
                  className="form-control"
                  id="pwd"
                  value={props.passwordValue}
                  onChange={handlePass}
                />
                <img onClick={handleImage1}  src={props.seePass1 ? seen : hidden } alt="img"/>

                </div>
              </div>
              <div className="date">
                <label htmlFor="organization">Organization</label>
                <input
                  type="text"
                  className="form-control"
                  id="organization"
                  value={props.organization}
                  onChange={handleOrganization}
                />
              </div>
            </div>
            <div className="doctorsBinfo">
            <div className="prefix">
                <label htmlFor="pwd">Confirm Password</label>
                <div>
                <input
                   type={props.seePass2 ? 'text' : "password"}
                  className="form-control"
                  id="pwd"
           
                  value={props.confPasswordValue}
                  onChange={handleConfPass}
                />
                <img onClick={handleImage2}  src={props.seePass2 ? seen : hidden } alt="img"/>

                </div>
              </div>
              <div className="spec">
                <label htmlFor="speciality">Speciality</label>
                <Select
                  type="text"
                  id="speciality"
                  value={props.specValue}
                  options={props.specOptions}
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
            // value={submitValue}
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
