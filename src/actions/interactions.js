import { createAction } from "@reduxjs/toolkit";
import API from "../utils/api";

export const fetchInteractions = createAction("FETCH_INTERACTIONS");

export const handleFetchInteractions = id => {
  return dispatch => {
    API.fetchInteractions(id)
      .then(interactions => {
        dispatch(fetchInteractions(interactions));
      })
      .catch(error => alert("Fetch Interactions Failed: " + error));
  };
};
