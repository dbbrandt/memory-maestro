import React, { Component } from "react";

const FRONT = "QUESTION";
const BACK = "ANSWER";

class RoundDetail extends Component {
  state = {
    face: FRONT
  };

  handleFlip = () => {
    const { face } = this.state;
    this.setState({face: face === FRONT ? BACK : FRONT});
  };

  handleSubmit = (interaction, correct) => {
    const { face } = this.state;
    this.setState({face: FRONT});
    this.props.onSubmit(interaction, correct)
  };

  showContent = (interaction) => {
    const { face } = this.state;
    const { title, prompt, criterion} = interaction;
    const { copy, stimulus_url } = prompt;
    const { descriptor } = criterion[0];
    return (
      face === FRONT ? (
      <div>
        <div>{copy}</div>
        {!!stimulus_url && (
          <div>
            <img
              alt={title}
              src={stimulus_url}
              className="image-thumbnail"
            />
          </div>
        )}
      </div>
      ) : (
       <div>{descriptor}</div>
      )
    )
  };


  render() {
    const { interaction, current, totalCards } = this.props;
    const { face } = this.state;
    const toFace = face === FRONT ? BACK : FRONT;
    return (
      <div>
        <div>
            {current + 1} of {totalCards}
        </div>
        {this.showContent(interaction)}
        <div>
          <button onClick={this.handleFlip}>{toFace}</button>
        </div>
        <div>
          <button onClick={() => this.handleSubmit(interaction, true)}>
            Correct!
          </button>
          <button onClick={() => this.handleSubmit(interaction, false)}>
            Incorrect
          </button>
        </div>
      </div>
    );
  }
}

export default RoundDetail;
