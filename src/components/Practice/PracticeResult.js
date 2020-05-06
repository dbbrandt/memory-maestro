import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import smiley from "../../assets/smileyface.png";
import star from "../../assets/halfstar.png";

class PracticeResult extends Component {
  handleRestart = () => {
    const { history } = this.props;
    history.push('/practice-round?size=5');
  };

  render() {
    const { title, location } = this.props;
    const { correct, answered } = queryString.parse(location.search);
    const pct_correct = ((100 * correct) / answered).toFixed(1);
    return (
      <div>
        <div>
          {pct_correct >= 80 ? (
            <img alt="well done" src={smiley}/>
          ) : (
            <img alt="nice try" src={star}/>
          )}
          <div>{title}</div>
          <div>Score: {pct_correct}%</div>
          <div>Answered: {answered}</div>
          <div>Correct: {correct}</div>
        </div>
        <div>
          <button onClick={this.handleRestart}>
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ selections, goals }) => {
  const goal_id = selections.goal;
  const { title } = goals[goal_id];
  return {
    goal_id,
    title
  };
};

export default connect(mapStateToProps)(PracticeResult);
