import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import Goals from "./components/Goals";
import Interactions from "./components/Interactions";
import {LoadingBar} from "react-redux-loading-bar";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Goals}/>
        <Route path="/interactions/:goalId" component={Interactions} />
      </Router>
    )}
}

export default connect(state => ({ ...state }))(App);
