import { fetchGoals } from '../actions/goals';
import { setLoading } from "../actions/loading";
import {createReducer} from "@reduxjs/toolkit";


const loading = createReducer(true, {
  [fetchGoals]: (state, action) => false,
  [setLoading]: (state, action) => action.payload
});

export default loading;
