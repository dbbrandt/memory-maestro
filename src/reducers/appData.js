import { RECEIVE_DATA} from "../actions/share";

export default function appData(state = [], action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return action.appData;
    default:
      return state;
  }
}
