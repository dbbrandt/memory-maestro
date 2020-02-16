import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./User.css";
import UserForm from "./UserForm";
import { addUser } from "../../actions/users";

class User extends Component {

  handleSubmit = user => {
    const {authedUser, dispatch, history } = this.props;
    user['id'] = authedUser;
    dispatch(addUser(user));
    history.push("/");
  };

  render() {
    return (
      <div className="login">
        <div className="header-box">Update User Information</div>
        <UserForm handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default withRouter(connect(({authedUser}) => ({authedUser}))(User));
