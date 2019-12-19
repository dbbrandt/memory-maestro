import { createReducer } from "@reduxjs/toolkit";
import {authenticateUser, logoutUser} from "../actions/authedUser";

const authedUser = createReducer(null,{
  [authenticateUser]: (state, action) => action.payload,
  [logoutUser]: (state, action) => null
});

export default authedUser;
