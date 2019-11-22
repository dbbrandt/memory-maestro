import { combineReducers } from "redux";
import goals from "./goals";
import loading from "./loading";

export default combineReducers({ goals, loading });
