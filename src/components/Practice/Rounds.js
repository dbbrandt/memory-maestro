import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { handleFetchRounds } from "../../actions/rounds";
import { formatDate, formatDateTime } from "../../utils/formatDate";

class Rounds extends Component {
  componentDidMount() {
    const { goal_id, dispatch } = this.props;
    if (goal_id) dispatch(handleFetchRounds(goal_id));
  }

  render() {
    const { loading, goal_id, rounds, history } = this.props;
    if (!goal_id) history.push('/');
    if (loading) return null;
    return (
      !rounds ? <div>No Rounds Found</div>
        :
      <div className='rounds'>
        <div className='header-box'>Rounds</div>
        <div className='box'>
          <table>
            <thead>
              <tr>
                <th>Last Activity</th>
                <th>Interactions</th>
                <th>Correct</th>
                <th>Score</th>
                <th>Started On</th>
              </tr>
            </thead>
            <tbody>
              {rounds.map(round => (
                <tr>
                  <td>{formatDateTime(round.updated_at)}</td>
                  <td className='centered'>{round.round_responses.total}</td>
                  <td className='centered'>{round.round_responses.correct}</td>
                  <td className='centered'>{round.round_responses.score}%</td>
                  <td>{formatDate(round.created_at)}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ selections, rounds, loading }) => {
  const sorted = !!rounds && rounds.length > 0 ? [...rounds].sort((a,b) => b.updated_at - a.updated_at > 0 ? 1 : -1)
    : rounds;
  return {
    goal_id: selections.goal,
    rounds: sorted,
    loading
  };
};

export default withRouter(connect(mapStateToProps)(Rounds));
