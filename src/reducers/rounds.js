import { createReducer } from "@reduxjs/toolkit";
import { fetchRounds, startRound } from "../actions/rounds";

const rounds = createReducer([],{
  [fetchRounds]: (state, action) => action.payload
});

export default rounds;
