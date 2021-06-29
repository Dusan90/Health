import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './main.scss'
import AdminNav from "./adminNav";
import Header from "../components/Main/Header";
import Nav from "../components/Main/Navbar";
import Loading from "../icons/c+.svg";
import moment from "moment";
import SingleUser from "./SingleUser";
import Pagination from "react-js-pagination";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";


function Admin({ }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [messageIfEmpty, setMessageIfEmpty] = useState("");
  const [drawerClick, setDrawerClick] = useState("Drawer1");
  const [organizations, setOrganizations] = useState([]);
  const [token, setToken] = useState("");
  const [paginatedExam, setPaginatedExam] = useState([])
  const params = useParams();
  const location = useLocation();



  const history = useHistory();

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    paginate(pageNumber);
  };

  const paginate = (page) => {
    if (data.length !== 0) {
      let limit = 10;
      let pages = Math.ceil(data.length / 10);
      const offset = (page - 1) * limit;
      const newArray = data.slice(offset, offset + limit);
      const sorted = newArray.sort((a, b) => a - b)
      setPaginatedExam(sorted)
      //   this.setState({
      //     paginatedExams: sorted,
      //     loading: false,
      //     maxPages: pages,
      //   });
    }
  };
  useEffect(() => {
    axios
      .get("https://healthcarebackend.xyz/api/doctor/list/")
      .then((response) => {
        console.log(response, "examform2");
        if (response.data.data) {
          setData(response.data.data);
          setMessageIfEmpty("");
        } else {
          setMessageIfEmpty("No users");
        }
      })
      .catch((error) => {
        console.log(error);
        setMessageIfEmpty("No users");
      });

    paginatedExams();
  }, []);

  useEffect(() => {
    location.state?.pageChanged && setDrawerClick(location.state?.pageChanged)
    setPage(1)
  }, [location])

  const paginatedExams = async () => {
    const access_token = "Bearer ".concat(token);
    axios
      .get(`https://healthcarebackend.xyz/api/exams/doctor/`, {
        headers: { Authorization: access_token },
      })
      .then((res) => {
        console.log(res);
      });
  };


  const whatToRender = paginatedExam?.length !== 0 ? paginatedExam : data

  return (
    <div>
      <div className="header">
        <div>
          <Header />
          <Nav />
        </div>
      </div>
      <AdminNav drawerClick={drawerClick} />
      <div className="mainClientDashboard">
        {loading ? (
          <img
            src={Loading}
            className="loading"
            alt="loading..."
            style={{ width: "150px" }}
          />
        ) : (
          <div className="mainTabel">
            <div className="mainConsultation" style={{ color: 'white', textIndent: '30px', fontWeight: 'bold' }}>
              {drawerClick === 'Drawer1' ? "Single users" : drawerClick === 'Drawer2' ? "Organizations" : ''}
            </div>

            {drawerClick === "Drawer1" && (
              <table className="table3">
                <thead className="client-head">
                  <tr className="client-row">
                    <th className="client-doctor">
                      <div className="mainExamDiv">
                        <div className="searchDiv" >
                          <span className="examTypetext">Name </span>
                          {/* <span
                            className="searchIcon"
                          //    onClick={handleDoctorSearch}
                          ></span> */}
                        </div>
                      </div>
                    </th>
                    <th className="client-subject">Status</th>
                    <th className="client-type">Email</th>
                    <th className="client-status"></th>
                  </tr>
                </thead>
                {messageIfEmpty === "" &&
                  whatToRender.map((exam, index) => {
                    // if (exam.status === "Accepted" || exam.status === "Appointed") {
                    return (
                      <tbody key={index} className="client-body">
                        <tr
                          // data-id={exam.id}
                          className="list-group"
                          style={{ fontWeight: exam.isRead && 900 }}
                          onClick={() => history.push({
                            pathname: `/user/${exam.id}`
                          })}
                        >
                          <td className="client-doctor">
                            {!exam.doctor_name ? exam.doctor : exam.doctor_name}
                          </td>
                          <td className="client-subject1">{exam.status}</td>
                          <td className="client-subject">nekitamo@gmail.com</td>
                          {/* <td className="client-subject">{exam.email}</td> */}
                          <td className="client-status" style={{ color: 'red' }}>X</td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            )}
            {drawerClick === "Drawer2" && (
              <table className="table4">
                <thead className="client-head">
                  <tr className="client-row">
                    <th className="client-doctor2" style={{ textIndent: '30px' }}>
                      Name
                    </th>
                    <th className="client-subject2">Status</th>
                    <th className="client-status2"></th>
                  </tr>
                </thead>
                {messageIfEmpty === "" &&
                  organizations.map((exam, index) => {
                    // if (exam.status === "Accepted" || exam.status === "Appointed") {
                    return (
                      <tbody key={index} className="client-body">
                        <tr
                          // data-id={exam.id}
                          className="list-group"
                          style={{ fontWeight: exam.isRead && 900 }}
                          onClick={() => history.push({
                            pathname: `/user/${exam.id}`
                          })}
                        >
                          <td className="client-doctor">
                            {!exam.doctor_name ? exam.doctor : exam.doctor_name}
                          </td>
                          <td className="client-subject1">{exam.status}</td>
                          <td className="client-status" style={{ color: 'red' }}>X</td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            )}
            {messageIfEmpty !== "" && (
              <div className="NoResultDiv">{messageIfEmpty}</div>
            )}


          </div>
        )}
        {data?.length > 10 && drawerClick === 'Drawer1' && (
          <div className="pagi">
            <Pagination
              activePage={page}
              itemsCountPerPage={10}
              totalItemsCount={data.length}
              pageRangeDisplayed={10}
              onChange={handlePageChange}
              itemClassLast={"lastPage"}
              hideFirstLastPages={true}
            />
          </div>
        )}
        {organizations?.length > 10 && drawerClick === 'Drawer2' && (
          <div className="pagi">
            <Pagination
              activePage={page}
              itemsCountPerPage={10}
              totalItemsCount={organizations.length}
              pageRangeDisplayed={10}
              onChange={handlePageChange}
              itemClassLast={"lastPage"}
              hideFirstLastPages={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
