import { fromJS } from "immutable";

const initialState = fromJS({
  connection: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case "WEBSOCKETCONNECTION":
      // return action.payload;
      return state.set("connection", action.payload);
    default:
      return state;
  }
}