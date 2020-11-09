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
import DoctorProfile from "./containers/Doctor/Profile";
import DoctorsProfile from "./containers/Doctor/DoctorsProfile";
import ClientProfile from "./containers/Client/Profile";
import DetailVideoExam from "./containers/Doctor/DetailVideoExam";
import ProcessingVideoExam from "./containers/Doctor/ProcessingVideoExam";
import ClientRecord from "./containers/Doctor/Record";
import VideoReq from "./containers/Client/VideoReq";
import ClientVideoExamDetail from "./containers/Client/ClientVideoExamDetail";
import ClientQueueExamDetail from "./containers/Client/ClientQueueExamDetail";
import ClientDetailExam from "./containers/Client/DetailExam";
import ForgotPass from "./containers/Login/forgotPass";
import ChangePass from "./containers/Login/changePass";
import Activate from "./containers/Login/activate";
import { Elements } from "react-stripe-elements";
import Clients from "./containers/Doctor/Clients";
import WaitingRoom from "./containers/Client/WaitingRoom";
import DoctorsCalendar from "./containers/Doctor/DoctorsCalendar";
import DoctorsEmailList from "./containers/Doctor/DoctorsEmailList";
import DoctorsVideoList from "./containers/Doctor/DoctorsVideoList";
import DoctorsQueueList from "./containers/Doctor/DoctorsQueueList";
import { NotificationContainer } from "react-notifications";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/Routes/PrivateRoute";
import { PrivateRouteDoctor } from "./components/Routes/PrivateRouteDoctor";
import Settings from "./containers/Doctor/Settings";
import UpdateSettings from './containers/Doctor/UpdateSettings'
import ClientSettings from './containers/Client/Settings'
import ClientUpdateSettings from './containers/Client/UpdateSettings'
import DoctorsList from "./containers/Client/DoctorsList";
import DoctorsDetails from "./containers/Client/DoctorsDetails";
import Verification from './VerificationInfo'
import Room from './Room'
// import NotFound from "./containers/Home/NotFound";

export class Routes extends Component {
  render() {
    return (
      <>
        <Switch />
        <Route path="/" exact component={Main} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/forgot-password" exact component={ForgotPass} />
        <Route path="/Verification" exact component={Verification} />

        <Route
          path="/api/auth/reset-confirm/:id/"
          exact
          component={ChangePass}
        />
        <Route path="/room/:roomID" exact component={Room} />

        <Route path="/api/auth/activate/:id/" exact component={Activate} />

        <PrivateRoute
          exact
          path="/dashboard-client"
          component={ClientDashboard}
        />

        <PrivateRoute path="/client/doc/:id" exact component={DoctorsProfile} />

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
        <PrivateRoute
          path="/client/queue/exam/detail/:id"
          exact
          component={ClientQueueExamDetail}
        />
         <PrivateRoute
          path="/client-update"
          exact
          component={ClientUpdateSettings}
        />
          <PrivateRoute
          path="/client-settings"
          exact
          component={ClientSettings}
        />
        <PrivateRoute path="/client/video-request" exact component={VideoReq} />
        <PrivateRoute path="/client/Doctor-list" exact component={DoctorsList} />
        <PrivateRoute path="/client/Doctor-detail/:id/" exact component={DoctorsDetails} />

        <PrivateRoute path="/initiate" exact component={ExamForm} />
        <Elements>
          <PrivateRoute path="/checkout" exact component={CheckoutForm} />
        </Elements>

        <PrivateRouteDoctor
          path="/dashboard-doctor"
          exact
          component={DoctorDashboard}
        />

        <PrivateRouteDoctor
          path="/doctor/calendar"
          exact
          component={DoctorsCalendar}
        />
        <PrivateRouteDoctor
          path="/doctor/exam/detail/:id"
          exact
          component={DetailExam}
        />
        <PrivateRouteDoctor
          path="/doctor/video/exam/detail/:id"
          exact
          component={DetailVideoExam}
        />

        <PrivateRouteDoctor
          path="/doctor/profile/"
          exact
          component={DoctorProfile}
        />
        <PrivateRouteDoctor
          path="/doctor/record/:id"
          exact
          component={ClientRecord}
        />
        <PrivateRouteDoctor
          path="/doctor/processing/video/exam/:id"
          exact
          component={ProcessingVideoExam}
        />
        <PrivateRouteDoctor path="/doctors-clients" exact component={Clients} />
        <PrivateRouteDoctor
          path="/doctors-email-list"
          exact
          component={DoctorsEmailList}
        />
        <PrivateRouteDoctor
          path="/doctors-video-list"
          exact
          component={DoctorsVideoList}
        />
        <PrivateRouteDoctor
          path="/doctors-queue-list"
          exact
          component={DoctorsQueueList}
        />
         <PrivateRouteDoctor
          path="/doctors-settings"
          exact
          component={Settings}
        />
           <PrivateRouteDoctor
          path="/doctors-update"
          exact
          component={UpdateSettings}
        />

        <NotificationContainer />
        {/* <Route component={NotFound} /> */}
        {/* <Route path="/404" component={NotFound} />
        <Redirect to="/404" /> */}
        <Switch />
      </>
    );
  }
}

export default Routes;
