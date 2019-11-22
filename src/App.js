import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux";
import { handleReceiveData} from "./actions/share";
import AppSpinner from "./components/Spinner";
import Goals from './components/Goals'

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleReceiveData());
  }
  render() {
    return (
      this.props.loading ? (
        <AppSpinner className="spinner"/>
      ) : (
        <Goals/>
      )
    )
  }
}

export default connect((state) => ({ ...state }))(App);

