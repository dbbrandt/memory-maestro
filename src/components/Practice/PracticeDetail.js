import React, { Component } from 'react';
import { connect } from "react-redux";
import queryString from "query-string";
import '../Round/Round.css';
import RoundResponses from "../Round/RoundResponses";


class PracticeDetail extends Component {
  render() {
    const { loading, practiceRound, roundId, correct, answered, score } = this.props;
    if (!roundId) return <h1>No round loaded.</h1>
    return (
      <div className="box">
        <div className="header-box">Practice Detail</div>
        <div className="response-totals">
          <div className="response-line">
            <div>Answered:</div>
            <div>{answered}</div>
          </div>
          <div className="response-line">
            <div>Correct:</div>
            <div>{correct}</div>
          </div>
          <div className="response-line">
            <div>Score:</div>
            <div>{score}%</div>
          </div>
        </div>
        {!loading &&
          <RoundResponses round={practiceRound}/>
        }
      </div>
    )
  }
}
const mapStateToProps = ({ selections, round, loading }, { location }) => {
  const goalId = selections.goal;
  const practiceRound = round[goalId];
  const roundId = practiceRound.round_id;
  const { correct, answered, score } = queryString.parse(location.search);
  return {
    loading,
    goalId,
    practiceRound,
    roundId,
    correct,
    answered,
    score
  };
};

export default connect(mapStateToProps)(PracticeDetail);
