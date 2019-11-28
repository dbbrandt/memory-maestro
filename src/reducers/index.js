import { combineReducers } from "redux";
import goals from "./goals";
import interactions from "./interactions";
import loading from "./loading";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({ goals, interactions, loading, loadingBar: loadingBarReducer });
