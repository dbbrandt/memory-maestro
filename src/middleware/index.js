import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { loadingBarMiddleware } from "react-redux-loading-bar";
import logger from "./logger";

const middleware = [loadingBarMiddleware(), ...getDefaultMiddleware(), logger];

export default middleware;
