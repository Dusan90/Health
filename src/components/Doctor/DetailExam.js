import React, { Fragment } from "react";
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import Select from "react-select";
import "../../assets/detail_exam.scss";

const Detail = ({
  exam,
  handleStatus,
  statusValue,
  submitValue,
  handleSubmit,
  handleLink,
  handleLinkMessage,
}) => (
  <>
    <div className="header">
      <div>
        <Header />
        <Nav />
      </div>
    </div>

    {exam.map((exam) => {
      let options =
        exam.status !== "Accepted"
          ? [
              { value: "Accept", label: "Accept" },
              { value: "Decline", label: "Decline" },
            ]
          : [{ value: "Finish", label: "Finish" }];
      return (
        <Fragment key={exam.id}>
          <div className="detail_exam">
            <div className="detail">
              <p>
                <span>Client:</span> {exam.client}
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
                <span>Subject:</span> {exam.subject}
              </p>
              <p>
                <span>Type:</span> {exam.exam_type}
              </p>
              <p>
                <span>Message:</span> {exam.message}
              </p>
              <p>
                <span>Status:</span> {exam.status}
              </p>
              {exam.status !== "Finished" ? (
                <div className="divSelectButton">
                  <Select
                    type="text"
                    className="select-option"
                    value={statusValue}
                    options={options}
                    onChange={handleStatus}
                  />
                  <button
                    type="submit"
                    className="btnSend"
                    value={submitValue}
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          {exam.status === "Accepted" && (
            <div className="message-btn">
              <button className="messages-link" onClick={handleLink}>
                Message history
              </button>
              <button className="message-link" onClick={handleLinkMessage}>
                Message
              </button>
            </div>
          )}
        </Fragment>
      );
    })}
  </>
);

export default Detail;
