import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { connect } from "react-redux";
import { handleReceiveData} from "./actions/goals";
import AppSpinner from "./components/Spinner";
import Goals from './components/Goals'
import Interactions from "./components/Interactions";

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
        <Router>
          <Route exact path = '/' component={Goals}/>
          <Route path='/interactions' component={Interactions}/>
        </Router>
      )
    )
  }
}

export default connect((state) => ({ ...state }))(App);

