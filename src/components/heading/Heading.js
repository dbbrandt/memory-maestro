import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./Heading.css";
import headerImage from "../../assets/Precidix_Logo_300x300.png";

class Heading extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <header className="container-grid layout-section header">
        <div>
          <img className="lo  go" alt="Would You Rather?" src={headerImage} />
        </div>
        {!!currentUser && (
          <Fragment>
            <div className="user-name">
              <div>Hi {currentUser.name}!</div>
            </div>
            <div className="user-image">
              <img alt={currentUser.name} src={currentUser.avatarURL} />
            </div>
          </Fragment>
        )}
      </header>
    );
  }
}
const mapStateToProps = ({ users, authedUser }) => {
  return {
    currentUser: !!users ? users[authedUser] : {}
  };
};

export default connect(mapStateToProps)(Heading);
