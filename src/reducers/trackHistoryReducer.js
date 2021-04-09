import { fromJS } from "immutable";

const initialState = fromJS({
  history: "",
});

export default function (state = initialState, action) {
  switch (action.type) {
    case "HISTORY":
      return state.set("history", action.payload);
    default:
      return state;
  }
}