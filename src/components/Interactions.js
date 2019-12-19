import React, { Component } from "react";
import { connect } from "react-redux";
import { handleFetchInteractions } from "../actions/interactions";
import { setLoading } from "../actions/loading";
import { showLoading, hideLoading } from "react-redux-loading-bar";

class Interactions extends Component {
  constructor(props) {
    super(props);
    this.imgCount = 0;
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    const { dispatch } = this.props;
    dispatch(showLoading());
    dispatch(setLoading(true));
    dispatch(handleFetchInteractions(params.goalId));
  }

  setImageLoaded = () => {
    this.imgCount--;
    if (this.imgCount === 0) {
      this.props.dispatch(hideLoading());
      this.props.dispatch(setLoading(false));
    }
  };

  render() {
    const { loading, interactions } = this.props;
    console.log('Render Interactions - loading: ', loading);
    this.imgCount = interactions.length;
    return (
      <div style={{ display: loading ? "none" : "block" }}>
        <table>
          <thead>
            <tr className="interaction">
              <th>Title</th>
              <th>Image</th>
              <th>Answer Type</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {this.props.interactions.map(interaction => (
              <tr key={interaction.id} className="interaction">
                <td>{interaction.title}</td>
                <td>
                  <img
                    alt={interaction.title}
                    src={interaction.prompt.stimulus_url}
                    className="stimulus_thumbnail"
                    onLoad={this.setImageLoaded}
                    onError={this.setImageLoaded}
                  />
                </td>
                <td>{interaction.answer_type}</td>
                <td>
                  {new Intl.DateTimeFormat("en-US").format(
                    new Date(interaction.created_at)
                  )}
                </td>
                <td>
                  {new Intl.DateTimeFormat("en-US").format(
                    new Date(interaction.updated_at)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(({interactions, loading }) => ({ interactions, loading }))(Interactions);
