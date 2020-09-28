import React, { Fragment } from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import "../../assets/client/detail-exam.scss";
import moment from "moment";

const DetailQueue = ({ exam }) => {
  return (
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
                {exam.appointed_date ? (
                  <p>
                    {" "}
                    <span>Appointed:</span>{" "}
                    {moment(exam.appointed_date).format("MM/DD/YYYY HH:mm")}
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
                <p>
                  <span>Subject:</span> {exam.subject}
                </p>
                <p>
                  <span>Message:</span> {exam.notes}
                </p>
                <p>
                  <span>Status:</span> {exam.status}
                </p>
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export default DetailQueue;
