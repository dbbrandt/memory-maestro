import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchInteractions,
  handleFetchInteractions
} from "../../actions/interactions"
import { setLoading } from "../../actions/loading";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import './interaction.css';

class InteractionList extends Component {
  constructor(props) {
    super(props);
    this.interactionCount = 0;
  }

  componentDidMount() {
    const { dispatch, goalId, selections } = this.props;
    if (selections.goal !== goalId) {
      dispatch(showLoading());
      dispatch(setLoading(true));
      dispatch(fetchInteractions([]));
      dispatch(handleFetchInteractions(goalId));
    }
  }

  setStimulusLoaded = () => {
    const { dispatch } = this.props;
    this.interactionCount--;
    if (this.interactionCount <= 0) {
      dispatch(hideLoading());
      dispatch(setLoading(false));
    }
  };

  getStimulus = interaction => {
    const { title, prompt } = interaction;
    if (prompt.stimulus_url === "") {
      this.setStimulusLoaded();
      return <span>{prompt.copy}</span>;
    } else {
      return (
        <img
          alt={title}
          src={prompt.stimulus_url}
          className="stimulus_thumbnail"
          onLoad={() => this.setStimulusLoaded()}
          onError={() => this.setStimulusLoaded()}
        />
      );
    }
  };

  render() {
    const { loading, interactions } = this.props;
    this.interactionCount = interactions.length;
    return (
      <div className='interaction' style={{ display: loading  ? "none" : "block" }}>
        <div className='header-box'>
          Total interactions: {this.interactionCount}
        </div>
        <div className='box'>
          <table>
            <thead>
              <tr className="interaction">
                <th>Title</th>
                <th>Stimulus</th>
                <th>Answer Type</th>
                <th>Created</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {this.props.interactions.map(interaction => (
                <tr key={interaction.id} className="interaction">
                  <td>{interaction.title}</td>
                  <td>{this.getStimulus(interaction)}</td>
                  <td>{interaction.answer_type}</td>
                  <td>
                    {new Intl.DateTimeFormat("en-US").format(
                      new Date(interaction.created_at)
                    )}
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("en-US").format(
                      new Date(interaction.updated_at)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ interactions, loading, selections }, { match }) => ({
  interactions,
  loading,
  selections,
  goalId: match.params.goalId
});

export default connect(mapStateToProps)(InteractionList);
