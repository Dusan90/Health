import React from "react";
import "../../assets/dashboard.scss";

import { GiCheckeredFlag } from "react-icons/gi";

import chek from "../../icons/chek.svg";
import clockIcon from "../../icons/icon_Waiting_Room_blue.svg";
import declined from "../../icons/icon_Log_Out_blue.svg";
import arrowLeft from "../../icons/arrow-left.svg";
import arrowRight from "../../icons/arrow-right.svg";
import enterWaitingRoom from "../../icons/enter-waiting-room.svg";
import makeAvideo from "../../icons/Make-a-video.svg";
import requestEmail from "../../icons/Request-email.svg";
import MyConsultationsBlue from "../../icons/icon_My_Consultations_blue.svg";
import arrowDown from "../../icons/arrow_down_gray.svg";
import arrowUp from "../../icons/arrow_up_gray.svg";

import Loading from "../../icons/c+.svg";
import moment from "moment";
import Pagination from "react-js-pagination";


const Dashboard = ({
  hnlClick,
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
  hnlMyConsultations,
  loading,
  handleClientSearch,
  handleTypeSearch,
  searchByType,
  searchByName,
  ResetonSelectChange,
  handlePageChange
}) => {
  let short = props.state.pending ? props.state.pending.slice(0, 4) : null;
  let short2 = props.state.videoPending
    ? props.state.videoPending.slice(0, 4)
    : null;
  let short3 = props.state.waitingRoom
    ? props.state.waitingRoom.slice(0, 4)
    : null;
  // props.state.paginatedExams.map((ex) => {
  //   if (props.state.mail.includes(ex.id) && ex.exam_type === "mail") {
  //     let hello = Object.assign(ex, { isRead: true });
  //     return hello;
  //   } else {
  //     let hy = Object.assign(ex, { isRead: false });
  //     return hy;
  //   }
  // });
  return (
    <div className="testic">
      <div className="main">
        <div className="dashboardIcon">
          <h4>Dashboard</h4>
        </div>{" "}
        <div className="divClock">
          <div className="waitRoom1" onClick={hnlWaitingClick}>
            <span className="clock">
              <img
                src={enterWaitingRoom}
                className="icon"
                alt="enter Waiting room"
              />
              {/* <GoClock className="icon" /> */}
            </span>
            <h2>WAITING ROOM</h2>
          </div>
          <div style={{ height: "2px", background: "#00aff0" }}></div>
          <div className="requestsClock">
            <p>{props.state.waitingRoom.length} in waiting room</p>
          </div>
          <div className="pendingReq">
            {short3.length !== 0 ? (
              short3.map((shorty) => {
                console.log(shorty);
                return (
                    

                  <div
                    key={shorty.id}
                    onClick={() => handleWaitingRoom(shorty.id)}
                  >
                    {shorty.client},{" "}
                    {/* {new Intl.DateTimeFormat("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit"
                    }).format(
                      Date(shorty.estimated_start / (1000 * 60 * 60 * 24))
                    )} */}
                    {moment(shorty.created).add(1, 'hours').format("MM/DD/YY HH:mm")} 
                  </div>
                );
              })
            ) : (
              <p>No requests</p>
            )}
          </div>
        </div>
        <div className="divVideo">
          <div className="videoApp1" onClick={hnlVideoClick}>
            <span className="video">
              <img src={makeAvideo} className="icon" alt="make a video" />
              {/* <FaVideo className="icon" /> */}
            </span>
            <h2>VIDEO REQUESTS</h2>
          </div>
          <div style={{ height: "2px", background: "#00aff0" }}></div>
          <div className="requestsVideo">
            <p>{props.state.videoPending.length} new request to confirm</p>
          </div>
          <div className="pendingReq">
            {short2.length !== 0 ? (
              short2.map((shorty) => {
                return (
                  <div
                    key={shorty.id}
                    onClick={() => handleVideoPendingClick(shorty.id)}
                  >
                    {shorty.client},{" "}
                    {moment(shorty.appointed_date).format("MM/DD/YY HH:mm")}
                  </div>
                );
              })
            ) : (
              <p>No requests</p>
            )}
          </div>
        </div>
        <div className="divEmail">
          <div className="emailReq1" onClick={hnlClick}>
            <span className="email">
              <img src={requestEmail} alt="request email" className="icon" />
              {/* <IoIosMail className="icon" /> */}
            </span>
            <h2>EMAIL REQUESTS</h2>
          </div>
          <div style={{ height: "2px", background: "#00aff0" }}></div>
          <div className="requestsEmail">
            <p>{props.state.pending.length} new request to confirm</p>
          </div>
          <div className="pendingReq">
            {short.length !== 0 ? (
              short.map((shorty) => {
                return (
                  <div
                    key={shorty.id}
                    onClick={() => handleClickMail(shorty.id)}
                  >
                    {shorty.client},{" "}
                    {moment(shorty.created).add(1, 'hours').format("MM/DD/YY HH:mm")}
                  </div>
                );
              })
            ) : (
              <p>No requests</p>
            )}
          </div>
        </div>
      </div>
      {loading ? (
        <img
          src={Loading}
          className="loading"
          alt="loading..."
          style={{ width: "150px" }}
        />
      ) : (
        props.state.paginatedExams.length !== 0 && <div className="mainTabel">
          <div className="mainConsultation">
            <div className="icon_left">
              <p>My Consultations</p>
            </div>
            <div className="sort">
              <p
                className="upcoming"
                style={{
                  fontWeight:
                    props.state.currentFilterClicked === "upcoming"
                      ? "bold"
                      : "300",
                }}
                onClick={handleUpcoming}
              >
                Upcoming
              </p>
              <p
                className="past"
                style={{
                  fontWeight:
                    props.state.currentFilterClicked === "past"
                      ? "bold"
                      : "300",
                }}
                onClick={handlePast}
              >
                Past
              </p>
              <p
                className="all"
                style={{
                  fontWeight:
                    props.state.currentFilterClicked === "all" ? "bold" : "300",
                }}
                onClick={handleAll}
              >
                All
              </p>
            </div>
          </div>

          <table className="table2">
            <thead className="client-head">
              <tr className="client-row">
                <th className="client-doctor">
                  <div className="mainExamDiv">
                    <div className="searchDiv">
                      <span className="examTypetext">Client </span>
                      <span className="searchIcon" onClick={handleClientSearch}>
                        {props.state.searchClient ? (
                          <img src={arrowUp} alt="arrow" />
                        ) : (
                          <img src={arrowDown} alt="arrow" />
                        )}
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Search"
                      value={props.state.searchName}
                      onChange={searchByName}
                      style={{ display: !props.state.searchClient && "none" }}
                    />
                  </div>
                </th>
                <th className="client-subject">Subject</th>
                <th
                  className="client-type"
                  style={{ padding: props.state.searchClient && "0 0 30px 0" }}
                >
                  <div className="mainExamDiv">
                    {/* <div className="searchDiv">
                      <span className="examTypetext">Exam type </span>
                      <span className="searchIcon" onClick={handleTypeSearch}>
                        {props.state.searchByTypeClick ? (
                          <img src={arrowUp} alt="arrow" />
                        ) : (
                          <img src={arrowDown} alt="arrow" />
                        )}
                      </span>
                    </div> */}
                    <select
                      type="text"
                      placeholder=""
                      onClick={ResetonSelectChange}
                      onChange={searchByType}
                      value={props.state.searchType}
                      // style={{
                      //   display: !props.state.searchByTypeClick && "none",
                      // }}
                    >
                      <option value="">Type</option>
                      <option value="mail">Email</option>
                      <option value="video">Video</option>
                      <option value="queue">Waiting room</option>
                    </select>
                  </div>
                </th>
                <th className="client-date">Date</th>
                <th
                  className="client-status"
                  style={{ padding: props.state.searchClient && "0 0 30px 0" }}
                >
                  Status
                </th>
              </tr>
            </thead>
            {props.state.messageIfEmpty === "" &&
              props.state.paginatedExams.map((exam, index) => {
                // if (exam.status === "Accepted" || exam.status === "Appointed") {
                return (
                  <tbody key={index} className="client-body">
                    <tr
                      // data-id={exam.id}
                      className="list-group"
                      style={{ fontWeight: exam.isRead && 900 }}
                      onClick={() => handleClick(exam.id, exam.exam_type)}
                    >
                      <td className="client-doctor">{exam.client}</td>
                      <td className="client-subject1">{exam.subject}</td>
                      <td className="client-subject">{exam.exam_type}</td>
                      <td className="created">
                        {exam.created && !exam.appointed_date ? (
                          <p> {moment(exam.created).add(1, 'hours').format("MM/DD/YY HH:mm")}</p>
                        ) : exam.appointed_date ? (
                          <p>
                            {" "}
                            {moment(exam.appointed_date).format(
                              "MM/DD/YY HH:mm"
                            )}
                          </p>
                        ) : null}
                      </td>
                      <td className="client-status">
                        {exam.status === "Pending" ||
                        exam.status === "In the queue" ? (
                          <img
                            src={clockIcon}
                            alt="clockIcon"
                            className="pendi"
                          />
                        ) : exam.status === "Declined" ||
                          exam.status === "Canceled" ? (
                          <img
                            src={declined}
                            alt="declined"
                            className="declined"
                          />
                        ) : exam.status === "Finished" ? (
                          <GiCheckeredFlag className="finished" />
                        ) : (
                          <img src={chek} alt="ckeck" className="check" />
                        )}
                        <h5 className="status">{exam.status}</h5>
                      </td>
                    </tr>
                  </tbody>
                );
                // } else {
                //   return null;
                // }
              })}
          </table>
          {props.state.messageIfEmpty !== "" && (
            <div className="NoResultDiv">{props.state.messageIfEmpty}</div>
          )}
        </div>
      )}

      {props.state.exams.length > 10 && <div className="pagi">
        {/* <div className="left" onClick={handleClickLeft}>
          <img src={arrowLeft} alt="arrow left" className="iconLeft" />
       
        </div>
        <div className="right" onClick={handleClickRight}>
          <img src={arrowRight} alt="arrow rigth" className="iconRight" />
  
        </div> */}
        <Pagination
          activePage={props.state.page}
          itemsCountPerPage={10}
          totalItemsCount={props.state.searchedUpcomingOrPast.length === 0 ? props.state.upcomingOrPast.length : props.state.searchedUpcomingOrPast.length}
          pageRangeDisplayed={10}
          onChange={handlePageChange}
          itemClassLast={'lastPage'}
          hideFirstLastPages={true}
        />
      </div>}
      {/* <div
        className="sideNav"
        style={{
          left: props.state.hamburger ? "0px" : "-300px",
          opacity: props.state.hamburger ? "0.7" : "0",
        }}
      >
        <div className="sideProfile">
          <div className="mainProfile">
            <div className="profile">
              <GoPerson className="icon" />
            </div>
            <div
              className="onlineDot"
              style={{
                background:
                  props.state.doctorCurent.status !== "Available"
                    ? "lightgray"
                    : "green",
              }}
            ></div>
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
        <div className="sideMyCounsultation" onClick={hnlMyConsultations}>
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
      </div> */}
    </div>
  );
};

export default Dashboard;
