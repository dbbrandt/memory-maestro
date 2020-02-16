import { createAction } from "@reduxjs/toolkit";
import Api from "../utils/api";
import { setLoading } from "./loading";
import { hideLoading, showLoading } from "react-redux-loading-bar";

export const startRound = createAction("START_ROUND");

export const handleStartRound = id => {
  return dispatch => {
    dispatch(setLoading(true));
    dispatch(showLoading());
    Api.startRound(id)
      .then(interactions => {
        dispatch(startRound(interactions));
        dispatch(setLoading(false));
        dispatch(hideLoading());
      })
      .catch(error => {
        alert("Failed to start round! Try Again.");
        console.log("Failed to start round! Try again.", error);
      });
  };
};
