import { createReducer } from "@reduxjs/toolkit";
import {fetchUsers, addUser } from "../actions/users";

export const users = createReducer({}, {
  [fetchUsers]: (state, action) => action.payload,
  [addUser]: (state, action) => (
    {
      ...state,
      [action.payload.id]: action.payload
    })
});

export default users;
