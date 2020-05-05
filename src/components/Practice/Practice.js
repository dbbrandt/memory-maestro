import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Practice.css';

class Practice extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/rounds-list');
  };

  handleStartRound = () => {
    const { history } = this.props;
    history.push('/practice-round?size=5');
  };


  render() {
    const { goal_id, round, history } = this.props;
    const { submitCount, correctCount, attemptCount, completionCount } = round;
    const score = submitCount ? (100 * correctCount / submitCount).toFixed(1) : 0;
    if (!goal_id) history.push('/');
    return (
      <div className='practice-info'>
        <div>
          <h1>Practice Your Goals</h1>
          <div>
            Practice your goals by responding to a selection of interactions. Choose the number
            of interactions to practice and a random selection will be presented. This is called a practice round.
          </div>
          <div>
            Overtime MemoryMaestro will learn your areas of competency and through spaced repetition strengthen other
            areas.
            The goal is to use recall v.s. recognition as much as possible (short answer v.s. multiple choice). When you
            use
            multiple choices your memory is less stimulated as compared to recalling information by filling in a short
            answer
            based on a prompt (image or question).
          </div>
          <div>
            When grading, the challenge for the system to recognizing if the short answer is correct remains un-solved
            problem even with AI. In this system, we are building an deep learning model that takes self assessed short
            answers
            that a user provides after an interaction. The model goal is ultimately to auto-grade most of the short
            answers
            making the user experience much more streamlined and satisfying.

          </div>
          <div className='btn'>
            <button onClick={this.handleStartRound}>Start Round</button>
          </div>
          <div>
            <h3>Cumulative Results</h3>
            <div>Answered: {submitCount}</div>
            <div>Correct: {correctCount}</div>
            <div>Score: {score}%</div>
            <div>Started: {attemptCount}</div>
            <div>Completed: {completionCount}</div>
          </div>
          <div className='btn'>
            <button onClick={this.handleClick}>Previous Rounds</button>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = ({ selections, round }) => {
  const goal_id = selections.goal;
  return {
    goal_id,
    round: round[goal_id] ? round[goal_id] : {}
  }
};

export default withRouter(connect(mapStateToProps)(Practice));
