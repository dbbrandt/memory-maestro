import { createAction } from "@reduxjs/toolkit";
import Api from "../utils/api";
import { setLoading } from "./loading";
import { hideLoading } from "react-redux-loading-bar";
import { setGoal } from "./selections";

export const fetchInteractions = createAction("FETCH_INTERACTIONS");
export const clearInteractions = createAction("CLEAR_INTERACTIONS");
export const addInteraction = createAction("ADD_INTERACTION");
export const updateInteraction = createAction("UPDATE_INTERACTION");
export const deleteInteraction = createAction("DELETE_INTERACTION");

export const handleFetchInteractions = id => {
  return dispatch => {
    Api.fetchInteractions(id)
      .then(interactions => {
        dispatch(setGoal(id));
        dispatch(fetchInteractions(interactions));
        if (interactions.length === 0) {
          dispatch(hideLoading());
          dispatch(setLoading(false));
        }
      })
      .then(() => {
        dispatch(hideLoading());
        dispatch(setLoading(false));
      })
      .catch(error => {
        alert("Fetch Interactions Failed: " + error);
      });
  };
};

export const handleAddInteraction = (interaction, goalId) => {
  return dispatch => {
    delete interaction.id;
    Api.addInteraction(interaction, goalId)
      .then(res => {
        if (res["message"]) {
          alert(res["message"]);
        } else {
          debugger;
          if (interaction.image_data_url) {
            dispatch(
              handleUploadInteractionImage(
                res,
                goalId,
                interaction.image_filename,
                interaction.image_data_url
              )
            );
          } else {
            dispatch(addInteraction(res));
          }
        }
      })
      .catch(error => {
        alert("Failed to add interaction. Try again.");
        console.log("Failed to add interaction:", error);
      });
  };
};

export const handleUpdateInteraction = (interaction, goalId) => {
  return dispatch => {
    Api.updateInteraction(interaction, goalId)
      .then(res => {
        if (res["message"]) {
          alert(res["message"]);
        } else {
          if (interaction.image_data_url) {
            dispatch(
              handleUploadInteractionImage(
                res,
                goalId,
                interaction.image_filename,
                interaction.image_data_url
              )
            );
          } else {
            dispatch(updateInteraction(res));
          }
        }
      })
      .catch(error => {
        alert("Failed to save interaction. Try again.");
        console.log("Failed to save interaction:", error);
      });
  };
};

export const handleDeleteInteraction = id => {
  return dispatch => {
    Api.deleteInteraction(id)
      .then(res => {
        res["message"]
          ? alert(res["message"])
          : dispatch(deleteInteraction(id));
      })
      .catch(error => {
        alert("Failed to delete interaction. Try again.");
        console.log("Failed to delete interaction:", error);
      });
  };
};

const handleUploadInteractionImage = (interaction, goal_id, filename, data_url) => {
  return dispatch => {
    Api.getPresignedInteractionUrl(goal_id, interaction.id, filename)
      .then(res => {
        debugger;
        const imageUrl = res.filename;
        const signedUploadUrl = res.url;
        Api.uploadFileToAws(signedUploadUrl, data_url)
          .then((res) => {
            debugger;
            if (res) {
              alert('Failed to upload image to AWS. Interaction save failed. Try Again.')
            } else {
              interaction.prompt.stimulus_url = imageUrl;
              dispatch(updateInteraction(interaction));
            }
          })
          .catch(error => {
            console.group("Uploading File TO AWS Error", imageUrl);
            console.log("Upload error: ", error);
          });
      })
      .catch(error => {
        console.log("Unable to get presigned url: ", error);
      });
  };
};
