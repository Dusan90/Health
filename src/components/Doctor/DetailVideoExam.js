import React, { Fragment } from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import Select from "react-select";
import "../../assets/detail_exam.scss";
import moment from "moment";
import iconVideoBlue from "../../icons/icon_Video_Appointment_blue.svg";

// import { FaMicrophoneAltSlash } from "react-icons/fa";
// import { FaMicrophoneAlt } from "react-icons/fa";
// import { FaVideoSlash } from "react-icons/fa";
// import { FaVideo } from "react-icons/fa";
// import { FaPhoneSlash } from "react-icons/fa";
// import { FaRegSquare } from "react-icons/fa";
// import { FaRocketchat } from "react-icons/fa";
// import { MdClose } from "react-icons/md";
// import { Rnd } from "react-rnd";
import { HamburgerDiv } from "../Main/HamburgerDiv";
import attachIcon from '../../icons/attach_white.svg'


const DetailVideo = ({
  exam,
  handleStatus,
  statusValue,
  // submitValue,
  // handleSubmit,
  // handleConnect,
  // handleVideoStart,
  props,
  // iconsMouseOut,
  // iconsMouseOver,
  // handleDragDrop,
  // handleResize,
  // showAndHideChat,
  // handleDivSize,
  // cutVideo,
  // cutMic,
  // handleChange,
  // enableTipeing,
  declineReason,
  saveReason,
  saveReport,
  // handleReport,
  report,
  handleJoinRoom,
  handleshowSave,
  onChangeHandler
}) => {
  // let disabled = props.clientsVideoId === "null" ? true : false;
  let examDate =
    props.exam.length !== 0 ? new Date(props.exam[0].appointed_date) : null;
  let disabled2 =
    moment(new Date()).format("YYYY-MM-DD HH:mm") >
      moment(examDate).subtract(15, "minutes").format("YYYY-MM-DD HH:mm") &&
    moment(new Date()).format("YYYY-MM-DD HH:mm") <
      moment(examDate).add(30, "minutes").format("YYYY-MM-DD HH:mm")
    //    &&
    // props.connectedall
      ? false
      : true;

  const customStyles = {
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 200,
      border: "2px solid #fa9551",
      borderRadius: "10px",
      height: "40px",
      fontWeight: 600,
      display: "flex",
    }),
  };
  return (
    <>
      <div className="header">
        <div>
          <Header />
          <Nav />
        </div>
      </div>
      <HamburgerDiv />

      {exam.map((exam) => {
        let placeholder =
          exam.status === "Appointed" ? "Accepted" : exam.status;
        let options =
          exam.status !== "Appointed"
            ? [
                { value: "Accept", label: "Accept" },
                { value: "Decline", label: "Decline" },
              ]
            : [{ value: "Finish", label: "Finish" }];
        return (
          <Fragment key={exam.id}>
            <div className="detail_exam">
              <div className="iconVideo">
                <img src={iconVideoBlue} alt="email" />
                <p>Consultation details</p>{" "}
              </div>
              <div className="detail">
                <p>
                  <span>Client:</span> {exam.client}
                </p>
                <p>
                  <span>Created:</span>{" "}
                  {moment(exam.created).format("MM/DD/YY HH:mm")}
                </p>

                <p>
                  <span>
                    {exam.status === "Appointed"
                      ? "Appointed date:"
                      : "Appoint date"}
                  </span>{" "}
                  {moment(exam.appointed_date).format("MM/DD/YY HH:mm")}
                </p>
                <p>
                  <span>Type:</span> {exam.exam_type}
                </p>

                {exam.status === "Canceled" || exam.status === "Finished" || exam.status === 'Declined' ? (
                  <p>
                    <span>Status:</span> {exam.status}
                  </p>
                ) : (
                  <div className="divSelectButton" style={{ display: "flex" }}>
                    <Select
                      type="text"
                      placeholder={placeholder}
                      styles={customStyles}
                      className="select-option"
                      value={statusValue}
                      options={options}
                      onChange={handleStatus}
                    />
                  </div>
                )}
                {exam.status === "Appointed" ? (
                  <div className="message-btn">
                    {/* {!props.connected ? (
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
                    )} */}
                       <button
                        className="message-link"
                        // disabled={disabled2}
                        onClick={handleJoinRoom}
                      >
                        Join now
                      </button>
                  </div>
                ) 
              //   : exam.status === 'Finished' ? 
              //   <div className="message-btn">
              //      <button
              //       className="message-link"
              //       onClick={handleReport}
              //     >
              //       Report
              //     </button>
              // </div>
               : null
              
              
              }
              </div>
              <div className="mainMessageDiv">
                <div className="subjectDiv">
                  <p>
                    <span style={{fontWeight: 'bold'}}>Subject:</span> {exam.subject}
                  </p>
                  <p>
                    <span>
                      {moment(exam.appointed_date).format("MM/DD/YY")}
                    </span>{" "}
                    {moment(exam.appointed_date).format(" HH:mm")}
                  </p>
                </div>
                <div className="messageDiv">
                  <textarea defaultValue={exam.notes} id='messageMainText' disabled={true}>
                   
                  </textarea>
                </div>
                <div className='reportIfDeclined' style={{display: exam.status === 'Declined' ? 'block' : 'none' &&  props.selectedStatus !== 'Decline' ? 'none' : 'block'}}>
                <div className="subjectDiv">
                  <p>
                    <span>Decline reason:</span>
                  </p>
                </div>
                <div className="messageDivReport"  >
                      <textarea name="text" disabled={ exam.status === 'Declined' && true} placeholder={exam.decline_notes ? exam.decline_notes : 'text'} value={props.declineReason} onChange={declineReason} id="textarea"></textarea>
                </div>
                      <button style={{display:  exam.status === 'Declined' && 'none'}} onClick={saveReason}>Save</button>
                </div>

                <div className='reportIfFinished' style={{display: !exam.status === "Finished" && 'none'}}>
                <div className="subjectDiv">
                  <p>
                    <span style={{fontWeight: 'bold'}}>Report:</span>
                  </p>
                </div>
                <div className="messageDivReport"  >
                      <textarea name="text" 
                      // disabled={ exam.status === 'Finished' && true} 
                      placeholder={exam.report ? exam.report : 'Add report'} 
                      // value={props.report} 
                      onFocus={ (e) => handleshowSave(e, exam.report)}
                      onBlur={ (e) => {e.target.value = ''}}
                      onChange={report} id="textarea"></textarea>
                </div>
                <div className="sendbuttonAndAtt">

                      <button 
                      // style={{display:  exam.status === 'Finished' && 'none'}} 
                      onClick={saveReport} style={{display: !props.showSaveButton && "none"}} type='submit'>Save</button>
                       <div className="upload-btn-wrapper" style={{display: !props.showSaveButton && "none"}}>
                                <button className="btn">
                                  <img src={attachIcon} alt="" />
                                </button>
                                <input
                                  type="file"
                                  name="myfile"
                                  onChange={onChangeHandler}
                                />
                              </div>
                </div>
                </div>

              </div>
            </div>
          </Fragment>
        );
      })}
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
    </>
  );
};

export default DetailVideo;
