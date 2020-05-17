import { createReducer } from "@reduxjs/toolkit";
import {authenticateUser, logoutUser, updateUser} from "../actions/authedUser";

const authedUser = createReducer(null,{
  [authenticateUser]: (state, action) => action.payload,
  [updateUser]: (state, action) => action.payload,
  [logoutUser]: () => null
});

export default authedUser;
