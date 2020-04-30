import React, { Component } from 'react';
import { connect } from "react-redux";
import { formatDateTime } from "../../utils/formatDate";
import {handleFetchRoundResult, setRound} from "../../actions/round";


class RoundDetail extends Component {
  componentDidMount() {
    const { goal_id, round, dispatch } = this.props;
    dispatch(handleFetchRoundResult(goal_id, round.id ));
  }

  render() {
    const { round } = this.props;
    const { created_at, round_responses, correct, score, total } = round;
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
      </div>
    )
  }
}
const mapStateToProps = ({ selections, rounds }, { match }) => {
  const round_id = Number(match.params.id);
  const round = rounds.filter(r => r.id === round_id)[0];
  return {
    goal_id: selections.goal,
    round
  };
};

export default connect(mapStateToProps)(RoundDetail);
