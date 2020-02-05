import React from "react";
import "../../assets/dashboard.scss";
import { MdOndemandVideo } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaUserClock } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

const Dashboard = ({
  clients,
  exams,
  hnlClick,
  handleClick,
  handleClient,
  pending,
  handleChange,
  props
}) => {
  let short = pending ? pending.slice(0, 3) : null;

  return (
    <div className="testic">
      <div className="main">
        <div className="divVideo">
          <div className="videoApp1">
            <span className="video">
              <MdOndemandVideo className="icon" />
            </span>
            <h2>Video Request</h2>
          </div>
          <div style={{ height: "2px", background: "rgb(61, 61, 248)" }}></div>
          <div className="requestsVideo"></div>
          <button>SEE DETAILS</button>
        </div>
        <div className="divEmail">
          <div className="emailReq1">
            <span className="email">
              <MdEmail className="icon" />
            </span>
            <h2>Email Request</h2>
          </div>
          <div
            style={{ height: "2px", background: "rgb(137, 210, 235)" }}
          ></div>
          <div className="requestsEmail">
            {pending.length} new request to confirm
          </div>
          <div className="pendingReq">
            {short ? (
              short.map(shorty => {
                return (
                  <div key={shorty.id}>
                    {shorty.client},{" "}
                    {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit"
                    }).format(new Date(shorty.created))}
                  </div>
                );
              })
            ) : (
              <p>No requests</p>
            )}
          </div>
          <button onClick={hnlClick}>SEE DETAILS</button>
        </div>
        <div className="divClock">
          <div className="waitRoom1">
            <span className="clock">
              <FaUserClock className="icon" />
            </span>
            <h2>Waiting Room</h2>
          </div>
          <div
            style={{ height: "2px", background: "rgb(107, 240, 107)" }}
          ></div>
          <div className="requestsClock"></div>
          <button>ENTER WAITING ROOM</button>
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
              <th className="client-doctor">Client</th>
              <th className="client-subject">Subject</th>
              <th className="client-subject">Date</th>
              <th className="client-status">Status</th>
            </tr>
          </thead>
          {exams.map(exam => {
            if (exam.status === "Accepted") {
              return (
                <tbody key={exam.id} className="client-body">
                  <tr
                    data-id={exam.id}
                    className="list-group"
                    onClick={() => handleClick(exam.id)}
                  >
                    <td className="client-doctor">{exam.client}</td>
                    <td className="client-subject">{exam.subject}</td>
                    <td className="created">
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                      }).format(new Date(exam.created))}
                    </td>
                    <td className="client-status">
                      <FaCheck className="check" />
                    </td>
                  </tr>
                </tbody>
              );
            }
          })}
        </table>
      </div>
      <h4
        style={{
          margin: "20px 0 20px 0",
          float: "left",
          color: "rgb(0, 191, 255)"
        }}
      >
        Clients
      </h4>
      <div className="row2" style={{ width: "300px" }}>
        {clients.map(client => {
          return client.id === null ? null : (
            <div key={client.id} className="list-group">
              <button
                data-id={client.id}
                className="list-group-item"
                onClick={() => handleClient(client.id)}
              >
                {client.client}
              </button>
            </div>
          );
        })}
      </div>
      {props.openPending ? (
        <div className="penTable">
          <table className="table2 test">
            <thead className="client-head">
              <tr className="client-row">
                <th className="client-doctor">Client</th>
                <th className="client-subject">Subject</th>
                <th className="client-subject">Date</th>
                <th className="client-status">Status</th>
              </tr>
            </thead>
            {pending.map(pen => {
              return (
                <tbody key={pen.id} className="client-body">
                  <tr
                    data-id={pen.id}
                    className="list-group"
                    onClick={() => handleClick(pen.id)}
                  >
                    <td className="client-doctor">{pen.client}</td>
                    <td className="client-subject">{pen.subject}</td>
                    <td className="created">
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                      }).format(new Date(pen.created))}
                    </td>
                    <td className="client-status">
                      <FaRegClock className="pendi" />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <button onClick={hnlClick}>GO BACK</button>
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
