import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import "./Nav.css";

class Nav extends Component {
  render() {
    const { loginLink, goalId, section } = this.props;
    return (
      <nav className="container-grid layout-section navigation">
        <div className="nav-bar">
          <div className="nav-links">
            <div>
              <NavLink exact to="/" activeClassName="nav-active">
                Home
              </NavLink>
            </div>
            <div>
              <NavLink to={"/practice/"+goalId} activeClassName="nav-active">
                Practice
              </NavLink>
            </div>
            <div>
              <NavLink to={"/interactions/"+goalId} activeClassName="nav-active">
                Interactions
              </NavLink>
            </div>
            <div>
              <NavLink exact to={`/${section.toLowerCase()}-add`} activeClassName="nav-active">
                Add
              </NavLink>
            </div>
            <div>
              <NavLink to={"/" + loginLink.toLowerCase()} activeClassName="nav-active">
                {loginLink}
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(connect(({ authedUser, selections }) => ({
    loginLink: !!authedUser ? "Logout" : "Login",
    goalId: selections.goal,
    section: selections.section
}))(Nav));
