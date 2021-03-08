import React, { Fragment } from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import "../../assets/client/detail-exam.scss";
import moment from "moment";
// import { FaMicrophoneAltSlash } from "react-icons/fa";
// import { FaMicrophoneAlt } from "react-icons/fa";
// import { FaVideoSlash } from "react-icons/fa";
// import { FaVideo } from "react-icons/fa";
// import { FaPhoneSlash } from "react-icons/fa";
// import { FaRegSquare } from "react-icons/fa";
// import { FaRocketchat } from "react-icons/fa";
// import { MdClose } from "react-icons/md";
// import { Rnd } from "react-rnd";
import Select from "react-select";
import HamburgerDiv from '../Main/HamburgerDiv'
import iconVideoBlue from "../../icons/icon_Video_Appointment_blue.svg";


const DetailVideo = ({
  exam,
  // handleCancel,
  props,
  // handleChange,
  // enableTipeing,
  // iconsMouseOut,
  // iconsMouseOver,
  // handleDragDrop,
  // handleResize,
  // showAndHideChat,
  handleStatus,
  // handleDivSize,
  // cutVideo,
  // cutMic,
  // handleVideoStart,
  statusValue,
  handleJoinRoom,
  handleExtendDiv,
  extendreport2,
  extendreport
}) => {
  // let disabled = props.doctorsVideoId ? false : true;

  const customStyles = {
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 160,
      border: "2px solid #fa9551",
      borderRadius: "10px",
      height: "33px",
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
      <HamburgerDiv/>
      {exam.map((exam) => {
        console.log(exam);
        let placeholder =
          exam.status === "Appointed" ? "Accepted" : exam.status;
        let options =
          exam.status === "Pending" || exam.status === "Appointed"
            ? [{ value: "Cancel", label: "Cancel" }]
            : [];
        return (
          <Fragment key={exam.id}>
            <div className="detail-exam">
            <div className="iconVideo">
                {/* <img src={iconVideoBlue} alt="email" /> */}
                <h4>Consultation details</h4>{" "}
              </div>
              <div className="detail">
                <p>
                  <span>Doctor:</span> {exam.doctor}
                </p>
                <p>
                  <span>Speciality:</span> {exam.speciality}
                </p>
                {exam.appointed_date ? (
                   <p>
                   <span>
                     {exam.status === "Appointed" || exam.status === 'Finished'
                       ? "Appointed date: :"
                       : "Appoint date: "}
                   </span>{" "}
                   {moment(exam.appointed_date).format("MM/DD/YY HH:mm")}
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
                {exam.status !== "Pending" ? (
                  <p>
                    <span>Status:</span> {exam.status}
                  </p>
                ) : (
                  <div
                    className="divSelectButton"
                  >
                    <Select
                      type="text"
                      placeholder={placeholder}
                      styles={customStyles}
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
                  <div className="mainMessageDiv">
                <div className="subjectDiv">
                  <p>
                    <span style={{fontWeight: 'bold'}}>Subject:</span> {exam.subject}
                  </p>
                  <div className='infoAndSquare' style={{display: 'flex'}}>
                  <p>
                    <span>
                      {moment(exam.created).format("MM/DD/YY")}
                    </span>
                  </p>
                  <div id="imageDiv1" onClick={handleExtendDiv}></div>
                </div>
                </div>
                <div className="messageDiv">
                  <textarea defaultValue={exam.notes} id='messageMainText' disabled={true}>
                    
                  </textarea>
                  {exam.attachments ? (
                             <div className='mainFileDiv'>
                             <div className='FileDiv'><p>Files:</p></div>
                             {exam.attachments && <div onClick={() => {window.location.href =`https://healthcarebackend.xyz${exam.attachments}`}} className='fileForDownload'><p>{exam.attachments.substring(exam.attachments.lastIndexOf('/') + 1)}</p></div>}
                           </div>
                          ) : null}
                </div>
              <div className='reportIfDeclined' style={{display:  exam.status !== 'Declined'  ? 'none' : 'block'}}>
                <div className="subjectDiv">
                  <p>
                    <span>Decline reason:</span>
                  </p>
                  <div onClick={extendreport2}  id='imageDiv3'></div>

                </div>
                <div className="messageDivReport"  >
                      <textarea name="text" className='reasonTextForExtend' disabled={ exam.status === 'Declined' && true} placeholder={exam.decline_notes ? exam.decline_notes : 'text'} value={props.declineReason} id="textarea"></textarea>
                </div>
                </div>


                <div className='reportIfFinished' style={{display:  exam.status !== 'Finished'  ? 'none' : 'block'}}>
                <div className="subjectDiv">
                  <p>
                    <span>Report:</span>
                  </p>
                  <div onClick={extendreport}  id='imageDiv2'></div>

                </div>
                <div className="messageDivReport"  >
                      <textarea name="text" className='reportTextForExtend' disabled={ exam.status === 'Finished' && true} placeholder={exam.report ? exam.report : 'text'} value={props.declineReason} id="textarea"></textarea>
                   {exam.report_file ? (
                             <div className='mainFileDiv'>
                             <div className='FileDiv'><p>Files:</p></div>
                             {exam.report_file && <div onClick={() => {window.open(`https://healthcarebackend.xyz${exam.report_file}`)}} className='fileForDownload'><p>{exam.report_file.substring(exam.report_file.lastIndexOf('/') + 1)}</p></div>}
                           </div>
                          ) : null}
                </div>
                </div>



              </div>
              {exam.status === "Appointed" || exam.status === "Accepted" ? (
              // <div className="message-btn">
              //   <button
              //     className="message-link"
              //     id="StartVideo"
              //     disabled={disabled}
              //     onClick={handleVideoStart}
              //   >
              //     Start Video
              //   </button>
              // </div>
              <div className="message-btn">
              <button
                className="message-link"
                id="StartVideo"
                // disabled={disabled}
                onClick={handleJoinRoom}
              >
                Join now
              </button>
            </div>
            ) : null}
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
