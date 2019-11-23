import React from "react";
import { connect } from "react-redux";

const Goals = props => {
  return (
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
          {props.goals.map(goal => (
            <tr key={goal.id}>
              <td>
                <button
                  className="goal-button"
                  onClick={() => props.history.push(`/interactions/${goal.id}`)}
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
};

export default connect(state => ({
  goals: state.goals
}))(Goals);
