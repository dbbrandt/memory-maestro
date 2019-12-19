import { createReducer } from "@reduxjs/toolkit";
import {setGoal, setInteraction} from "../actions/selections";




export const selections = createReducer({}, {
  [setGoal]: (state, action) => {
      state.goal = action.payload
  },
  [setInteraction]: (state, action) => {
    state.interaction = action.payload
  }
});

export default selections;
