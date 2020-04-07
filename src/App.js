import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
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
  }

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
          is_doctor: isDoctor
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
