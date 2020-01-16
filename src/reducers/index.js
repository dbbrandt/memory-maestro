import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import goals from "./goals";
import interactions from "./interactions";
import loading from "./loading";
import authedUser from "./authedUser";
import users from "./users";
import rounds from "./rounds";
import selections from "./selections";


const reducer =  combineReducers({
  authedUser,
  selections,
  users,
  goals,
  interactions,
  rounds,
  loading,
  loadingBar: loadingBarReducer
});

export default reducer;
