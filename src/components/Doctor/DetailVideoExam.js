import React from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import Select from "react-select";
import "../../assets/detail_exam.scss";
import moment from "moment";
import { FaMicrophoneAltSlash } from "react-icons/fa";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaVideoSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaPhoneSlash } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
import { FaRocketchat } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Rnd } from "react-rnd";

const optionsAccepted = [{ value: "Finish", label: "Finish" }];

const DetailVideo = ({
  exam,
  status,
  handleStatus,
  statusValue,
  submitValue,
  handleSubmit,
  handleLink,
  handleLinkMessage,
  handleConnect,
  handleVideoStart,
  props,
  iconsMouseOut,
  iconsMouseOver,
  handleDragDrop,
  handleResize,
  showAndHideChat,
  handleDivSize,
  cutVideo,
  cutMic,
  handleChange,
  enableTipeing,
}) => {
  let disabled = props.clientsVideoId === "null" ? true : false;
  let examDate =
    props.exam.length !== 0 ? new Date(props.exam[0].appointed_date) : null;
  let disabled2 =
    moment(new Date()).format("YYYY-MM-DD HH:mm") >
      moment(examDate).subtract(15, "minutes").format("YYYY-MM-DD HH:mm") &&
    moment(new Date()).format("YYYY-MM-DD HH:mm") <
      moment(examDate).add(30, "minutes").format("YYYY-MM-DD HH:mm")
      ? false
      : true;
  return (
    <>
      <div className="header">
        <div>
          <Header />
          <Nav />
        </div>
      </div>

      {exam.map((exam) => {
        return (
          <div key={exam.id} className="detail-exam">
            <div className="detail">
              <p>Client: {exam.client}</p>
              <p>Speciality: {exam.speciality}</p>
              <p>
                Appointed date:{" "}
                {moment(exam.appointed_date).format("MM/DD/YYYY HH:mm")}
              </p>
              <p>Subject: {exam.subject}</p>
              <p>Message: {exam.message}</p>
              <p>Status: {exam.status}</p>
              {exam.status !== "Appointed" && (
                <div className="divSelectButton" style={{ display: "flex" }}>
                  <Select
                    type="text"
                    className="select-option"
                    value={statusValue}
                    options={status}
                    onChange={handleStatus}
                  />
                  <button
                    type="submit"
                    className="btn"
                    value={submitValue}
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              )}
              {exam.status === "Appointed" && (
                <div className="message-btn">
                  <div style={{ display: "flex" }}>
                    <Select
                      type="text"
                      className="select-option"
                      value={statusValue}
                      options={optionsAccepted}
                      onChange={handleStatus}
                    />
                    <button
                      type="submit"
                      className="btn"
                      value={submitValue}
                      onClick={handleSubmit}
                    >
                      Send
                    </button>
                  </div>
                  <button className="messages-link" onClick={handleLink}>
                    Message history
                  </button>
                  <button className="message-link" onClick={handleLinkMessage}>
                    Message
                  </button>
                  {!props.connected ? (
                    <button
                      className="message-link"
                      disabled={disabled2}
                      onClick={handleConnect}
                    >
                      Connect
                    </button>
                  ) : (
                    <button
                      id="DoctorStartVideo"
                      type="submit"
                      className="message-link"
                      onClick={handleVideoStart}
                      disabled={disabled}
                    >
                      Start Video
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
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
    </>
  );
};

export default DetailVideo;
