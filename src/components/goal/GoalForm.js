import React, { Component } from "react";
import PropTypes from "prop-types";
import ImageInput from "../shared/ImageInput";
import "./goal.css";

const initState = () => ({
  id: 0,
  title: "",
  description: "",
  instructions: "",
  imgURL: "",
  imgAltText: ""
});

class GoalForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.initForm;
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit(this.state);
    this.setState(initState);
  };

  handleCancel =  event => {
    event.preventDefault();
    this.props.handleCancel(this.state);
  };


  handleDelete = (event) => {
    event.preventDefault();
    const { handleDelete } = this.props;
    const { id } = this.state;
    let ok = window.confirm('Are you sure you want to delete this goal?');
    if (!!id && ok) handleDelete(id);
  };

  handleImageChange = url => {
    this.setState({ imgURL: url });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { id, title, description, instructions, imgUrl, imgAltText } = this.state;
    const { handleCancel, handleDelete } = this.props;
    return (
      <form className="form box" onSubmit={this.handleSubmit}>
        <div>
          <label>Title:</label>
          <textarea
            maxLength={80}
            rows={2}
            cols={31}
            className="form-text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            className="form-text"
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
            name="instructions"
            className="form-text"
            value={instructions}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Goal Image:</label>
          <ImageInput
            handleFileChange={this.handleImageChange}
            className="image-input"
            maxHeight={80}
            value={imgUrl}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Alt Text:</label>
          <input
            size={40}
            maxLength={40}
            className="form-text"
            name="imgAltText"
            value={imgAltText}
            onChange={this.handleChange}
          />
        </div>
        <div className='button-bar'>
          <button className="btn" type="submit">
            Save
          </button>
          {!!handleCancel &&
            < button className="btn" onClick={this.handleCancel}>
              Cancel
            </button>
          }
          {!!handleDelete && !!id &&
            <button className="btn" onClick={this.handleDelete}>
              Delete
            </button>
          }
        </div>
      </form>
    );
  }
}


GoalForm.defaultProps = {
  initForm: initState()
};

GoalForm.propType = {
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func,
  handleDelete: PropTypes.func,
  initForm: PropTypes.object
};

export default GoalForm;
