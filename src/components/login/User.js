import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./User.css";
import UserForm from "./UserForm";
import { handleAddUser } from "../../actions/users";

class User extends Component {
  handleSubmit = (name, avatarURL) => {
    const { authedUser, dispatch, history } = this.props;
    dispatch(handleAddUser(authedUser, name, avatarURL));
    history.push("/");
  };

  render() {
    const { user } = this.props;
    return (
      <div className="login">
        <div className="header-box">Update User Information</div>
        <UserForm user={user} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  user: users[authedUser]
});

export default withRouter(connect(mapStateToProps)(User));
