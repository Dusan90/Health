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



import myClientProfile from "../../icons/newIconsForDesign/client_picture.svg";
import chek from "../../icons/chek.svg";
import clockIcon from "../../icons/icon_Waiting_Room_blue.svg";
import declined from "../../icons/icon_Log_Out_blue.svg";
import { GiCheckeredFlag } from "react-icons/gi";
import Loading from "../../icons/c+.svg";
import Pagination from "react-js-pagination";


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
  handlePage,
  // report,
  // saveReport,
  // handleReport
  handleClick,
  loading,
  searchByType,
  ResetonSelectChange,
  handlePageChange,
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
            {props.PageonNav === 'consultDetail' && <div className="detail_exam">
            <div className="iconVideo">
                {/* <img src={iconEmailBlue} alt="email" /> */}
                <div className="ConsulDetails" style={{borderBottom: props.PageonNav === 'consultDetail' && '4px solid #fa9551' }} onClick={() =>{handlePage('consultDetail')}}>
                <h4 style={{fontWeight: props.PageonNav === 'consultDetail' && 'bold' }}>Consultations details</h4>{" "}
                </div>
                <div className="ConsulDetails" style={{borderBottom: props.PageonNav === 'clientDetail' && '4px solid #fa9551' }} onClick={() =>{handlePage('clientDetail')}}>
                <h4 style={{fontWeight: props.PageonNav === 'clientDetail' && 'bold' }}>Client details</h4>{" "}
                </div>
                <div className="ConsulDetails" style={{borderBottom: props.PageonNav === 'clientDetailConsult' && '4px solid #fa9551' }} onClick={() =>{handlePage('clientDetailConsult')}}>
                <h4 style={{fontWeight: props.PageonNav === 'clientDetailConsult' && 'bold' }}>Client consultations</h4>{" "}
                </div>
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
                  <div className='infoAndSquare' style={{display: 'flex'}}>
                  <p>
                    <span>
                      {moment(exam.appointed_date).format("MM/DD/YY")}
                    </span>{" "}
                    {moment(exam.appointed_date).format(" HH:mm")}
                  </p>
                  <div style={{marginRight: '20px'}} onClick={handleExtendDiv} id='imageDiv1'></div>
                  </div>
                </div>
                <div className="messageDiv">
                  <textarea defaultValue= {exam.message} id='messageMainText' readOnly>
                   
                  </textarea>
                  <div className='mainFileDiv'>
                    <div className='FileDiv'><p>Files:</p></div>
                    {exam.attachment && <div onClick={() => {window.open(`https://healthcarebackend.xyz${exam.attachment}`)}} className='fileForDownload'><p>{exam.attachment.substring(exam.attachment.lastIndexOf('/') + 1)}</p></div>}
                  </div>
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
                            {message.attachment ? (
                             <div className='mainFileDiv'>
                             <div className='FileDiv'><p>Files:</p></div>
                             {message.attachment && <div onClick={() => {window.open(`https://healthcarebackend.xyz${message.attachment}`)}} className='fileForDownload'><p>{message.attachment.substring(message.attachment.lastIndexOf('/') + 1)}</p></div>}
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
                                  <div className="attachess">
                                  <div className="upload-btn-wrapper">
                                    <button className="btn">
                                      <p >Add file</p>
                                    </button>
                                    <input
                                      id='useForCleaning'
                                      type="file"
                                      name="myfile"
                                      onChange={onChangeHandler}
                                      multiple
                                    />
                                  </div>
                                  {props.selectedFile && <div className='fileForDownload'><p >{props.selectedFile.name}</p><a className='deleteB' onClick={clearFile}>X</a></div>}
          {/* {props.selectedFile && props.selectedFile.map(ex => <div key={ex.size} className='fileForDownload'><p >{ex.name}</p></div>)} */}
                                  </div>
                                

                                </div>
                              </div>
                            )}
                </div>
                    {
                    // props.correspondence.length !== 0 &&
                      (props.statusValue.value === 'Accept' || exam.status === "Accepted") && !props.replyClicked ? (
                        <button className="newMessage" onClick={newMessage}>
                          <h1>+</h1>
                        </button>
                      ) : props.replyClicked ? <button className='sendButtonForReplay' onClick={handleSubmitSend}>
                      <span>Send</span>
                    </button> : null
                  }
              </div>
              {/* { exam.status === 'Finished' ? 
                 <button
                  className="btn1"
                  onClick={handleReport}
                >
                  Report
                </button> : null} */}
            </div>}
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


















              
{props.record && props.PageonNav === 'clientDetail' &&
      props.record.map(client => {
        console.log(client);
        const splited = client.client.split(" ");
        return (
          <div key={client.id} className="mainClien">
             <div className="iconVideoo">
            <div className="ConsulDetails" style={{borderBottom: props.PageonNav === 'consultDetail' && '4px solid #fa9551' }} onClick={() =>{handlePage('consultDetail')}}>
                <h4 style={{fontWeight: props.PageonNav === 'consultDetail' && 'bold' }}>Consultations details</h4>{" "}
                </div>
                <div className="ConsulDetails" style={{borderBottom: props.PageonNav === 'clientDetail' && '4px solid #fa9551' }} onClick={() =>{handlePage('clientDetail')}}>
                <h4 style={{fontWeight: props.PageonNav === 'clientDetail' && 'bold' }}>Client details</h4>{" "}
                </div>
                <div className="ConsulDetails" style={{borderBottom: props.PageonNav === 'clientDetailConsult' && '4px solid #fa9551' }} onClick={() =>{handlePage('clientDetailConsult')}}>
                <h4 style={{fontWeight: props.PageonNav === 'clientDetailConsult' && 'bold' }}>Client consultations</h4>{" "}
                </div>
              </div>
            <div className="client">
            <img src={client.image.includes('default') ? myClientProfile : `https://healthcarebackend.xyz/media/${client.image}`} alt="cliet profile" />
              <div className="client-p">
              <p>{client.client}</p>
         <h5>Address: <span>{client.address}</span></h5>
        <h5>E-mail: <span>{client.email}</span></h5>
        <h5>Phone number: <span>{client.phone}</span></h5>
        <h5>Date of birth: <span>{client.birth_date}</span></h5>
        <h5>{client.gender === 'M' ? 'Male' : 'Female'}</h5>
              </div>
            </div>
            <div className="form">
              <div className="conditionss">
                Chronical conditions:{" "} <br/>
                <textarea
                // style={{height: `${this.scrollHeight}px`}}
                  type="text"
                  readOnly
                  className="address-input"
                  placeholder={client.chronical_conditions}
                 id='ChronicalConditions'
                />
              </div>
              <div  className="allergiess">
               Allergies:{" "}
               <textarea
                  type="text"
                  readOnly
                  className="address-input"
                  placeholder={client.allergies}
                 id='Allergies'
                />
         
              </div>
            </div>
          </div>
        );
      })}

{props.PageonNav === 'clientDetailConsult'&& loading ? (
        <img
          src={Loading}
          className="loading"
          alt="loading..."
          style={{ width: "150px" }}
        />
      ) : props.PageonNav === 'clientDetailConsult' && !loading ? (
        <div className="consultMain">
           <div className="iconVideoo">
            <div className="ConsulDetails" style={{borderBottom: props.PageonNav === 'consultDetail' && '4px solid #fa9551' }} onClick={() =>{handlePage('consultDetail')}}>
                <h4 style={{fontWeight: props.PageonNav === 'consultDetail' && 'bold' }}>Consultations details</h4>{" "}
                </div>
                <div className="ConsulDetails" style={{borderBottom: props.PageonNav === 'clientDetail' && '4px solid #fa9551' }} onClick={() =>{handlePage('clientDetail')}}>
                <h4 style={{fontWeight: props.PageonNav === 'clientDetail' && 'bold' }}>Client details</h4>{" "}
                </div>
                <div className="ConsulDetails" style={{borderBottom: props.PageonNav === 'clientDetailConsult' && '4px solid #fa9551' }} onClick={() =>{handlePage('clientDetailConsult')}}>
                <h4 style={{fontWeight: props.PageonNav === 'clientDetailConsult' && 'bold' }}>Client consultations</h4>{" "}
                </div>
              </div>
        <div className="mainTabelRecord">
          <div className="mainConsultation">
            <div className="icon_left">
              <p>Consultations</p>
            </div>
          </div>
          
          <table className="table2">
            <thead className="client-head">
              <tr className="client-row">
              
                <th className="client-subject">Subject</th>
                <th
                  className="client-type"
                  style={{ padding: props.searchClient && "0 0 30px 0" }}
                >
                  <div className="mainExamDiv">
             
                    <select
                      type="text"
                      placeholder=""
                      onClick={ResetonSelectChange}
                      onChange={searchByType}
                      defaultValue={props.searchType}
                      
                    >
                      <option value="">Type</option>
                      <option value="mail">Email</option>
                      <option value="video">Video</option>
                      <option value="queue">Waiting room</option>
                    </select>
                  </div>
                </th>
                <th className="client-date">Date</th>
                <th
                  className="client-status"
                  style={{ padding: props.searchClient && "0 0 30px 0" }}
                >
                  Status
                </th>
              </tr>
            </thead>
            {props.messageIfEmpty === "" &&
              props.paginatedExams.map((exam, index) => {
                console.log(exam);
                return (
                  <tbody key={index} className="client-body">
                    <tr
                      // data-id={exam.id}
                      className="list-group"
                      style={{ fontWeight: exam.isRead && 700 }}
                      onClick={() => handleClick(exam.id, exam.exam_type)}
                    >
                      <td className="client-subject">{exam.subject}</td>
                      <td className="client-type">{exam.exam_type}</td>
                      <td className="created">
                        {exam.created && !exam.appointed_date ? (
                          <p> {moment(exam.created).format("MM/DD/YY HH:mm")}</p>
                        ) : exam.appointed_date ? (
                          <p>
                            {" "}
                            {moment(exam.appointed_date).format(
                              "MM/DD/YY HH:mm"
                            )}
                          </p>
                        ) : null}
                      </td>
                      <td className="client-status">
                        {exam.status === "Pending" ||
                        exam.status === "In the queue" ? (
                          <img
                            src={clockIcon}
                            alt="clockIcon"
                            className="pendi"
                          />
                        ) : exam.status === "Declined" ||
                          exam.status === "Canceled" ? (
                          <img
                            src={declined}
                            alt="declined"
                            className="declined"
                          />
                        ) : exam.status === "Finished" ? (
                          <GiCheckeredFlag className="finished" />
                        ) : (
                          <img src={chek} alt="ckeck" className="check" />
                        )}
                        <h5 className="status">{exam.status}</h5>
                      </td>
                    </tr>
                  </tbody>
                );
              
              })}
          </table>
          {props.messageIfEmpty !== "" && (
            <div className="NoResultDiv">{props.messageIfEmpty}</div>
          )}
        </div>
        </div>
      ): null}

      {props.PageonNav === 'clientDetailConsult' && <div className="pagi">
           <Pagination
          activePage={props.page}
          itemsCountPerPage={10}
          totalItemsCount={props.searchedUpcomingOrPast.length === 0 ? props.exams.length : props.searchedUpcomingOrPast.length}
          pageRangeDisplayed={10}
          onChange={handlePageChange}
          itemClassLast={'lastPage'}
          hideFirstLastPages={true}

        />
      </div>}



















































          </Fragment>
        );
      })}
  </>
)}

export default Detail;
