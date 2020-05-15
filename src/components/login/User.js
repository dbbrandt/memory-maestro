import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./User.css";
import UserForm from "./UserForm";
import { handleUpdateUser } from "../../actions/authedUser";

class User extends Component {
  handleSubmit = (name, avatarURL) => {
    // Note: user profile may be new so authedUser is always used as the source of the email
    const { authedUser,dispatch, history } = this.props;
    let updated = { ...authedUser };
    updated["name"] = name;
    updated["avatar_url"] = avatarURL;
    dispatch(handleUpdateUser(updated));
    history.push("/");
  };

  render() {
    const { authedUser } = this.props;
    return (
      <div className="login">
        <div className="header-box">Update User Information</div>
        <UserForm user={authedUser} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser
});

export default withRouter(connect(mapStateToProps)(User));
