import React, { Component } from 'react';
import {INTERACTION_SECTION, setSection} from "../../actions/selections";

class InteractionAdd extends Component {
  componentDidMount() {
    this.props.dispatch(setSection(INTERACTION_SECTION));
  }
  render() {
    return(
      <div>Interaction Add</div>
    )
  }
}

export default InteractionAdd;
