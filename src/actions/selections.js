import { createAction } from "@reduxjs/toolkit";

export const GOAL_SECTION = "Goal";
export const INTERACTION_SECTION = "Interaction";

export const setGoal = createAction("SET_GOAL");
export const setInteraction = createAction("SET_INTERACTION");
export const setSection = createAction("SET_SECTION");
export const setRoundSize = createAction("SET_ROUND_SIZE");
