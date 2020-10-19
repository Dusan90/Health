import React from "react";
import Select from "react-select";
import "../../assets/client/exam-form.scss";
import emailIcon from "../../icons/icon_Email_blue.svg";
import attach from "../../icons/attach_white.svg";
// import CheckoutForm from "../../containers/Client/CheckoutForm";
// import { Elements, StripeProvider } from "react-stripe-elements";

const InitiateExam = ({
  specialities,
  subject,
  submitted,
  message,
  handleSpeciality,
  handleDoctor,
  handleSubject,
  handleSubmit,
  handleMessage,
  specDoctor,
  resetDoctorSelect,
  isClicked,
}) => {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: "40px",
      border: "1.7px solid #fa9551",
      borderRadius: "10px",
      width: "305px",
      marginLeft: "2px",
      background: "white",
      color: "#666666",
      fontWeight: "600",
    }),
  };
  return (
    <div className="exam">
      <div className="mainExam">
        <div className="newEmail">
          <img src={emailIcon} alt="email img" />
          <p>New Email</p>
        </div>
        <div className="exam-spec">
          <Select
            type="text"
            styles={customStyles}
            id="speciality"
            placeholder="Select Speciality..."
            options={specialities}
            onChange={handleSpeciality}
          />
        </div>
        <div className="exam-doc">
          <Select
            styles={customStyles}
            type="text"
            id="doctor"
            placeholder="Select Doctor..."
            options={specDoctor}
            onChange={handleDoctor}
            value={specDoctor.length === 0 ? null : [resetDoctorSelect]}
          />
        </div>
        <div className="exam-sub">
          <input
            type="text"
            className="form-control"
            id="subject"
            placeholder="Enter subject"
            value={subject}
            onChange={handleSubject}
          />
        </div>
      </div>
      <div className="exam-mess">
        <div className="messageTitle">Message:</div>
        <textarea
          type="text"
          className="form-control"
          id="exam-message"
          placeholder="Enter message"
          value={message}
          onChange={handleMessage}
        />
        <div className="buttons">
          <button value={submitted} className="btn" onClick={handleSubmit}>
            Submit
          </button>
          <button className="btnattach" onClick={handleSubmit}>
            <img src={attach} alt="attach" />
          </button>
        </div>
      </div>
      {/* <div className="btn"> */}

      {/* </div> */}
      {/* <div>
        {isClicked ? (
          <StripeProvider apiKey="pk_test_EolntZ7skKXUqmWzbnpuo1zy00ZxWVnWf3">
            <Elements>
              <CheckoutForm />
            </Elements>
          </StripeProvider>
        ) : null}
      </div> */}
    </div>
  );
};

export default InitiateExam;
