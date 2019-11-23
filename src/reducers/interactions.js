import { FETCH_INTERACTIONS } from "../actions/interactions";

export default function interactions(state = [], action) {
  switch (action.type) {
    case FETCH_INTERACTIONS:
      return action.interactions;
    default:
      return state;
  }
}
