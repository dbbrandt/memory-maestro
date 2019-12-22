import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import "./Heading.css";
import headerImage from "../../assets/Precidix_Logo_300x300.png";

class Heading extends Component {
  handleClick = () => {
    const {goalId, history} = this.props;
    const route = goalId ? '/goal-edit/' : '/goal-add/';
    history.push(route + goalId)
  };

  render() {
    const { currentUser, title, buttonText} = this.props;
    return (
      <header className="container-grid layout-section header">
        <div>
          <img className="lo  go" alt="Would You Rather?" src={headerImage} />
        </div>
        {!!currentUser && (
          <Fragment>
            <div className='goal-heading'>
              <div>Goal:</div>
              <div>{title}</div>
              <div><button onClick={this.handleClick}>{buttonText}</button></div>
            </div>
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
const mapStateToProps = ({ users, authedUser, selections, goals }) => {
  const goalId = selections.goal;
  const title = goalId ? goals[goalId].title : 'None Selected';
  return {
    currentUser: !!users ? users[authedUser] : {},
    buttonText: goalId ? 'Edit'  : 'Add',
    goalId,
    title
  };
};

export default withRouter(connect(mapStateToProps)(Heading));
