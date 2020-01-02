import {createReducer} from "@reduxjs/toolkit";
import {
  addInteraction, clearInteractions,
  deleteInteraction,
  fetchInteractions,
  updateInteraction
} from "../actions/interactions";

const interactions = createReducer({}, {
  [fetchInteractions]: (state, action) => {
    const interactions = {};
    action.payload.forEach(interaction => {
      interactions[interaction.id] = interaction;
    });
    return interactions;
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
