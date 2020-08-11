import React, { Fragment } from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import "../../assets/client/detail-exam.scss";
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
import Select from "react-select";

const DetailVideo = ({
  exam,
  handleCancel,
  props,
  handleChange,
  enableTipeing,
  iconsMouseOut,
  iconsMouseOver,
  handleDragDrop,
  handleResize,
  showAndHideChat,
  handleStatus,
  handleDivSize,
  cutVideo,
  cutMic,
  handleVideoStart,
  statusValue,
}) => {
  let disabled = props.doctorsVideoId ? false : true;

  return (
    <>
      <div className="header">
        <div>
          <Header />
          <Nav />
        </div>
      </div>
      {exam.map((exam) => {
        let placeholder =
          exam.status === "Appointed" ? "Accepted" : exam.status;
        let options =
          exam.status === "Pending" || exam.status === "Appointed"
            ? [{ value: "Cancel", label: "Cancel" }]
            : [];
        return (
          <Fragment key={exam.id}>
            <div className="detail-exam">
              <div className="detail">
                <p>
                  <span>Doctor:</span> {exam.doctor}
                </p>
                <p>
                  <span>Speciality:</span> {exam.speciality}
                </p>
                {exam.appointed_date ? (
                  <p>
                    {" "}
                    <span>Appointed:</span>{" "}
                    {moment(exam.appointed_date).format("MM/DD/YYYY HH:mm")}
                  </p>
                ) : (
                  <p>
                    {" "}
                    <span>Created:</span>{" "}
                    {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }).format(new Date(exam.created))}
                  </p>
                )}
                <p>
                  <span>Type:</span> {exam.exam_type}
                </p>
                <p>
                  <span>Subject:</span> {exam.subject}
                </p>
                <p>
                  <span>Message:</span> {exam.notes}
                </p>
                {exam.status === "Canceled" || exam.status === "Finished" ? (
                  <p>
                    <span>Status:</span> {exam.status}
                  </p>
                ) : (
                  <div
                    style={{ marginLeft: "10px" }}
                    className="divSelectButton"
                  >
                    <Select
                      type="text"
                      placeholder={placeholder}
                      // isDisabled={
                      //   exam.status === "Canceled" ||
                      //   exam.status === "Declined" ||
                      //   exam.status === "Finished"
                      //     ? true
                      //     : false
                      // }
                      className="select-option"
                      value={statusValue}
                      options={options}
                      onChange={handleStatus}
                    />
                  </div>
                )}
              </div>
            </div>
            {exam.status === "Appointed" || exam.status === "Accepted" ? (
              <div className="message-btn">
                <button
                  className="message-link"
                  id="StartVideo"
                  disabled={disabled}
                  onClick={handleVideoStart}
                >
                  Start Video
                </button>
              </div>
            ) : null}
          </Fragment>
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
