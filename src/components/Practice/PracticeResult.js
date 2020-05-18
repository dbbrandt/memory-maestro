import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import smiley from "../../assets/smileyface.png";
import star from "../../assets/halfstar.png";
import {handleFetchRoundResponses} from "../../actions/rounds";

class PracticeResult extends Component {
  handleRestart = () => {
    const { history } = this.props;
    history.push("/practice-round?size=5");
  };

  handleDetailClick = () => {
    const { correct, answered, score, history, dispatch, goalId, roundId  } = this.props;
    dispatch(handleFetchRoundResponses(goalId, roundId));
    history.push(`practice-detail?answered=${answered}&correct=${correct}&score=${score}`);
  };

  render() {
    const { title, correct, answered, score, history, goalId } = this.props;
    return (
      <div className="result-detail">
        <div className="result-stats">
          {score >= 80 ? (
            <img className="result-img" alt="well done" src={smiley} />
          ) : (
            <img className="result-img" alt="nice try" src={star} />
          )}
          <div className="result-heading">
            <h3>{title}</h3>
          </div>
          <div>Score: {score}%</div>
          <div>Answered: {answered}</div>
          <div>Correct: {correct}</div>
        </div>
        <div>
          <button className="result-button" onClick={this.handleRestart}>
            Restart Quiz
          </button>
        </div>
        <div>
          <button
            className="result-button"
            onClick={() => history.push(`/practice/${goalId}`)}
          >
            Practice Page
          </button>
        </div>
        <div>
          <button
            className="result-button"
            onClick={this.handleDetailClick}
          >
            Quiz Results
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ selections, goals, round}, { location }) => {
  const { correct, answered } = queryString.parse(location.search);
  const score = ((100 * correct) / answered).toFixed(1);
  const goalId = selections.goal;
  const { title } = goals[goalId];
  return {
    goalId,
    title,
    roundId: round[goalId].round_id,
    correct,
    answered,
    score
  };
};

export default connect(mapStateToProps)(PracticeResult);
