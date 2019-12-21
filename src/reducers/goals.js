import {addGoal, fetchGoals} from "../actions/goals";
import {createReducer} from "@reduxjs/toolkit";

const goals = createReducer([], {
  [fetchGoals]: (state, action) => action.payload,
  [addGoal]: (state, action) => {
    console.log('AddGoal Reducer goal: ', action.payload);
    state.push(action.payload)
  }
});

export default goals;
