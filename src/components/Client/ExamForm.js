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
  handleAttach,
  isClicked,
  props
}) => {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: "40px",
      border: "1.7px solid #fa9551",
      borderRadius: "10px",
      width: "100%",
      // marginLeft: "2px",
      background: props.color && props.specialSP.length === 0 ? 'rgb(245, 192, 192)' : "white",
      color: "#666666",
      fontWeight: "500",
    }),
    placeholder: () =>({
      color: '#666666',
      fontWeight: '500'
    })
  };

  const customStyles2 = {
    control: (base, state) => ({
      ...base,
      height: "40px",
      border: "1.7px solid #fa9551",
      borderRadius: "10px",
      width: "100%",
      // marginLeft: "2px",
      background: props.color && !props.doctor_id ? 'rgb(245, 192, 192)' : "white",
      color: "#666666",
      fontWeight: "500",
    }),
    placeholder: () =>({
      color: '#666666',
      fontWeight: '500'
    })
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
            placeholder={props.currentSpec ? props.currentSpec : `Select Speciality...`}
            options={specialities}
            onChange={handleSpeciality}
          />
        </div>
        <div className="exam-doc">
          <Select
            styles={customStyles2}
            type="text"
            id="doctor"
            placeholder="Select Doctor..."
            options={props.specDoctor.length === 0 ? props.doctors : props.specDoctor}
            onChange={handleDoctor}
            value={   props.resetDoctorSelect}
            // value={specDoctor.length === 0 ? null : [resetDoctorSelect]}
          />
        </div>
        <div className="exam-sub">
          <input
            type="text"
            className="form-control"
            id="subject"
            maxLength='35'
            style={{background: props.color && !subject ? 'rgb(245, 192, 192)' : "white"}}

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
          style={{background: props.color && !message ? 'rgb(245, 192, 192)' : "white"}}

          value={message}
          onChange={handleMessage}
        />
        <div className="buttons">
          <button value={submitted} className="btn" onClick={handleSubmit}>
            Submit
          </button>
          <div className='profilePic'>
              <div className="upload-btn-wrapper">
            <button className="btn">
              {/* <img src={arrowAttach} alt="attach" /> */}
              <img src={attach} alt="attach" />
            
            </button>
            <input type="file" name="myfile" onChange={handleAttach}  />
          </div>
              </div>
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
