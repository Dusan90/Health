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
    background: 'white'
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
                <p>Email details</p>{" "}
              </div>
              <div className="detail">
                <p>
                  <span>Client:</span> {exam.client}
                </p>
                <p>
                  <span>Created:</span>{" "}
                  {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  }).format(new Date(exam.created))}
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
                    <span>Subject:</span> {exam.subject}
                  </p>
                  <p>
                    <span>
                      {moment(exam.appointed_date).format("MM/DD/YYY")}
                    </span>{" "}
                    {moment(exam.appointed_date).format(" HH:mm")}
                  </p>
                </div>
                <div className="messageDiv">
                  <textarea defaultValue= {exam.message} disabled={true}>
                   
                  </textarea>
                </div>
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
                                .add(2, "hours")
                                .format("DD-MM-YYYY HH:mm")}
                            </p>
                          </div>
                          <div
                            // onClick={() => handleClick(index)}
                            className="row1"
                          >
                            <textarea  id={message.id} defaultValue={message.message} className="message">
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
                          {props.replyClicked &&
                            props.lastInArray.created === message.created && (
                              <div className="SendMainDiv">
                                <div style={{background: '#00aff0'}} className="senderMaiin">
                            <p className="senderP">
                              <span>From:</span> {message.sender}
                            </p>
                            <p className="createdP">
                              {moment(message.created)
                                .add(2, "hours")
                                .format("DD-MM-YYYY HH:mm")}
                            </p>
                          </div>
                                <textarea
                                  type="text"
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
                      );
                    })}
                    {props.replyClicked && props.correspondence.length === 0 ? (
                      <div className="SendMainDiv">
                      <div className="senderMaiin">
                  <p className="senderP">
                    <span>From:</span> {props.client}
                  </p>
                
                </div>
                      <textarea
                        type="text"
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
                    ) 
                    // : props.correspondence.length === 0 ? (
                    //   <div className="ReplyMainDiv">
                    //     <button
                    //       disabled={exam.status === "Pending" && true}
                    //       style={{
                    //         display:
                    //           exam.status !== "Accepted" &&
                    //           exam.status !== "Pending" &&
                    //           "none",
                    //       }}
                    //       onClick={handleReplyClick}
                    //     >
                    //       <MdReply className="replyIcon" />
                    //       <span>Reply</span>
                    //     </button>
                    //   </div>
                    // )
                     : null}
                    {
                    // props.correspondence.length !== 0 &&
                      exam.status === "Accepted" && (
                        <button className="newMessage" onClick={newMessage}>
                          <h1>+</h1>
                        </button>
                      )}
                  </div>
                </div>
              </div>
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
