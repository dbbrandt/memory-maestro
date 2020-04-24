import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { handleStartRound } from "../../actions/round";
import { formatDateTime } from "../../utils/formatDate";

const Detail = ({interaction}) => {
  if (!interaction) return null;
  const { title, prompt, criterion, updated_at } = interaction;
  const { copy, stimulus_url } = prompt;
  const { descriptor } = criterion[0];
  return (
  <tr>
    <td>{title}</td>
    <td>{copy}</td>
    {stimulus_url ? (
      <td>
        <img
          alt={title}
          src={stimulus_url}
          className="image-thumbnail"
        />
      </td>
    ) : (
      <td>&nbsp;</td>
    )}
    <td>{descriptor}</td>
    <td>{formatDateTime(updated_at)}</td>
  </tr>
  )
};

class Round extends Component {
  componentDidMount() {
    const { goal_id, dispatch } = this.props;
    if (goal_id) dispatch(handleStartRound(goal_id));
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
                <Detail key={interaction.id} interaction={interaction}/>
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
