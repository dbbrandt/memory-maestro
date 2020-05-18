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
            </tr>
            </thead>
            <tbody>
            {round_responses.map((response, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{response.is_correct ? "Yes" : "No"}</td>
                <td>{this.getStimulus(response.interaction.prompt)}</td>
                <td>{response.answer}</td>
                <td>{response.interaction.criterion.descriptor}</td>
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
