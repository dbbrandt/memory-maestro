import { createAction } from "@reduxjs/toolkit";
import Api from "../utils/api";

export const fetchGoals = createAction("FETCH_GOALS");
export const addGoal = createAction("ADD_GOAL");
export const updateGoal = createAction("UPDATE_GOAL");
export const deleteGoal = createAction("DELETE_GOAL");

export const handleFetchGoals = () => {
  return dispatch => {
    return Api.fetchGoals().then(goals => {
      dispatch(fetchGoals(goals));
    });
  };
};

export const handleAddGoal = goal => {
  return dispatch => {
    debugger;
    // Need to handle image_url as image data for upload to AWS but only if it has changed.
    goal.image_url = goal.image_filename;
    Api.addGoal(goal)
      .then(res => {
        res["message"] ? alert(res["message"]) : dispatch(addGoal(res));
      })
      .catch(error => {
        alert("Failed to save goal. Try again.");
        console.log("Failed to save goal:", error);
      });
  };
};

export const handleUpdateGoal = goal => {
  return dispatch => {
    Api.updateGoal(goal)
      .then(res => {
        res["message"] ? alert(res["message"]) : dispatch(updateGoal(res));
      })
      .catch(error => {
        alert("Failed to save goal. Try again.");
        console.log("Failed to save goal:", error);
      });
  };
};

export const handleDeleteGoal = id => {
  return dispatch => {
    Api.deleteGoal(id)
      .then(dispatch(deleteGoal(id)))
      .catch(error => {
        alert("Failed to delete goal. Try again.");
        console.log("Failed to delete goal:", error);
      });
  };
};
