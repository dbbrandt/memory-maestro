import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import goals from "./goals";
import interactions from "./interactions";
import loading from "./loading";
import authedUser from "./authedUser";

const reducer =  combineReducers({
  authedUser,
  goals,
  interactions,
  loading,
  loadingBar: loadingBarReducer
});

export default reducer;
