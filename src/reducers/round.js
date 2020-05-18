import { createReducer } from "@reduxjs/toolkit";
import {completeRound, startRound, initResults, submitRoundDetail } from "../actions/round";
import {fetchRoundResponses} from "../actions/rounds";

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
      const { goalId, interactions } = action.payload;
      const attemptCount = state[goalId] ? state[goalId].attemptCount : 0;
      state[goalId] = {
        ...InitialResults,
        ...state[goalId],
        round_id: 0,
        attemptCount: attemptCount + 1,
        interactions
      };
    },
    [submitRoundDetail]: (state, action) => {
      const { goalId, roundId, correct } = action.payload;
      const { submitCount, correctCount } = state[goalId];
      state[goalId] = {
        ...state[goalId],
        round_id: roundId,
        submitCount: submitCount + 1,
        correctCount: correct ? correctCount + 1 : correctCount
      }
    },
    [completeRound]: (state, action) => {
      const { goalId } = action.payload;
      const { completionCount } = state[goalId];
      state[goalId] = {
        ...state[goalId],
        completionCount: completionCount + 1
      };
    },
    [initResults]: (state, action) => {
      const { goalId } = action.payload;
      state[goalId] = {
        ...state[goalId],
        ...InitialResults
      };
    },
    [fetchRoundResponses]: (state, action) => {
      const { goalId, roundId, responses} = action.payload;
      if (state[goalId] && state[goalId].round_id === roundId) {
        state[goalId]["round_responses"] = responses;
      }
    }
  }
);

export default round;
