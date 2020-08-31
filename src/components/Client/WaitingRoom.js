import React from "react";
import "../../assets/client/waitingRoom.scss";
import Select from "react-select";
// import CheckoutForm from "../../containers/Client/CheckoutForm";
// import { Elements, StripeProvider } from "react-stripe-elements";
import { FaMicrophoneAltSlash } from "react-icons/fa";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaVideoSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaPhoneSlash } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
import { FaRocketchat } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Rnd } from "react-rnd";

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
}) => {
  // const duca = props.specDoctor.map((test) => {
  //   return {
  //     iD: test.iD,
  //     value: test.value,
  //     label: test.label,
  //     price: test.price,
  //     spec: test.spec,
  //     status: test.status,
  //     isdisabled: test.status !== "Available" ? true : false,
  //   };
  // });
  // console.log(props.specDoctor);
  const disabled = props.credits ? false : true;
  const disabled2 = props.credits ? true : false;
  const disabled3 = props.doctorsVideoId ? false : true;
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      textAlign: "left",
      // color: state.isDisabled && "red",
      color:
        state.data.status === "Away"
          ? "#C7CD00"
          : state.data.status === "Offline" && "red",
    }),
  };
  return (
    <div className="exam">
      <div className="mainExam">
        <div className="exam-spec">
          <Select
            type="text"
            id="speciality"
            placeholder="Select Speciality..."
            options={props.specialities}
            isDisabled={disabled2}
            onChange={handleSpeciality}
          />
        </div>
        <div className="exam-doc">
          <Select
            style
            styles={customStyles}
            type="text"
            id="doctor"
            placeholder="Select Doctor..."
            options={props.specDoctor}
            getOptionLabel={(option) => `${option.label}: (${option.status})`}
            // isOptionDisabled={(option) =>
            //   option.status !== "Available" ? true : false
            // }
            isDisabled={disabled2}
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
      <div className="queue">
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
        <div className="queueInfo">
          <h5>Queue (online)</h5>
          <div className="queueMain">
            <div className="statusQueue">
              <p>Queue status</p>
              <div>
                {props.credits && props.YourNumber === 0 ? (
                  <h4
                    style={{
                      background: "rgb(250, 250, 102)",
                      color: "rgb(128, 128, 3)",
                      borderRadius: "5px",
                    }}
                  >
                    Be Ready
                  </h4>
                ) : props.credits ? (
                  <h4
                    style={{
                      background: "rgb(119, 228, 119)",
                      color: "green",
                      borderRadius: "5px",
                    }}
                  >
                    In the queue
                  </h4>
                ) : (
                  <h4>Out of queue</h4>
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
          <button
            id="StartVideo"
            disabled={disabled3}
            onClick={handleVideoStart}
          >
            Start video
          </button>
          <button
            className="exitQueue"
            onClick={handleExitQueue}
            disabled={disabled}
          >
            Exit the queue
          </button>
        </div>
      </div>
      <input type="file" name="" id="file" />
      <button
        value={props.submitted}
        disabled={disabled2}
        className="btn"
        onClick={handleSubmit}
      >
        Enter the queue
      </button>
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
      <Rnd
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
      </Rnd>
    </div>
  );
};

export default WaitingRoom;
