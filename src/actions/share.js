// Replace my-api with the desired api
// Add whatever the various data objects returned to the action
// Add whatever API fetches to the action function and related data objects for the action object.
import API from "./Api";

export const RECEIVE_DATA = "RECEIVE_DATA";

const baseURL = "http://localhost/api/";
const headers = {
  'Accept': 'application/json'
}
// "mode": "no-cors"

const fetchGoals = () => {
  return fetch(baseURL + 'goals', { headers } )
    .then(res => res.json())
    .catch(error => alert(error))
};

function receiveData(appData) {
  return {
    type: RECEIVE_DATA,
    appData // one or many objects used to modify state with the reducers listening to this action type.
  };
}

export function handleReceiveData() {
  return dispatch => {
    return fetchGoals().then(data => dispatch(receiveData(data)))
  }
  // return Promise.all(
  // Code to retrieve data and pass to action
  // [
  // API.fetchData()]).then(([appData]) => {   // one or multiple objects returned from one or multiple API calls.
  //    dispatch(receiveData(appData))};
}
