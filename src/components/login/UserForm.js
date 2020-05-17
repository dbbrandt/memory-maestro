import React, { Component } from "react";
import PropTypes from "prop-types";
import ImageInput from "../shared/ImageInput";
import "./User.css";

const initState = () => ({
  id: 0,
  email: "",
  name: "",
  avatar_url: "",
  image_data_url: "",
  image_filename: ""
});

class UserForm extends Component {
  constructor(props) {
    super(props);
    const user  = props.user ? props.user : {};
    const { name, avatar_url } = user;
    this.state = this.props.initForm;
    this.state.name = name || "";
    this.state.avatar_url = avatar_url || "";
    this.maxHeight = 250;
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit(this.state);
    this.setState(initState);
  };

  handleCancel = event => {
    event.preventDefault();
    this.props.handleCancel(this.state);
  };

  handleImageChange = (data_url, filename) => {
    this.setState({ image_data_url: data_url, image_filename: filename });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, avatar_url } = this.state;
    return (
      <form className="form box" onSubmit={this.handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            size={40}
            maxLength={40}
            className="form-text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Avatar:</label>
          <ImageInput
            handleImageChange={this.handleImageChange}
            className="image-input"
            maxHeight={this.maxHeight}
            value={avatar_url}
            onChange={this.handleChange}
          />
        </div>
        <div className="button-bar">
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    );
  }
}

UserForm.defaultProps = {
  initForm: initState()
};

UserForm.propType = {
  handleSubmit: PropTypes.func.isRequired,
  initForm: PropTypes.object
};

export default UserForm;
