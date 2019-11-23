// Replace my-api with the desired api
// Add whatever the various data objects returned to the action
// Add whatever API fetches to the action function and related data objects for the action object.
import Api from "./api";

export const FETCH_GOALS = "FETCH_GOALS";

function fetchGoals(goals) {
  return {
    type: FETCH_GOALS,
    goals
  };
}

export function handleFetchGoals() {
  return dispatch => {
    return Api.fetchGoals().then(goals => dispatch(fetchGoals(goals)));
  };
}
