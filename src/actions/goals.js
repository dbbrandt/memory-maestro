import { createAction } from "@reduxjs/toolkit";
import Api from "../utils/api";

export const fetchGoals = createAction("FETCH_GOALS");
export const addGoal = createAction('ADD_GOAL');

export const handleFetchGoals = () => {
  return dispatch => {
    return Api.fetchGoals().then(goals => {
      dispatch(fetchGoals(goals));
    });
  };
};

export const handleAddGoal = (goal) => {
  return dispatch => {
    console.log('HandleAddGoal goal: ', goal);
    Api.addGoal(goal)
      .then(res => {
        res["message"] ?
          alert(res["message"])
          : dispatch(addGoal(res))
      })
      .catch(error => {
        alert('Failed to save goal. Try again.');
        console.log('Failed to save goal:', error);
        }
      )
  }
};