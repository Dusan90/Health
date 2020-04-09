import React from "react";
import "../../assets/dashboard.scss";
import { FaCheck } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { FaVideo } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { GoClock } from "react-icons/go";
import { GoFileDirectory } from "react-icons/go";
import { GoMailRead } from "react-icons/go";
import { IoIosSettings } from "react-icons/io";
import { MdChatBubble } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { GiCancel } from "react-icons/gi";

import Loading from "../../img/loading-gif-png-5-original.gif";
import moment from "moment";

const Dashboard = ({
  hnlClick,
  hnlClick2,
  hnlClick3,
  handleClick,
  handleClickMail,
  handleUpcoming,
  handlePast,
  handleAll,
  props,
  handleClickLeft,
  handleClickRight,
  hnlVideoClick,
  hnlWaitingClick,
  handleWaitingRoom,
  handleVideoPendingClick,
  handleHam,
  loading,
}) => {
  let short = props.state.pending ? props.state.pending.slice(0, 3) : null;
  let short2 = props.state.videoPending
    ? props.state.videoPending.slice(0, 3)
    : null;
  let short3 = props.state.waitingRoom
    ? props.state.waitingRoom.slice(0, 3)
    : null;
  console.log(props.state.waitingRoom);

  return (
    <div className="testic">
      <div className="hamburger">
        <div className="hamNprofil">
          <div className="ham" onClick={handleHam}>
            <GiHamburgerMenu />
          </div>
          <div className="rightNavIcons">
            <div
              className="patientsNav"
              onClick={() => {
                props.props.history.push("/doctors-clients");
              }}
            >
              <FaUsers className="iconNav" />
              <p>My Patients</p>
            </div>
            <div
              className="calendarNav"
              onClick={() => {
                props.props.history.push("/doctor/calendar");
              }}
            >
              <FaRegCalendarAlt className="iconNav" />
              <p>Calendar</p>
            </div>
            <div className="alertsNav">
              <FaRegBell className="iconNav" />
              <p>Alerts</p>
            </div>
            <div className="messagesNav">
              <GoMailRead className="iconNav" />
              <p>Messages</p>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboardIcon">
        <FaFileAlt className="dashIcon" />
        <h2>Dashboard</h2>
      </div>
      <div className="main">
        {" "}
        <div className="divClock">
          <div className="waitRoom1">
            <span className="clock">
              <GoClock className="icon" />
            </span>
            <h2>WAITING ROOM</h2>
          </div>
          <div style={{ height: "2px", background: "#4092c2" }}></div>
          <div className="requestsClock">
            {props.state.waitingRoom.length} in waiting room
          </div>
          <div className="pendingReq">
            {short3.length !== 0 ? (
              short3.map((shorty) => {
                return (
                  <div key={shorty.id}>
                    {shorty.client},{" "}
                    {/* {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit"
                    }).format(
                      Date(shorty.estimated_start / (1000 * 60 * 60 * 24))
                    )} */}
                    {moment(Date(shorty.estimated_start)).format("MM/DD/YYYY")}
                  </div>
                );
              })
            ) : (
              <p>No requests</p>
            )}
          </div>
          <button onClick={hnlWaitingClick}>Enter Waiting Room</button>
        </div>
        <div className="divVideo">
          <div className="videoApp1">
            <span className="video">
              <FaVideo className="icon" />
            </span>
            <h2>VIDEO REQUESTS</h2>
          </div>
          <div style={{ height: "2px", background: "#4092c2" }}></div>
          <div className="requestsVideo">
            {props.state.videoPending.length} new request to confirm
          </div>
          <div className="pendingReq">
            {short2.length !== 0 ? (
              short2.map((shorty) => {
                return (
                  <div key={shorty.id}>
                    {shorty.client},{" "}
                    {moment(shorty.appointed_date).format("MM/DD/YYYY")}
                  </div>
                );
              })
            ) : (
              <p>No requests</p>
            )}
          </div>
          <button onClick={hnlVideoClick}>See Details</button>
        </div>
        <div className="divEmail">
          <div className="emailReq1">
            <span className="email">
              <IoIosMail className="icon" />
            </span>
            <h2>EMAIL REQUESTS</h2>
          </div>
          <div style={{ height: "2px", background: "#4092c2" }}></div>
          <div className="requestsEmail">
            {props.state.pending.length} new request to confirm
          </div>
          <div className="pendingReq">
            {short.length !== 0 ? (
              short.map((shorty) => {
                return (
                  <div key={shorty.id}>
                    {shorty.client},{" "}
                    {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    }).format(new Date(shorty.created))}
                  </div>
                );
              })
            ) : (
              <p>No requests</p>
            )}
          </div>
          <button onClick={hnlClick}>See Details</button>
        </div>
      </div>
      {loading ? (
        <img src={Loading} alt="loading..." style={{ width: "150px" }} />
      ) : (
        <div className="mainTabel">
          <div className="mainConsultation">
            <div className="icon_left">
              <span>
                <GoFileDirectory className="icon1" />
              </span>
              <p>My Consultations</p>
            </div>
            <div className="sort">
              <p className="upcoming" onClick={handleUpcoming}>
                upcoming
              </p>
              <p className="past" onClick={handlePast}>
                past
              </p>
              <p className="all" onClick={handleAll}>
                view all
              </p>
            </div>
          </div>

          <table className="table2">
            <thead className="client-head">
              <tr className="client-row">
                <th className="client-doctor">Client</th>
                <th className="client-subject">Subject</th>
                <th className="client-subject">Exam type</th>
                <th className="client-subject">Date</th>
                <th className="client-status">Status</th>
              </tr>
            </thead>
            {props.state.paginatedExams.map((exam, index) => {
              if (exam.status === "Accepted" || exam.status === "Appointed") {
                return (
                  <tbody key={index} className="client-body">
                    <tr
                      // data-id={exam.id}
                      className="list-group"
                      onClick={() => handleClick(exam.id, exam.exam_type)}
                    >
                      <td className="client-doctor">{exam.client}</td>
                      <td className="client-subject">{exam.subject}</td>
                      <td className="client-subject">{exam.exam_type}</td>
                      <td className="created">
                        {exam.created && !exam.appointed_date ? (
                          <p>
                            {" "}
                            Created: {moment(exam.created).format("MM/DD/YYYY")}
                          </p>
                        ) : exam.appointed_date ? (
                          <p>
                            {" "}
                            Appointed:{" "}
                            {moment(exam.appointed_date).format("MM/DD/YYYY")}
                          </p>
                        ) : null}
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
      )}

      {props.state.openPending ? (
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
            {props.state.pending.map((pen) => {
              return (
                <tbody key={pen.id} className="client-body">
                  <tr
                    data-id={pen.id}
                    className="list-group"
                    onClick={() => handleClickMail(pen.id)}
                  >
                    <td className="client-doctor">{pen.client}</td>
                    <td className="client-subject">{pen.subject}</td>
                    <td className="created">
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
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

      {props.state.openVideoPending ? (
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
            {props.state.videoPending.map((pen) => {
              return (
                <tbody key={pen.id} className="client-body">
                  <tr
                    data-id={pen.id}
                    className="list-group"
                    onClick={() => handleVideoPendingClick(pen.id)}
                  >
                    <td className="client-doctor">{pen.client}</td>
                    <td className="client-subject">{pen.subject}</td>
                    <td className="created">
                      {/* {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit"
                      }).format(new Date(pen.created))} */}
                      {moment(pen.appointed_date).format("MM/DD/YYYY")}
                    </td>
                    <td className="client-status">
                      <FaRegClock className="pendi" />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <button onClick={hnlClick2}>GO BACK</button>
        </div>
      ) : null}

      {props.state.openWaitingRoom ? (
        <div className="penTable">
          <table className="table2 test">
            <thead className="client-head">
              <tr className="client-row">
                <th className="client-doctor">Client</th>
                <th className="client-subject">Subject</th>
                <th className="client-subject">Date</th>
                {/* <th className="client-status">Status</th> */}
              </tr>
            </thead>
            {props.state.waitingRoom.map((pen) => {
              return (
                <tbody key={pen.id} className="client-body">
                  <tr
                    data-id={pen.id}
                    className="list-group"
                    onClick={() => handleWaitingRoom(pen.id)}
                  >
                    <td className="client-doctor">{pen.client}</td>
                    <td className="client-subject">{pen.subject}</td>
                    <td className="created">
                      {pen.created ? (
                        <p>
                          {" "}
                          Created: {moment(pen.created).format("MM/DD/YYYY")}
                        </p>
                      ) : (
                        <p>
                          {" "}
                          Appointed:{" "}
                          {moment(pen.appointed_date).format("MM/DD/YYYY")}
                        </p>
                      )}
                    </td>
                    {/* <td className="client-status">
                      <FaRegClock className="pendi" />
                    </td> */}
                  </tr>
                </tbody>
              );
            })}
          </table>
          <button onClick={hnlClick3}>GO BACK</button>
        </div>
      ) : null}
      <div className="pagi">
        <div className="left" onClick={handleClickLeft}>
          <FaChevronLeft className="iconLeft" />
        </div>
        <div className="right" onClick={handleClickRight}>
          <FaChevronRight className="iconRight" />
        </div>
      </div>
      <div className="mainCaldendar">
        <div className="icon_left">
          <span>
            <FaRegCalendarAlt className="icon1" />
          </span>
          <p>Calendar</p>
        </div>
      </div>

      <div className="connectWithdoctor">
        <div className="connected">
          <p>
            Connect with a doctor over live video in minutes. Available 24/7,
            nights and weekends.
          </p>
          <h4>
            See a Doctor <FaChevronRight className="see" />
          </h4>
        </div>
      </div>
      <div
        className="sideNav"
        style={{ left: props.state.hamburger ? "0px" : "-300px" }}
      >
        <div className="sideProfile">
          <div className="mainProfile">
            <div className="profile">
              <GoPerson className="icon" />
            </div>
            <div className="onlineDot"></div>
          </div>
          <p>
            {props.state.doctorCurent.prefix} {props.state.doctorCurent.doctor}
          </p>
        </div>
        <div className="sideVideo" onClick={hnlVideoClick}>
          <span className="video">
            <FaVideo className="icon" />
          </span>
          <h2>Video Appointment</h2>
        </div>
        <div className="sideEmail" onClick={hnlClick}>
          <span className="email">
            <IoIosMail className="icon" />
          </span>
          <h2>Email Consultation</h2>
        </div>
        <div className="sideWaitingRoom" onClick={hnlWaitingClick}>
          <span className="clock">
            <GoClock className="icon" />
          </span>
          <h2>Waiting Room</h2>
        </div>
        <div className="sideMyCounsultation">
          <span>
            <GoFileDirectory className="icon" />
          </span>
          <h2>My Consultations</h2>
        </div>
        <div
          className="sideMyAccount"
          onClick={() => {
            props.props.history.push("/doctor/profile/");
          }}
        >
          <span>
            <FaUser />
          </span>
          <h2>Profile</h2>
        </div>
        <div className="sideHelp">
          <span className="help">
            <IoIosSettings className="icon" />
          </span>
          <h2>Help</h2>
        </div>
        <div className="sideFaq">
          <span className="faq">
            <MdChatBubble className="icon" />
          </span>
          <h2>FAQ</h2>
        </div>
        <div
          className="sideSignOut"
          onClick={() => {
            props.props.history.push("/logout");
          }}
        >
          <span className="signOut">
            <IoMdClose className="icon" />
          </span>
          <h2>Sign Out</h2>
        </div>
      </div>
      {props.state.viewAllExams ? (
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
            {props.state.exams.map((ex, index) => {
              return (
                <tbody key={index} className="client-body">
                  <tr
                    data-id={ex.id}
                    className="list-group"
                    onClick={() => handleClick(ex.id, ex.exam_type)}
                  >
                    <td className="client-doctor">{ex.client}</td>
                    <td className="client-subject">{ex.subject}</td>
                    <td className="created">
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                      }).format(new Date(ex.created))}
                    </td>
                    <td className="client-status">
                      {ex.status === "Accepted" || ex.status === "Appointed" ? (
                        <FaCheck className="check" />
                      ) : ex.status === "Declined" ? (
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
          <button onClick={handleAll}>GO BACK</button>
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
