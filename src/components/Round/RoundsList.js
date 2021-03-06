import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'
import { handleFetchRounds } from "../../actions/rounds";
import { formatDate, formatDateTime } from "../../utils/formatDate";

class RoundsList extends Component {
  componentDidMount() {
    const { goalId, dispatch } = this.props;
    if (goalId) dispatch(handleFetchRounds(goalId));
  }

  render() {
    const { loading, goalId, rounds, history } = this.props;
    if (!goalId) history.push('/');
    if (loading) return null;
    return (
      !rounds || rounds.length === 0 ? <div>No Rounds Found</div>
        :
      <div className='rounds'>
        <div className='header-box'>Rounds</div>
        <div className='box'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Last Activity</th>
                <th>Total</th>
                <th>Correct</th>
                <th>Score</th>
                <th>Started On</th>
              </tr>
            </thead>
            <tbody>
              {rounds.map(round => (
                <tr key={round.id}>
                  <td><Link to={`/round-detail/${round.id}`}>{round.id}</Link></td>
                  <td>{formatDateTime(round.updated_at)}</td>
                  <td className='centered'>{round.total}</td>
                  <td className='centered'>{round.correct}</td>
                  <td className='centered'>{round.score}%</td>
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
    goalId: selections.goal,
    rounds: sorted,
    loading
  };
};

export default withRouter(connect(mapStateToProps)(RoundsList));
