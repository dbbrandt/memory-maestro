import React, { Component } from "react";
import { connect } from "react-redux";

class Goals extends Component {
  render() {
    const { loading, goals, history } = this.props;
    return (
      <div className="goal" style={{ display: loading ? "none" : "block" }}>
        <div className="header-box">Total goals: {goals.length}</div>
        <div className="box">
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
              {Object.values(goals).map(goal => (
                <tr key={goal.id}>
                  <td>
                    <button
                      className="goal-button"
                      onClick={() => history.push(`/interactions/${goal.id}`)}
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
      </div>
    );
  }
}

export default connect(({ goals, loading }) => ({
  goals,
  loading
}))(Goals);
