import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import goals from "./goals";
import interactions from "./interactions";
import loading from "./loading";
import authedUser from "./authedUser";
import users from "./users";

const reducer =  combineReducers({
  authedUser,
  users,
  goals,
  interactions,
  loading,
  loadingBar: loadingBarReducer
});

export default reducer;
