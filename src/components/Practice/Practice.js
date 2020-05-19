import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Switch from "react-switch";
import "./Practice.css";
import {
  GOAL_SECTION,
  setGoal,
  setRoundSize,
  setTextInput,
  setSection
} from "../../actions/selections";

class Practice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roundSize: props.roundSize,
      textInput: props.textInput
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSwitchChange = (textInput) => {
    this.setState({ textInput })
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
    const { history, dispatch } = this.props;
    const { roundSize, textInput } = this.state;
    dispatch(setRoundSize(Number(roundSize)));
    dispatch(setTextInput(textInput));
    history.push("/practice-round");
  };

  render() {
    const { goal, round, history } = this.props;
    const { roundSize, textInput } = this.state;
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
              size={4}
              maxLength={4}
              className="round-size"
              name="roundSize"
              value={roundSize}
              onChange={this.handleChange}
            />
          </div>
          <div className="round-text-toggle">
            <div style={{paddingRight: 10}}> Text input on: </div>
            <div>
              <Switch
                onColor="#6495ed"
                name="textInput"
                checked={textInput}
                onChange={this.handleSwitchChange}
              />
            </div>
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
  const { roundSize, textInput } = selections;
  return {
    goalId,
    goal: goals[goalId],
    selections,
    round: round[goalId] || {},
    roundSize: roundSize || 10,
    textInput: !!textInput
  };
};

export default withRouter(connect(mapStateToProps)(Practice));
