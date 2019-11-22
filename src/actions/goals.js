// Replace my-api with the desired api
// Add whatever the various data objects returned to the action
// Add whatever API fetches to the action function and related data objects for the action object.
import Api from "./api";

export const FETCH_GOALS = "FETCH_GOALS";

function receiveData(goals) {
  return {
    type: FETCH_GOALS,
    goals
  };
}

export function handleReceiveData() {
  return dispatch => {
    return Api.fetchGoals().then(goals => dispatch(receiveData(goals)));
  };
  // return Promise.all(
  // Code to retrieve data and pass to action
  // [
  // API.fetchData()]).then(([appData]) => {   // one or multiple objects returned from one or multiple API calls.
  //    dispatch(receiveData(appData))};
}
