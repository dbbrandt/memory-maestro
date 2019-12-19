import { createReducer } from "@reduxjs/toolkit";
import {fetchUsers} from "../actions/users";

export const users = createReducer({}, {
  [fetchUsers]: (state, action) => action.payload
});

export default users;
