import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./goal.css";
import { handleDeleteGoal, handleUpdateGoal } from "../../actions/goals";
import GoalForm from "./GoalForm";
import {GOAL_SECTION, setGoal, setSection} from "../../actions/selections";

class GoalEdit extends Component {

  componentDidMount() {
    const { dispatch, goalId } = this.props;
    dispatch(setSection(GOAL_SECTION));
    dispatch(setGoal(goalId));
  }

  handleSubmit = goal => {
    const { dispatch, history } = this.props;
    dispatch(handleUpdateGoal(goal));
    history.push("/");
  };

  handleDelete = id => {
    const { dispatch, history } = this.props;
    dispatch(handleDeleteGoal(id));
    history.push("/");
  };

  handleCancel = () => {
    const { history } = this.props;
    history.push("/");
  };

  render() {
    const { goal, history } = this.props;
    if (!goal) history.push('/');
    return goal ? (
      <div className="goal">
        <div className="header-box">Edit Goal</div>
        <GoalForm
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
          handleDelete={this.handleDelete}
          initForm={goal}
        />
      </div>
    ) : (
      <div>No goal selected.</div>
    );
  }
}

const mapStateToProps = ({ goals }, { match }) => {
  const goalId = Number(match.params.id);
  const goal = goals[goalId];
  return { goalId, goal };
};

export default withRouter(connect(mapStateToProps)(GoalEdit));
