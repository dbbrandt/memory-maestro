import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import "./Heading.css";
import headerImage from "../../assets/Precidix_Logo_300x300.png";

class Heading extends Component {
  handleClick = () => {
    const { goal, history } = this.props;
    goal ? history.push("/goal-edit/" + goal.id) : history.push("/goal-add");
  };

  render() {
    const { authedUser, title, buttonText } = this.props;
    const  name  = authedUser ? authedUser.name : "";
    const profileName = !!name ? `Hi ${name}!` : 'Click to update profile.';
    return (
      <header className="container-grid layout-section header">
        <div>
          <img className="lo  go" alt="Would You Rather?" src={headerImage} />
        </div>
        {!!authedUser && (
          <Fragment>
            <div className="goal-heading">
              <div>Goal: {title}</div>
              <div className='btn'>
                <button onClick={this.handleClick}>{buttonText}</button>
              </div>
            </div>
            <div className="user-name">
              <div><Link to="/user">{profileName}</Link></div>
            </div>
            <div className="user-image">
              <Link to="/user">
                <img alt={authedUser.name} src={authedUser.avatar_url} />
              </Link>
            </div>
          </Fragment>
        )}
      </header>
    );
  }
}
const mapStateToProps = ({  authedUser, selections, goals }) => {
  const goalId = selections.goal;
  const goal = goalId ? goals[goalId] : null;
  const title = goal ? goal.title : "None Selected";
  return {
    authedUser,
    buttonText: goal ? "Edit" : "Add",
    goal,
    title
  };
};

export default withRouter(connect(mapStateToProps)(Heading));
