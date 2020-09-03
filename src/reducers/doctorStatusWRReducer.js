import { fromJS } from "immutable";

const initialState = fromJS({
  statusChanged: "",
});

export default function (state = initialState, action) {
  switch (action.type) {
    case "STATUSCHANGEWR":
      // return action.payload;
      return state.set("statusChanged", action.payload);
    default:
      return state;
  }
}
