import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import "./goal.css";
import {handleAddGoal} from "../../actions/goals";
import GoalForm from "./GoalForm";
import {GOAL_SECTION, setSection } from "../../actions/selections";

class GoalAdd extends Component {
  componentDidMount() {
    this.props.dispatch(setSection(GOAL_SECTION));
  }

  handleSubmit = goal => {
    const { authedUser, dispatch, history } = this.props;
    goal["user_id"] = authedUser;
    dispatch(handleAddGoal(goal));
    history.push("/");
  };

  render() {
    return (
      <div className="goal">
        <div className="header-box">Add Goal</div>
        <GoalForm handleSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

// TODO remove default to authedUser 1 when real user api added.
const mapStateToProps = ({ authedUser }) => ({
  authedUser: 1
});

export default withRouter(connect(mapStateToProps)(GoalAdd));
