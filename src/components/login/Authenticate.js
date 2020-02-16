import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Amplify, { Analytics } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import {handleInititalData} from "../../actions/shared";
Amplify.configure(awsconfig);
Analytics.disable();

class Authenticate extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    console.log('Authenticate: ', this.props);
    const email = this.props.authData.attributes.email;
    dispatch(handleInititalData(email));
  }

  render() {
    const { authedUser, user } = this.props;
    if (!!user) return <Redirect to='/'/>
    else {
      return <Redirect to='/login'/>
    }
  }
};

const mapStateToProps = ({authedUser, users}) => ({
  authedUser,
  user: users[authedUser]
});


export default connect(mapStateToProps)(withAuthenticator(Authenticate));
