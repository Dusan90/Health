import React from 'react'
import '../../assets/DoctorsAlerts.scss'
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
import HamburgerDiv from '../Main/HamburgerDiv';
import moment from 'moment'
import loading from "../../icons/c+.svg";


function DoctorsAlertsComp({handleClick, props }) {
    return (
        <>
        <div className="header">
            <div>
                <Header />
                <Nav />
            </div>
        </div>
        <HamburgerDiv/>
        <div className="mainDoctorAlerts">
       <div className="iconAlert">
         {/* <img src={iconVideoBlue} alt="email" /> */}
         <h4>Doctors alerts</h4>{" "}
       </div>
       {props.loading ? (
        <img src={loading} alt="loading" className="loading" />
      ) : (
        <div className="tableDiv">
          <table className="table2">
            <thead className="client-head">
              <tr className="client-row">
                <th className="client-doctor">Alert</th>
                <th className="client-date">Date</th>
                <th className="client-trash"></th>
              </tr>
            </thead>
            {props.messageOnScreen === "" &&
              props.exams.map((exam, index) => {
                // if (exam.status === "Accepted" || exam.status === "Appointed") {
                return (
                  <tbody key={index} className="client-body">
                    <tr
                      className="list-group"
                      style={{ fontWeight: exam.isRead && 700 }}
                      onClick={() => handleClick(exam.id, exam.exam_type)}
                    >
                      <td className="client-doctor">{exam.client}</td>
                      <td className="created">
                      <p> {moment(exam.created).format("MM/DD/YY")}</p>
                        {/* {exam.created && !exam.appointed_date ? (
                          <p> {moment(exam.created).format("MM/DD/YY")}</p>
                        ) : exam.appointed_date ? (
                          <p>
                            {" "}
                            {moment(exam.appointed_date).format(
                              "MM/DD/YY HH:mm"
                            )}
                          </p>
                        ) : null} */}
                      </td>
                      <td className="client-trash">tra</td>

                    </tr>
                  </tbody>
                );
              })}
          </table>
          {props.messageOnScreen !== "" && (
            <div className="NoResultDiv">{props.messageOnScreen}</div>
          )}
        </div>
      )}
    </div>
        </>
    )
}

export default DoctorsAlertsComp
