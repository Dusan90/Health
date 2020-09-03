import { fromJS } from "immutable";

const initialState = fromJS({
  popUp: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case "POPUP":
      // return action.payload;
      return state.set("popUp", true);
    case "POPUPFALSE":
      return state.set("popUp", false);
    default:
      return state;
  }
}
