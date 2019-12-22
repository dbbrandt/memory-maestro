import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Heading.css";
import headerImage from "../../assets/Precidix_Logo_300x300.png";

class Heading extends Component {
  handleClick = () => {
    const { goal, history } = this.props;
    goal ? history.push("/goal-edit/" + goal.id) : history.push("/goal-add");
  };

  render() {
    const { currentUser, title, buttonText } = this.props;
    return (
      <header className="container-grid layout-section header">
        <div>
          <img className="lo  go" alt="Would You Rather?" src={headerImage} />
        </div>
        {!!currentUser && (
          <Fragment>
            <div className="goal-heading">
              <div>Goal:</div>
              <div>{title}</div>
              <div>
                <button onClick={this.handleClick}>{buttonText}</button>
              </div>
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
  const goal = goalId ? goals[goalId] : null;
  const title = goal ? goal.title : "None Selected";
  return {
    currentUser: !!users ? users[authedUser] : {},
    buttonText: goal ? "Edit" : "Add",
    goal,
    title
  };
};

export default withRouter(connect(mapStateToProps)(Heading));
