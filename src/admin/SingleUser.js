import React, { useState, useEffect } from "react";
import AdminNav from "./adminNav";
import './main.scss'
import Header from "../components/Main/Header";
import Nav from "../components/Main/Navbar";
import Loading from "../icons/c+.svg";
import moment from "moment";
import Pagination from "react-js-pagination";
import axios from "axios";
import { useParams } from "react-router-dom";

function SingleUser() {
  // const data = [
  //   {
  //     name: "duca",
  //     Activation_date: "12/23/22",
  //     status: "Active",
  //     registration: "2342342342",
  //     biography:
  //       "asdfasdfasdfasdfasdfasdfasdfas;dflkajs;dlfkjas;dlfkja;sldjkfa;sldjf;asldkjfa;slkdjf;aslkdjf;asldkjf;aslkdjf;aslkdjf;aslkdfj;asldkjf;asldjf;asldjfa;sldkjf;asldfj;asldjf;asldjf",
  //   },
  // ];
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [messageIfEmpty, setMessageIfEmpty] = "";
  const params = useParams();
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const access_token = "Bearer ".concat(token);

    axios
      .get(`https://healthcarebackend.xyz/api/client/doc/${params.id}/`, {
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

      <div
        style={{
          width: "calc(100% - 480px)",
          margin: "110px 0px 0px 360px",
          textAlign: "start",
        }}
      >
        {data.map((el, index) => (
          <div style={{ fontSize: "17px" }} key={index}>
            <p style={{ fontWeight: "900", fontSize: "17px" }}>{el.doctor}</p>
            <p>Activation date: {el.Activation_date}</p>
            <p>Status: {el.status}</p>
            <p>Registration number: {el.registration}</p>
            <p >Biography: </p>
            {el.biography && <textarea style={{ width: '100%', height: '150px', resize: 'none', padding: '10px' }} defaultValue={el.biography}></textarea>}
          </div>
        ))}
      </div>

      <div className="mainClientDashboard" style={{ marginTop: "80px" }}>
        {loading ? (
          <img
            src={Loading}
            className="loading"
            alt="loading..."
            style={{ width: "150px" }}
          />
        ) : (
          <div className="mainTabel">
            <div className="mainConsultation">
              <div className="icon_left">
                <p>Consultations</p>
              </div>
            </div>

            <table className="table4">
              <thead className="client-head" >
                <tr className="client-row">
                  <th className="client-doctor2" style={{ textIndent: '30px' }}>Subject</th>
                  <th className="client-subject2">Timestamp</th>
                  <th className="client-type2">Type</th>
                  <th className="client-status2">Price</th>
                  <th className="client-status2">From 15/10/2020</th>
                  <th className="client-status2">To 15/11/2020</th>
                  <th className="client-status2">Total amount</th>
                </tr>
              </thead>
              {messageIfEmpty === "" &&
                data.map((exam, index) => (
                  <tbody key={index} className="client-body">
                    <tr
                      // data-id={exam.id}
                      className="list-group"
                      style={{ fontWeight: exam.isRead && 900 }}
                    //   onClick={() => handleClick(exam)}
                    >
                      <td className="client-doctor">{exam.name}</td>
                      <td className="client-subject1">{exam.Activation_date}</td>
                      <td className="client-subject">{exam.exam_type}</td>
                      <td className="created">{exam.created}</td>
                      <td className="created">{exam.created}</td>
                      <td className="created">{exam.created}</td>
                      <td className="created">{exam.created}</td>
                    </tr>
                  </tbody>
                ))}
            </table>
            {messageIfEmpty !== "" && (
              <div className="NoResultDiv">{messageIfEmpty}</div>
            )}

            {data.length > 10 && (
              <div className="pagi">
                <Pagination
                  activePage={page}
                  itemsCountPerPage={10}
                  totalItemsCount={data.length}
                  pageRangeDisplayed={10}
                  //   onChange={handlePageChange()}
                  itemClassLast={"lastPage"}
                  hideFirstLastPages={true}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleUser;
