import { createReducer } from "@reduxjs/toolkit";
import { setGoal, setInteraction } from "../actions/selections";
import {addGoal, deleteGoal} from "../actions/goals";

export const selections = createReducer(
  {},
  {
    [setGoal]: (state, action) => {
      state.goal = Number(action.payload);
    },
    [setInteraction]: (state, action) => {
      state.interaction = Number(action.payload);
    },
    [addGoal]: (state, action) => {
      state.goal = Number(action.payload.id);
    },
    [deleteGoal]: (state, action) => {
      if (state.goal === action)  delete state.goal;
    }
  }
);

export default selections;
