// Replace my-api with the desired api
// Add whatever the various data objects returned to the action
// Add whatever API fetches to the action function and related data objects for the action object.
import Api from "./api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const FETCH_GOALS = "FETCH_GOALS";

function fetchGoals(goals) {
  return {
    type: FETCH_GOALS,
    goals
  };
}

export function handleFetchGoals() {
  return dispatch => {
    return Api.fetchGoals().then(goals => {
      dispatch(showLoading());
      dispatch(fetchGoals(goals));
      dispatch(hideLoading());
    });
  };
}
