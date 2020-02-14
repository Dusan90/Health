import React from "react";
import "../../assets/client/video_req.scss";
import Select from "react-select";
import CheckoutForm from "../../containers/Client/CheckoutForm";
import { Elements, StripeProvider } from "react-stripe-elements";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const VideoReq = ({
  specialities,
  subject,
  submitted,
  notes,
  handleSpeciality,
  handleDoctor,
  handleSubject,
  handleSubmit,
  handleMessage,
  specDoctor,
  resetDoctorSelect,
  isClicked,
  handleDateChange,
  startDate
}) => {
  return (
    <div className="exam">
      <div className="mainExam">
        <div className="exam-spec">
          <Select
            type="text"
            id="speciality"
            placeholder="Select Speciality..."
            options={specialities}
            onChange={handleSpeciality}
          />
        </div>
        <div className="exam-doc">
          <Select
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
      <div className="DatePicker">
        <div className="exam-mes">
          <textarea
            type="text"
            className="form-control"
            id="exam-notes"
            placeholder="Enter notes"
            value={notes}
            onChange={handleMessage}
          />
        </div>
        <div className="MainDate">
          <DatePicker selected={startDate} onChange={handleDateChange} inline />
        </div>
      </div>
      <input type="file" name="" id="" />
      <button value={submitted} className="btn" onClick={handleSubmit}>
        Send
      </button>
      <div>
        {isClicked ? (
          <StripeProvider apiKey="pk_test_EolntZ7skKXUqmWzbnpuo1zy00ZxWVnWf3">
            <Elements>
              <CheckoutForm />
            </Elements>
          </StripeProvider>
        ) : null}
      </div>
    </div>
  );
};

export default VideoReq;
