import { createReducer } from "@reduxjs/toolkit";
import {completeRound, startRound, initResults, submitRoundDetail, submitRoundCheck} from "../actions/round";
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
    [submitRoundCheck]: (state, action) => {
      const { goalId, interactionId, answer, correct, score } = action.payload;
      const interactions = state[goalId].interactions;
      const interaction = interactions.filter(i => i.id === interactionId)[0];
      interaction["answer"] = answer;
      interaction["correct"] = correct;
      interaction["score"] = score;
    },
    [submitRoundDetail]: (state, action) => {
      const { goalId, interactionId, roundId, answer, correct, score, review } = action.payload;
      const round = state[goalId];
      const { submitCount, correctCount } = round;
      const interactions = state[goalId].interactions;
      const interaction = interactions.filter(i => i.id === interactionId)[0];
      round["round_id"] = roundId;
      round["submitCount"] = submitCount + 1;
      round["correctCount"] = review ? correctCount + 1 : correctCount;
      interaction["answer"] = answer;
      interaction["correct"] = correct;
      interaction["score"] = score;
      interaction["review"] = review;
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
