import React from "react";
import "../../assets/client/dashboard.scss";
import { MdOndemandVideo } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaUserClock } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

const Dashboard = ({ initiate, exams, handleClick, handleChange }) => (
  <>
    <div className="main">
      <div className="videoApp">
        <span className="video">
          <MdOndemandVideo className="icon" />
        </span>
        <h2>Make a VIDEO APPOINTMENT</h2>
      </div>
      <div className="emailReq" onClick={() => initiate()}>
        <span className="email">
          <MdEmail className="icon" />
        </span>
        <h2>Request EMAIL CONSULTATION</h2>
      </div>
      <div className="waitRoom">
        <span className="clock">
          <FaUserClock className="icon" />
        </span>
        <h2>Enter WAITING ROOM</h2>
      </div>
    </div>

    <div className="mainTabel">
      <div className="mainConsultation">
        <div className="icon_left">
          <span>
            <MdDateRange className="icon1" />
          </span>
          <p>My Consultations</p>
        </div>
        <div className="sort">
          <label>Sort by: </label>
          <select name="" id="" onChange={handleChange}>
            <option value="latest">Latest</option>
            <option value="earliest">Earliest</option>
          </select>
        </div>
      </div>

      <table className="table2">
        <thead className="client-head">
          <tr className="client-row">
            <th className="client-doctor">Doctor</th>
            <th className="client-subject">Subject</th>
            <th className="client-subject">Date</th>
            <th className="client-status">Status</th>
          </tr>
        </thead>
        {exams.map(exam => {
          if (exam.status === "Canceled") return null;
          return (
            <tbody key={exam.id} className="client-body">
              <tr
                key={exam.id}
                data-id={exam.id}
                className="list-group"
                onClick={() => handleClick(exam.id)}
              >
                <td className="client-doctor">{exam.doctor}</td>
                <td className="client-subject">{exam.subject}</td>
                <td className="created">
                  {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  }).format(new Date(exam.created))}
                </td>
                <td className="client-status">
                  {exam.status === "Accepted" ? (
                    <FaCheck className="check" />
                  ) : exam.status === "Declined" ? (
                    <GiCancel className="declined" />
                  ) : (
                    <FaRegClock className="pendi" />
                  )}
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  </>
);

export default Dashboard;
