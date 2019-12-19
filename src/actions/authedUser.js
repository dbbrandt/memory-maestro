import { createAction } from "@reduxjs/toolkit";

export const authenticateUser = createAction('AUTHENTICATE_USER');
export const logoutUser = createAction('LOGOUT_USER');


export const handleAuthenticateUser = ( user ) => {
  return (dispatch) => {
      dispatch(authenticateUser(user));
  }
};
