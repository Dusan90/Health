import React from "react";
import "../../assets/client/waitingRoom.scss";
import Select from "react-select";
// import CheckoutForm from "../../containers/Client/CheckoutForm";
// import { Elements, StripeProvider } from "react-stripe-elements";
// import { FaMicrophoneAltSlash } from "react-icons/fa";
// import { FaMicrophoneAlt } from "react-icons/fa";
// import { FaVideoSlash } from "react-icons/fa";
// import { FaVideo } from "react-icons/fa";
// import { FaPhoneSlash } from "react-icons/fa";
// import { FaRegSquare } from "react-icons/fa";
// import { FaRocketchat } from "react-icons/fa";
// import { MdClose } from "react-icons/md";
// import { Rnd } from "react-rnd";
import RoomIcon from "../../icons/icon_Waiting_Room_blue.svg";
import arrowAttach from '../../icons/attach_white.svg'

// import iconWaitingBlue from '../../icons/icon_Waiting_Room_blue.svg'
import iconVideoBlue from '../../icons/icon_Video_Appointment_blue.svg'
// import moment from 'moment'
import mute from '../../icons/videoIcons/mute.svg'
import unmute from '../../icons/videoIcons/unmute.svg'
import hangup from '../../icons/videoIcons/hang-up.svg'
// import call from '../../icons/videoIcons/call.svg'
import cameraoff from '../../icons/videoIcons/camera-off.svg'
import cameraon from '../../icons/videoIcons/camera-on.svg'
import ExtendScreen from '../../icons/videoIcons/Extend-screen.svg'

const WaitingRoom = ({
  handleSpeciality,
  handleDoctor,
  handleSubject,
  handleSubmit,
  handleExitQueue,
  handleVideoStart,
  handleMessage,
  props,
  handleChange,
  enableTipeing,
  iconsMouseOut,
  iconsMouseOver,
  handleDragDrop,
  handleResize,
  showAndHideChat,
  handleDivSize,
  cutVideo,
  cutMic,
  showExtendScreenIcon
}) => {
  const disabled = props.credits ? false : true;
  const disabled2 = props.credits ? true : false;
  const disabled3 = props.doctorStartedVideo ? false : true;
  console.log(props.specDoctor);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      height: "40px",
      border: "1.7px solid #fa9551",
      borderRadius: "10px",
      width: "100%",
      // marginLeft: "2px",
      background: "white",
      color: "#666666",
      fontWeight: "600",
    }),
    option: (provided, state) => ({
      ...provided,
      textAlign: "left",
      color:
        state.data.status === "Away"
          ? "#C7CD00"
          : state.data.status === "Offline" && "red",
    }),
    placeholder: () => ({
      fontWeight: '550',
      color: 'black'
    })
  };
  const customS = {
    control: (base, state) => ({
      ...base,
      height: "40px",
      border: "1.7px solid #fa9551",
      borderRadius: "10px",
      width: "100%",
      // marginLeft: "2px",
      background: "white",
      color: "#666666",
      fontWeight: "600",
    }),
    placeholder: () => ({
      fontWeight: '550',
      color: 'black'
    })
  };
  return (
    <>
    <div className="exam" style={{ display: !props.startVideo ? "block" : "none",}}>
      <div className="mainExam">
        <div className="newVideo">
          <img src={RoomIcon} alt="video img" />
          <p>Waiting room</p>
        </div>
        <div className="exam-spec">
          <Select
            type="text"
            id="speciality"
            placeholder={
              props.currentClient
                ? props.currentClient.speciality : 
                props.currentSpec ? props.currentSpec
                : "Select Speciality..."
            }
            options={props.specialities}
            isDisabled={disabled2}
            styles={customS}
            onChange={handleSpeciality}
          />
        </div>
        <div className="exam-doc">
          <Select
            style
            styles={customStyles}
            type="text"
            id="doctor"
            placeholder={
              props.currentClient
                ? props.currentClient.doctor_name
                : "Select Doctor..."
            }
            options={props.specDoctor.length === 0 ? props.doctors : props.specDoctor }
            getOptionLabel={(option) => `${option.label}: (${option.status})`}
            // isOptionDisabled={(option) =>
            //   option.status !== "Available" ? true : false
            // }
            isDisabled={disabled2}
            onChange={handleDoctor}

            value={
              props.resetDoctorSelect
            //   props.specDoctor.length === 0 ? null : [props.resetDoctorSelect]
            }
          />
        </div>
        <div className="exam-sub">
          <input
            type="text"
            className="form-control"
            id="subject"
            maxLength='25'
            placeholder="Enter subject"
            value={
              props.currentClient ? props.currentClient.subject : props.subject
            }
            onChange={handleSubject}
          />
        </div>
      </div>
      <div className="queue">
        <div className="exam-mes">
          <textarea
            type="text"
            className="form-control"
            id="exam-notes"
            placeholder="Enter notes"
            value={
              props.currentClient ? props.currentClient.notes : props.notes
            }
            onChange={handleMessage}
          />
        </div>
        <div className="queueInfo">
          <div className="queueMain">
            <div className="statusQueue">
              <p>Queue status</p>
              <div>
                {props.credits && props.YourNumber === 0 ? (
                  <h4
                    style={{
                      border: "1.7px solid #fa9551",
                      color: "#fa9551",
                      borderRadius: "10px",
                    }}
                  >
                    Be Ready
                  </h4>
                ) : props.credits ? (
                  <h4
                    style={{
                      border: "1.7px solid green",
                      color: "green",
                      borderRadius: "10px",
                    }}
                  >
                    In the queue
                  </h4>
                ) : (
                  <h4 style={{ border:" 1.7px solid red" ,
                    borderRadius: "10px",
                    color: "red"
                  }}>Out of queue</h4>
                )}
              </div>
            </div>
            <div className="timeEst">
              <p>People before you</p>
              <div>
                <p>Num</p>
                <h4>
                  {!props.credits
                    ? props.peopleInQueue.length
                    : props.YourNumber}
                </h4>
              </div>
            </div>
          </div>
          {props.YourNumber === 0 && !props.doctorsVideoId && props.credits ? (
            <p>Be ready, Waiting from Doctors connection...</p>
          ) : null}
        <div className='startandexit'>

          <button
        value={props.submitted}
        disabled={disabled2}
        className="send"
        onClick={handleSubmit}
      >
        Enter queue
      </button>
          {/* <button onClick={handleVideoStart}>video</button> */}
          <button
            className="exitQueue"
            onClick={handleExitQueue}
            disabled={disabled}
          >
            Exit queue
          </button>
        </div>
        </div>
      </div>
      <div className='divAndAttach'>
      {/* <input type="file" name="" id="file" /> */}
      <button
            id="StartVideo"
            className='startThatChat'
            disabled={disabled3}
            onClick={handleVideoStart}
          >
            Start video
          </button>
      <div className="upload-btn-wrapper">
            <button className="btn">
              <img src={arrowAttach} alt="attach" />
            </button>
            <input type="file" name="myfile" />
          </div>
      </div>
      
      <div>
        {/* {props.isClicked ? (
          <StripeProvider apiKey="pk_test_EolntZ7skKXUqmWzbnpuo1zy00ZxWVnWf3">
            <Elements>
              <CheckoutForm />
            </Elements>
          </StripeProvider>
        ) : null} */}
      </div>
      {/* <div
        style={{ display: props.startVideo ? "block" : "none" }}
        id="videoo"
      ></div> */}
      {/* <Rnd
        id="videoo"
        size={{
          width: props.width,
          height: props.height,
        }}
        style={{ display: props.startVideo ? "block" : "none" }}
        position={{ x: props.x, y: props.y }}
        onDragStop={(e, d) => {
          handleDragDrop(d);
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          handleResize(ref, position);
        }}
      >
        {" "}
        <div id="topControler">
          <span className="icon1" onClick={handleDivSize}>
            <FaRegSquare />
          </span>
          <span className="icon2">
            <MdClose />
          </span>
        </div>
        <div id="mainChatVideo">
          <form
            autoComplete="off"
            style={{ display: props.showChat ? "block" : "none" }}
            action=""
            id="form"
          >
            <pre id="messages"></pre>
            <div className="inputMessage">
              <input
                type="text"
                placeholder="Type your message..."
                id="yourMessage"
                value={props.value}
                onChange={handleChange}
                onMouseDown={enableTipeing}
              ></input>
              <button id="send">Send</button>
            </div>
          </form>
          <div
            id="videoChat"
            style={{ width: props.showChat ? "50%" : "100%" }}
            onMouseOver={iconsMouseOver}
            onMouseOut={iconsMouseOut}
          >
            <div className="chatRoom" onClick={showAndHideChat}>
              <FaRocketchat />
            </div>
            <div
              id="functionality"
              style={{ display: props.hover ? "flex" : "none" }}
            >
              <FaMicrophoneAltSlash
                className="iconMic"
                style={{ display: !props.audio ? "none" : "block" }}
                onClick={cutMic}
              />

              <FaMicrophoneAlt
                className="iconMicUnmute"
                style={{ display: props.audio ? "none" : "block" }}
                onClick={cutMic}
              />

              <FaPhoneSlash className="iconPhone" />

              <FaVideoSlash
                className="iconVideo"
                style={{ display: !props.video ? "none" : "block" }}
                onClick={cutVideo}
              />

              <FaVideo
                className="iconVideoShow"
                style={{ display: props.video ? "none" : "block" }}
                onClick={cutVideo}
              />
            </div>
          </div>
        </div>
      </Rnd> */}
    </div>

<div className="detailExam"  style={{
  display: props.startVideo ? "block" : "none",
  padding: 0
}}>
    <div className="iconVideoo">
        <img src={iconVideoBlue} alt="email" />
        <p>Video call</p>{" "}
      </div>
      <div className="detail2">
        <div className='detailInfo2' id='detailInfo2'>
        <p className='ClientP'>
          <span>Doctor:</span> {props.currentClient.doctor_name}
        </p> 
        <div className="MainIconsDiv">
          <img src={mute}
            className="iconMic"
          alt="img" style={{ display: !props.audio ? "none" : "block" }}
        onClick={cutMic}/>
          <img src={unmute}
           className="iconMicUnmute"
          alt="img" style={{ display: props.audio ? "none" : "block" }}
        onClick={cutMic}/>
          {/* <img src={call} alt="img" style={{display: 'none' }}/> */}
          <img src={hangup} alt="img" className="iconPhone"/>
          <img src={cameraoff}
          className="iconVideo"
           alt="img" style={{ display: !props.video ? "none" : "block" }}
        onClick={cutVideo}/>
          <img src={cameraon} alt="img" 
        className="iconVideoShow"
        style={{ display: props.video ? "none" : "block" }}
        onClick={cutVideo}/>
          </div>  
        <div className='MainDivForChat'>
          <p>Chat</p>
          <form
    autoComplete="off"
    action=""
    id="form"
  >
    <pre id="messages"></pre>
    <div className="inputMessage">
      <input
        type="text"
        placeholder="Type a message"
        id="yourMessage"
        value={props.value}
        onChange={handleChange}
        onMouseDown={enableTipeing}
      ></input>
      <button style={{display: 'hidden'}} id="send">Send</button>
    </div>
  </form>
          </div>  
        </div>
        <div id='videoChat' onMouseEnter={showExtendScreenIcon} onMouseLeave={showExtendScreenIcon}>
        <img src={ExtendScreen} style={{display: !props.showExtendScreen && 'none'}} className="extendScreen" alt="screen icon"/>

        {/* <div id='videoo' >nesto tamo</div> */}

        </div>

   
      </div>

    </div>
    </>
  );
};

export default WaitingRoom;
