import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./Heading.css";
import headerImage from "../../assets/Precidix_Logo_300x300.png";

class Heading extends Component {
  render() {
    const { currentUser, goal} = this.props;
    console.log('Heading goal: ', goal);
    const { id,  title } =  goal;
    return (
      <header className="container-grid layout-section header">
        <div>
          <img className="lo  go" alt="Would You Rather?" src={headerImage} />
        </div>
        {!!currentUser && (
          <Fragment>
            <div className='goal-heading'>
              <div>Goal:</div>
              <div>{id}</div>
              <div>{title}</div>
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
  console.log('Heading MapStateToProps: goalId:', goalId);
  debugger;
  const goal = goalId ?
    goals.filter(goal => goal.id === goalId)[0]
    : {
      id: 'None Selected',
      title: ''
    };
  console.log('Heading mapStatetoProp  goal:',goal);
  return {
    currentUser: !!users ? users[authedUser] : {},
    goal
  };
};

export default connect(mapStateToProps)(Heading);
