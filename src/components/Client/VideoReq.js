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
  handleAttach,
}) => {
  let exclude = props.excludeTime && props.excludeTime.map((hy) => {
    return new Date(hy.appointed_date);
  });
  // const startTimeHour = props.startTime &&  Number(props.startTime.split(':')[0])
  // const startTimeMinute = props.startTime && Number(props.startTime.split(':')[1])
  // const endTimeHour = props.endTime &&  Number(props.endTime.split(':')[0])
  // const endTimeMinute = props.endTime && Number(props.endTime.split(':')[1])


  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: "33px",
      minHeight: '33px',
      border: "1.7px solid #fa9551",
      borderRadius: "10px",
      width: "100%",
      background: props.color && props.specialSP.length === 0 ? 'rgb(245, 192, 192)' : "white",
      color: "#666666",
      fontWeight: "500",
      'div': {
        display: 'flex',
        alignSelf: 'center',
        height: '33px'
      }
    }),
    menu: (provided, state) => ({
      position: 'absolute',
      zIndex: '40',
      width: '100%',
      background: 'white',
      border: '1px solid gray',
      borderRadius: '5px',
      boxShadow: '2px 2px 10px gray'
    }),

    placeholder: () =>({
      fontWeight: '500',
      color: '#666666',
      heigth: '33px'
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '33px',
      padding: '6px'
    }),
    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '33px',
      'div': {
        padding: '5px',
        alignSelf: 'center',
        height: '33px'
      }
    }),

    singleValue: () =>({
    })
  };

  const customStyles2 = {
    control: (base, state) => ({
      ...base,
      height: "33px",
      minHeight: '33px',
      border: "1.7px solid #fa9551",
      borderRadius: "10px",
      width: "100%",
      background: props.color && !props.doctor_id ? 'rgb(245, 192, 192)' : "white",
      color: "#666666",
      fontWeight: "500",
      'div': {
        display: 'flex',
        alignSelf: 'center',
        height: '33px'
      }
    }),
    menu: (provided, state) => ({
      position: 'absolute',
      zIndex: '40',
      width: '100%',
      background: 'white',
      border: '1px solid gray',
      borderRadius: '5px',
      boxShadow: '2px 2px 10px gray'
    }),

    placeholder: () =>({
      fontWeight: '500',
      color: '#666666',
      heigth: '33px'
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: '33px',
      padding: '6px'
    }),
    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '33px',
      'div': {
        padding: '5px',
        alignSelf: 'center',
        height: '33px'
      }
    }),

    singleValue: () =>({
    })
  };

  return (
    <div className="exam">
      <div className="mainExam">
        <div className="newVideo">
          {/* <img src={videoIcon} alt="video img" /> */}
          <h4>Video Appointment</h4>
        </div>
        <div className="exam-spec">
          <Select
            type="text"
            id="speciality"
            styles={customStyles}
            placeholder={props.currentSpec ? props.currentSpec : `Select Speciality...`}
            options={props.specialities}
            onChange={handleSpeciality}


          />
        </div>
        <div className="exam-doc">
          <Select
           
            noOptionsMessage={() => "Select speciality"}
            type="text"
            id="doctor"
            styles={customStyles2}
            placeholder="Select Doctor..."
            options={props.specDoctor.length === 0 ? props.doctors : props.specDoctor }
            onChange={handleDoctor}
            value={
              props.resetDoctorSelect
              // props.specDoctor.length === 0 ? null : [props.resetDoctorSelect]
            }
          />
        </div>
        <div className="exam-sub">
          <input
            type="text"
            className="form-control"
            id="subject"
            style={{background: props.color && !props.subject ? 'rgb(245, 192, 192)' : "white"}}
            placeholder="Enter subject"
            maxLength='35'
            value={props.subject}
            onChange={handleSubject}
          />
        </div>
      </div>
      <div className="DatePicker">
        <div className="exam-mess" 
            style={{background: props.color && !props.notes ? 'rgb(245, 192, 192)' : "white"}}

        >
          <textarea
            type="text"
        
            id="exam-notes"
            placeholder="Enter notes"
            style={{background: props.color && !props.notes ? 'rgb(245, 192, 192)' : "white"}}

            value={props.notes}
            onChange={handleMessage}
          />
          <div className='mainDivForFile'>
          <div className="upload-btn-wrapper">
            <button className="btnn">
              <div className='attachDiv'><p>Add file</p></div>
            </button>
            <input type="file" name="myfile" onChange={handleAttach} multiple />
          </div>
          {props.attachments && <div className='fileForDownload'><p>{props.attachments.name.substring(props.attachments.name.lastIndexOf('/') + 1)}</p></div>}
          {/* {props.attachments && props.attachments.map(ex => <div key={ex.size} className='fileForDownload'><p >{ex.name}</p></div>)} */}
          </div>
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
            excludeTimes={props.selectedWorkingHours.length === 0 ? [moment(new Date()).set("hour", 15).set("minute", 30)._d] : exclude}
            inline
            selected={props.startDate}
            onChange={handleDateChange}
            showTimeSelect
            excludeOutOfBoundsTimes
            minDate={new Date()}
            // timeFormat="hh:mm aa"
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="time"
            fixedHeight
            minTime={props.whichDayIsIt === 7 ? new Date(props.selectedDateForStart) : props.selectedWorkingHours.length === 0 ? moment(new Date()).set("hour", 15).set("minute", 30)._d : new Date(props.selectedDateForStart)}
            maxTime={props.whichDayIsIt === 7 ? new Date(props.selectedDateForEnd) : props.selectedWorkingHours.length === 0 ? moment(new Date()).set("hour", 15).set("minute", 30)._d : new Date(props.selectedDateForEnd) }
            // minTime={props.startTime ? moment(new Date()).set("hour", startTimeHour).set("minute", startTimeMinute)._d : moment(new Date()).set("hour", 8).set("minute", 0)._d}
            // maxTime={props.endTime? moment(new Date()).set("hour", endTimeHour).set("minute", endTimeMinute).subtract(30, 'minute')._d : moment(new Date()).set("hour", 15).set("minute", 30)._d}
          />
           <p style={{display: props.color && !props.reservedDate ? 'block' : "none"}}
           >Please select Time and Date</p>
        </div>
        <div className="divAndAttach">
          <button
            value={props.submitted}
            className="send"
            onClick={handleSubmit}
          >
            Send
          </button>
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
