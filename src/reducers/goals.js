import { fetchGoals } from "../actions/goals";
import {createReducer} from "@reduxjs/toolkit";

const goals = createReducer([], {
  [fetchGoals]: (state, action) => action.payload
});

export default goals;
