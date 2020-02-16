import Api from "../utils/api";
import { fetchUsers } from "./users";
import { fetchGoals } from "./goals";
import {hideLoading, showLoading} from "react-redux-loading-bar";
import {setLoading} from "./loading";
import {handleAuthenticateUser} from "./authedUser";

export const handleInititalData = () => {
  return dispatch => {
    dispatch(showLoading());
    dispatch(setLoading(true));
    Api.getInitialData()
      .then(({ users, goals }) => {
        const authedUser = Object.values(users)[0].id;
        dispatch(handleAuthenticateUser(authedUser));
        dispatch(fetchUsers(users));
        dispatch(fetchGoals(goals));
        dispatch(hideLoading());
        dispatch(setLoading(false));
    })
    .catch((error) => (
        alert('Failed to download initial data '+error)
      )
    )
  };
};
