import React, { Fragment } from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import Select from "react-select";
import "../../assets/detail_exam.scss";
import moment from "moment";
import { MdReply, MdAttachFile } from "react-icons/md";
import { FiSend } from "react-icons/fi";

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
}) => (
  <>
    <div className="header">
      <div>
        <Header />
        <Nav />
      </div>
    </div>

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
                {exam.status === "Canceled" || exam.status === "Finished" ? (
                  <p>
                    <span>Status:</span> {exam.status}
                  </p>
                ) : (
                  <div className="divSelectButton">
                    <Select
                      type="text"
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
                  <div>
                    <p>
                      <span>Subject:</span> {exam.subject}
                    </p>
                    <p>
                      <span>Message:</span> {exam.message}
                    </p>
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
                        <div key={message.id} className="Maintbody">
                          <div className="senderMaiin">
                            <p className="senderP">
                              <span>From:</span> {message.sender}
                            </p>
                            <p className="createdP">
                              {moment(message.created).format(
                                "DD-MM-YYYY HH:mm"
                              )}
                            </p>
                          </div>
                          <div
                            // onClick={() => handleClick(index)}
                            className="row1"
                          >
                            <p id={message.id} className="message">
                              <span>Message:</span> {message.message}{" "}
                            </p>
                            {message.attachments ? (
                              <div className="attachments">
                                <p className="att">
                                  Attachments: {message.attachments}
                                </p>
                              </div>
                            ) : null}
                          </div>
                          {!props.replyClicked &&
                            props.lastInArray.created === message.created &&
                            props.lastInArray.sender === exam.client &&
                            exam.status === "Accepted" && (
                              <div className="ReplyMainDiv">
                                <button onClick={handleReplyClick}>
                                  <MdReply className="replyIcon" />
                                  <span>Reply</span>
                                </button>
                              </div>
                            )}
                          {props.replyClicked &&
                            props.lastInArray.created === message.created && (
                              <div className="SendMainDiv">
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
                                      <MdAttachFile />
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
                              <MdAttachFile />
                            </button>
                            <input
                              type="file"
                              name="myfile"
                              onChange={onChangeHandler}
                            />
                          </div>
                        </div>
                      </div>
                    ) : props.correspondence.length === 0 ? (
                      <div className="ReplyMainDiv">
                        <button
                          disabled={exam.status === "Pending" && true}
                          style={{
                            display:
                              exam.status !== "Accepted" &&
                              exam.status !== "Pending" &&
                              "none",
                          }}
                          onClick={handleReplyClick}
                        >
                          <MdReply className="replyIcon" />
                          <span>Reply</span>
                        </button>
                      </div>
                    ) : null}
                    {props.correspondence.length !== 0 &&
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
);

export default Detail;
