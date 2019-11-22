import { FETCH_GOALS } from '../actions/goals';

export default function loading(state = true, action) {
  switch (action.type) {
    case FETCH_GOALS:
      return false;
    default:
      return state;
  }
}

