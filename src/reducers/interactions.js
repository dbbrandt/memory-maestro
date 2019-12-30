import {createReducer} from "@reduxjs/toolkit";
import {
  addInteraction, clearInteractions,
  deleteInteraction,
  fetchInteractions,
  updateInteraction
} from "../actions/interactions";

const interactions = createReducer({}, {
  [fetchInteractions]: (state, action) => {
    action.payload.forEach(interaction => {
      state[interaction.id] = interaction;
    });
  },
  [clearInteractions]: (state, action) => ({}),
  [addInteraction]: (state, action) => {
    state[action.payload.id] = action.payload;
  },
  [updateInteraction]: (state, action) => {
    state[action.payload.id] = action.payload;
  },
  [deleteInteraction]: (state, action) => {
    delete state[action.payload];
  }
});

export default interactions;
