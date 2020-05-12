import Api from "../utils/api";
import { fetchUsers } from "./users";
import { fetchGoals } from "./goals";
import {hideLoading, showLoading} from "react-redux-loading-bar";
import {setLoading} from "./loading";

// Temporary local storage hack to add new user data from 3rd party auth. and new users
const addNewUser = (users, id, name, avatarURL) => {
  if (!users[id]) users[id] = { id, name, avatarURL };
  return users;
};

export const handleInititalData = (id, name, avatarURL) => {
  return dispatch => {
    dispatch(showLoading());
    dispatch(setLoading(true));
    Api.getInitialData()
      .then(({ users, goals }) => {
        users = addNewUser(users, id, name, avatarURL);
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
