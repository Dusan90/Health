import React, { Fragment } from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import "../../assets/client/detail-exam.scss";
import Select from "react-select";
import moment from "moment";
// import { MdReply } from "react-icons/md";
// import { FiSend } from "react-icons/fi";
// import HamburgerDiv from '../Main/HamburgerDiv'
// import EmailIcon from '../../icons/icon_Email_blue.svg'
// import attachIcon from '../../icons/attach_white.svg'


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
  handleExtendDiv,
  clearFile
}) =>{
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
    {/* <HamburgerDiv/> */}
    {exam.map((exam) => {
      let placeholder = exam.status === "Appointed" ? "Accepted" : exam.status;
      let options =
        exam.status === "Pending" || exam.status === "Accepted"
          ? [{ value: "Cancel", label: "Cancel" }]
          : [];
      return (
        <Fragment key={exam.id}>
          <div className="detail-exam">
          <div className="iconVideo">
                {/* <img src={EmailIcon} alt="email" /> */}
                <h4>Consultation details</h4>{" "}
              </div>
            <div className="detail">
              <p>
                <span>Doctor:</span> {exam.doctor}
              </p>
              <p>
                <span>Speciality:</span> {exam.speciality}
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
                    styles={customStyles}
                    onChange={handleStatus}
                  />
                </div>
              )}
            </div>
            <div className="sideMessageDetails">
              <div className="SubjectMessage">
              <div className="subjectDiv">
                  <p>
                    <span style={{fontWeight: 'bold'}}>Subject:</span> {exam.subject}
                  </p>
                  <div className='infoAndSquare' style={{display: 'flex'}}>
                  <p>
                    <span>
                      {moment(exam.created).format("MM/DD/YY HH:mm")}
                    </span>
                  </p>
                  <div id="imageDiv1" onClick={handleExtendDiv}></div>
                </div>
                </div>
                <div className="messageDiv">
                  <textarea defaultValue={exam.message} id='messageMainText' readOnly>
                     
                  </textarea>
                  {exam.attachment ? (
                             <div className='mainFileDiv'>
                             <div className='FileDiv'><p>Files:</p></div>
                             {exam.attachment && <div onClick={() => {window.open(`https://healthcarebackend.xyz${exam.attachments}`)}} className='fileForDownload'><p>{exam.attachment.substring(exam.attachment.lastIndexOf('/') + 1)}</p></div>}
                           </div>
                          ) : null}
                </div>
                <div className='reportIfDeclined' style={{display: exam.status === 'Declined' ? 'block' : 'none'}}>
                <div className="subjectDiv">
                  <p>
                    <span>Decline reason:</span>
                  </p>
                </div>
                <div className="messageDivReport"  >
                      <textarea name="text" disabled={ exam.status === 'Declined' && true} placeholder={exam.decline_notes ? exam.decline_notes : 'text'}  id="textarea"></textarea>
                </div>
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
                      <div style={{width: message.sender === props.doctor && "90%"}} key={message.id} className="Maintbody">
                        <div style={{background: message.sender === props.doctor && '#00aff0'}} className="senderMaiin">
                          <p className="senderP">
                            <span>From:</span> {message.sender}
                          </p>
                          <p className="createdP">
                            {moment(message.created)
                              .add(2, "hours")
                              .format("MM/DD/YY HH:mm")}
                          </p>
                          <div id="imageDiv"></div>
                        </div>
                        <div
                          // onClick={() => handleClick(index)}
                          className="row1"
                        >
                          <textarea id={message.id} readOnly
                           defaultValue={message.message}
                          className="message">
                      
                          </textarea>
                          {message.attachment ? (
                             <div className='mainFileDiv'>
                             <div className='FileDiv'><p>Files:</p></div>
                             {message.attachment && <div onClick={() => {window.open(`https://healthcarebackend.xyz${message.attachments}`)}} className='fileForDownload'><p>{message.attachment.substring(message.attachment.lastIndexOf('/') + 1)}</p></div>}
                           </div>
                          ) : null}
                        </div>
                        {/* {!props.replyClicked &&
                          props.lastInArray.created === message.created &&
                          props.lastInArray.sender === exam.doctor &&
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
                            <div className="SendMainDiv" style={{marginBottom: '20px'}}>
                            <div className="senderMaiin">
                        <p className="senderP">
                          <span>From:</span> {props.client}
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
                             
                              <div className="attachess">
                              <div className="upload-btn-wrapper">
                                <button className="btn">
                                  <p>Add file</p>
                                </button>
                                <input
                                  id='useForCleaning'
                                  type="file"
                                  name="myfile"
                                  onChange={onChangeHandler}
                                  multiple
                                />
                              </div>
          {props.selectedFile && <div className='fileForDownload'><p>{props.selectedFile.name.substring(props.selectedFile.name.lastIndexOf('/') + 1)}</p><a onClick={clearFile} className='deleteB'>X</a></div>}
          {/* {props.selectedFile && props.selectedFile.map(ex => <div key={ex.size} className='fileForDownload'><p >{ex.name}</p></div>)} */}

                              </div>


                            </div>
                          </div>
                          )}
              </div>
                  {
                    exam.status === "Accepted" && !props.replyClicked ? 
                      <button className="newMessage" onClick={newMessage}>
                        <h1>+</h1>
                      </button>
                 : props.replyClicked ? <button className='sendButtonForReplay' onClick={handleSubmitSend}>
                 <span>Send</span>
               </button> : null
                  }
            </div>
          </div>
        </Fragment>
      );
    })}
  </>
)}

export default Detail;
