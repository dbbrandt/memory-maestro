import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./User.css";
import UserForm from "./UserForm";
import { handleUpdateUser } from "../../actions/authedUser";

class User extends Component {
  handleSubmit = user => {
    // Note: user profile may be new so authedUser is always used as the source of the email
    const { authedUser,dispatch, history } = this.props;
    let updated = { ...user };
    updated.id = authedUser.id;
    updated.email = authedUser.email;
    dispatch(handleUpdateUser(updated));
    history.push("/");
  };

  render() {
    const { authedUser } = this.props;
    console.log("User authedUser:", authedUser);
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
