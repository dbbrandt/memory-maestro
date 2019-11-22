import React from 'react';
import { connect } from 'react-redux';

const Interactions = () => {
  return (
    <div>Interactions</div>
  )
}

export default connect((state) => ({
  interactions: state.interactions
}))(Interactions);
