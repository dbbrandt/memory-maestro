import { combineReducers } from "redux";
import goals from "./goals";
import interactions from "./interactions";
import loading from "./loading";

export default combineReducers({ goals, interactions, loading });
