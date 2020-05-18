import React, { Component } from 'react';
import { connect } from "react-redux";
import { formatDateTime } from "../../utils/formatDate";
import {handleFetchRoundResponses } from "../../actions/rounds";
import RoundResponses from "./RoundResponses";
import './Round.css';


class RoundDetail extends Component {
  componentDidMount() {
    const { goalId, round, dispatch } = this.props;
    dispatch(handleFetchRoundResponses(goalId, round.id ));
  }

  render() {
    const { round } = this.props;
    const { created_at, correct, score, total } = round;
    if (!round.id) return <h1>No round loaded.</h1>
     return (
      <div className="box">
        <div className="header-box">Round Detail</div>
        <div className="response-totals">
          <div className="response-line">
            <div>Total Questions:</div>
            <div>{total}</div>
          </div>
          <div className="response-line">
            <div>Correct:</div>
            <div>{correct}</div>
          </div>
          <div className="response-line">
            <div>Score:</div>
            <div>{score}%</div>
          </div>
          <div className="response-line">
            <div>Created:</div>
            <div>{formatDateTime(created_at)}</div>
          </div>
        </div>
        <RoundResponses round={round} />
      </div>
    )
  }
}
const mapStateToProps = ({ selections, rounds }, { match }) => {
  const round_id = Number(match.params.id);
  const index = rounds.findIndex(r => r.id === round_id);
  return {
    goalId: selections.goal,
    round: index === -1 ? {} : rounds[index]
  };
};

export default connect(mapStateToProps)(RoundDetail);
