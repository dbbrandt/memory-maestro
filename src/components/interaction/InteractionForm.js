import React, { Component } from "react";
import { connect } from "react-redux";
import ImageInput from "../shared/ImageInput";
import PropTypes from "prop-types";

// Currently this form only handle a single criterion. Does not support multiple choice.
const initState = () => ({
  id: 0,
  title: "",
  answer_type: "ShortAnswer",
  prompt: {
    title: "",
    copy: "",
    stimulus_url: "",
  },
  criterion: [{
    title: "",
    description: "",
    copy: "",
    descriptor: "",
    score: 1.0
  }]
});

class InteractionForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.getFormData(this.props.initForm);
  }

  getFormData = (interaction) => {
    const { id, title, prompt, criterion } = interaction;
    const criterion1 = criterion.length > 0 ? criterion[0] : {};
    return ({
      id: id,
      title: title,
      answer_type: "ShortAnswer",
      prompt_title: prompt.title,
      prompt_copy: prompt.copy,
      prompt_stimulus_url: prompt.stimulus_url,
      criterion_title: criterion1.title,
      criterion_description: criterion1.description,
      criterion_copy: criterion1.copy,
      criterion_descriptor: criterion1.descriptor,
      criterion_score: criterion1.score
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit(this.state);
    this.setState(initState);
  };

  handleCancel = (event)  => {
    event.preventDefault();
    this.props.handleCancel(this.state);
  };

  handleDelete = (event) => {
    event.preventDefault();
    const { handleDelete } = this.props;
    const { id } = this.state;
    let ok = window.confirm('Are you sure you want to delete this interaction?');
    if (!!id && ok) handleDelete(id);
  };

  handleImageChange = url => {
    this.setState({ imgURL: url });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      id,
      title,
      prompt_copy,
      prompt_stimulus_url,
      criterion_copy,
      criterion_descriptor
    } = this.state;

    const { handleCancel, handleDelete } = this.props;
    return (
      <form className="form box" onSubmit={this.handleSubmit}>
        <div>
          <label>Title:</label>
          <textarea
            maxLength={80}
            rows={2}
            cols={60}
            className="form-text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <div className='form-separator-box'>
          Prompt
        </div>
        <div>
          <label>Copy:</label>
          <textarea
            rows={4}
            cols={60}
            className="form-text"
            name="prompt_copy"
            value={prompt_copy}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Stimulus Image:</label>
          <ImageInput
            handleFileChange={this.handleImageChange}
            className="image-input"
            maxHeight={80}
            value={prompt_stimulus_url}
            onChange={this.handleChange}
          />
        </div>
        <div className='form-separator-box'>
          Correct Response
        </div>
        <div>
          <label>Answer:</label>
          <textarea
            rows={2}
            cols={60}
            className="form-text"
            name="criterion_descriptor"
            value={criterion_descriptor}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Explaination:</label>
          <textarea
            rows={4}
            cols={60}
            className="form-text"
            name="criterion_copy"
            value={criterion_copy}
            onChange={this.handleChange}
          />
        </div>
        <div className="button-bar">
          <button className="btn" type="submit">
            Save
          </button>
          {!!handleCancel &&
            <button className="btn" onClick={this.handleCancel}>
              Cancel
            </button>}
          {!!handleDelete && !!id && (
            <button className="btn" onClick={this.handleDelete}>
              Delete
            </button>
          )}
        </div>
      </form>
    );
  }
}

InteractionForm.defaultProps = {
  initForm: initState()
};

InteractionForm.propType = {
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func,
  handleDelete: PropTypes.func,
  initForm: PropTypes.object
};

export default connect()(InteractionForm);
