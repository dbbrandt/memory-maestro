import React from "react";
import { connect } from "react-redux";
import './Goals.css'

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
              <td><button onClick={() => props.history.push('/interactions')}>{goal.title}</button></td>
              <td>{goal.description}</td>
              <td>{goal.instructions}</td>
              <td>{goal.created_at.slice(0,10)}</td>
              <td>{goal.updated_at.slice(0,10)}</td>
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
