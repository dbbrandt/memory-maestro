import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleAuthenticateUser } from "../../actions/authedUser";
import "./Login.css";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import Amplify from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import {handleInititalData} from "../../actions/shared";
Amplify.configure(awsconfig);

class Login extends Component {
  state = {
    userId: ""
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInititalData());
  }

  handleChange = event => {
    this.setState({ userId:  event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { users, dispatch, history, location } = this.props;
    const user = users[this.state.userId];
    const destRoute = location.pathname === "/login" ? "/" : location.pathname;
    dispatch(showLoading());
    setTimeout(() => {
      dispatch(handleAuthenticateUser(user.id));
      history.push(destRoute);
      dispatch(hideLoading());
    }, 2);

  };

  render() {
    const { users, loading } = this.props;
    const selectedUser = users[this.state.userId];
    return (
      <div className="login" style={{ display: loading ? "none" : "block" }}>
        <div className='avatar'>
          {!!selectedUser && (
            <img
              className="user-image"
              alt="avatar"
              src={selectedUser.avatarURL}
            />
          )}
        </div>
        <form className="select-user" onSubmit={this.handleSubmit}>
          <label>User:</label>
          <select
            value={this.state.userId}
            placeholder="Choose...."
            onChange={this.handleChange}
          >
            <option key="choose" value="" disabled>
              Choose a user...
            </option>
            {Object.keys(users).map(id => (
              <option key={id} value={id}>
                {users[id].name}
              </option>
            ))}
          </select>
          <div className='btn'>
            <button type='submit' disabled={!this.state.userId}>Login</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ loading, users, authedUser }, { logout }) => ({
  loading,
  users,
  authedUser,
  logout: !!logout
});

export default withRouter(connect(mapStateToProps)(withAuthenticator(Login,true)));
