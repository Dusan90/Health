import { combineReducers } from "redux-immutable";
import authReducer from "../reducers/authReducer";
import doctorReducer from "../reducers/doctorReducer";
import subjectReducer from "../reducers/subjectReducer";
import specReducer from "../reducers/specReducer";
import examReducer from "../reducers/examReducer";
import clientReducer from "../reducers/clientReducer";
import docReducer from "../reducers/docReducer";
import popUpReducer from "../reducers/popUpReducer";
import doctorStatusWRReducer from "../reducers/doctorStatusWRReducer";
import trackHistoryReducer from './trackHistoryReducer'
import connectToWebSocketReducer from './connectToWebSocketReducer'

const allReducers = combineReducers({
  authReducer,
  doctorReducer,
  subjectReducer,
  specReducer,
  examReducer,
  clientReducer,
  docReducer,
  popUpReducer,
  doctorStatusWRReducer,
  trackHistoryReducer,
  connectToWebSocketReducer
});

export default allReducers;
