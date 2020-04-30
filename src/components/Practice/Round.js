import React, { Component } from "react";
import { connect } from "react-redux";
import RoundResponse from "./RoundResponse";
import { handleStartRound, handleRoundDetail, completeRound } from "../../actions/round";
import queryString from "query-string";

const InitialData = {
  current: 0,
  answeredCount: 0,
  correctCount: 0,
  answerList: []
};

class Round extends Component {
  state = InitialData;

  componentDidMount() {
    const { goal_id, dispatch, location } = this.props;
    const { size } = queryString.parse(location.search);
    if (goal_id) dispatch(handleStartRound(goal_id, size));
  }

  handleSubmit = (interaction, correct) => {
    const { goal_id, round, dispatch, history } = this.props;
    const { current, answeredCount, correctCount, answerList } = this.state;

    dispatch(handleRoundDetail(goal_id, round, correct ));
    if (current + 1 >= round.interactions.length) {
      dispatch(completeRound({ goal_id }));
      history.push(
        `round-result?answered=${answeredCount + 1}&correct=${correctCount +
        (correct ? 1 : 0)}`
      );
      this.setState(InitialData);
    } else {
      this.setState({
        current: current + 1,
        answeredCount: answeredCount + 1,
        correctCount: correctCount + (correct ? 1 : 0),
        questionsAnswered: answerList.push(interaction)
      });
    }
  };

  render() {
    const { goal_id, round, loading, history } = this.props;
    const { interactions } = round;
    if (!goal_id) history.push("/");
    if (loading) return null;

    const { current } = this.state;
    if (!interactions) return null;
    const interaction = interactions[current];
    return (
      <RoundResponse
        interaction={interaction}
        current={current}
        totalCards={interactions.length}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = ({ selections, round, loading }) => {
  const goal_id = selections.goal;
  return {
    goal_id,
    round: round[goal_id] || {},
    loading
  };
};

export default connect(mapStateToProps)(Round);
