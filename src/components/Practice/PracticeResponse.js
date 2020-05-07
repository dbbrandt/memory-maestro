import React, { Component } from "react";
import "./Practice.css";

const FRONT = "QUESTION";
const BACK = "ANSWER";

class PracticeResponse extends Component {
  state = {
    face: FRONT
  };

  getStimulus = ( title, prompt ) => {
    if (!prompt) return null;
    if (prompt.stimulus_url === "") {
      return <div className="detail-text detail-copy">{prompt.copy}</div>
    } else {
      return (
          <img
            alt={title}
            src={prompt.stimulus_url}
            className="stimulus-img"
          />
      );
    }
  };

  handleFlip = () => {
    const { face } = this.state;
    this.setState({face: face === FRONT ? BACK : FRONT});
  };

  handleSubmit = (interaction, answer, correct) => {
    this.setState({face: FRONT});
    this.props.onSubmit(interaction, answer, correct)
  };

  getDescriptor = (interaction) => {
    return interaction.criterion[0].descriptor;
  };

  showContent = (interaction) => {
    const { face } = this.state;
    const { title, prompt } = interaction;
    const backgroundColor = "cornflowerblue";
    const backColor = face === BACK ? "white" : backgroundColor;
    return (
      <div className={`card ${face === BACK ? "is-flipped" : ""}`}>
        <div className="detail-text card__face">
          {this.getStimulus(title, prompt)}
        </div>
           <div className="detail-text card__face card__face--back"
                style={{color: backColor, backgroundColor: backgroundColor}}>
          {this.getDescriptor(interaction)}
        </div>
      </div>
    )
  };

  render() {
    const { interaction, current, totalCards } = this.props;
    const { face } = this.state;
    const descriptor = this.getDescriptor(interaction);
    const toFace = face === FRONT ? BACK : FRONT;
    return (
      <div className="detail-container">
        <div style={{ textAlign: "left" }}>
          {current + 1} of {totalCards}
        </div>
        <div className="detail">
          <div className="scene">
            {this.showContent(interaction)}
          </div>
          <div className="detail-text-type">
            <button className={"button-link dark-blue"} onClick={this.handleFlip}>{toFace}</button>
          </div>
          <div className="detail-bottom">
            <div className="detail-bottom-spacer">

            </div>
            <div  className="detail-buttons">
              <div>
                <button className="response-button correct-button"
                        onClick={() => this.handleSubmit(interaction, descriptor, true)}>
                  Correct!
                </button>
              </div>
              <div>
                <button className="response-button incorrect-button"
                        onClick={() => this.handleSubmit(interaction, descriptor, false)}>
                  Incorrect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PracticeResponse;
