import React, { Component } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { createStore } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import SagaMiddlewareProvider from "./components/Main/sagaMiddlewareProvider";
import "./App.css";
import { StripeProvider } from "react-stripe-elements";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLogin, userLoggedIn } from "./actions/authActions";
import "react-notifications/lib/notifications.css";
import allReducers from "./reducers";
import Routes from "./Routes";
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);

    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(allReducers, composeWithDevTools());
    store.runSaga = sagaMiddleware.run;
    this.sagaMiddleware = sagaMiddleware;
    this.store = store;
  }
  
  componentDidMount() {
    this.checkUser();
    window.addEventListener("beforeunload", (ev) => {  
      ev.preventDefault();
      this.handleSubmit()
  })
  }

  handleSubmit = async () => {
    // let { value } = e.target;
    const access_token = "Bearer ".concat(
      sessionStorage.getItem("accessToken")
    );
    // e.preventDefault();
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
  form_data.append("speciality", '');
form_data.append("status", "Offline");
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


    console.log('submiting');
    const jsonData = await data;
    console.log(jsonData, "profile changed");
    if(jsonData.data.success){
    }
  };


  componentDidUpdate() {
    this.checkUser();
  }

  checkUser = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const expiresIn = sessionStorage.getItem("expiresIn");
    const isDoctor = sessionStorage.getItem("is_doctor");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && expiresIn && refreshToken) {
      this.store.dispatch(
        userLogin({
          access_token: accessToken,
          expires_in: expiresIn,
          refresh_token: refreshToken,
          is_doctor: isDoctor,
        })
      );
      this.store.dispatch(userLoggedIn());
    }
  };

  render() {
    return (
      <div className="App">
        <StripeProvider apiKey="pk_test_EolntZ7skKXUqmWzbnpuo1zy00ZxWVnWf3">
          <ReduxProvider store={this.store}>
            <SagaMiddlewareProvider sagaMiddleware={this.sagaMiddleware}>
              <Router>
                <Routes />
              </Router>
            </SagaMiddlewareProvider>
          </ReduxProvider>
        </StripeProvider>
      </div>
    );
  }
}

export default App;
