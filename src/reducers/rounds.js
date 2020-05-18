import { createReducer } from "@reduxjs/toolkit";
import { fetchRounds, fetchRoundResponses } from "../actions/rounds";

const rounds = createReducer([], {
  [fetchRounds]: (state, action) => action.payload,
  [fetchRoundResponses]: (state, action) => {
    const {roundId, responses} = action.payload;
    const round_idx = state.findIndex(r => r.id === roundId);
    state[round_idx]["round_responses"] = responses;
  }
});

export default rounds;
