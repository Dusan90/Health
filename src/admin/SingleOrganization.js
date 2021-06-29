import React, { useState, useEffect } from 'react'
import AdminNav from './adminNav'
import Header from '../components/Main/Header'
import Nav from '../components/Main/Navbar'
import Loading from "../icons/c+.svg";
import moment from 'moment'
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import axios from 'axios'



function SingleUser() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [messageIfEmpty, setMessageIfEmpty] = useState('')
  const [messageIfEmptyMembers, setMessageIfEmptyMembers] = useState('')
  const [token, setToken] = useState("");

  const params = useParams();



  useEffect(() => {
    const access_token = "Bearer ".concat(token);

    axios
      .get(`https://healthcarebackend.xyz/api/backoffice/organization/${params.id}/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        console.log(response.data.data);
        setData([response.data.data]);
        //         let start = response.data.data.start_hour ? response.data.data.start_hour.slice(0, -3) : ""
        // let end = response.data.data.end_hour ? response.data.data.end_hour.slice(0, -3) : ""

        //         this.setState({ doctor: [response.data.data], startW: start, endW: end });
      })
      .then(() => {
        //   const bioText = document.querySelector('.bioText')
        //   bioText.style.height = `${bioText.scrollHeight}px`
      });
  }, []);

  return (
    <div>
      <div className="header">
        <div>
          <Header />
          <Nav />
        </div>
      </div>
      <AdminNav />

      <div>
        {data.map((el, index) => <div key={index}>
          <p>{el.name}</p>
          <p>Activation date: {el.Activation_date}</p>
          <p>Status: {el.status}</p>
          <p>Registration number: {el.registration}</p>
        </div>
        )}
      </div>






      <div className='mainClientDashboard'>
        {loading ? (
          <img
            src={Loading}
            className="loading"
            alt="loading..."
            style={{ width: "150px" }}
          />
        ) : (
          <>
            <div className="mainTabel">
              <div className="mainConsultation">
                <div className="icon_left">
                  <p>Consultations</p>
                </div>
              </div>

              <table className="table4">
                <thead className="client-head">
                  <tr className="client-row">
                    <th className="client-doctor">
                      <div className="mainExamDiv">
                        <div className="searchDiv">
                          <span className="examTypetext">Subject </span>
                          <span className="searchIcon"
                          //    onClick={handleDoctorSearch}
                          >
                          </span>
                        </div>
                      </div>
                    </th>
                    <th className="client-subject">Timestamp</th>
                    <th
                      className="client-type"
                    >
                      Type
                    </th>
                    <th
                      className="client-status"
                    >
                      Price
                    </th>
                    <th
                      className="client-status"
                    >
                      From 15/10/2020
                    </th>
                    <th
                      className="client-status"
                    >
                      To 15/11/2020
                    </th>
                    <th
                      className="client-status"
                    >
                      Total amount
                    </th>
                  </tr>
                </thead>
                {messageIfEmpty === "" &&
                  data.map((exam, index) => <tbody key={index} className="client-body">
                    <tr
                      // data-id={exam.id}
                      className="list-group"
                      style={{ fontWeight: exam.isRead && 900 }}
                    //   onClick={() => handleClick(exam)}
                    >
                      <td className="client-doctor">
                        {exam.name}
                      </td>
                      <td className="client-subject1">{exam.Activation_date}</td>
                      <td className="client-subject">{exam.exam_type}</td>
                      <td className="created">
                        {exam.created && !exam.appointed_date ? (
                          <p> {moment(exam.created).format("MM/DD/YY HH:mm")}</p>
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

                        X
                      </td>
                    </tr>
                  </tbody>

                  )}
              </table>
              {messageIfEmpty !== "" && (
                <div className="NoResultDiv">{messageIfEmpty}</div>
              )}


              {data.length > 10 && <div className="pagi">
                <Pagination
                  activePage={page}
                  itemsCountPerPage={10}
                  totalItemsCount={data.length}
                  pageRangeDisplayed={10}
                  //   onChange={handlePageChange()}
                  itemClassLast={'lastPage'}
                  hideFirstLastPages={true}
                />
              </div>}
            </div>

            <div className="mainTabel">
              <div className="mainConsultation">
                <div className="icon_left">
                  <p>Members</p>
                </div>
              </div>

              {<table className="table4">
                <thead className="client-head">
                  <tr className="client-row">
                    <th className="client-doctor">
                      <div className="mainExamDiv">
                        <div className="searchDiv">
                          <span className="examTypetext">Name </span>
                          <span className="searchIcon"
                          //    onClick={handleDoctorSearch}
                          >
                          </span>
                        </div>
                      </div>
                    </th>
                    <th className="client-subject">Status</th>
                    <th
                      className="client-status"

                    >
                    </th>
                  </tr>
                </thead>
                {messageIfEmptyMembers === "" &&
                  data.map((exam, index) => {
                    // if (exam.status === "Accepted" || exam.status === "Appointed") {
                    return (
                      <tbody key={index} className="client-body">
                        <tr
                          // data-id={exam.id}
                          className="list-group"
                          style={{ fontWeight: exam.isRead && 900 }}
                        //   onClick={() => handleClick(exam)}
                        >
                          <td className="client-doctor">
                            {!exam.doctor_name ? exam.doctor : exam.doctor_name}
                          </td>
                          <td className="client-subject1">{exam.subject}</td>
                          <td className="client-status">

                            X
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>}
              {messageIfEmptyMembers !== "" && (
                <div className="NoResultDiv">{messageIfEmptyMembers}</div>
              )}


              {data.length > 10 && <div className="pagi">
                <Pagination
                  activePage={page}
                  itemsCountPerPage={10}
                  totalItemsCount={data.length}
                  pageRangeDisplayed={10}
                  //   onChange={handlePageChange()}
                  itemClassLast={'lastPage'}
                  hideFirstLastPages={true}
                />
              </div>}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SingleUser