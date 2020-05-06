import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {handleDeleteInteraction, handleFetchInteractions} from "../../actions/interactions";
import "./interaction.css";
import { showLoading } from "react-redux-loading-bar";
import { setLoading } from "../../actions/loading";
import {INTERACTION_SECTION, setGoal, setSection} from "../../actions/selections";
import deleteIcon from "../../assets/delete.png";

class Interactions extends Component {

  componentDidMount() {
    const { dispatch, goal, goalId } = this.props;
    if (!goal) return;
    dispatch(setSection(INTERACTION_SECTION));
    dispatch(setGoal(goalId));
    dispatch(showLoading());
    dispatch(setLoading(true));
    dispatch(handleFetchInteractions(goalId));
  }

  handleDelete = id => {
    const { goalId, dispatch } = this.props;
    let ok = window.confirm('Are you sure you want to delete this interaction?');
    if (ok) dispatch(handleDeleteInteraction(goalId, id));

  };

  getStimulus = interaction => {
    const { title, prompt } = interaction;
    if (!prompt) return null;
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
    const { goal, interactions, loading, history } = this.props;
    if (!goal) history.push('/');
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
              {interactions.map(interaction => (
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
                  <td className='icon'>
                    <img onClick={() =>this.handleDelete(interaction.id)} alt='delete' src={deleteIcon}/>
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

const mapStateToProps = ({ goals, interactions, selections, loading }, { match }) => {
    const goalId = match.params.goalId;
    return ({
    loading,
    selections,
    goalId,
    goal: goals[goalId],
    interactions: Object.values(interactions).sort((a, b) => a.title > b.title ? 1 : -1)
  });
};

export default connect(mapStateToProps)(Interactions);
