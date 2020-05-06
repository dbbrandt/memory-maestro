import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Practice.css";
import { GOAL_SECTION, setGoal, setSection } from "../../actions/selections";

class Practice extends Component {
  state = {
    roundSize: 5
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount = () => {
    const { dispatch, goalId, selections } = this.props;
    dispatch(setSection(GOAL_SECTION));
    if (selections.goal !== Number(goalId)) {
      dispatch(setGoal(goalId));
    }
  };

  handleClick = () => {
    const { history } = this.props;
    history.push("/rounds-list");
  };

  handleStartRound = () => {
    const { history } = this.props;
    const { roundSize } = this.state;
    history.push(`/practice-round?size=${roundSize}`);
  };

  render() {
    const { goal, round, history } = this.props;
    const { roundSize } = this.state;
    const { submitCount, correctCount, attemptCount, completionCount } = round;
    const score = submitCount
      ? ((100 * correctCount) / submitCount).toFixed(1)
      : 0;
    if (!goal) history.push("/");

    return (
      <div className="practice">
        <div>
          <h2 className="light-blue">Practice Your Goals</h2>
        </div>
        <div className="practice-info">
          Practice your goals by responding to a selection of interactions.
          Choose the number of interactions to practice and a random selection
          will be presented.
        </div>
        <div className="practice-stats">
          <div className="box">
            <div className="header-box">Cumulative Results</div>
            <table>
              <tbody>
                <tr>
                  <td>Answered</td>
                  <td>{submitCount}</td>
                </tr>
                <tr>
                  <td>Correct</td>
                  <td>{correctCount}</td>
                </tr>
                <tr>
                  <td>Score</td>
                  <td>{score}%</td>
                </tr>
                <tr>
                  <td>Started</td>
                  <td>{attemptCount}</td>
                </tr>
                <tr>
                  <td>Completed</td>
                  <td>{completionCount}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="btn">
            <button className="start-button" onClick={this.handleStartRound}>
              Start Round
            </button>
          </div>
          <div>
            <span> of </span>
            <input
              size={2}
              maxLength={2}
              className="round-size"
              name="roundSize"
              value={roundSize}
              onChange={this.handleChange}
            />
          </div>
          <div className="btn">
            <button
              className="button-link rounds-button"
              onClick={this.handleClick}
            >
              Previous Rounds
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ goals, selections, round }, { match }) => {
  const goalId = match.params.goalId;
  return {
    goalId,
    goal: goals[goalId],
    selections,
    round: round[goalId] ? round[goalId] : {}
  };
};

export default withRouter(connect(mapStateToProps)(Practice));
