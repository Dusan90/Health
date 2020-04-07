import React, { Component } from "react";
import Main from "./containers/Home/Home";
import ClientDashboard from "./containers/Client/Dashboard";
import DoctorDashboard from "./containers/Doctor/Dashboard";
import DetailExam from "./containers/Doctor/DetailExam";
import Register from "./containers/Register/register";
import Login from "./containers/Login/login";
import Logout from "./containers/Logout/logout";
import ExamForm from "./containers/Client/ExamForm";
import CheckoutForm from "./containers/Client/CheckoutForm";
import Correspondence from "./containers/Doctor/Correspondence";
import DoctorMessage from "./containers/Doctor/Message";
import DoctorProfile from "./containers/Doctor/Profile";
import DoctorsProfile from "./containers/Doctor/DoctorsProfile";
import ClientProfile from "./containers/Client/Profile";
import DetailVideoExam from "./containers/Doctor/DetailVideoExam";
import ProcessingVideoExam from "./containers/Doctor/ProcessingVideoExam";
import ClientRecord from "./containers/Doctor/Record";
import VideoReq from "./containers/Client/VideoReq";
import ClientVideoExamDetail from "./containers/Client/ClientVideoExamDetail";
import ClientDetailExam from "./containers/Client/DetailExam";
import ClientCorrespondence from "./containers/Client/Correspondence";
import ClientMessage from "./containers/Client/Message";
import { Elements } from "react-stripe-elements";
import Clients from "./containers/Doctor/Clients";
import WaitingRoom from "./containers/Client/WaitingRoom";
import DoctorsCalendar from "./containers/Doctor/DoctorsCalendar";
import { NotificationContainer } from "react-notifications";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PrivateRoute } from "./components/Routes/PrivateRoute";

export class Routes extends Component {
  render() {
    return (
      <>
        <Route path="/" exact component={Main} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Logout} />

        <Route path="/dashboard-client" exact component={ClientDashboard} />
        <Route path="/dashboard-doctor" exact component={DoctorDashboard} />

        <Route path="/doctor/exam/detail/:id" exact component={DetailExam} />
        <Route
          path="/doctor/video/exam/detail/:id"
          exact
          component={DetailVideoExam}
        />
        <Route path="/doctor/calendar" exact component={DoctorsCalendar} />
        <Route
          path="/doctor/exam/correspondence/:id"
          exact
          component={Correspondence}
        />
        <Route
          path="/doctor/exam/message/:id"
          exact
          component={DoctorMessage}
        />
        <Route path="/doctor/profile/" exact component={DoctorProfile} />
        <Route path="/client/doc/:id" exact component={DoctorsProfile} />
        <Route path="/doctor/record/:id" exact component={ClientRecord} />
        <Route
          path="/doctor/processing/video/exam/:id"
          exact
          component={ProcessingVideoExam}
        />
        <Route path="/client/waiting-room" exact component={WaitingRoom} />

        <Route path="/client/profile" exact component={ClientProfile} />
        <Route
          path="/client/exam/detail/:id"
          exact
          component={ClientDetailExam}
        />
        <Route
          path="/client/video/exam/detail/:id"
          exact
          component={ClientVideoExamDetail}
        />
        <Route path="/client/video-request" exact component={VideoReq} />

        <Route
          path="/client/exam/correspondence/:id"
          exact
          component={ClientCorrespondence}
        />
        <Route path="/doctors-clients" exact component={Clients}></Route>
        <Route
          path="/client/exam/message/:id"
          exact
          component={ClientMessage}
        />
        <Route path="/initiate" exact component={ExamForm} />
        <Elements>
          <Route path="/checkout" exact component={CheckoutForm} />
        </Elements>
        <NotificationContainer />
      </>
    );
  }
}

const mapStateToProps = state => {
  const isLoggedIn = state.getIn(["authReducer", "isLoggedIn"]);

  return {
    isLoggedIn
  };
};

export default connect(mapStateToProps)(Routes);
