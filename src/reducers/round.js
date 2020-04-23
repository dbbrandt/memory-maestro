import { createReducer} from "@reduxjs/toolkit";
import { startRound } from '../actions/round';

const round = createReducer([], {
    [startRound]: (state, action) => action.payload
  }
);

export default round;
