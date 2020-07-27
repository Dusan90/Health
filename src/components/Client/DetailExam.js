import React, { Fragment } from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import "../../assets/client/detail-exam.scss";

const Detail = ({ exam, handleLink, handleLinkMessage, handleCancel }) => (
  <>
    <div className="header">
      <div>
        <Header />
        <Nav />
      </div>
    </div>
    {exam.map((exam) => {
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
              <p className="created">
                <span>Created: </span>
                {new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(new Date(exam.created))}
              </p>
              <p>
                <span>Type:</span> {exam.exam_type}
              </p>
              <p>
                <span>Subject:</span> {exam.subject}
              </p>
              <p>
                <span>Message:</span> {exam.message}
              </p>
              <p>
                <span>Status:</span> {exam.status}
              </p>
            </div>
          </div>
          {exam.status === "Accepted" ? (
            <div className="message-btn">
              <button className="messages-link" onClick={handleLink}>
                Message history
              </button>
              <button className="message-link" onClick={handleLinkMessage}>
                Message
              </button>
            </div>
          ) : exam.status === "Finished" ? null : (
            <button className="message-link" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </Fragment>
      );
    })}
  </>
);

export default Detail;
