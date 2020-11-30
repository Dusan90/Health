import React, { Fragment } from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import "../../assets/client/detail-exam.scss";
import moment from "moment";
import queueIcon from '../../icons/icon_Waiting_Room_blue.svg'
import { HamburgerDiv } from "../Main/HamburgerDiv";

const DetailQueue = ({ exam }) => {
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
        return (
          <Fragment key={exam.exam.id}>
            <div className="detail-exam" style={{height: '300px'}}>
            <div className="iconVideo" style={{width: '250px'}}>
                <img src={queueIcon} alt="email" />
                <p>Waiting room details</p>{" "}
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
                {new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(new Date(exam.exam.created))}
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
                    <span>Subject:</span> {exam.exam.subject}
                  </p>
                  <p>
                    <span>
                      {moment(exam.exam.created).format("MM/DD/YYYY")}
                    </span>
                  </p>
                </div>
                <div className="messageDiv">
                <textarea defaultValue={exam.exam.notes} disabled={true}>
                    
                    </textarea>
                  {/* <p>
                    <span>Message:</span> {exam.exam.notes}
                  </p> */}
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
