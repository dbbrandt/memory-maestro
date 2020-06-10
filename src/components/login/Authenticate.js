import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Amplify, { Analytics } from "aws-amplify";
import awsmobile from "../../aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import { handleAuthenticateUser} from "../../actions/authedUser";

Amplify.configure(awsmobile);
Analytics.disable();

const MyTheme = {
//  googleSignInButton: { backgroundColor: "ligthblue"},
  button: { backgroundColor: "cornflowerblue", borderColor: "darkblue" },
//  signInButtonIcon: { display: "block" }
};

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Email',
      key: 'username',
      required: true,
      placeholder: 'Email',
      type: 'email',
      displayOrder: 1,
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      placeholder: 'Password',
      type: 'password',
      displayOrder: 2,
    },
  ],
};

class Authenticate extends Component {
  componentDidMount() {
    const { dispatch, authData } = this.props;
    const { attributes , name, picture } = authData;
    // For Cognito pool auth, authData is stored in attributes,
    // otherwise email, name and picture are provided from 3rd party in authData directly
    const email = attributes ? attributes.email : authData.email;
    dispatch(handleAuthenticateUser(email, name, picture));
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default connect()(withAuthenticator(Authenticate,
  true, [], null, MyTheme, signUpConfig));
