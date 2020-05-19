import React, { Component } from "react";
import { connect } from "react-redux";
import "./Practice.css";
import { handleSubmitRoundCheck } from "../../actions/round";

const FRONT = "QUESTION";
const BACK = "ANSWER";

class PracticeResponse extends Component {
  state = {
    face: FRONT,
    answer: ""
  };

  calcTextSize = text => {
    return 18 - Math.floor(text.length / 100);
  };

  getStimulus = (title, prompt) => {
    if (!prompt) return null;
    if (prompt.stimulus_url === "") {
      const fontSize = { fontSize: this.calcTextSize(prompt.copy) };
      return (
        <div className="detail-text detail-copy" style={fontSize}>
          {prompt.copy}
        </div>
      );
    } else {
      return (
        <img alt={title} src={prompt.stimulus_url} className="stimulus-img" />
      );
    }
  };

  handleFlip = () => {
    const { face, answer } = this.state;
    const { goalId, interaction, textInput, dispatch } = this.props;
    const interactionId = interaction.id;
    this.setState({ face: face === FRONT ? BACK : FRONT });
    if (textInput)
      dispatch(handleSubmitRoundCheck(goalId, interactionId, answer));
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (interaction, review) => {
    const { answer } = this.state;
    this.setState({ face: FRONT, answer: "" });
    this.props.onSubmit(interaction, answer, review);
  };

  getDescriptor = interaction => {
    const descriptor = interaction.criterion[0].descriptor;
    const fontSize = { fontSize: this.calcTextSize(descriptor) };
    return <span style={fontSize}>{descriptor}</span>;
  };

  showContent = interaction => {
    const { face } = this.state;
    const { title, prompt } = interaction;
    const backgroundColor = "cornflowerblue";
    const backColor = face === BACK ? "white" : backgroundColor;
    return (
      <div className={`card ${face === BACK ? "is-flipped" : ""}`}>
        <div className="detail-text card__face">
          {this.getStimulus(title, prompt)}
        </div>
        <div
          className="detail-text card__face card__face--back"
          style={{ color: backColor, backgroundColor: backgroundColor }}
        >
          {this.getDescriptor(interaction)}
        </div>
      </div>
    );
  };

  render() {
    const { interaction, current, totalCards, textInput } = this.props;
    const { face, answer } = this.state;
    const toFace = face === FRONT ? BACK : FRONT;
    const showButtons = !textInput || face === BACK ? true : false;
    return (
      <div className="detail-container">
        <div>
          {current + 1} of {totalCards}
        </div>
        <div className="detail">
          <div className="scene">{this.showContent(interaction)}</div>
          {textInput && (
            <div>
              <textarea
                className="form-text round-textarea"
                maxLength={300}
                rows={2}
                cols={31}
                name="answer"
                value={answer}
                onChange={this.handleChange}
              />
            </div>
          )}
          <div className="detail-text-type">
            <button
              className={"button-link dark-blue"}
              onClick={this.handleFlip}
            >
              {toFace}
            </button>
          </div>
          {showButtons && (
            <div className="detail-bottom">
              <div className="detail-buttons">
                <div>
                  <button
                    className="response-button correct-button"
                    onClick={() => this.handleSubmit(interaction, true)}
                  >
                    Correct!
                  </button>
                </div>
                <div>
                  <button
                    className="response-button incorrect-button"
                    onClick={() => this.handleSubmit(interaction, false)}
                  >
                    Incorrect
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (
  { selections, round },
  { interaction, current, totalCards }
) => {
  const { goal, textInput } = selections;
  return {
    goalId: goal,
    textInput,
    roundId: round[goal] ? round[goal].round_id : 0,
    interaction,
    current,
    totalCards
  };
};

export default connect(mapStateToProps)(PracticeResponse);
