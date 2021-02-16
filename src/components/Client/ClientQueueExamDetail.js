import React, { Fragment } from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import "../../assets/client/detail-exam.scss";
import moment from "moment";
import queueIcon from '../../icons/icon_Waiting_Room_blue.svg'
import { HamburgerDiv } from "../Main/HamburgerDiv";

const DetailQueue = ({ exam, props, handleExtendDiv }) => {
  return (
    <>
      <div className="header">
        <div>
          <Header />
          <Nav />
        </div>
      </div>
      <HamburgerDiv/>
      {exam.map((exam) => {
        console.log(exam);
        return (
          <Fragment key={exam.exam.id}>
            <div className="detail-exam" style={{height: '300px'}}>
            <div className="iconVideo">
                {/* <img src={queueIcon} alt="email" /> */}
                <h4>Consultation details</h4>{" "}
              </div>
              <div className="detail">
              <p>
                <span>Doctor:</span> {exam.exam.doctor_name}
              </p>
              <p>
                <span>Speciality:</span> {exam.exam.speciality}
              </p>
              <p>
                <span>Created:</span>{" "}
                {moment(exam.exam.appointed_date)
                                .add(1, "hours")
                                .format("MM/DD/YY")}
              </p>
              <p>
                <span>Type:</span> {exam.exam.exam_type}
              </p>
                <p>
                  <span>Status:</span> {exam.exam.status}
                </p>
            </div>
            <div className='sideMessageDetails'>
            <div className="SubjectMessage">
              <div className="subjectDiv">
                  <p>
                    <span style={{fontWeight: 'bold'}}>Subject:</span> {exam.exam.subject}
                  </p>
                  <div className='infoAndSquare' style={{display: 'flex'}}>
                  <p>
                    <span>
                    {moment(exam.exam.created).format("MM/DD/YY")}
                    </span>
                  </p>
                  <div id="imageDiv1" onClick={handleExtendDiv}></div>
                </div>
                </div>
                <div className="messageDiv">
                <textarea defaultValue={exam.exam.notes} id='messageMainText' disabled={true}>
                    
                    </textarea>
                    {exam.exam.attachments ? (
                             <div className='mainFileDiv'>
                             <div className='FileDiv'><p>Files:</p></div>
                             {exam.exam.attachments && <div onClick={() => {window.location.href =`https://healthcarebackend.xyz${exam.exam.attachments}`}} className='fileForDownload'><p>{exam.exam.attachments.substring(exam.exam.attachments.lastIndexOf('/') + 1)}</p></div>}
                           </div>
                          ) : null}
                </div>
                <div className='reportIfDeclined' style={{display:  exam.exam.status !== 'Declined'  ? 'none' : 'block'}}>
                <div className="subjectDiv">
                  <p>
                    <span>Decline reason:</span>
                  </p>
                </div>
                <div className="messageDivReport"  >
                      <textarea name="text" disabled={ exam.exam.status === 'Declined' && true} placeholder={exam.exam.decline_notes ? exam.exam.decline_notes : 'text'} value={props.declineReason} id="textarea"></textarea>
                </div>
                </div>


                <div className='reportIfFinished' style={{display:  exam.exam.status !== 'Finished'  ? 'none' : 'block'}}>
                <div className="subjectDiv">
                  <p>
                    <span>Report:</span>
                  </p>
                </div>
                <div className="messageDivReport"  >
                      <textarea name="text" disabled={ exam.exam.status === 'Finished' && true} placeholder={exam.exam.report ? exam.exam.report : 'text'} value={props.declineReason} id="textarea"></textarea>
                </div>
                </div>
              </div>
              </div>
            </div>
            {/* <div className="recordsDetail">
              <h4>Report</h4>

              <div className="report">
                {exam.record.report !== 0 &&
                  exam.record.report.map((exam) => {
                    return (
                      <div key={exam.id} className="report-details">
                        <p>
                          <span>Doctor:</span> {exam.name}
                        </p>
                        <p>
                          <span>Speciality:</span> {exam.spec_name}
                        </p>
                        <p>
                          <span>Diagnose:</span> {exam.diagnose}
                        </p>
                        <p>
                          <span>Report:</span> {exam.report}
                        </p>
                        <p>
                          <span>Tests:</span> {exam.tests}
                        </p>
                        <p>
                          <span>Medication Name:</span> {exam.medication_name}
                        </p>
                        <p>
                          <span>Prescribing Date:</span>{" "}
                          {exam.medication_prescribing_date}
                        </p>
                        <p>
                          <span>Medication Notes:</span> {exam.medication_notes}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div> */}
          </Fragment>
        );
      })}
    </>
  );
};

export default DetailQueue;
