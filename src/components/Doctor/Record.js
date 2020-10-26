import React from "react";
import "../../assets/record.scss";
// import clientImg from '../../icons/icon_my_profile_client_blue_23px.svg'
import clientIcon from '../../icons/icon_my_profile_client_blue_23px.svg'
// import arrowAttach from '../../icons/attach_white.svg'

import chek from "../../icons/chek.svg";
import clockIcon from "../../icons/icon_Waiting_Room_blue.svg";
import declined from "../../icons/icon_Log_Out_blue.svg";
import arrowLeft from "../../icons/arrow-left.svg";
import arrowRight from "../../icons/arrow-right.svg";
import arrowDown from "../../icons/arrow_down_gray.svg";
import arrowUp from "../../icons/arrow_up_gray.svg";
import { GiCheckeredFlag } from "react-icons/gi";
import Loading from "../../icons/c+.svg";
import moment from "moment";



const Record = ({
  props,
  record,
  handleClick,
  handleUpcoming,
  handlePast,
  handleAll,
  handleClickLeft,
  handleClickRight,
  loading,
  handleClientSearch,
  searchByType,
  searchByName,
  ResetonSelectChange,

}) =>{ 
  return (

  <>
    {record &&
      record.map(client => {
        console.log(client);
        const splited = client.client.split(" ");
        return (
          <div key={client.id} className="mainClien">
            <div className="newVideo">
          <img src={clientIcon} alt="video img" />
          <p>Client details </p>
        </div>
            <div className="client">
              <div className="client-p">
        <p><span>First Name:</span> {splited[0]}</p>
        <p><span>Last Name:</span> {splited[1]}</p>
        <p><span>Address:</span> {client.address}</p>
        <p><span>E-mail:</span> {client.email}</p>
        <p><span>Phone number:</span> {client.phone}</p>
        <p><span>Date of birth:</span> {client.birth_date}</p>
        <p><span>{client.gender === 'M' ? 'Male' : 'Female'}</span></p>
              </div>
            </div>
            <div className="form">
              <div className="conditions">
                Chronical conditions:{" "}

        <p>{client.medical_conditions}</p>
              </div>
              <div  className="allergies">
               Allergies:{" "}
        <p>{client.allergies}</p>
         
              </div>
            </div>
          </div>
        );
      })}

{loading ? (
        <img
          src={Loading}
          className="loading"
          alt="loading..."
          style={{ width: "150px" }}
        />
      ) : (
        <div className="mainTabelRecord">
          <div className="mainConsultation">
            <div className="icon_left">
              <p>My Consultations</p>
            </div>
            <div className="sort">
              <p
                className="upcoming"
                style={{
                  fontWeight:
                    props.currentFilterClicked === "upcoming"
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
                    props.currentFilterClicked === "past"
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
                    props.currentFilterClicked === "all" ? "bold" : "300",
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
                        {props.searchClient ? (
                          <img src={arrowUp} alt="arrow" />
                        ) : (
                          <img src={arrowDown} alt="arrow" />
                        )}
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Type"
                      value={props.searchName}
                      onChange={searchByName}
                      style={{ display: !props.searchClient && "none" }}
                    />
                  </div>
                </th>
                <th className="client-subject">Subject</th>
                <th
                  className="client-type"
                  style={{ padding: props.searchClient && "0 0 30px 0" }}
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
                      value={props.searchType}
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
                  style={{ padding: props.searchClient && "0 0 30px 0" }}
                >
                  Status
                </th>
              </tr>
            </thead>
            {props.messageIfEmpty === "" &&
              props.paginatedExams.map((exam, index) => {
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
                      <td className="client-subject">{exam.subject}</td>
                      <td className="client-subject">{exam.exam_type}</td>
                      <td className="created">
                        {exam.created && !exam.appointed_date ? (
                          <p> {moment(exam.created).format("MM/DD/YYYY")}</p>
                        ) : exam.appointed_date ? (
                          <p>
                            {" "}
                            {moment(exam.appointed_date).format(
                              "MM/DD/YYYY HH:mm"
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
          {props.messageIfEmpty !== "" && (
            <div className="NoResultDiv">{props.messageIfEmpty}</div>
          )}
        </div>
      )}

      <div className="pagi">
        <div className="left" onClick={handleClickLeft}>
          <img src={arrowLeft} alt="arrow left" className="iconLeft" />
          {/* <FaChevronLeft className="iconLeft" /> */}
        </div>
        <div className="right" onClick={handleClickRight}>
          <img src={arrowRight} alt="arrow rigth" className="iconRight" />
          {/* <FaChevronRight className="iconRight" /> */}
        </div>
      </div>
  </>
)}

export default Record;
