import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import "./goal.css";
import ImageInput from "../shared/ImageInput";
import {handleAddGoal} from "../../actions/goals";

class GoalAdd extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState;
  }

  initState = {
    title: "",
    description: "",
    instructions: "",
    imgURL: "",
    imgAltText: ""
  };

  handleImageChange = (url) => {
    this.setState({imgURL: url});
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch(handleAddGoal(this.state));
    this.setState(this.initState);
    this.props.history.push("/");
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      title,
      description,
      instructions,
      imgAltText
    } = this.state;
    return (
      <div className="goal">
        <div className="header-box">Add Goal</div>
        <form className="goal-form box" onSubmit={this.handleSubmit}>
          <div>
            <label>Title:</label>
            <textarea
              maxLength={80}
              rows={2}
              cols={31}
              className="goal-text"
              name="title"
              value={title}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              className="goal-text"
              maxLength={160}
              rows={2}
              cols={31}
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Instructions:</label>
            <textarea
              maxLength={160}
              rows={4}
              cols={31}
              name='instructions'
              className="goal-text"
              value={instructions}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Goal Image:</label>
            <ImageInput
              handleFileChange={this.handleImageChange}
              className='hero-image-input'
              maxHeight={80}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Alt Text:</label>
            <input
              size={40}
              maxLength={40}
              className="goal-text"
              name="imgAltText"
              value={imgAltText}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button className='btn' type='submit'>Save</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(connect()(GoalAdd));
