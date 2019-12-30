import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {clearInteractions, handleFetchInteractions} from "../../actions/interactions"
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { setLoading } from "../../actions/loading";
import './interaction.css';

class Interactions extends Component {
  constructor(props) {
    super(props);
    this.loadCount = 0;
    ;
  }

  componentDidMount() {
    const { dispatch, goalId, selections } = this.props;
    if (selections.goal !== Number(goalId)) {
      dispatch(setLoading(true));
      dispatch(showLoading());
      dispatch(clearInteractions());
      dispatch(handleFetchInteractions(goalId));
    }
  }

  setStimulusLoaded = () => {
    const { dispatch } = this.props;
    this.loadCount--;
    if (this.loadCount === 0) {
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
    const { interactions, loading, interactionCount } = this.props;
    this.loadCount = interactionCount;
    return (
      <div className='interaction' style={{ display: loading ? 'none' : 'block'}}>
        <div className='header-box'>
          Total interactions: {interactionCount}
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
              {Object.values(interactions).map(interaction => (
                <tr key={interaction.id} className="interaction">
                  <td><Link to={`/interaction-edit/${interaction.id}`}>{interaction.title}</Link></td>
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

const mapStateToProps = ({ interactions, selections }, { match }) => ({
  interactions,
  selections,
  goalId: match.params.goalId,
  interactionCount: Object.keys(interactions).length
});

export default connect(mapStateToProps)(Interactions);
