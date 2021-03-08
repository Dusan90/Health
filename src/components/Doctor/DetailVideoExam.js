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



import myClientProfile from "../../icons/newIconsForDesign/client_picture.svg";
import chek from "../../icons/chek.svg";
import clockIcon from "../../icons/icon_Waiting_Room_blue.svg";
import declined from "../../icons/icon_Log_Out_blue.svg";
import { GiCheckeredFlag } from "react-icons/gi";
import Loading from "../../icons/c+.svg";
import Pagination from "react-js-pagination";


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
  onChangeHandler,
  handlePage,
  clearFile,
  handleClick,
  loading,
  searchByType,
  ResetonSelectChange,
  handlePageChange,
  handleExtendDiv,
  extendreport,
  extendreport2

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
            {props.PageonNav === 'consultDetail' && <div className="detail_exam">
              <div className="iconVideo">
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
                  <textarea defaultValue={exam.notes} id='messageMainText' disabled={true}>
                   
                  </textarea>
                  <div className='mainFileDiv'>
                    <div className='FileDiv'><p>Files:</p></div>
                    {exam.attachments && <div onClick={() => {window.open(`https://healthcarebackend.xyz${exam.attachments}`)}} className='fileForDownload'><p>{exam.attachments.substring(exam.attachments.lastIndexOf('/') + 1)}</p></div>}
                  </div>
                </div>
                <div className='reportIfDeclined' style={{display: exam.status === 'Declined' ? 'block' : 'none' &&  props.selectedStatus !== 'Decline' ? 'none' : 'block'}}>
                <div className="subjectDiv">
                  <p>
                    <span>Decline reason:</span>
                  </p>
                  <div onClick={extendreport2}  id='imageDiv3'></div>
                </div>
                <div className="messageDivReport"  >
                      <textarea name="text" className='reasonTextForExtend' disabled={ exam.status === 'Declined' && true} placeholder={exam.decline_notes ? exam.decline_notes : 'text'} value={props.declineReason} onChange={declineReason} id="textarea"></textarea>
                </div>
                      <button style={{display:  exam.status === 'Declined' && 'none'}} onClick={saveReason}>Save</button>
                </div>

                <div className='reportIfFinished' style={{display: exam.status !== "Finished" && 'none'}}>
                <div className="subjectDiv">
                  <p>
                    <span style={{fontWeight: 'bold'}}>Report:</span>
                  </p>
                  <div onClick={extendreport}  id='imageDiv2'></div>
                </div>
                <div className="messageDivReport"  >
                      <textarea name="text" 
                      // disabled={ exam.status === 'Finished' && true} 
                      placeholder={exam.report ? exam.report : 'Add report'} 
                      // value={props.report} 
                      onFocus={ (e) => handleshowSave(e, exam.report)}
                      onBlur={ (e) => {e.target.value = ''}}
                      onChange={report} id="textarea" className='reportTextForExtend'></textarea>
                {/* <div className="sendbuttonAndAtt">

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
                                  multiple
                                />
                              </div>
                    {props.selectedFile && <div style={{marginRight: '10px'}} className='fileForDownload'><p>{props.selectedFile.name.substring(props.selectedFile.name.lastIndexOf('/') + 1)}</p></div>}
                    {exam.report_file && <div onClick={() => {window.location.href =`https://healthcarebackend.xyz${exam.report_file}`}} className='fileForDownload'><p>{exam.report_file.substring(exam.report_file.lastIndexOf('/') + 1)}</p></div>}

                </div> */}

                <div className="sendbuttonAndAtt">
                
                                  <div className="attachess">
                                  <div className="upload-btn-wrapper" style={{display: !props.showSaveButton && "none"}}>
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
                                  {props.selectedFile && <div style={{marginRight: '10px'}} className='fileForDownload'><p>{props.selectedFile.name.substring(props.selectedFile.name.lastIndexOf('/') + 1)}</p><a className='deleteB' onClick={clearFile}>X</a></div>}
                    {exam.report_file && <div onClick={() => {window.open(`https://healthcarebackend.xyz${exam.report_file}`)}} className='fileForDownload'><p>{exam.report_file.substring(exam.report_file.lastIndexOf('/') + 1)}</p></div>}
                                  {/* {props.selectedFile && <div className='fileForDownload'><p >{props.selectedFile.name}</p></div>} */}
          {/* {props.selectedFile && props.selectedFile.map(ex => <div key={ex.size} className='fileForDownload'><p >{ex.name}</p></div>)} */}
                                  </div>
                                

                                </div>
                </div>
                </div>
                <button 
                      // style={{display:  exam.status === 'Finished' && 'none'}} 
                      onClick={saveReport} className='btnForReport' style={{display: !props.showSaveButton && "none"}} type='submit'>Save</button>
              </div>
            </div>}
























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
