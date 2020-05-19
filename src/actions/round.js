import { createAction } from "@reduxjs/toolkit";
import Api from "../utils/api";
import { setLoading } from "./loading";
import { hideLoading, showLoading } from "react-redux-loading-bar";

export const startRound = createAction("START_ROUND");
export const submitRoundCheck = createAction("SUBMIT_ROUND_CHECK");
export const submitRoundDetail = createAction("SUBMIT_ROUND_DETAIL");
export const completeRound = createAction("COMPLETE_ROUND");
export const initResults = createAction("INIT_RESULTS");

export const handleStartRound = (goalId, size) => {
  return dispatch => {
    dispatch(setLoading(true));
    dispatch(showLoading());
    Api.startRound(goalId, size)
      .then(interactions => {
        dispatch(startRound({ goalId, interactions }));
        dispatch(setLoading(false));
        dispatch(hideLoading());
      })
      .catch(error => {
        alert("Failed to start round! Try Again.");
        console.log("Failed to start round! Try again.", error);
      });
  };
};

export const handleSubmitRoundCheck = (goalId, interactionId, answer) => {
  return dispatch => {
    Api.checkAnswer(goalId, interactionId, answer)
      .then(result => {
        const { correct, score } = result;
        dispatch(submitRoundCheck({ goalId, interactionId, answer, correct, score }));
      })
      .catch(error => {
        alert("Failed to check answer! Try Again.");
        console.log("Failed to check answer! Try again.", error);
      })
  }
};

export const handleSubmitRoundDetail = (goalId, interactionId, round, answer, correct, score, review) => {
  return dispatch => {
    Api.submitReview(goalId, interactionId , round.round_id, answer, correct, score, review)
      .then(roundId => {
        dispatch(submitRoundDetail({goalId, interactionId, roundId, answer, correct, score, review}));
      })
      .catch(error => {
        alert("Failed to submit response! Try Again.");
        console.log("Failed to submit response! Try again.", error);
      })
  };
};
