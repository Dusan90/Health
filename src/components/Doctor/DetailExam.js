import React, { Fragment } from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import Select from "react-select";
import "../../assets/detail_exam.scss";
import moment from "moment";
import { MdReply } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { HamburgerDiv } from "../Main/HamburgerDiv";
import iconEmailBlue from '../../icons/icon_Email_blue.svg'
import attachIcon from '../../icons/attach_white.svg'

const Detail = ({
  exam,
  handleStatus,
  statusValue,
  handleReplyClick,
  onChangeHandler,
  handleSubmitSend,
  handleMessage,
  newMessage,
  props,
  declineReason,
  saveReason,
  // report,
  // saveReport,
  // handleReport
}) =>{
  const customStyles = {
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 200,
    border: "2px solid #fa9551",
    borderRadius: "10px",
    height: "40px",
    fontWeight: 600,
    display: "flex",
    background: 'transparent'
  })
} 
return (
  <>
    <div className="header">
      <div>
        <Header />
        <Nav />
      </div>
    </div>
    <HamburgerDiv/>
    {exam &&
      exam.map((exam) => {
        let placeholder =
          exam.status === "Appointed" ? "Accepted" : exam.status;
        let options =
          exam.status !== "Accepted"
            ? [
                { value: "Accept", label: "Accept" },
                { value: "Decline", label: "Decline" },
              ]
            : [{ value: "Finish", label: "Finish" }];
        return (
          <Fragment key={exam.id}>
            <div className="detail_exam">
            <div className="iconVideo">
                <img src={iconEmailBlue} alt="email" />
                <p>Consultation details</p>{" "}
              </div>
              <div className="detail">
                <p>
                  <span>Client:</span> {exam.client}
                </p>
                <p>
                  <span>Created:</span>{" "}
                   {moment(exam.created)
                                .add(1, "hours")
                                .format("MM/DD/YY HH:mm")}
                </p>
                <p>
                  <span>Type:</span> {exam.exam_type}
                </p>
                {exam.status === "Canceled" || exam.status === "Finished" || exam.status === 'Declined' ? (
                  <p>
                    <span>Status:</span> {exam.status}
                  </p>
                ) : (
                  <div className="divSelectButton">
                    <Select
                      type="text"
                      styles={customStyles}
                      placeholder={placeholder}
                      className="select-option"
                      value={statusValue}
                      options={options}
                      onChange={handleStatus}
                    />
                  </div>
                )}
              </div>
              <div className="sideMessageDetails">
                <div className="SubjectMessage">
                  {/* <div className="sideSub">
                    <p className='subjectTag'>
                      <span>Subject:{' '} </span>{exam.subject}
                    </p>
                    <p className='messageTag'>
                      <span>Message:</span> {exam.message}
                    </p>
                  </div> */}
                  <div className="sideSub">
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
                  <textarea defaultValue= {exam.message} id='messageMainText' readOnly>
                   
                  </textarea>
                </div>
                  <div className=''></div>
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
                {/* <div className='reportIfFinished' style={{display: !props.displayReport && 'none'}}>
                <div className="subjectDiv">
                  <p>
                    <span>Report:</span>
                  </p>
                </div>
                <div className="messageDivReport"  >
                      <textarea name="text" 
                      // disabled={ exam.status === 'Finished' && true} 
                      placeholder={exam.report ? exam.report : 'Add report'} 
                      // value={props.report} 
                      onFocus={ (e) => {e.target.value = exam.report}}
                      onBlur={ (e) => {e.target.value = ''}}
                      onChange={report} id="textarea"></textarea>
                </div>
                      <button 
                      // style={{display:  exam.exam.status === 'Finished' && 'none'}} 
                      onClick={saveReport} type='submit'>Save</button>
                </div> */}
                </div>
                
                  


                <div
                  className="mainMessageCorrespondence"
                  style={{
                    overflow: props.correspondence.length === 0 && "hidden",
                  }}
                >
                  <div className="MessageCorrespondence">
                    {props.correspondence.map((message, index) => {
                      return (
                        <div key={message.id} style={{width: message.sender === props.doctor && "90%"}} className="Maintbody">
                          <div style={{background: message.sender === props.doctor && '#00aff0'}} className="senderMaiin">
                            <p className="senderP">
                              <span>From:</span> {message.sender}
                            </p>
                            <p className="createdP">
                              {moment(message.created)
                                .add(1, "hours")
                                .format("MM/DD/YY HH:mm")}
                            </p>
                            <div id="imageDiv"></div>
                          </div>
                          <div
                            // onClick={() => handleClick(index)}
                            className="row1"
                          >
                            <textarea  id={message.id} defaultValue={message.message} readOnly className="message">
                            </textarea>
                            {message.attachments ? (
                              <div className="attachments">
                                <p className="att">
                                  Attachments: {message.attachments}
                                </p>
                              </div>
                            ) : null}
                          </div>
                          {/* {!props.replyClicked &&
                            props.lastInArray.created === message.created &&
                            props.lastInArray.sender === exam.client &&
                            exam.status === "Accepted" && (
                              <div className="ReplyMainDiv">
                                <button onClick={handleReplyClick}>
                                  <MdReply className="replyIcon" />
                                  <span>Reply</span>
                                </button>
                              </div>
                            )} */}
                         
                        </div>
                      );
                    })}
                  </div>
                  {props.replyClicked && (
                              <div className="SendMainDiv" style={{marginBottom: '20px'}} >
                                <div style={{background: '#00aff0'}} className="senderMaiin">
                                <p className="senderP">
                          <span>From:</span> {props.doctor}
                        </p>
                            <p className="createdP">
                              {moment(new Date())
                                .format("MM/DD/YY HH:mm")}
                            </p>
                          </div>
                                <textarea
                                  type="text"
                                  className='messageTextInput'
                                  placeholder="Message..."
                                  onChange={handleMessage}
                                  value={props.messageValue}
                                ></textarea>
                                <div className="sendbuttonAndAtt">
                                  <button onClick={handleSubmitSend}>
                                    <FiSend className="replyIcon" />
                                    <span>Send</span>
                                  </button>
                                  <div className="upload-btn-wrapper">
                                    <button className="btn">
                                      <img src={attachIcon} alt=""/>
                                    </button>
                                    <input
                                      type="file"
                                      name="myfile"
                                      onChange={onChangeHandler}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                </div>
                    {
                    // props.correspondence.length !== 0 &&
                      exam.status === "Accepted" && (
                        <button className="newMessage" onClick={newMessage}>
                          <h1>+</h1>
                        </button>
                      )}
              </div>
              {/* { exam.status === 'Finished' ? 
                 <button
                  className="btn1"
                  onClick={handleReport}
                >
                  Report
                </button> : null} */}
            </div>
            {/* {exam.status === "Accepted" && (
              <div className="message-btn">
                <button className="messages-link" onClick={handleLink}>
                  Message history
                </button>
                <button className="message-link" onClick={handleLinkMessage}>
                  Message
                </button>
              </div>
            )} */}
          </Fragment>
        );
      })}
  </>
)}

export default Detail;
