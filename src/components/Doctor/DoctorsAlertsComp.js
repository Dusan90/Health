import React from 'react'
import '../../assets/DoctorsAlerts.scss'
import Header from "../../components/Main/Header";
import Nav from "../../components/Main/Navbar";
// import HamburgerDiv from '../Main/HamburgerDiv';
import moment from 'moment'
import loading from "../../icons/c+.svg";


function DoctorsAlertsComp({handleClick, props, handleDelete }) {
    return (
        <>
        <div className="header">
            <div>
                <Header />
                <Nav />
            </div>
        </div>
        {/* <HamburgerDiv/> */}
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
              <th className="client-doctor">Text</th>
              {/* <th className="client-subject">Subject</th> */}
              <th className="client-type">Type</th>
              <th className="client-date">Time</th>
              <th className="client-trash"></th>
              </tr>
            </thead>
            {props.messageOnScreen === "" &&
              props.exams.map((exam, index) => {
                let text = exam.content.replace('Client', `${exam.sender}`)
                // if (exam.status === "Accepted" || exam.status === "Appointed") {
                return (
                  <tbody key={index} className="client-body">
                    <tr
                      className="list-group"
                      style={{ fontWeight: exam.isRead && 700 }}
                      // onClick={() => handleClick(exam.mail ? exam.mail : exam.video ? exam.video : '', exam.mail ? 'mail' : exam.video ? 'video' : '')}
                    >
                      <td 
                      onClick={() => handleClick(exam.mail ? exam.mail : exam.video ? exam.video : '', exam.mail ? 'mail' : exam.video ? 'video' : '', exam.id)}
                      className="client-doctor">{text}</td>
                      {/* <td
                      onClick={() => handleClick(exam.mail ? exam.mail : exam.video ? exam.video : '', exam.mail ? 'mail' : exam.video ? 'video' : '')}
                      className="client-subject">{exam.subject}</td> */}
                      <td
                      onClick={() => handleClick(exam.mail ? exam.mail : exam.video ? exam.video : '', exam.mail ? 'mail' : exam.video ? 'video' : '', exam.id)}
                      
                      className="client-type">{exam.mail ? 'Mail' : exam.video ? 'Video' : ''}</td>
                      <td
                      onClick={() => handleClick(exam.mail ? exam.mail : exam.video ? exam.video : '', exam.mail ? 'mail' : exam.video ? 'video' : '', exam.id)}
                      
                      className="created">
                      <p> {moment(exam.created).format("MM/DD/YY HH:mm")}</p>
                      </td>
                      <td onClick={() => handleDelete(exam.id)} className="client-trash">X</td>

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
