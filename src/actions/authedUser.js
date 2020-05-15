import { createAction } from "@reduxjs/toolkit";
import Api from "../utils/api";

export const authenticateUser = createAction('AUTHENTICATE_USER');
export const updateUser = createAction('UPDATE_USER');
export const logoutUser = createAction('LOGOUT_USER');


export const handleAuthenticateUser = ( email, name, picture ) => {
  return (dispatch) => {
    Api.fetchUsers()
      .then(users => {
        const user = users.filter(u => u.email === email)[0];
        if (user) {
          Api.updateUser({
              id: user.id,
              email,
              name,
              avatar_url: user.avatar_url || picture
          })
            .then(user => dispatch(authenticateUser(user)));
        } else {
          Api.addUser({ email, name, avatar_url: picture })
            .then(user => dispatch(authenticateUser(user)))
        }
      })
  }
};

export const handleUpdateUser = (user) => {
  return (dispatch) => {
    Api.updateUser(user)
      .then(user => dispatch(updateUser(user)))
  }
};
