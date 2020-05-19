import React, { Component } from "react";
import { connect } from 'react-redux';

class RoundResponses extends Component {
  getStimulus = prompt => {
    if (!prompt) return null;
    if (!prompt.stimulus_url) {
      return <span>{prompt.copy}</span>;
    } else {
      return (
        <img
          alt={prompt.title}
          src={prompt.stimulus_url}
          className="image-thumbnail"
        />
      );
    }
  };

  getDescriptor = interaction => {
    if (interaction.hasOwnProperty("criterion")) {
      return interaction.criterion.descriptor;
    } else {
      const criterion = interaction.contents.filter(c => c.content_type === "Criterion" && c.score > 0);
      return criterion.map(c => c.descriptor).join(" / ");
    }
  };

  render() {
    const { round, loading } = this.props;
    const { round_responses } = round;
    return (
      <div className="box">
        <div className="header-box">Practice Responses</div>
        {!loading &&
        <div className="box">
          <table>
            <thead>
            <tr>
              <th>#</th>
              <th>Correct</th>
              <th>Prompt</th>
              <th>Answer</th>
              <th>Correct Answer</th>
              <th>Review Correct</th>
              <th>Match</th>
            </tr>
            </thead>
            <tbody>
            {round_responses.map((response, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{response.is_correct ? "Yes" : "No"}</td>
                <td>{this.getStimulus(response.interaction.prompt)}</td>
                <td>{response.answer}</td>
                <td>{this.getDescriptor(response.interaction)}</td>
                <td>{response.review_is_correct ? "Yes" : "No"}</td>
                <td>{response.score}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ loading }) => {
  return {
    loading
  };
};

export default connect(mapStateToProps)(RoundResponses);
