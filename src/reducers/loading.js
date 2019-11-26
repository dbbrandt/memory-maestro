import { FETCH_GOALS } from '../actions/goals';
import { SET_LOADING} from "../actions/loading";


export default function loading(state = true, action) {
  switch (action.type) {
    case FETCH_GOALS:
      return false;
    case SET_LOADING:
      return action.loading;
    default:
      return state;
  }
}

