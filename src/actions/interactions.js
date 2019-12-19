import { createAction } from "@reduxjs/toolkit";
import API from "../utils/api";
import {setLoading} from "./loading";

export const fetchInteractions = createAction("FETCH_INTERACTIONS");

export const handleFetchInteractions = id => {
  return dispatch => {
    API.fetchInteractions(id)
      .then(interactions => {
        dispatch(setLoading(true));
        dispatch(fetchInteractions(interactions));
        dispatch(setLoading(false));
      })
      .catch(error => alert("Fetch Interactions Failed: " + error));
  };
};
