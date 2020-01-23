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
    // Need to handle image_url as image data for upload to AWS but only if it has changed.
    Api.addGoal(goal)
      .then(res => {
        const filename = goal.image_filename;
        if (res["status"] || res["message"]) {
          const message = res["exception"] ? res["exception"] : res["message"]
          alert(message)
        } else {
          res.image_filename = filename;
          dispatch(handleUploadGoalImage(res, goal.image_data_url));
        }
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

export const handleUploadGoalImage = (goal, image_data_url) => {
  return dispatch => {
    Api.getPresignedGoalUrl(goal.id, goal.image_filename)
      .then(res => {
        console.log("handleUploadToPresignedURL presigned data: ", res);
        const url = res.url;
        const fileUrl = res.filename;
        Api.uploadFileToAws(url, image_data_url)
          .then((res) => {
            debugger;
            if (res) {
              console.log('uloadFileToAws result: ', res);
              alert('Failed to upload image to AWS. Goal save failed. Try Again.')
              dispatch(handleDeleteGoal(goal.id))
            } else {
              goal.image_url = fileUrl;
              dispatch(handleUpdateGoal(goal));
            }
          })
          .catch(error => {
            console.group("Uploading File TO AWS Error");
            console.log("Failed upload file: ", fileUrl);
            console.log("Failed upload URL: ", url);
            console.log("Upload error: ", error);
          });
      })
      .catch(error => {
        console.log("Unable to get presigned url: ", error);
      });
  };
};
