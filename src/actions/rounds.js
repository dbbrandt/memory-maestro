import { createAction } from '@reduxjs/toolkit';
import Api from "../utils/api";
import {setLoading} from "./loading";
import {hideLoading, showLoading} from "react-redux-loading-bar";

export const fetchRounds = createAction('FETCH_ROUNDS');
export const fetchRoundResponses = createAction("FETCH_ROUND_RESPONSES");

export const handleFetchRounds = (id) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(showLoading());
    Api.fetchRounds(id)
      .then((rounds) => {
        dispatch(fetchRounds(rounds));
        dispatch(setLoading(false));
        dispatch(hideLoading());
      })
      .catch(error => {
        alert('Failed to fetch rounds! Try Again.');
        console.log('Failed to fetch goal rounds! Try again.', error);
      })
  }
};


export const handleFetchRoundResponses = (goalId, roundId) => {
  return dispatch => {
    dispatch(setLoading(true));
    dispatch(showLoading());
    Api.fetchRoundResponses(goalId, roundId)
      .then(responses => {
        dispatch(fetchRoundResponses({ roundId, responses }));
        dispatch(setLoading(false));
        dispatch(hideLoading());
      })
      .catch(error => {
        alert("Failed to fetch round response! Try Again.");
        console.log("Failed to round response! Try again.", error);
      });
  };
};
