import {createReducer} from "@reduxjs/toolkit";
import { fetchInteractions } from "../actions/interactions";

const interactions = createReducer([], {
  [fetchInteractions]: (state, action) => action.payload
});

export default interactions;
