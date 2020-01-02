import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {handleFetchInteractions} from "../../actions/interactions";
import "./interaction.css";
import {showLoading} from "react-redux-loading-bar";
import {setLoading} from "../../actions/loading";

class Interactions extends Component {

  componentDidMount() {
    const { dispatch, goalId, selections } = this.props;
    if (selections.goal !== Number(goalId)) {
      dispatch(showLoading());
      dispatch(setLoading(true));
      dispatch(handleFetchInteractions(goalId));
    }
  }

  getStimulus = interaction => {
    const { title, prompt } = interaction;
    if (prompt.stimulus_url === "") {
      return <span>{prompt.copy}</span>;
    } else {
      return (
        <img
          alt={title}
          src={prompt.stimulus_url}
          className="image-thumbnail"
        />
      );
    }
  };

  render() {
    debugger;
    const { interactions, loading } = this.props;
    return (
      <div
        className="interaction"
        style={{ display: loading ? "none" : "block" }}
      >
        <div className="header-box">Total interactions: {interactions.length}</div>
        <div className="box">
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
                  <td>
                    <Link to={`/interaction-edit/${interaction.id}`}>
                      {interaction.title}
                    </Link>
                  </td>
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

const mapStateToProps = ({ interactions, selections, loading }, { match }) => ({
    loading,
    selections,
    goalId: match.params.goalId,
    interactions: Object.values(interactions).sort((a, b) => a.title > b.title ? 1 : -1)
});

export default connect(mapStateToProps)(Interactions);
