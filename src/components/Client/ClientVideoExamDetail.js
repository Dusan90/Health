import React, { Fragment } from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import "../../assets/client/detail-exam.scss";
import moment from "moment";
import Select from "react-select";
// import HamburgerDiv from '../Main/HamburgerDiv'


const DetailVideo = ({
  exam,
  props,
  handleStatus,
  statusValue,
  handleJoinRoom,
  handleExtendDiv,
  extendreport2,
  extendreport
}) => {

  const customStyles = {
    control: () => ({
    
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
              <div className="message-btn">
                <button
                        className="message-link"
                        // disabled={disabled2}
                        onClick={ () => handleJoinRoom(exam.room['uid'])}
                      >
                        Join now
                      </button>
            </div>
            ) : null}
            </div>
           
          </Fragment>
        );
      })}
    </>
  );
};

export default DetailVideo;
