import React, { Component } from "react";
import { connect } from "react-redux";
import ImageInput from "../shared/ImageInput";
import PropTypes from "prop-types";

// Currently this form only handle a single criterion. Does not support multiple choice.
const initState = () => ({
  id: 0,
  title: "",
  answerType: "ShortAnswer",
  promptTitle: "",
  promptCopy: "",
  promptStimulusUrl: "",
  imageInputClass: "image-hide",
  imageInputButton: "Show",
  criterionTitle: "",
  criterionDescription: "",
  criterionCopy: "",
  criterionDescriptor: "",
  criterionScore: 0
});

class InteractionForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.setFormData(this.props.initForm);
    // The maximum height of stimulus images. Images will be resized to this.
    // TODO: Determine how best to configure this.
    this.maxHeight = 250;
  }

  setFormData = (interaction) => {
    const { id, title, prompt, criterion } = interaction;
    const criterion1 = criterion.length > 0 ? criterion[0] : {};
    return ({
      id: id,
      title: title,
      answerType: "ShortAnswer",
      promptTitle: prompt.title,
      promptCopy: prompt.copy,
      promptStimulusUrl: prompt.stimulus_url,
      imageInputClass: 'image-hide',
      imageInputButton: 'Show',
      criterionTitle: criterion1.title,
      criterionDescription: criterion1.description,
      criterionCopy: criterion1.copy,
      criterionDescriptor: criterion1.descriptor,
      criterionScore: criterion1.score
    })
  };

  getFormData = () => {
    const s = this.state;
    return ({
      id: s.id,
      title: s.title,
      answerType: s.answerType,
      prompt: {
        title: s.promptTitle,
        copy: s.promptCopy,
        stimulus_url: s.promptStimulusUrl,
      },
      criterion: [{
        title: s.criterionTitle,
        description: s.criterionDescription,
        copy: s.criterionCopy,
        descriptor: s.criterionDescriptor,
        score: s.criterionScore
      }]
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit(this.getFormData());
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
    this.setState({ promptStimulusUrl: url });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleImageInput = event => {
    event.preventDefault();
    const hide = this.state.imageInputClass === 'image-hide' ;
    const newClass = hide ? 'image-input' : 'image-hide';
    const newButton = hide ? 'Hide' : 'Show';
    this.setState({ imageInputClass: newClass, imageInputButton: newButton })

  };

  render() {
    const {
      id,
      title,
      promptCopy,
      promptStimulusUrl,
      imageInputClass,
      imageInputButton,
      criterionCopy,
      criterionDescriptor
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
            name="promptCopy"
            value={promptCopy}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Stimulus Image:
            <button  className='button-link' onClick={this.toggleImageInput}>
              {imageInputButton}
            </button>
          </label>
          <ImageInput
            handleFileChange={this.handleImageChange}
            className={imageInputClass}
            maxHeight={this.maxHeight}
            value={promptStimulusUrl}
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
            name="criterionDescriptor"
            value={criterionDescriptor}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Explaination:</label>
          <textarea
            rows={4}
            cols={60}
            className="form-text"
            name="criterionCopy"
            value={criterionCopy}
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
  goalId: PropTypes.number.isRequired,
  initForm: PropTypes.object,
};

export default connect()(InteractionForm);
