import React, { Fragment } from "react";
import "../../assets/processingWaitingRoom.scss";
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

const Processing = ({
  handleConnect,
  handleVideoStart,
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
  let disabled = props.clientsVideoId === "null" ? true : false;
  let disabled2 = props.connectedall ? false : true;
  return (
    <>
      {props.exam.map((exam) => {
        console.log(exam);
        return (
          <Fragment key={exam.exam.id}>
            <div className="detail-exam">
              <div className="detail">
                <p>
                  <span>Client:</span> {exam.exam.client}
                </p>
                <p>
                  <span>Speciality: </span> {exam.exam.speciality}
                </p>
                <p>
                  <span>Date: </span>
                  {moment(exam.exam.appointed_date).format("MM/DD/YYYY")}
                </p>
                <p>
                  <span>Subject: </span> {exam.exam.subject}
                </p>

                <p>
                  <span>Status: </span> {exam.exam.status}
                </p>
              </div>
              {exam.record ? (
                <div key={exam.record.id} className="record-box">
                  <h4>Record</h4>
                  <p>
                    <span>Allergies: </span> {exam.record.allergies}
                  </p>
                  <p>
                    <span>Teraphy history: </span> {exam.record.teraphy_history}
                  </p>
                  <p>
                    <span>Medical conditions: </span>{" "}
                    {exam.record.medical_conditions}
                  </p>
                </div>
              ) : null}
            </div>
            <div className="message-btn">
              {!props.connected ? (
                <button
                  type="submit"
                  disabled={disabled2}
                  className="btn"
                  onClick={handleConnect}
                >
                  Connect
                </button>
              ) : (
                <button
                  id="DoctorStartVideo"
                  type="submit"
                  className="btn"
                  onClick={handleVideoStart}
                  disabled={disabled}
                >
                  Start Video
                </button>
              )}
            </div>
          </Fragment>
        );
      })}
      {props.exam.map((exam) => {
        let filtered =
          exam.record && exam.record.report.length !== 0
            ? exam.record.report.filter((filexam) => {
                return filexam.spec_name === exam.exam.speciality;
              })
            : null;

        return filtered !== null ? (
          <div key={filtered[0].id} className="report">
            <div className="report-details">
              <h4>Report</h4>
              <p>Doctor: {filtered[0].name}</p>
              <p>Speciality: {filtered[0].spec_name}</p>
              <p>Diagnose: {filtered[0].diagnose}</p>
              <p>Report: {filtered[0].report}</p>
              <p>Tests: {filtered[0].tests}</p>
              <p>Medication Name: {filtered[0].medication_name}</p>
              <p>
                Medication Prescribing Date:{" "}
                {filtered[0].medication_prescribing_date}
              </p>
              <p>Medication Notes: {filtered[0].medication_notes}</p>
            </div>
          </div>
        ) : null;
      })}
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
    </>
  );
};

export default Processing;
