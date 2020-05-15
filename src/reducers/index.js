import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import goals from "./goals";
import interactions from "./interactions";
import loading from "./loading";
import authedUser from "./authedUser";
import rounds from "./rounds";
import round from "./round";
import selections from "./selections";


const reducer =  combineReducers({
  authedUser,
  selections,
  goals,
  interactions,
  rounds,
  round,
  loading,
  loadingBar: loadingBarReducer
});

export default reducer;
