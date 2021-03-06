import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "../../assets/main/navbar.scss";
import { NotificationManager } from "react-notifications";
// import doctorOnline from "../../icons/icon_my_profile_doctor_on-line_46px.svg";
// import clientOnline from "../../icons/icon_my_profile_client_on-line_46px.svg";
// import doctorOffline from "../../icons/icon_my_profile_doctor_off-line_46px.svg";
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
  // const location = useLocation()
  // let firstTimelogedIn = true
  const [curentDoc, setcurentDoc] = useState({});
  // let [firstTimeLoged, setFirstTimeLoged] = useState(true)
  const [nameF, setnameF] = useState({});
  const [nameL, setnameL] = useState({});
  const handleSubmit = async (e, value) => {
    sessionStorage.removeItem('firstTime')
    // setFirstTimeLoged(firstTimeLoged= !firstTimeLoged)
    // console.log(firstTimeLoged);
    const access_token = "Bearer ".concat(
      sessionStorage.getItem("accessToken")
    );

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
  form_data.append("speciality", e.speciality);
form_data.append("status", value);
form_data.append("waiting_room_price", '');
form_data.append("waiting_room_currency", '');

form_data.append("web_exam_status", '');
form_data.append("email_exam_status", '');
  form_data.append("waiting_room_status", '');
  form_data.append("web_exam_follow_status", '');


let url = 'https://healthcarebackend.xyz/api/doctor/profile/';

const data = axios.put(url, form_data, {
  headers: {
    'content-type': 'multipart/form-data',
    Authorization: access_token,
  }
})


    const jsonData = await data;
    console.log(jsonData, "profile changed");
    if(jsonData.data.success){
      handleDoctorProfile();
    }
  };


  const handleSubmitClicked = async (e) => {
    let {value} = e.target
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
  form_data.append("speciality", curentDoc.speciality);
form_data.append("status", value);
form_data.append("waiting_room_price", '');
form_data.append("waiting_room_currency", '');

form_data.append("web_exam_status", '');
form_data.append("email_exam_status", '');
  form_data.append("waiting_room_status", '');
  form_data.append("web_exam_follow_status", '');


let url = 'https://healthcarebackend.xyz/api/doctor/profile/';

const data = axios.put(url, form_data, {
  headers: {
    'content-type': 'multipart/form-data',
    Authorization: access_token,
  }
})


    const jsonData = await data;
    if(jsonData.data.success){
      NotificationManager.success("Profile Updated!", "Successful!", 2000);
      handleDoctorProfile();
      sessionStorage.setItem("statusChanged", value);
    }
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
        // location.state && location.state.detail === 'makeItOnline' && firstTimeLoged && 
      sessionStorage.getItem("firstTime") === "true" && sessionStorage.getItem("is_doctor") === "true" && handleSubmit(response.data.data, 'Available');
        return setcurentDoc(response.data.data),
        setnameF(response.data.data.user.first_name),
        setnameL(response.data.data.user.last_name)
      })

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

  // const handleClickImage = (e) => {
  //     window.open(e.target.src)
    
  // }
  // let curDoc = null;
  let selectStatus = null;
  const isDoctor = sessionStorage.getItem("is_doctor");
  if (isDoctor === "true") {
   
    // if(Object.keys(curentDoc).length !== 0){
    //   let doctorsName = `${curentDoc.prefix} ${nameF} ${nameL}`
    //   curDoc = (
    //     <div className="topProfile">
    //       <p>
    //         {doctorsName}
    //       </p>
    //       <div className="mainProfile">
    //         <div className="profile">
    //           {curentDoc.image.includes('default')  ?
    //             curentDoc.status === "Available" ? (
    //             <img src={doctorOnline} alt="online doctor" />
    //           ) : (
    //             <img src={doctorOffline} alt="offline doctor" />
    //           ) :
    //           <img onClick={ (e) => handleClickImage(e)} src={`https://healthcarebackend.xyz${curentDoc.image}`} alt="#"/>
    //           }
              
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
    selectStatus = (
      <select style={{background: curentDoc.status === "Away" ? '#9a9a9a' : curentDoc.status === "Offline" ? 'red' : '#3cb54a' }} name="status" id="status" onChange={handleSubmitClicked}>
        <option value="">{curentDoc.status}</option>
        <option
          value="Available"
          style={{background: 'white', color: '#666666'}}
          hidden={curentDoc.status === "Available" && true}
        >
          Available
        </option>
        <option
        style={{background: 'white', color:'#666666'}}
          defaultValue="Away"
          hidden={curentDoc.status === "Away" && true}
        >
          Away
        </option>
        <option 
        style={{background: 'white', color:'#666666'}}
        value="Offline" 
        hidden={curentDoc.status === "Offline" && true}>
          Offline
        </option>
      </select>
    );
  } else {
    // if(Object.keys(curentDoc).length !== 0){
    //   // if(isDoctor === "true"){
    //   console.log(curentDoc);
    //   // }
    //   curDoc = (
    //     <div className="topProfile">
    //       <p>{`${isDoctor === "false" && nameF} ${ isDoctor === "false" && nameL}`}</p>
    //       <div className="mainProfile">
    //         <div className="profile">


    //           {curentDoc.image.includes('default') ?
    //           <img src={clientOnline} alt="online doctor" />
    //             :
    //           <img onClick={ (e) => handleClickImage(e)}  src={`https://healthcarebackend.xyz${curentDoc.image}`} alt="#"/>
    //           }




    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
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
          {/* <li className="userName">{curDoc}</li> */}
          <li className="selectStatus">{selectStatus}</li>

          {/* <li style={{ fontWeight: "500", marginLeft: "10px" }}>
            <Link to="/logout" onClick={handleLogout}>
              Log Out
            </Link>
          </li> */}
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
