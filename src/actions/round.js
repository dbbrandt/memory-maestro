import { createAction } from "@reduxjs/toolkit";
import Api from "../utils/api";
import { setLoading } from "./loading";
import { hideLoading, showLoading } from "react-redux-loading-bar";

export const startRound = createAction("START_ROUND");
export const submitRoundDetail = createAction("SUBMIT_ROUND_DETAIL");
export const completeRound = createAction("COMPLETE_ROUND");
export const initResults = createAction("INIT_RESULTS");

export const handleStartRound = (goal_id, size) => {
  return dispatch => {
    dispatch(setLoading(true));
    dispatch(showLoading());
    Api.startRound(goal_id, size)
      .then(interactions => {
        dispatch(startRound({goal_id, interactions}));
        dispatch(setLoading(false));
        dispatch(hideLoading());
      })
      .catch(error => {
        alert("Failed to start round! Try Again.");
        console.log("Failed to start round! Try again.", error);
      });
  };
};

export const handleRoundDetail = (goal_id, round, correct ) => {
  return dispatch => {
    dispatch(submitRoundDetail({goal_id, correct}))
  }
};
