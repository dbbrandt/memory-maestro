import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import deleteIcon from '../../assets/delete.png';
import editIcon from '../../assets/edit.png';
import {handleDeleteGoal} from "../../actions/goals";

class Goals extends Component {
  handleDelete = (id) => {
    const { dispatch } = this.props;
    let ok = window.confirm('Are you sure you want to delete this goal?');
    if (ok) dispatch(handleDeleteGoal(id));
  };

  render() {
    const { loading, goals } = this.props;
    return (
      <div className="goal" style={{ display: loading ? "none" : "block" }}>
        <div className="header-box">Total goals: {goals.length}</div>
        <div className="box">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>Description</th>
                <th>Created</th>
                <th>Modified</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(goals).map(goal => (
                <tr key={goal.id}>
                  <td>
                    <Link to={`/interactions/${goal.id}`}>{goal.title}</Link>
                  </td>
                  <td>
                    <img
                      alt={goal.description}
                      src={goal.image_url}
                      className="image-thumbnail"
                    />
                  </td>
                  <td>{goal.description}</td>
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
                  <td className='icon'>
                    <Link to={`/goal-edit/${goal.id}`}><img alt='edit' src={editIcon}/></Link>
                  </td>
                  <td className='icon'>
                    <img onClick={() =>this.handleDelete(goal.id)} alt='delete' src={deleteIcon}/>
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
