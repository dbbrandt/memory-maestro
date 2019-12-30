import { createReducer } from "@reduxjs/toolkit";
import { setGoal, setInteraction } from "../actions/selections";
import {addGoal, deleteGoal, updateGoal} from "../actions/goals";
import {addInteraction, deleteInteraction, updateInteraction} from "../actions/interactions";

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
      if (action.payload.length > 0)
        state.goal = Number(action.payload[0].id);
    },
    [updateGoal]: (state, action) => {
      state.goal = Number(action.payload.id);
    },
    [deleteGoal]: (state, action) => {
      if (state.goal === action)  delete state.goal;
    },
    [addInteraction]: (state, action) => {
      state.interaction = Number(action.payload.id);
    },
    [updateInteraction]: (state, action) => {
      state.interaction = Number(action.payload.id);
    },
    [deleteInteraction]: (state, action) => {
      if (state.goal === action)  delete state.goal;
    }

  }
);

export default selections;
