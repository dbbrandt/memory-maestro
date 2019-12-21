import { createAction } from "@reduxjs/toolkit";
import Api from "../utils/api";

export const fetchUsers = createAction('FETCH_USERS');

export const handleFetchUsers = () => {
  return (dispatch) => {
    Api.getUsers()
      .then(users => {
        dispatch(fetchUsers(users));
      })
  }
};
