import {addGoal, deleteGoal, fetchGoals, updateGoal, clearGoals} from "../actions/goals";
import { createReducer } from "@reduxjs/toolkit";

const goals = createReducer(
  {},
  {
    // convert array to map of objects keyed by id
    [clearGoals]: () => ({}),
    [fetchGoals]: (state, action) => {
      action.payload.forEach(goal => (state[goal.id] = goal));
    },
    [addGoal]: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    [updateGoal]: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    [deleteGoal]: (state, action) => {
      delete state[action.payload];
    }
  }
);

export default goals;
