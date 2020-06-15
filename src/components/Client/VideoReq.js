import React from "react";
import "../../assets/client/video_req.scss";
import Select from "react-select";
// import CheckoutForm from "../../containers/Client/CheckoutForm";
// import { Elements, StripeProvider } from "react-stripe-elements";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const VideoReq = ({
  handleSpeciality,
  handleDoctor,
  handleSubject,
  handleSubmit,
  handleMessage,
  handleDateChange,
  props,
}) => {
  // console.log(props.testDate, "tessssssssssssssssssssssssssssssssssst");
  // let hello = props.testDate.map((hy) => {
  //   return hy.time;
  // });

  return (
    <div className="exam">
      <div className="mainExam">
        <div className="exam-spec">
          <Select
            type="text"
            id="speciality"
            placeholder="Select Speciality..."
            options={props.specialities}
            onChange={handleSpeciality}
          />
        </div>
        <div className="exam-doc">
          <Select
            type="text"
            id="doctor"
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
        <div className="exam-mes">
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
            // excludeTimes={hello}
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
            maxTime={moment(new Date()).set("hour", 16).set("minute", 0)._d}
          />
        </div>
      </div>
      <input type="file" name="" id="file" />
      <button value={props.submitted} className="btn" onClick={handleSubmit}>
        Send
      </button>
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
