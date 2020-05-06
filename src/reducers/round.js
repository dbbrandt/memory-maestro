import { createReducer } from "@reduxjs/toolkit";
import {completeRound, startRound, initResults, submitRoundDetail } from "../actions/round";

const InitialResults = {
  round_id: 0,
  submitCount: 0,
  correctCount: 0,
  attemptCount: 0,
  completionCount: 0
};

const round = createReducer(
  {},
  {
    [startRound]: (state, action) => {
      const { goal_id, interactions } = action.payload;
      const attemptCount = state[goal_id] ? state[goal_id].attemptCount : 0;
      state[goal_id] = {
        ...InitialResults,
        ...state[goal_id],
        attemptCount: attemptCount + 1,
        interactions
      };
    },
    [submitRoundDetail]: (state, action) => {
      const { goal_id, correct } = action.payload;
      const { submitCount, correctCount } = state[goal_id];
      state[goal_id] = {
        ...state[goal_id],
        submitCount: submitCount + 1,
        correctCount: correct ? correctCount + 1 : correctCount
      }
    },
    [completeRound]: (state, action) => {
      const { goal_id } = action.payload;
      const { completionCount } = state[goal_id];
      state[goal_id] = {
        ...state[goal_id],
        completionCount: completionCount + 1
      };
    },
    [initResults]: (state, action) => {
      const { goal_id } = action.payload;
      state[goal_id] = {
        ...state[goal_id],
        ...InitialResults
      };
    }
  }
);

export default round;
