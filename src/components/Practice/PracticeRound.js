import React, { Component } from "react";
import { connect } from "react-redux";
import PracticeResponse from "./PracticeResponse";
import { handleStartRound, handleSubmitRoundDetail, completeRound } from "../../actions/round";

const InitialData = {
  current: 0,
  answeredCount: 0,
  correctCount: 0,
  answerList: []
};

class PracticeRound extends Component {
  state = InitialData;

  componentDidMount() {
    const { goalId, roundSize, dispatch } = this.props;
    if (goalId) dispatch(handleStartRound(goalId, roundSize));
  }

  handleSubmit = (interaction, answer, review) => {
    const { goalId, round, dispatch, history, textInput } = this.props;
    const { current, answeredCount, correctCount, answerList } = this.state;
    const calcCorrect = textInput ? interaction["correct"] : review;
    const calcScore = textInput ? interaction["score"] : 0;
    dispatch(handleSubmitRoundDetail(goalId, interaction.id, round, answer, calcCorrect, calcScore, review ));
    if (current + 1 >= round.interactions.length) {
      dispatch(completeRound({ goalId }));
      history.push(`practice-result?answered=${answeredCount + 1}&correct=${correctCount + 
        (review ? 1 : 0)}`
      );
      this.setState(InitialData);
    } else {
      this.setState({
        current: current + 1,
        answeredCount: answeredCount + 1,
        correctCount: correctCount + (review ? 1 : 0),
        questionsAnswered: answerList.push(interaction)
      });
    }
  };

  render() {
    const { goalId, round, loading, history } = this.props;
    const { interactions } = round;
    if (!goalId) history.push("/");
    if (loading) return null;

    const { current } = this.state;
    if (!interactions) return null;
    const interaction = interactions[current];
    return (
      <PracticeResponse
        interaction={interaction}
        current={current}
        totalCards={interactions.length}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = ({ selections, round, loading }) => {
  const { goal, roundSize, textInput } = selections;
  return {
    goalId: goal,
    roundSize,
    textInput,
    round: round[goal] || {},
    loading
  };
};

export default connect(mapStateToProps)(PracticeRound);
