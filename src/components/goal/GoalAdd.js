import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import "./goal.css";
import {handleAddGoal} from "../../actions/goals";
import GoalForm from "./GoalForm";

class GoalAdd extends Component {
  handleSubmit = goal => {
    this.props.dispatch(handleAddGoal(goal));
    this.props.history.push("/");
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
