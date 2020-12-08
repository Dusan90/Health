import React, { Fragment } from "react";
import "../../assets/processingWaitingRoom.scss";
// import moment from "moment";
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
import iconWaitingBlue from '../../icons/icon_Waiting_Room_blue.svg'
import iconVideoBlue from '../../icons/icon_Video_Appointment_blue.svg'
import moment from 'moment'
import mute from '../../icons/videoIcons/mute.svg'
import unmute from '../../icons/videoIcons/unmute.svg'
import hangup from '../../icons/videoIcons/hang-up.svg'
// import call from '../../icons/videoIcons/call.svg'
import cameraoff from '../../icons/videoIcons/camera-off.svg'
import cameraon from '../../icons/videoIcons/camera-on.svg'
import ExtendScreen from '../../icons/videoIcons/Extend-screen.svg'

const Processing = ({
  handleConnect,
  handleVideoStart,
  props,
  handleChange,
  handleStatus,
  enableTipeing,
  iconsMouseOut,
  iconsMouseOver,
  handleDragDrop,
  handleResize,
  showAndHideChat,
  handleDivSize,
  resetValue,
  cutVideo,
  cutMic,
  showExtendScreenIcon,
  extendScr,
  declineReason,
  saveReason,
  report,
  saveReport, 
  handleReport
}) => {
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
      {props.exam.map((exam) => {
        console.log(exam)
        let disabled2 =
          props.connected && exam.exam.status === "Accepted" ? false : true;
        let placeholder =
          exam.exam.status === "In the queue" ? "Pending" : props.clientStatus;
        let options =
          exam.exam.status !== "Accepted"
            ? [
                { value: "Accept", label: "Accept" },
                { value: "Decline", label: "Decline" },
              ]
            : [{ value: "Finish", label: "Finish" }];
        return (
          <Fragment key={exam.exam.id}>
            <div className="detailExam"  style={{
          display: !props.startVideo ? "block" : "none",
          padding: '40px 15px'
        }}>
            <div className="iconVideoo">
                <img src={iconWaitingBlue} alt="email" />
                <p>Consultation details</p>{" "}
              </div>
              <div className="detail">
                <div className='detailInfo'>
                <p className='ClientP'>
                  <span>Client:</span> {exam.exam.client}
                </p>
                <p>
      <span>Created: {" "}</span> 
                      {moment(exam.exam.appointed_date).format("MM/DD/YY ")}

        
                </p>
                <p className='TypeP'>
                  <span>Type:</span> {exam.exam.exam_type}
                </p>
                {exam.exam.status === "Canceled" ||
                exam.exam.status === "Finished" ||
                exam.exam.status === "Declined" ? (
                  <p>
                    <span>Status:</span> {exam.exam.status}
                  </p>
                ) : (
                  <div className="divSelectButton">
                    <Select
                      type="text"
                      placeholder={placeholder}
                      className="select-option"
                      value={props.statusValue}
                      styles={customStyles}
                      options={options}
                      onChange={handleStatus}
                      isDisabled={
                        exam.exam.status !== "Accepted" &&
                        exam.exam.status !== "In the queue"
                          ? true
                          : false
                      }
                    />
                  </div>
                  
                )}
                
                </div>
                <div className="mainMessageDiv">
                <div className="subjectDiv">
                  <p>
                    <span>Subject:</span> {exam.exam.subject}
                  </p>
                  <p>
                    <span>
                      {moment(exam.exam.created).format("MM/DD/YY")}
                    </span>{" "}
                  </p>
                </div>
                <div className="messageDiv">
                  <textarea defaultValue= {exam.exam.notes} id='messageMainText' disabled={true}>
                  
                  </textarea>



                </div>
                  <div className='reportIfDeclined' style={{display: exam.exam.status === 'Declined' ? 'block' : 'none' &&  props.selectedStatus !== 'Decline' ? 'none' : 'block'}}>
                <div className="subjectDiv">
                  <p>
                    <span>Decline reason:</span>
                  </p>
                </div>
                <div className="messageDivReport"  >
                      <textarea name="text" disabled={ exam.exam.status === 'Declined' && true} placeholder={exam.exam.decline_notes ? exam.exam.decline_notes : 'text'} value={props.declineReason} onChange={declineReason} id="textarea"></textarea>
                      <button style={{display:  exam.exam.status === 'Declined' && 'none'}} onClick={saveReason}>Save</button>
                </div>
                </div>
                <div className='reportIfFinished' style={{display: !props.displayReport && 'none'}}>
                <div className="subjectDiv">
                  <p>
                    <span>Report:</span>
                  </p>
                </div>
                <div className="messageDivReport"  >
                      <textarea name="text" 
                      // disabled={ exam.status === 'Finished' && true} 
                      placeholder={exam.exam.report ? exam.exam.report : 'Add report'} 
                      // value={props.report} 
                      onFocus={ (e) => {e.target.value = exam.exam.report}}
                      onBlur={ (e) => {e.target.value = ''}}
                      onChange={report} id="textarea"></textarea>
                      <button 
                      // style={{display:  exam.exam.status === 'Finished' && 'none'}} 
                      onClick={saveReport} type='submit'>Save</button>
                </div>
                </div>
                
              </div>
              </div>
              {/* {exam.record ? (
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
              ) : null} */}
                  <div className="message-btn">
              {exam.exam.status === "Accepted" &&
              !props.connectedall &&
              !props.connected ? (
                <h3 style={{ color: "#666666" }}>Connecting...</h3>
              ) : (
                exam.exam.status === "Canceled" && (
                  <h3 style={{ color: "#666666" }}>Reject-Connection</h3>
                )
              )}
              {exam.exam.status !== 'Finished' && <button
                id="DoctorStartVideo"
                type="submit"
                className="btn"
                onClick={handleVideoStart}
                disabled={disabled2}
              >
                Start Video
              </button>
            }
            </div>
            { exam.exam.status === 'Finished' ? 
                 <button
                  className="btn1"
                  onClick={handleReport}
                >
                  Report
                </button> : null}
            </div>



            <div className="detailExam"  style={{
          display: props.startVideo ? "block" : "none",
          padding: "0px 15px",
          height: '550px',
          marginBottom: '20px'
        }}>
            <div className="iconVideoo">
                <img src={iconVideoBlue} alt="email" />
                <p>Video call</p>{" "}
              </div>
              <div className="detail2">
                <div className='detailInfo2' id='detailInfo2'>
                <p className='ClientP'>
                  <span>Client:</span> {exam.exam.client}
                </p> 
                <div className="MainIconsDiv">
                  <img src={mute}
                    className="iconMic"
                  alt="img" style={{ display: props.audio ? "none" : "block" }}
                onClick={cutMic}/>
                  <img src={unmute}
                   className="iconMicUnmute"
                  alt="img" style={{ display: !props.audio ? "none" : "block" }}
                onClick={cutMic}/>
                  {/* <img src={call} alt="img" style={{display: 'none' }}/> */}
                  <img src={hangup} alt="img" className="iconPhone"/>
                  <img src={cameraoff}
                  className="iconVideo"
                   alt="img" style={{ display: props.video ? "none" : "block" }}
                onClick={cutVideo}/>
                  <img src={cameraon} alt="img" 
                className="iconVideoShow"
                style={{ display: !props.video ? "none" : "block" }}
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
              <textarea
                type="text"
                placeholder="Type a message"
                id="yourMessage"
                value={props.value}
                onChange={handleChange}
                onMouseDown={enableTipeing}
              ></textarea>
            </div>
          </form>
                  </div>  
              <button id="send" onClick={resetValue}>Send</button>

                </div>
                <div id='videoChat' onMouseEnter={showExtendScreenIcon} onMouseLeave={showExtendScreenIcon}>
                {/* <div id='videoo' >nesto tamo</div> */}
                  <img src={ExtendScreen} onClick={extendScr} style={{display: !props.showExtendScreen && 'none'}} className="extendScreen" alt="screen icon"/>
                </div>

           
              </div>
       
            </div>
{/*         
            <div className="recordsDetail">
              <h4>Report</h4>

              <div className="report">
                {props.exam !== 0 &&
                  props.exam.map((exam) => {
                    return exam.record && exam.record.report.length !== 0
                      ? exam.record.report.map((filexam) => {
                          return (
                            <div key={filexam.id} className="report-details">
                              <p>
                                <span>Doctor:</span> {filexam.name}
                              </p>
                              <p>
                                <span>Speciality:</span> {filexam.spec_name}
                              </p>
                              <p>
                                <span>Diagnose:</span> {filexam.diagnose}
                              </p>
                              <p>
                                <span>Report:</span> {filexam.report}
                              </p>
                              <p>
                                <span>Tests:</span> {filexam.tests}
                              </p>
                              <p>
                                <span>Medication Name:</span>{" "}
                                {filexam.medication_name}
                              </p>
                              <p>
                                <span>Prescribing Date:</span>{" "}
                                {filexam.medication_prescribing_date}
                              </p>
                              <p>
                                <span>Medication Notes:</span>{" "}
                                {filexam.medication_notes}
                              </p>
                            </div>
                          );
                        })
                      : null;
                  })}
              </div>
            </div> */}
          </Fragment>
        );
      })}

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
        style={{
          display: props.startVideo ? "block" : "none",
        }}
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

export default Processing;
