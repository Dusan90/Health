import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import SagaMiddlewareProvider from './components/Main/sagaMiddlewareProvider';
import './App.css';
import Main from './containers/Main';
import ClientDashboard from './containers/Client/Dashboard';
import Register from './containers/Register';
import Login from './containers/Login';
import ExamForm from './containers/Client/ExamForm';
import {Elements, StripeProvider} from 'react-stripe-elements';
import authReducer from './reducers/authReducer';

class App extends Component {
  constructor(props){
    super(props);

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
      authReducer,
      applyMiddleware(sagaMiddleware)
    );
    
    store.runSaga = sagaMiddleware.run;
    this.sagaMiddleware = sagaMiddleware;
    this.store = store
  
  }
  render(){
      return (
        <div className="App">
           <StripeProvider apiKey="pk_test_fpfsU7cPFh5Gc4PA7Mf5Ut7F009TLATkHK"> 
            <ReduxProvider store={this.store}>
              <SagaMiddlewareProvider sagaMiddleware={this.sagaMiddleware}>       
                <Router>
                  <Route path="/" exact component={Main}/>
                  <Route path="/register" exact component={Register} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/dashboard" exact component={ClientDashboard} />
                  <Route path="/initiate" exact component={ExamForm} />
                  {/* <Elements>
                    <Route path="/checkout" exact component={Payment} />
                  </Elements> */}
                </Router>
              </SagaMiddlewareProvider>
            </ReduxProvider>
          </StripeProvider>
        </div>
    );
  }
}

export default App;
