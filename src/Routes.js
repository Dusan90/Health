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
import { Route } from "react-router-dom";
import { PrivateRoute } from "./components/Routes/PrivateRoute";

export class Routes extends Component {
  render() {
    return (
      <>
        <Route path="/" exact component={Main} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Logout} />

        <PrivateRoute
          path="/dashboard-client"
          exact
          component={ClientDashboard}
        />
        <PrivateRoute
          path="/dashboard-doctor"
          exact
          component={DoctorDashboard}
        />

        <PrivateRoute
          path="/doctor/exam/detail/:id"
          exact
          component={DetailExam}
        />
        <PrivateRoute
          path="/doctor/video/exam/detail/:id"
          exact
          component={DetailVideoExam}
        />
        <PrivateRoute
          path="/doctor/calendar"
          exact
          component={DoctorsCalendar}
        />
        <PrivateRoute
          path="/doctor/exam/correspondence/:id"
          exact
          component={Correspondence}
        />
        <PrivateRoute
          path="/doctor/exam/message/:id"
          exact
          component={DoctorMessage}
        />
        <PrivateRoute path="/doctor/profile/" exact component={DoctorProfile} />
        <PrivateRoute path="/client/doc/:id" exact component={DoctorsProfile} />
        <PrivateRoute
          path="/doctor/record/:id"
          exact
          component={ClientRecord}
        />
        <PrivateRoute
          path="/doctor/processing/video/exam/:id"
          exact
          component={ProcessingVideoExam}
        />
        <PrivateRoute
          path="/client/waiting-room"
          exact
          component={WaitingRoom}
        />

        <PrivateRoute path="/client/profile" exact component={ClientProfile} />
        <PrivateRoute
          path="/client/exam/detail/:id"
          exact
          component={ClientDetailExam}
        />
        <PrivateRoute
          path="/client/video/exam/detail/:id"
          exact
          component={ClientVideoExamDetail}
        />
        <PrivateRoute path="/client/video-request" exact component={VideoReq} />

        <PrivateRoute
          path="/client/exam/correspondence/:id"
          exact
          component={ClientCorrespondence}
        />
        <PrivateRoute path="/doctors-clients" exact component={Clients} />
        <PrivateRoute
          path="/client/exam/message/:id"
          exact
          component={ClientMessage}
        />
        <PrivateRoute path="/initiate" exact component={ExamForm} />
        <Elements>
          <PrivateRoute path="/checkout" exact component={CheckoutForm} />
        </Elements>
        <NotificationContainer />
      </>
    );
  }
}

export default Routes;
