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

export const handleDeleteInteraction = (goalId, id) => {
  return dispatch => {
    Api.deleteInteraction(goalId, id)
      .then(res => {
        const  message = res["status"] > 400
          ? `Error: ${res["status"]} ${res["statusText"]}`
          : res["message"];
        message
          ? alert(message)
          : dispatch(deleteInteraction(id));
      })
      .catch(error => {
        alert("Failed to delete interaction. Try again.");
        console.log("Failed to delete interaction:", error);
      });
  };
};

const handleUploadInteractionImage = (interaction, goalId, filename, dataUrl) => {
  return dispatch => {
    Api.getPresignedInteractionUrl(goalId, interaction.id, filename)
      .then(res => {
        debugger;
        const imageUrl = res.filename;
        const signedUploadUrl = res.url;
        dispatch(updateInteractionImage(interaction, goalId, dataUrl, signedUploadUrl, imageUrl));            })
      .catch(error => {
        alert('Unable to upload interaction image');
        console.log("Unable to get interaction presigned url: ", error);
      });
  };
};

const  updateInteractionImage = (interaction, goalId, dataUrl, signedUploadUrl, imageUrl) => {
  return dispatch => {
    Api.updateInteractionImage(interaction, goalId, dataUrl, signedUploadUrl, imageUrl)
      .then((res) => {
        debugger;
        if (res["message"]) {
          alert(res["message"]);
        } else {
          dispatch(updateInteraction(res));
        }
      })
      .catch(error => {
        alert('Unable to update interaction image');
        console.log("Unable to update interaction image: ", error);
      })
  }
};