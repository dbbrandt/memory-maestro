import {addGoal, fetchGoals, updateGoal} from "../actions/goals";
import {createReducer} from "@reduxjs/toolkit";

const goals = createReducer([], {
  [fetchGoals]: (state, action) => action.payload,
  [addGoal]: (state, action) => state.push(action.payload),
  [updateGoal]: (state, action) => {
    const goalId = action.payload.id
    const index = state.findIndex(goal => goal.id === goalId);
    state[index] = action.payload;
  }
});

export default goals;
