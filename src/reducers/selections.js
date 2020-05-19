import { createReducer } from "@reduxjs/toolkit";
import {setGoal, setInteraction, setSection, setRoundSize, setTextInput} from "../actions/selections";
import {addGoal, deleteGoal, updateGoal} from "../actions/goals";
import {addInteraction, deleteInteraction, updateInteraction} from "../actions/interactions";

const selections = createReducer(
  {section: "goal"},
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
    },
    [setSection]: (state, action) => {
      state.section = action.payload;
    },
    [setRoundSize]: (state, action) => {
      state.roundSize = action.payload;
    },
    [setTextInput]: (state, action) => {
      state.textInput = action.payload;
    }

  }
);

export default selections;
