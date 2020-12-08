import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "../../assets/main/navbar.scss";
import { NotificationManager } from "react-notifications";
import doctorOnline from "../../icons/icon_my_profile_doctor_on-line_46px.svg";
import clientOnline from "../../icons/icon_my_profile_client_on-line_46px.svg";
import doctorOffline from "../../icons/icon_my_profile_doctor_off-line_46px.svg";
import axios from "axios";

const Nav = ({
  register,
  login,
  handleLogout,
  isLoggedIn,
  handleDashboardDoctor,
  handleDashboardClient,
  doctor,
  selectValue,
}) => {
  const [curentDoc, setcurentDoc] = useState({});
  const [nameF, setnameF] = useState({});
  const [nameL, setnameL] = useState({});
  const handleSubmit = async (e) => {
    let { value } = e.target;
    const access_token = "Bearer ".concat(
      sessionStorage.getItem("accessToken")
    );
    e.preventDefault();
    let form_data = new FormData();
form_data.append("user.first_name", '');
form_data.append("user.last_name", '');
form_data.append("user.phone", '');
form_data.append("biography", '');
form_data.append("email_exam_price", '');
form_data.append("web_exam_price", '');
form_data.append("web_exam_follow_price", '');
form_data.append("image", '');
form_data.append("organization", '');
form_data.append("start_hour", '');
form_data.append("end_hour", '');
form_data.append("email_currency", '');
  form_data.append("web_currency", '');
  form_data.append("web_follow_up_currency", '');
form_data.append("status", value);


let url = 'https://healthcarebackend.xyz/api/doctor/profile/';

const data = axios.put(url, form_data, {
  headers: {
    'content-type': 'multipart/form-data',
    Authorization: access_token,
  }
})


    console.log('submiting');
    const jsonData = await data;
    console.log(jsonData, "profile changed");
    if(jsonData.data.success){
      NotificationManager.success("Profile Updated!", "Successful!", 2000);
      handleDoctorProfile();
    }
    // const data = await fetch(
    //   `https://healthcarebackend.xyz/api/doctor/profile/`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: access_token,
    //     },
    //     body: JSON.stringify({
    //       first_name: '',
    //             last_name: '',
    //             phone: '',
    //             biography: '',
    //             email_exam_price: parseInt(''),
    //             web_exam_price: parseInt(''),
    //             web_exam_follow_price: parseInt(''),
    //             image: '',
    //             status: value,
    //     }),
    //   }
    // );
    // const jsonData = await data.json();
    // console.log(jsonData);
    // if (jsonData.success) {
    //   NotificationManager.success("Profile Updated!", "Successful!", 2000);
    //   handleDoctorProfile();
    // }
  };

  useEffect(() => {
    if (sessionStorage.getItem("is_doctor") === "true") {
      handleDoctorProfile();
    }else if(sessionStorage.getItem('is_doctor') === 'false'){
      handleClientProfile()
    }
  }, []);
  const handleDoctorProfile = async () => {
    const access_token = "Bearer ".concat(
      sessionStorage.getItem("accessToken")
    );
    axios
      .get(`https://healthcarebackend.xyz/api/doctor/profile/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        return setcurentDoc(response.data.data),
        setnameF(response.data.data.user.first_name),
        setnameL(response.data.data.user.last_name)
      });
  };
  const handleClientProfile = async () => {
    const access_token = "Bearer ".concat(
      sessionStorage.getItem("accessToken")
    );
    axios
      .get(`https://healthcarebackend.xyz/api/client/profile/`, {
        headers: { Authorization: access_token },
      })
      .then((response) => {
        return setcurentDoc(response.data.data),
        setnameF(response.data.data.user.first_name),
        setnameL(response.data.data.user.last_name)
      });
  };

  const handleClickImage = (e) => {
      window.open(e.target.src)
    
  }
  let curDoc = null;
  let selectStatus = null;
  const isDoctor = sessionStorage.getItem("is_doctor");
  if (isDoctor === "true") {
    console.log(curentDoc);
    if(Object.keys(curentDoc).length !== 0){
      let doctorsName = `${curentDoc.prefix} ${nameF} ${nameL}`
      curDoc = (
        <div className="topProfile">
          <p>
            {doctorsName}
          </p>
          <div className="mainProfile">
            <div className="profile">
              {curentDoc.image === "/media/default.jpg" ?
                curentDoc.status === "Available" ? (
                <img src={doctorOnline} alt="online doctor" />
              ) : (
                <img src={doctorOffline} alt="offline doctor" />
              ) :
              <img onClick={ (e) => handleClickImage(e)} style={{ width: '50px',  objectFit: 'cover'}} src={`https://healthcarebackend.xyz${curentDoc.image}`} alt="#"/>
              }
              
            </div>
          </div>
        </div>
      );
    }
    selectStatus = (
      <select name="status" id="status" onChange={handleSubmit}>
        <option value="">{curentDoc.status}</option>
        <option
          value="Available"
          hidden={curentDoc.status === "Available" && true}
        >
          Available
        </option>
        <option
          defaultValue="Away"
          hidden={curentDoc.status === "Away" && true}
        >
          Away
        </option>
        <option value="Offline" hidden={curentDoc.status === "Offline" && true}>
          Offline
        </option>
      </select>
    );
  } else {
    if(Object.keys(curentDoc).length !== 0){
      // if(isDoctor === "true"){
      console.log(curentDoc);
      // }
      curDoc = (
        <div className="topProfile">
          <p>{`${isDoctor === "false" && nameF} ${ isDoctor === "false" && nameL}`}</p>
          <div className="mainProfile">
            <div className="profile">


              {curentDoc.image === "/media/default.jpg" ?
              <img src={clientOnline} alt="online doctor" />
                :
              <img onClick={ (e) => handleClickImage(e)}  style={{ width: '50px',  objectFit: 'cover'}} src={`https://healthcarebackend.xyz${curentDoc.image}`} alt="#"/>
              }




            </div>
          </div>
        </div>
      );
    }
  }
  return (
    <nav className="nav">
      {!isLoggedIn && (
        <ul className="nav navbar-nav ">
          <li className="li-reg">
            <Link to="/register" onClick={register} className="register">
              Sign Up
            </Link>
          </li>
          <li className="li-log">
            <Link to="/login" onClick={login} className="login">
              Log in
            </Link>
          </li>
        </ul>
      )}
      {isLoggedIn && (
        <ul className="nav navbar-nav">
          <li className="userName">{curDoc}</li>
          <li className="selectStatus">{selectStatus}</li>

          <li style={{ fontWeight: "500", marginLeft: "10px" }}>
            <Link to="/logout" onClick={handleLogout}>
              Log Out
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => {
  const user = state.getIn(["authReducer", "user"]);
  const isLoggedIn = state.getIn(["authReducer", "isLoggedIn"]);
  const doctor = state.getIn(["docReducer", "doctor"]);
 
  return {
    user,
    isLoggedIn,
    doctor,
  };
};

export default connect(mapStateToProps)(Nav);
