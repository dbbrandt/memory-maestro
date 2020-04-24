import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Practice.css';

class Practice extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/rounds');
  };

  handleStartRound = () => {
    const { history } = this.props;
    history.push('/round');
  };


  render() {
    const { goal_id, history } = this.props;
    if (!goal_id) history.push('/');
    return (
      <div className='practice-info'>
        <div>
          <h1>UNDER CONSTRUCTION</h1>
          <div className='btn'>
            <button onClick={this.handleClick}>Practice Rounds</button>
          </div>
          <div className='btn'>
            <button onClick={this.handleStartRound}>Start Round</button>
          </div>
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
          <div>
            See: <a alt='Short Answer Grading'
                    href='https://github.com/dbbrandt/short_answer_granding_capstone_project/blob/master/capstone_report.pdf'
                    target="_blank" rel="noopener noreferrer">
            Short Answer Grading - Machine Learning Project
          </a>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = ({ selections }) => ({
  goal_id: selections.goal
})

export default withRouter(connect(mapStateToProps)(Practice));
