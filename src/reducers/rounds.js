import { createReducer } from "@reduxjs/toolkit";
import {fetchRounds} from "../actions/rounds";

const rounds = createReducer([],{
  [fetchRounds]: (state, action) => action.payload
});

export default rounds;
