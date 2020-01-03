import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {INTERACTION_SECTION, setSection} from "../../actions/selections";
import InteractionForm from "./InteractionForm";
import {handleAddInteraction} from "../../actions/interactions";

class InteractionAdd extends Component {
  componentDidMount() {
    this.props.dispatch(setSection(INTERACTION_SECTION));
  }

  handleSubmit = interaction => {
    debugger;
    const { goalId, dispatch, history } = this.props;
    dispatch(handleAddInteraction(interaction, goalId));
    history.push("/");
  };

  render() {
    const { goalId, history } = this.props;
    debugger;
    if (!goalId) history.push('/');
    return(
      <div className="interaction">
        <div className="header-box">Add Interaction</div>
        <InteractionForm handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

const mapStateToProps = ({ selections }) => ({
  goalId: selections.goal
});

export default withRouter(connect(mapStateToProps)(InteractionAdd));
