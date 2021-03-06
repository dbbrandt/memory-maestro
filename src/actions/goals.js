import { createAction } from "@reduxjs/toolkit";
import Api from "../utils/api";

export const fetchGoals = createAction("FETCH_GOALS");
export const addGoal = createAction("ADD_GOAL");
export const updateGoal = createAction("UPDATE_GOAL");
export const deleteGoal = createAction("DELETE_GOAL");
export const clearGoals = createAction("CLEAR_GOALS");

export const handleFetchGoals = () => {
  return dispatch => {
    return Api.fetchGoals().then(goals => {
      dispatch(fetchGoals(goals));
    });
  };
};

export const handleAddGoal = goal => {
  return dispatch => {
    // Need to handle image_url as image data for upload to AWS but only if it has changed.
    Api.addGoal(goal)
      .then(res => {
        if (res["message"]) {
          alert(res["message"]);
        } else {
          if (goal.image_data_url) {
            dispatch(handleUploadGoalImage(res, goal.image_filename, goal.image_data_url));
          } else {
            dispatch(addGoal(res))
          }
        }})
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
        if (res["message"]) {
          alert(res["message"]);
          } else {
          if (goal.image_data_url) {
            console.log("handleUpdateGoal goal: ", goal);
            dispatch(handleUploadGoalImage(res, goal.image_filename, goal.image_data_url));
          } else {
            dispatch(updateGoal(res))
          }
        }})
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

const handleUploadGoalImage = (goal, filename, data_url) => {
  return dispatch => {
    Api.getPresignedGoalUrl(goal.id, filename)
      .then(res => {
        const imageUrl = res.filename;
        const signedUploadUrl = res.url;
        dispatch(updateGoalImage(goal.id, data_url, signedUploadUrl, imageUrl))
      })
      .catch(error => {
        alert('Unable to upload goal image');
        console.log("Unable to get presigned url: ", error);
      });
  };
};

const  updateGoalImage = (id, data_url, signedUploadUrl, imageUrl) => {
  return dispatch => {
    Api.updateGoalImage(id, data_url, signedUploadUrl, imageUrl)
      .then((res) => {
        if (res["message"]) {
          alert(res["message"]);
        } else {
          dispatch(updateGoal(res));
        }
      })
      .catch(error => {
        alert('Unable to update goal image');
        console.log("Unable to update goal image: ", error);
      })
  }
};
