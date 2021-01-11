import React, { Fragment } from "react";
import "../../assets/processingWaitingRoom.scss";
// import { Rnd } from "react-rnd";
import Select from "react-select";
import iconWaitingBlue from '../../icons/icon_Waiting_Room_blue.svg'
import iconVideoBlue from '../../icons/icon_Video_Appointment_blue.svg'
import moment from 'moment'
import mute from '../../icons/videoIcons/mute.svg'
import unmute from '../../icons/videoIcons/unmute.svg'
import hangup from '../../icons/videoIcons/hang-up.svg'
import cameraoff from '../../icons/videoIcons/camera-off.svg'
import cameraon from '../../icons/videoIcons/camera-on.svg'
import ExtendScreen from '../../icons/videoIcons/Extend-screen.svg'
import attachIcon from '../../icons/attach_white.svg'


import myClientProfile from "../../icons/newIconsForDesign/client_picture.svg";
import messageSend from '../../icons/newIconsForDesign/massage.svg'
import chek from "../../icons/chek.svg";
import clockIcon from "../../icons/icon_Waiting_Room_blue.svg";
import declined from "../../icons/icon_Log_Out_blue.svg";
import { GiCheckeredFlag } from "react-icons/gi";
import Loading from "../../icons/c+.svg";
import Pagination from "react-js-pagination";

import { FaFileDownload } from "react-icons/fa";


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
  // handleReport,
  handleKeyPress,
  handleshowSave,
  onChangeHandler,
  handlePage,


  record,
  handleClick,
  loading,
  searchByType,
  ResetonSelectChange,
  handlePageChange,
  redirectThis
}) => {
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
          <Fragment key={exam.exam.id} >
             {props.PageonNav === 'consultDetail' && <div className="detailExam"  style={{
          display: !props.startVideo ? "block" : "none",
          padding: '40px 15px'
        }}>
            <div className="iconVideoo">
            <div className="ConsulDetails" style={{borderBottom: props.PageonNav === 'consultDetail' && '4px solid #fa9551' }} onClick={() =>{handlePage('consultDetail')}}>
                <h4 style={{fontWeight: props.PageonNav === 'consultDetail' && 'bold' }}>Consultations details</h4>{" "}
                </div>
                <div className="ConsulDetails" style={{borderBottom: props.PageonNav === 'clientDetail' && '4px solid #fa9551' }} onClick={() =>{handlePage('clientDetail')}}>
                <h4 style={{fontWeight: props.PageonNav === 'clientDetail' && 'bold' }}>Client details</h4>{" "}
                </div>
              </div>
               <div className="detail">
                <div className='detailInfo'>
                <p className='ClientP'>
                  <span>Client:</span> {exam.exam.client}
                </p>
                <p>
      <span>Created: {" "}</span> 
                      {moment(exam.exam.created).add(1, 'hours').format("MM/DD/YY HH:mm")}

        
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
                    <span style={{fontWeight: 'bold'}}>Subject:</span> {exam.exam.subject}
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
                  <div className='mainFileDiv'>
                    <div className='FileDiv'><p>Files</p></div>
                    {exam.exam.attachments && <div onClick={() => {window.location.href =`https://healthcarebackend.xyz${exam.exam.attachments}`}} className='fileForDownload'><FaFileDownload/><p>{exam.exam.attachments.substring(exam.exam.attachments.lastIndexOf('/') + 1)}</p></div>}
                  </div>


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
                <div className='reportIfFinished' style={{display: exam.exam.status !== "Finished" && 'none'}}>
                <div className="subjectDiv">
                  <p>
                    <span style={{fontWeight: 'bold'}}>Report:</span>
                  </p>
                </div>
                <div className="messageDivReport"  >
                      <textarea name="text" 
                      // disabled={ exam.status === 'Finished' && true} 
                      placeholder={exam.exam.report ? exam.exam.report : 'Add report'} 
                      // value={props.report} 
                      onFocus={ (e) => handleshowSave(e, exam.exam.report)}
                      onBlur={ (e) => {e.target.value = ''}}
                      onChange={report} id="textarea"></textarea>

                      <div className="sendbuttonAndAtt">

                      <button 
                      // style={{display:  exam.exam.status === 'Finished' && 'none'}} 
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
                    {exam.exam.report_file && <div onClick={() => {window.location.href =`https://healthcarebackend.xyz${exam.exam.report_file}`}} className='fileForDownload'><p>{exam.exam.report_file.substring(exam.exam.report_file.lastIndexOf('/') + 1)}</p></div>}
                      </div>
                </div>
                </div>
                
              </div>
              </div>
                  <div className="message-btn">
              {exam.exam.status === "Accepted" &&
              !props.connectedall &&
              !props.connected ? (
                <h4 style={{ color: "#666666" }}>Connecting...</h4>
              ) : (
                exam.exam.status === "Canceled" && (
                  <h4 style={{ color: "#666666" }}>Reject-Connection</h4>
                )
              )}
              {exam.exam.status === 'Accepted' && <button
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
            </div>}



            <div className="detailExam"  style={{
          display: props.startVideo ? "block" : "none",
          padding: "0px 15px",
          height: '550px',
          marginBottom: '20px'
        }}>
            <div className="iconVideooCall">
                {/* <img src={iconVideoBlue} alt="email" /> */}
                <h4>Video call</h4>{" "}
              </div>
              <div className="detail2">
              <div id='videoChat'
              //  onMouseEnter={showExtendScreenIcon} onMouseLeave={showExtendScreenIcon}
              >
                {/* <div id='videoo' >nesto tamo</div> */}
                  {/* <img src={ExtendScreen} onClick={extendScr} style={{display: !props.showExtendScreen && 'none'}} className="extendScreen" alt="screen icon"/> */}
                </div>
                <div className='detailInfo2' id='detailInfo2'>
                {/* <p className='ClientP'>
                  <span>Client:</span> {exam.exam.client}
                </p>  */}
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
                onKeyPress={(e) => {handleKeyPress(e)}}
              ></textarea>
            </div>
          </form>
                  </div>  
              <button id="send" onClick={resetValue}>
              <img src={messageSend} alt="sendimg"/>
              </button>

                </div>
               

           
              </div>
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
              </div>
            <div className="client">
            <img src={client.image.includes('default') ? myClientProfile : `https://healthcarebackend.xyz/media/${client.image}`} alt="cliet profile" />
              <div className="client-p">
        <p><span>First Name:</span> {splited[0]}</p>
        <p><span>Last Name:</span> {splited[1]}</p>
        <p><span>Address:</span> {client.address}</p>
        <p><span>E-mail:</span> {client.email}</p>
        <p><span>Phone number:</span> {client.phone}</p>
        <p><span>Date of birth:</span> {client.birth_date}</p>
        <p><span>{client.gender === 'M' ? 'Male' : 'Female'}</span></p>
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

{props.PageonNav === 'clientDetail'&& loading ? (
        <img
          src={Loading}
          className="loading"
          alt="loading..."
          style={{ width: "150px" }}
        />
      ) : props.PageonNav === 'clientDetail' && !loading ? (
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
                      <td className="client-subject">{exam.exam_type}</td>
                      <td className="created">
                        {exam.created && !exam.appointed_date ? (
                          <p> {moment(exam.created).format("MM/DD/YY")}</p>
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
      ): null}

      {props.PageonNav === 'clientDetail' && <div className="pagi">
           <Pagination
          activePage={props.page}
          itemsCountPerPage={10}
          totalItemsCount={props.searchedUpcomingOrPast.length === 0 ? props.exams.length : props.searchedUpcomingOrPast.length}
          pageRangeDisplayed={10}
          onChange={handlePageChange}
          itemClassLast={'lastPage'}
        />
      </div>}















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
