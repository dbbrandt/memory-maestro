import React from 'react';
import { connect } from "react-redux";
import { Auth } from 'aws-amplify';
import { handleLogoutUser } from "../../actions/authedUser";

const Logout  = (props) =>  {
  const { dispatch } = props;
  Auth.signOut()
    .then(() => {
      dispatch(handleLogoutUser());
    })
    .catch(err => console.log(err));
  return <div>Logging Out....</div>
};

export default connect()(Logout);
