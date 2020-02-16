import { createAction } from "@reduxjs/toolkit";

export const authenticateUser = createAction('AUTHENTICATE_USER');
export const logoutUser = createAction('LOGOUT_USER');


export const handleAuthenticateUser = ( email ) => {
  return (dispatch) => {
      dispatch(authenticateUser(email));
  }
};
