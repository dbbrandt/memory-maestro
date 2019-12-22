import { createAction } from "@reduxjs/toolkit";
import API from "../utils/api";
import { setGoal } from "./selections";
import {setLoading} from "./loading";
import {hideLoading} from "react-redux-loading-bar";

export const fetchInteractions = createAction("FETCH_INTERACTIONS");

export const handleFetchInteractions = id => {
  return dispatch => {
    API.fetchInteractions(id)
      .then(interactions => {
        dispatch(setGoal(id));
        dispatch(fetchInteractions(interactions));
        if (!interactions || interactions.length === 0) {
          dispatch(setLoading(false));
          dispatch(hideLoading());
        }
      })
      .catch(error => {
        alert("Fetch Interactions Failed: " + error);
      });
  };
};
