import { createAction } from "@reduxjs/toolkit";
import Api from "../utils/api";
import { setLoading } from "./loading";

export const fetchGoals = createAction("FETCH_GOALS");

export function handleFetchGoals() {
  return dispatch => {
    return Api.fetchGoals().then(goals => {
      dispatch(setLoading(true));
      dispatch(fetchGoals(goals));
      dispatch(setLoading(false));
    });
  };
}
