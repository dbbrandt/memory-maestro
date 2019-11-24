import React, { Component } from "react";
import { connect } from "react-redux";
import { handleFetchInteractions } from "../actions/interactions";

class Interactions extends Component {
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.props.dispatch(handleFetchInteractions(params.goalId));
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr className="interaction">
              <th>Title</th>
              <th>Answer Type</th>
              <th>Image</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {this.props.interactions.map(interaction => (
              <tr key={interaction.id}>
                <td>{interaction.title}</td>
                <td>{interaction.answer_type}</td>
                <td><img src={interaction.prompt.stimulus_url} className='stimulus_thumbnail'></img></td>
                <td>
                  {new Intl.DateTimeFormat("en-US").format(
                    new Date(interaction.created_at)
                  )}
                </td>
                <td>
                  {new Intl.DateTimeFormat("en-US").format(
                    new Date(interaction.updated_at)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(state => ({
  interactions: state.interactions
}))(Interactions);
