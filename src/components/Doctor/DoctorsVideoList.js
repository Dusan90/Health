import React from "react";

import moment from "moment";
// import iconVideoBlue from "../../icons/icon_Video_Appointment_blue.svg";
import loading from "../../icons/c+.svg";
import "../../assets/doctorsVideoList.scss";

const DoctorsVideoList = ({ props, handleClick }) => {
  return (
    <div className="mainEmailList">
      <div className="iconEmail">
        {/* <img src={iconVideoBlue} alt="email" /> */}
        <h4>Video requests</h4>{" "}
      </div>
      {props.loading ? (
        <img src={loading} alt="loading" className="loading" />
      ) : (
        <div className="tableDiv">
          <table className="table2">
            <thead className="client-head">
              <tr className="client-row">
                <th className="client-doctor">
                  <div className="mainExamDiv">
                    <span
                      className="examTypetext"
                      //   style={{ display: props.state.searchClient && "none" }}
                    >
                      Client{" "}
                    </span>
                    {/* <input
                  type="text"
                  placeholder="Search..."
                  value={props.state.searchName}
                  onChange={searchByName}
                  style={{ display: !props.state.searchClient && "none" }}
                />
                <span className="searchIcon" onClick={handleClientSearch}>
                  <FaSearch
                    style={{
                      margin: "0 0 0 10px",
                      width: "20px",
                    }}
                  />
                </span> */}
                  </div>
                </th>
                <th className="client-subject">Subject</th>

                <th className="client-date">Date</th>
              </tr>
            </thead>
            {props.messageOnScreen === "" &&
              props.exams.map((exam, index) => {
                // if (exam.status === "Accepted" || exam.status === "Appointed") {
                return (
                  <tbody key={index} className="client-body">
                    <tr
                      // data-id={exam.id}
                      className="list-group"
                      style={{ fontWeight: exam.isRead && 700 }}
                      onClick={() => handleClick(exam.id, exam.exam_type)}
                    >
                      <td className="client-doctor">{exam.client}</td>
                      <td className="client-subject">
                        Subject: {exam.subject}
                      </td>
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
                    </tr>
                  </tbody>
                );
                // } else {
                //   return null;
                // }
              })}
          </table>
           {props.messageOnScreen !== "" && (
        <div className="NoResultDiv">{props.messageOnScreen}</div>
      )}
        </div>
      )}
     
    </div>
  );
};

export default DoctorsVideoList;
