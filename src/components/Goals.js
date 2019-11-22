import React from "react";
import { connect } from "react-redux";
import './Goals.css'

const Goals = props => {
  return (
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
        {props.appData.map(goal => (
          <tr key={goal.id}>
            <td>{goal.title}</td>
            <td>{goal.description}</td>
            <td>{goal.instructions}</td>
            <td>{goal.created_at.slice(0,10)}</td>
            <td>{goal.updated_at.slice(0,10)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default connect(state => ({
  appData: state.appData
}))(Goals);
