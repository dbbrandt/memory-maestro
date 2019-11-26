import React, { Component } from "react";
import { connect } from "react-redux";
import { handleFetchInteractions } from "../actions/interactions";
import { setLoading } from "../actions/loading";
import Spinner from "./Spinner";

class Interactions extends Component {
  constructor(props) {
    super(props);
    this.imgCount = 0;
  }

  componentDidMount() {
    console.log("ComponentDidMount; ", this.props);
    const {
      match: { params }
    } = this.props;
    const { dispatch } = this.props;
    dispatch(handleFetchInteractions(params.goalId));
    dispatch(setLoading(true));
  }

  setImageLoaded = () => {
    this.imgCount--;
    if (this.imgCount === 0) {
      this.props.dispatch(setLoading(false));
    }
  };

  render() {
    const { loading, interactions } = this.props;
    this.imgCount = interactions.length;
    return (
      <div>
        <div style={{ display: loading ? "block" : "none" }}>
          <Spinner />
        </div>
        <div style={{ display: loading ? "none" : "block" }}>
          <table>
            <thead>
              <tr className="interaction">
                <th>Title</th>
                <th>Answer Type</th>
                <th>Image</th>
                <th>Created</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {this.props.interactions.map(interaction => (
                <tr key={interaction.id} className='interaction'>
                  <td>{interaction.title}</td>
                  <td>{interaction.answer_type}</td>
                  <td>
                    <img
                      alt={interaction.title}
                      src={interaction.prompt.stimulus_url}
                      className="stimulus_thumbnail"
                      onLoad={this.setImageLoaded}
                    />
                  </td>
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
      </div>
    );
  }
}

export default connect(state => ({
  interactions: state.interactions,
  loading: state.loading
}))(Interactions);
