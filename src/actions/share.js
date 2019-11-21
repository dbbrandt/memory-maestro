// Replace my-api with the desired api
// Add whatever the various data objects returned to the action
// Add whatever API fetches to the action function and related data objects for the action object.
// import API from "my-api";

export const RECEIVE_DATA = "RECEIVE_DATA";

function receiveData(appData) { // one or multiple arguments for state population
  return {
    type: RECEIVE_DATA,
    appData  // one or many objects used to modify state with the reducers listening to this action type.
  };
}

export function handleReceiveData() {
  return dispatch => {
    return (
    setTimeout(function () {
      dispatch(receiveData('ReceivedData'))
    }, 2000)
    // return Promise.all(
      // Code to retrieve data and pass to action
      // [
      // API.fetchData()]).then(([appData]) => {   // one or multiple objects returned from one or multiple API calls.
      //    dispatch(receiveData(appData))};
    );
  };
}
