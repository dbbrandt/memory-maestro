import { createReducer } from "@reduxjs/toolkit";
import { setGoal, setInteraction } from "../actions/selections";
import { addGoal } from "../actions/goals";

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
    }
  }
);

export default selections;
