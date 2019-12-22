import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./goal.css";
import { handleUpdateGoal } from "../../actions/goals";
import GoalForm from "./GoalForm";

class GoalEdit extends Component {
  handleSubmit = goal => {
    const { dispatch, history } = this.props;
    dispatch(handleUpdateGoal(goal));
    history.push("/");
  };

  render() {
    const { goalId, goal } = this.props;
    return (
      goalId ?
        <div className="goal">
          <div className="header-box">Edit Goal</div>
          <GoalForm handleSubmit={this.handleSubmit} initForm={goal} />
        </div>
        : <div>No goal selected.</div>
    );
  }
}

const mapStateToProps = ({ goals }, { match }) => {
  const goalId = Number(match.params.id);
  const goal = goals.filter(goal => goal.id === goalId)[0];
  return { goalId, goal };
};

export default withRouter(connect(mapStateToProps)(GoalEdit));
