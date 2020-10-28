import React from "react";
import "../../assets/client/video_req.scss";
import Select from "react-select";
// import CheckoutForm from "../../containers/Client/CheckoutForm";
// import { Elements, StripeProvider } from "react-stripe-elements";
import DatePicker from "react-datepicker";
import videoIcon from "../../icons/icon_Video_Appointment_blue.svg";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import arrowAttach from "../../icons/attach_white.svg";

const VideoReq = ({
  handleSpeciality,
  handleDoctor,
  handleSubject,
  handleSubmit,
  handleMessage,
  handleDateChange,
  props,
  handleAttach
}) => {
  let exclude = props.excludeTime.map((hy) => {
    return new Date(hy.appointed_date);
  });

  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: "40px",
      border: "1.7px solid #fa9551",
      borderRadius: "10px",
      width: "307px",
      marginLeft: "2px",
      background: "white",
      color: "#666666",
      fontWeight: "600",
    }),
  };

  return (
    <div className="exam">
      <div className="mainExam">
        <div className="newVideo">
          <img src={videoIcon} alt="video img" />
          <p>Video Appointment</p>
        </div>
        <div className="exam-spec">
          <Select
            type="text"
            id="speciality"
            styles={customStyles}
            placeholder="Select Speciality..."
            options={props.specialities}
            onChange={handleSpeciality}
          />
        </div>
        <div className="exam-doc">
          <Select
            type="text"
            id="doctor"
            styles={customStyles}
            placeholder="Select Doctor..."
            options={props.specDoctor}
            onChange={handleDoctor}
            value={
              props.specDoctor.length === 0 ? null : [props.resetDoctorSelect]
            }
          />
        </div>
        <div className="exam-sub">
          <input
            type="text"
            className="form-control"
            id="subject"
            placeholder="Enter subject"
            value={props.subject}
            onChange={handleSubject}
          />
        </div>
      </div>
      <div className="DatePicker">
        <div className="exam-mess">
          <textarea
            type="text"
            className="form-control"
            id="exam-notes"
            placeholder="Enter notes"
            value={props.notes}
            onChange={handleMessage}
          />
        </div>
        <div className="MainDate">
          {/* <DatePicker
            selected={props.startDate}
            onChange={handleDateChange}
            minDate={new Date()}
            inline
          /> */}
          <div
            className="disabledDiv"
            style={{ zIndex: props.specialSP && props.doctor_id ? 0 : 1 }}
          ></div>
          <DatePicker
            excludeTimes={exclude}
            inline
            selected={props.startDate}
            onChange={handleDateChange}
            showTimeSelect
            excludeOutOfBoundsTimes
            minDate={new Date()}
            timeFormat="HH:mm aa"
            timeIntervals={30}
            timeCaption="time"
            minTime={moment(new Date()).set("hour", 8).set("minute", 0)._d}
            maxTime={moment(new Date()).set("hour", 15).set("minute", 30)._d}
          />
        </div>
        <div className="divAndAttach">
          <button
            value={props.submitted}
            className="send"
            onClick={handleSubmit}
          >
            Send
          </button>
          <div className="upload-btn-wrapper">
            <button className="btn">
              <img src={arrowAttach} alt="attach" />
            </button>
            <input type="file" name="myfile" onChange={handleAttach} />
          </div>
        </div>
      </div>
      {/* <div>
        {props.isClicked ? (
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

export default VideoReq;
