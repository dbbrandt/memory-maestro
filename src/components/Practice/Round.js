import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { handleFetchRound } from "../../actions/round";
import { formatDateTime } from "../../utils/formatDate";

class Round extends Component {
  componentDidMount() {
    const { goal_id, dispatch } = this.props;
    if (goal_id) dispatch(handleFetchRound(goal_id));
  }

  render() {
    const { loading, goal_id, round, history } = this.props;
    if (!goal_id) history.push('/');
    if (loading) return null;
    return (
      !round || round.length === 0 ? <div>No Interactions Found</div>
        :
        <div className='rounds'>
          <div className='header-box'>Round</div>
          <div className='box'>
            <table>
              <thead>
              <tr>
                <th>Title</th>
                <th>Copy</th>
                <th>Stimulus</th>
                <th>Descriptor</th>
                <th>Last Updated</th>
              </tr>
              </thead>
              <tbody>
              {round.map(interaction => (
                <tr>
                  <td className='centered'>{interaction.title}</td>
                  <td className='centered'>{interaction.prompt.copy}</td>
                  <img
                    alt={interaction.title}
                    src={interaction.prompt.stimulus_url}
                    className="image-thumbnail"
                  />
                  <td>{formatDateTime(interaction.updated_at)}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
    )
  }
}

const mapStateToProps = ({ selections, round, loading }) => {
  return {
    goal_id: selections.goal,
    round,
    loading
  };
};

export default withRouter(connect(mapStateToProps)(Round));
