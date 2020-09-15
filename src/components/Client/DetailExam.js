import React, { Fragment } from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import "../../assets/client/detail-exam.scss";
import Select from "react-select";
import moment from "moment";
import { MdReply, MdAttachFile } from "react-icons/md";
import { FiSend } from "react-icons/fi";

const Detail = ({
  exam,
  props,
  handleStatus,
  statusValue,
  handleReplyClick,
  onChangeHandler,
  handleSubmitSend,
  handleMessage,
  newMessage,
}) => (
  <>
    <div className="header">
      <div>
        <Header />
        <Nav />
      </div>
    </div>
    {exam.map((exam) => {
      let placeholder = exam.status === "Appointed" ? "Accepted" : exam.status;
      let options =
        exam.status === "Pending" || exam.status === "Accepted"
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
              {exam.status !== "Pending" ? (
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
                <div className="sideSub">
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
                            {moment(message.created)
                              .add(2, "hours")
                              .format("DD-MM-YYYY HH:mm")}
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
                          props.lastInArray.sender === exam.doctor &&
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
                  {props.replyClicked && props.correspondence.length === 0 && (
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
        </Fragment>
      );
    })}
  </>
);

export default Detail;
