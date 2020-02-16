import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Login.css";
import UserForm from "./UserForm";
import { addUser } from "../../actions/users";

class Login extends Component {

  handleSubmit = user => {
    const {authedUser, dispatch, history, location } = this.props;
    const destRoute = location.pathname === "/login" ? "/" : location.pathname;
    debugger;
    user['id'] = authedUser;
    dispatch(addUser(user));
    history.push(destRoute);
  };

  render() {
    return (
      <div className="login">
        <div className="header-box">Add User Information</div>
        <UserForm handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default withRouter(connect(({authedUser}) => ({authedUser}))(Login));
