import React from "react";
import Select from "react-select";
import "../../assets/auth/register.scss";
import seen from "../../icons/password-seen.svg";
import hidden from "../../icons/password-hidden.svg";
import Loading from "../../icons/c+.svg";
import cLogo from "../../icons/c+.svg";

const RegisterUser = ({
  userType,
  handleEmail,
  handleFirstName,
  handleLastName,
  handlePass,
  handleAddress,
  handleBirthDate,
  handleSpec,
  handleIDType,
  handleSubmit,
  handleGenderRadio,
  handleUserType,
  handleConfPass,
  handlePhoneNumber,
  handleOrganization,
  handleImage1,
  handleImage2,
  props,
  handleidNumber,
  handleOrganizationName,
  handleOrgan_num
}) => {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: "40px",
      border: "1.7px solid #fa9551",
      borderRadius: "10px",
      flex: "1",
      fontWeight: "700",
      marginLeft: "2px",
      // background: "white",
      background:
        !props.selectedSpecValue && props.color && "rgb(245, 192, 192)",
      color: "#666666",
    }),
  };

  const customStyles2 = {
    control: (base, state) => ({
      ...base,
      height: "40px",
      border: "1.7px solid #fa9551",
      borderRadius: "10px",
      flex: "1",
      fontWeight: "700",
      marginLeft: "2px",
      // background: "white",
      background:
        !props.selectedidTypeValue && props.color && "rgb(245, 192, 192)",
      color: "#666666",
    }),
  };

  const customStyles3 = {
    control: (base, state) => ({
      ...base,
      height: "40px",
      border: "1.7px solid #fa9551",
      borderRadius: "10px",
      flex: "1",
      fontWeight: "700",
      marginLeft: "2px",
      // background: "white",
      background:
        !props.organization && props.color && "rgb(245, 192, 192)",
      color: "#666666",
    }),
  };

  const IDoptions = [
    { label: "Passport", value: "PASSPORT" },
    { label: "Photo ID", value: "GOV_ISSUED_PHOTO_ID" },
    { label: "Drivers licence", value: "DRIVER_LICENCE" },
  ];
  return (
    <div className="mainRegisterDiv">
      {props.loading && (
        <img
          src={Loading}
          className="loading"
          alt="loading..."
          style={{ width: "150px" }}
        />
      )}
      <img src={cLogo} className="logo" alt="cLogo" />
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
            <input
              className="organizationRadio"
              type="checkbox"
              name="userType"
              id="r3"
              value="organization"
              checked={props.userType === "organization" ? true : false}
              onChange={() => handleUserType("organization")}
            />
            <label htmlFor="r3" className="organizationLabel">
              Organization
            </label>
          </div>
          {/* {userType !== "organization" && <div className="gender">
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
            <p
              style={{
                display:
                  !props.selectedGenderValue && props.color ? "block" : "none",
              }}
            >
              Select gender
            </p>
          </div>} */}
        </div>
      </div>
      <form className="register-form" autoComplete="none">
        {<div className="firstLastGender">
          <div className="reg-name">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              className="form-control"
              autoComplete="none"
              name="field"
              id="firstname"
              style={{
                background:
                  !props.firstNameValue && props.color && "rgb(245, 192, 192)",
              }}
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
              autoComplete="none"
              name="field"
              style={{
                background:
                  !props.lastNameValue && props.color && "rgb(245, 192, 192)",
              }}
              value={props.lastNameValue}
              onChange={handleLastName}
            />
          </div>
        </div>}
        {userType !== "organization" && <div className="regPass">
          <div className="reg-email">
            <label htmlFor="email">E-mail</label>

            <input
              type="email"
              className="form-control"
              id="email"
              style={{
                background:
                  !props.emailValue && props.color && "rgb(245, 192, 192)",
              }}
              autoComplete="none"
              name="field"
              value={props.emailValue}
              onChange={handleEmail}
            />
          </div>
          {userType === "client" ? (
            <div className="address">
              <label htmlFor="address">Address</label>

              <input
                type="text"
                className="form-control"
                autoComplete="none"
                name="field"
                style={{
                  background:
                    !props.addressValue && props.color && "rgb(245, 192, 192)",
                }}
                id="address"
                value={props.addressValue}
                onChange={handleAddress}
              />
            </div>
          ) : (
            <div className="address">
              <label htmlFor="phone">Phone number</label>
              <input
                type="number"
                className="form-control"
                id="phone"
                autoComplete="none"
                name="field"
                style={{
                  background:
                    !props.phoneNumber && props.color && "rgb(245, 192, 192)",
                }}
                // onFocus={changeTextToDate}
                value={props.phoneNumber}
                onChange={handlePhoneNumber}
              />
            </div>
          )}
        </div>}

        {userType === "client" && (
          <>
            <div className="clientsBinfo">
              <div className="reg-pass">
                <label htmlFor="pwd">Password</label>
                <div>
                  <input
                    type={props.seePass1 ? "text" : "password"}
                    className="form-control"
                    autoComplete="none"
                    name="field"
                    id="pwd"
                    style={{
                      background:
                        !props.passwordValue &&
                        props.color &&
                        "rgb(245, 192, 192)",
                    }}
                    value={props.passwordValue}
                    onChange={handlePass}
                  />
                  <img
                    onClick={handleImage1}
                    src={props.seePass1 ? seen : hidden}
                    alt="img"
                  />
                </div>
              </div>
              <div className="date">
                <label htmlFor="birthdate">Birth Date</label>
                <input
                  type="date"
                  className="form-control dateOnRegister"
                  id="birthdate"
                  autoComplete="none"
                  name="field"
                  // onFocus={changeTextToDate}
                  style={{
                    background:
                      !props.birthDateValue &&
                      props.color &&
                      "rgb(245, 192, 192)",
                    color: props.birthDateValue && "#666666",
                  }}
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
                    type={props.seePass2 ? "text" : "password"}
                    className="form-control"
                    id="pwd"
                    autoComplete="none"
                    name="field"
                    style={{
                      background:
                        !props.confPasswordValue &&
                        props.color &&
                        "rgb(245, 192, 192)",
                    }}
                    value={props.confPasswordValue}
                    onChange={handleConfPass}
                  />
                  <img
                    onClick={handleImage2}
                    src={props.seePass2 ? seen : hidden}
                    alt="img"
                  />
                </div>
              </div>
              <div className="Phone">
                <label htmlFor="phone">Phone number</label>
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  autoComplete="none"
                  name="field"
                  style={{
                    background:
                      !props.phoneNumber && props.color && "rgb(245, 192, 192)",
                  }}
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
                    type={props.seePass1 ? "text" : "password"}
                    className="form-control"
                    id="pwd"
                    autoComplete="none"
                    name="field"
                    value={props.passwordValue}
                    style={{
                      background:
                        !props.passwordValue &&
                        props.color &&
                        "rgb(245, 192, 192)",
                    }}
                    onChange={handlePass}
                  />
                  <img
                    onClick={handleImage1}
                    src={props.seePass1 ? seen : hidden}
                    alt="img"
                  />
                </div>
              </div>
              <div className="spec">
                <label htmlFor="organization">Organization</label>
                {/* <input
                  type="text"
                  className="form-control"
                  id="organization"
                  autoComplete="none"
                  name="field"
                  style={{
                    background:
                      !props.organization &&
                      props.color &&
                      "rgb(245, 192, 192)",
                  }}
                  value={props.organization}
                  onChange={handleOrganization}
                /> */}
                <Select
                  type="text"
                  id="organization"
                  value={props.organizationValue}
                  options={props.organizationsList}
                  styles={customStyles3}
                  onChange={handleOrganization}
                />
              </div>
            </div>
            <div className="doctorsBinfo">
              <div className="prefix">
                <label htmlFor="pwd">Confirm Password</label>
                <div>
                  <input
                    type={props.seePass2 ? "text" : "password"}
                    className="form-control"
                    id="pwd"
                    autoComplete="none"
                    name="field"
                    value={props.confPasswordValue}
                    style={{
                      background:
                        !props.confPasswordValue &&
                        props.color &&
                        "rgb(245, 192, 192)",
                    }}
                    onChange={handleConfPass}
                  />
                  <img
                    onClick={handleImage2}
                    src={props.seePass2 ? seen : hidden}
                    alt="img"
                  />
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
            <div className="doctorsIdInfo">
              <div className="spec">
                <label htmlFor="speciality">ID</label>
                <Select
                  type="text"
                  id="speciality"
                  value={props.idTypeValue}
                  options={IDoptions}
                  styles={customStyles2}
                  onChange={handleIDType}
                />
              </div>
              <div className="prefix">
                <label htmlFor="id_num">ID number</label>
                <div className="spec">
                  <input
                    type='number'
                    className="form-control"
                    id="id_num"
                    autoComplete="none"
                    name='field'
                    value={props.idNumber}
                    style={{ background: !props.idNumber && props.color && 'rgb(245, 192, 192)' }}
                    onChange={handleidNumber}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        {userType === "organization" && (<>
          <div className="regPass">
            <div className="reg-email">
              <label htmlFor="email">E-mail</label>

              <input
                type="email"
                className="form-control"
                id="email"
                style={{
                  background:
                    !props.emailValue && props.color && "rgb(245, 192, 192)",
                }}
                autoComplete="none"
                name="field"
                value={props.emailValue}
                onChange={handleEmail}
              />
            </div>

            <div className="address">
              <label htmlFor="phone">Phone number</label>
              <input
                type="number"
                className="form-control"
                id="phone"
                autoComplete="none"
                name="field"
                style={{
                  background:
                    !props.phoneNumber && props.color && "rgb(245, 192, 192)",
                }}
                // onFocus={changeTextToDate}
                value={props.phoneNumber}
                onChange={handlePhoneNumber}
              />
            </div>
          </div>
          <div className="regPass">
            <div className="reg-email">
              <label htmlFor="organ_name">Organization name</label>

              <input
                type="text"
                className="form-control"
                id="organ_name"
                style={{
                  background:
                    !props.organ_name && props.color && "rgb(245, 192, 192)",
                }}
                autoComplete="none"
                name="field"
                value={props.organ_name}
                onChange={handleOrganizationName}
              />
            </div>

            <div className="address">
              <label htmlFor="organ_num">Registration number</label>
              <input
                type="number"
                className="form-control"
                id="organ_num"
                autoComplete="none"
                name="field"
                style={{
                  background:
                    !props.organ_num && props.color && "rgb(245, 192, 192)",
                }}
                // onFocus={changeTextToDate}
                value={props.organ_num}
                onChange={handleOrgan_num}
              />
            </div>
          </div>
          <div className="clientsBinfo">
            <div className="reg-pass">
              <label htmlFor="pwd">Password</label>
              <div>
                <input
                  type={props.seePass1 ? "text" : "password"}
                  className="form-control"
                  id="pwd"
                  autoComplete="none"
                  name="field"
                  value={props.passwordValue}
                  style={{
                    background:
                      !props.passwordValue &&
                      props.color &&
                      "rgb(245, 192, 192)",
                  }}
                  onChange={handlePass}
                />
                <img
                  onClick={handleImage1}
                  src={props.seePass1 ? seen : hidden}
                  alt="img"
                />
              </div>
            </div>
            <div className="conf-pass">
              <label htmlFor="pwd">Confirm Password</label>
              <div>
                <input
                  type={props.seePass2 ? "text" : "password"}
                  className="form-control"
                  id="pwd"
                  autoComplete="none"
                  name="field"
                  style={{
                    background:
                      !props.confPasswordValue &&
                      props.color &&
                      "rgb(245, 192, 192)",
                  }}
                  value={props.confPasswordValue}
                  onChange={handleConfPass}
                />
                <img
                  onClick={handleImage2}
                  src={props.seePass2 ? seen : hidden}
                  alt="img"
                />
              </div>
            </div>
          </div>


        </>)}
        <div className="register-button">
          <button
            type="submit"
            className="btn"
            autoComplete="on"
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
