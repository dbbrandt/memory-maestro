import { FETCH_GOALS } from '../actions/goals';
import {FETCH_INTERACTIONS} from "../actions/interactions";

export default function loading(state = true, action) {
  switch (action.type) {
    case FETCH_GOALS:
    case FETCH_INTERACTIONS:
      return false;
    default:
      return state;
  }
}

