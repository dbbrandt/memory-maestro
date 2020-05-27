import { createAction } from "@reduxjs/toolkit";
import Api from "../utils/api";

export const authenticateUser = createAction('AUTHENTICATE_USER');
export const updateUser = createAction('UPDATE_USER');
export const logoutUser = createAction('LOGOUT_USER');


export const handleAuthenticateUser = ( email, name, picture ) => {
  return (dispatch) => {
    Api.fetchUser(email)
      .then(user => {
        if (user) {
          Api.updateUser({
              id: user.id,
              email,
              name: user.name || name,
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

export const handleUpdateUser = user => {
  console.log("handlUdpateUser user: ", user);
  return (dispatch) => {
    Api.updateUser(user)
      .then(res => {
        console.log("handlUdpateUser res: ", res);
        if (res["message"]) {
          alert(res["message"])
        } else {
          if (!!user.image_data_url) {
            dispatch(handleUploadUserImage(res, user.image_filename, user.image_data_url));
          } else {
            dispatch(updateUser(res))
          }
        }})
        .catch(error => {
            alert("Failed to save user. Try again.");
            console.log("Failed to save user:", error);
          });
  }
};

const handleUploadUserImage = (user, filename, data_url) => {
  return dispatch => {
    Api.getPresignedUserUrl(user.id, filename)
      .then(res => {
        const imageUrl = res.filename;
        const signedUploadUrl = res.url;
        dispatch(updateUserImage(user, data_url, signedUploadUrl, imageUrl))
      })
      .catch(error => {
        alert('Unable to upload user image');
        console.log("Unable to get presigned url: ", error);
      });
  };
};

const  updateUserImage = (user, data_url, signedUploadUrl, imageUrl) => {
  return dispatch => {
    Api.updateUserImage(user, data_url, signedUploadUrl, imageUrl)
      .then((res) => {
        if (res["message"]) {
          alert(res["message"]);
        } else {
          dispatch(updateUser(res));
        }
      })
      .catch(error => {
        alert('Unable to update user image');
        console.log("Unable to update user image: ", error);
      })
  }
};
