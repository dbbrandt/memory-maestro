import { createAction } from "@reduxjs/toolkit";
import API from "../utils/api";
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
    API.fetchInteractions(id)
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
        }
      )
      .catch(error => {
        alert("Fetch Interactions Failed: " + error);
      });
  };
};

export const handleAddInteraction = (interaction, goalId) => {
  return dispatch => {
    API.addInteraction(interaction, goalId)
      .then(res => {
        res["message"]
          ? alert(res["message"])
          : dispatch(addInteraction(res));
      })
      .catch(error => {
        alert("Failed to add interaction. Try again.");
        console.log("Failed to add interaction:", error);
      });
  };
};

export const handleUpdateInteraction = (interaction, goalId) => {
  return dispatch => {
    API.updateInteraction(interaction, goalId)
      .then(res => {
        res["message"]
          ? alert(res["message"])
          : dispatch(updateInteraction(res));
      })
      .catch(error => {
        alert("Failed to save interaction. Try again.");
        console.log("Failed to save interaction:", error);
      });
  };
};

export const handleDeleteInteraction = id => {
  return dispatch => {};
};
