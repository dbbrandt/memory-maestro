import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import Goals from "./components/Goals";
import Heading from "./components/heading/Heading";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import Interactions from "./components/Interactions";

class App extends Component {
  render() {
    const { loading } = this.props;
    const authedUser = 1;
    return (
      <div className="container-grid main-layout">
        <Router>
          <Heading />
          <Nav />
          <main className="container-grid layout-section main">
            {loading ? null : !!authedUser ? (
              <Switch>
                <Route exact path="/" component={Goals} />
                <Route path="/interactions/:goalId" component={Interactions} />
              </Switch>
            ) : (
              <Route path="/" component={Login} />
            )}
          </main>
          <Footer />
        </Router>
      </div>
    );
  }
}
export default connect(({loading}) => ({loading}))(App);
