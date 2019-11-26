import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import { handleFetchGoals } from "../actions/goals";

class Goals extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleFetchGoals());
  }

  render() {
    const { loading, goals, history } =  this.props;
    return loading ? (
      <Spinner />
    ) : (
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Instructions</th>
              <th>Created</th>
              <th>Modified</th>
            </tr>
          </thead>
          <tbody>
            {goals.map(goal => (
              <tr key={goal.id}>
                <td>
                  <button
                    className="goal-button"
                    onClick={() =>
                      history.push(`/interactions/${goal.id}`)
                    }
                  >
                    {goal.title}
                  </button>
                </td>
                <td>{goal.description}</td>
                <td>{goal.instructions}</td>
                <td>
                  {new Intl.DateTimeFormat("en-US").format(
                    new Date(goal.created_at)
                  )}
                </td>
                <td>
                  {new Intl.DateTimeFormat("en-US").format(
                    new Date(goal.updated_at)
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
  goals: state.goals,
  loading: state.loading
}))(Goals);
