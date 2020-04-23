import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Amplify, { Analytics } from "aws-amplify";
import awsconfig from "../../aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import { handleAuthenticateUser} from "../../actions/authedUser";
import { handleInititalData } from "../../actions/shared";

Amplify.configure(awsconfig);
Analytics.disable();

class Authenticate extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    console.log("Authenticate: ", this.props);
    const email = this.props.authData.attributes.email;
    dispatch(handleInititalData());
    dispatch(handleAuthenticateUser(email));
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default connect()(withAuthenticator(Authenticate));
