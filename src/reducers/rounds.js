import { createReducer } from "@reduxjs/toolkit";
import { fetchRounds, fetchRoundResponses } from "../actions/rounds";

const rounds = createReducer([], {
  [fetchRounds]: (state, action) => action.payload,
  [fetchRoundResponses]: (state, action) => {
    const {roundId, responses} = action.payload;
    const index = state.findIndex(r => r.id === roundId);
    if (index !== -1) state[index]["round_responses"] = responses;
  }
});

export default rounds;
