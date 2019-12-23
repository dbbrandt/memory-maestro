import { createAction } from "@reduxjs/toolkit";
import API from "../utils/api";
import { setGoal, setInteraction } from "./selections";
import { setLoading } from "./loading";
import { hideLoading } from "react-redux-loading-bar";

export const fetchInteractions = createAction("FETCH_INTERACTIONS");
export const updateInteraction = createAction("UPDATE_INTERACTION");

export const handleFetchInteractions = id => {
  return dispatch => {
    API.fetchInteractions(id)
      .then(interactions => {
        dispatch(setGoal(id));
        dispatch(fetchInteractions(interactions));
        if (!interactions || interactions.length === 0) {
          dispatch(setLoading(false));
          dispatch(hideLoading());
        }
      })
      .catch(error => {
        alert("Fetch Interactions Failed: " + error);
      });
  };
};

export const handleUpdateInteraction = interaction => {
  return dispatch => {
    dispatch(setInteraction(interaction.id));
    Api.updateInteraction(interaction)
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
