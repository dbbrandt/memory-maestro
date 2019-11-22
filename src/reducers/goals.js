import { FETCH_GOALS} from "../actions/goals";

export default function goals(state = [], action) {
  switch (action.type) {
    case FETCH_GOALS:
      return action.goals;
    default:
      return state;
  }
}
