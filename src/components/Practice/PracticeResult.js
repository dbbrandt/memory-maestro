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
      <div className="result-detail">
        <div>
          {pct_correct >= 80 ? (
            <img className="result-img" alt="well done" src={smiley}/>
          ) : (
            <img className="result-img" alt="nice try" src={star}/>
          )}
          <div className="result-heading">
            <h3>{title}</h3>
          </div>
          <div>Score: {pct_correct}%</div>
          <div>Answered: {answered}</div>
          <div>Correct: {correct}</div>
        </div>
        <div className="result-button">
          <button onClick={this.handleRestart}>
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ selections, goals }) => {
  const goalId = selections.goal;
  const { title } = goals[goalId];
  return {
    title
  };
};

export default connect(mapStateToProps)(PracticeResult);
