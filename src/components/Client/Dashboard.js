import React from "react";
import "../../assets/client/dashboard.scss";

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
  initiate,
  waitingRoom,
  VideoReq,
  handleClick,
  handleUpcoming,
  handlePast,
  handleAll,
  handleClickLeft,
  handleClickRight,
  handleHam,
  hnlMyConsultations,
  props,
  handleDoctorSearch,
  searchByType,
  searchByName,
  ResetonSelectChange,
  handlePageChange
}) => {
  props.state.paginatedExams.map((ex) => {
    if (props.state.mail.includes(ex.id) && ex.exam_type === "mail") {
      let hello = Object.assign(ex, { isRead: true });
      return hello;
    } else {
      let hy = Object.assign(ex, { isRead: false });
      return hy;
    }
  });
  return (
    <div className="mainClientDashboard">
      <div className="main">
        <div className="dashboardIcon">
          {/* <img
            src={MyConsultationsBlue}
            className="dashIcon"
            alt="my consultation icon"
          /> */}
          <h4>Dashboard</h4>
        </div>{" "}
        <div className="videoApp" onClick={() => VideoReq()}>
          <span className="video">
            <img src={makeAvideo} className="icon" alt="make a video" />
          </span>
          <div>
            <h2>Make a</h2>
            <h2 className="secondH2"> VIDEO APPOINTMENT</h2>
          </div>
        </div>
        <div className="emailReq" onClick={() => initiate()}>
          <span className="email">
            <img src={requestEmail} alt="request email" className="icon" />
          </span>
          <div>
            <h2>Request</h2>
            <h2 className="secondH2"> EMAIL CONSULTATION</h2>
          </div>
        </div>
        <div className="waitRoom" onClick={() => waitingRoom()}>
          <span className="clock">
            <img
              src={enterWaitingRoom}
              className="icon"
              alt="enter Waiting room"
            />
          </span>
          <div>
            <h2>Enter</h2>
            <h2 className="secondH2"> WAITING ROOM</h2>
          </div>
        </div>
      </div>
      {props.state.loading ? (
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
                      <span className="examTypetext">Doctor </span>
                      <span className="searchIcon" onClick={handleDoctorSearch}>
                        {props.state.searchDoctor ? (
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
                      style={{ display: !props.state.searchDoctor && "none" }}
                    />
                  </div>
                </th>
                <th className="client-subject">Subject</th>
                <th
                  className="client-type"
                  style={{ padding: props.state.searchDoctor && "0 0 30px 0" }}
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
                      onChange={searchByType}
                      onClick={ResetonSelectChange}
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
                  style={{ padding: props.state.searchDoctor && "0 0 30px 0" }}
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
                      <td className="client-doctor">
                        {!exam.doctor_name ? exam.doctor : exam.doctor_name}
                      </td>
                      <td className="client-subject1">{exam.subject}</td>
                      <td className="client-subject">{exam.exam_type}</td>
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
                      <td className="client-status">
                        {
                        //   exam.transaction && exam['transaction']['status'] === 'Pending' ?
                        // <h5 style={{color: '#00aff0'}}>PAY</h5> :
                         exam.status === "Pending" ||
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
        // <div className="mainTabel">
        //   <div className="mainConsultation">
        //     <div className="icon_left">
        //       <p>My Consultations</p>
        //     </div>
        //     <div className="sort">
        //       <p
        //         className="upcoming"
        //         style={{
        //           fontWeight:
        //             props.state.currentFilterClicked === "upcoming"
        //               ? "bold"
        //               : "300",
        //         }}
        //         onClick={handleUpcoming}
        //       >
        //         Upcoming
        //       </p>
        //       <p
        //         className="past"
        //         style={{
        //           fontWeight:
        //             props.state.currentFilterClicked === "past"
        //               ? "bold"
        //               : "300",
        //         }}
        //         onClick={handlePast}
        //       >
        //         Past
        //       </p>
        //       <p
        //         className="all"
        //         style={{
        //           fontWeight:
        //             props.state.currentFilterClicked === "all" ? "bold" : "300",
        //         }}
        //         onClick={handleAll}
        //       >
        //         All
        //       </p>
        //     </div>
        //   </div>
        //   {props.state.paginatedExams.length === 0 ? (
        //     <div className="NoResultDiv">{props.state.messageIfEmpty}</div>
        //   ) : (
        //     <table className="table2">
        //       <thead className="client-head">
        //         <tr className="client-row">
        //           <th className="client-doctor">Doctor</th>
        //           <th className="client-subject">Subject</th>
        //           <th className="client-subject">Type</th>
        //           <th className="client-subject">Date</th>
        //           <th className="client-status">Status</th>
        //         </tr>
        //       </thead>

        //       {props.state.paginatedExams.map((exam, index) => {
        //         if (exam === undefined) {
        //           return null;
        //         }
        //         return (
        //           <tbody key={index} className="client-body">
        //             <tr
        //               data-id={exam.id}
        //               className="list-group"
        //               style={{ fontWeight: exam.isRead && 700 }}
        //               onClick={() => handleClick(exam.id, exam.exam_type)}
        //             >
        //               <td className="client-doctor">
        //                 {!exam.doctor_name ? exam.doctor : exam.doctor_name}
        //               </td>
        //               <td className="client-subject">{exam.subject}</td>
        //               <td className="client-subject">{exam.exam_type}</td>

        //               <td className="created">
        //                 {exam.created && !exam.appointed_date ? (
        //                   <p> {moment(exam.created).format("MM/DD/YYYY")}</p>
        //                 ) : (
        //                   <p>
        //                     {" "}
        //                     {moment(exam.appointed_date).format(
        //                       "MM/DD/YYYY HH:mm"
        //                     )}
        //                   </p>
        //                 )}
        //               </td>
        //               <td className="client-status">
        //                 {exam.status === "Accepted" ||
        //                 exam.status === "Appointed" ? (
        //                   <FaCheck className="check" />
        //                 ) : exam.status === "Declined" ||
        //                   exam.status === "Canceled" ? (
        //                   <GiCancel className="declined" />
        //                 ) : exam.status === "Finished" ? (
        //                   <GiCheckeredFlag className="finished" />
        //                 ) : (
        //                   <FaRegClock className="pendi" />
        //                 )}
        //                 <h5 className="status">{exam.status}</h5>
        //               </td>
        //             </tr>
        //           </tbody>
        //         );
        //       })}
        //     </table>
        //   )}
        // </div>
      )}

      {props.state.paginatedExams.length !== 0 && <div className="pagi">
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
        />
      </div>}
    </div>
  );
};

export default Dashboard;
