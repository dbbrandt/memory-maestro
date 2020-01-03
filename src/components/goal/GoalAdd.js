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
    const { dispatch, history } = this.props;
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

export default withRouter(connect()(GoalAdd));
