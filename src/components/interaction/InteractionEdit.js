import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import InteractionForm from "./InteractionForm";
import {handleDeleteInteraction, handleUpdateInteraction} from "../../actions/interactions";
import {INTERACTION_SECTION, setSection} from "../../actions/selections";

class InteractionEdit extends Component {
  handleSubmit = interaction => {
    const { dispatch, history, goalId } = this.props;
    dispatch(setSection(INTERACTION_SECTION));
    dispatch(handleUpdateInteraction(interaction, goalId));
    history.push("/");
  };

  handleDelete = id => {
    const { dispatch, history } = this.props;
    dispatch(handleDeleteInteraction(id));
    history.push("/");
  };

  handleCancel = () => {
    const { goalId, history } = this.props;
    const dest = goalId ? "/interactions/"+goalId : "/";
    history.push(dest);
  };

  render() {
    const { interaction, goalId, history } = this.props;
    if (!goalId) history.push('/');
    return interaction ? (
      <div className="interaction">
        <div className="header-box">Edit Interaction</div>
        <InteractionForm
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
          handleDelete={this.handleDelete}
          initForm={interaction}
        />
      </div>
    ) : (
      <div>No interaction selected.</div>
    );
  }
}

const mapStateToProps = ({ interactions, selections }, { match }) => {
  const goalId = selections.goal;
  const interactionId = Number(match.params.id);
  const interaction = interactions[interactionId];
  return { goalId, interactionId, interaction };
};

export default withRouter(connect(mapStateToProps)(InteractionEdit));
