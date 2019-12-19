import Api from "../utils/api";
import { fetchUsers } from "./users";
import { fetchGoals } from "./goals";
import {hideLoading, showLoading} from "react-redux-loading-bar";
import {setLoading} from "./loading";

export const handleInititalData = () => {
  return dispatch => {
    dispatch(showLoading());
    dispatch(setLoading(true));
    Api.getInitialData()
      .then(({ users, goals }) => {
      dispatch(fetchUsers(users));
      dispatch(fetchGoals(goals));
      dispatch(hideLoading());
      dispatch(setLoading(false));
    });
  };
};
