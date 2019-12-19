import React, { Component, Fragment} from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import Goals from "./components/Goals";
import Heading from "./components/heading/Heading";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import Logout from "./components/login/Logout";
import Interactions from "./components/Interactions";
import NotFound from "./components/login/NotFound";
import { handleInititalData } from "./actions/shared";
import LoadingBar from "react-redux-loading-bar";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInititalData());
  }

  render() {
    const { authedUser } = this.props;
    return (
      <Fragment>
        <LoadingBar className="loading-bar" />
        <div className="container-grid main-layout">
          <Router>
            <Heading />
            <Nav />
            <main className="container-grid layout-section main">
              {!!authedUser ? (
                <Switch>
                  <Route exact path="/" component={Goals} />
                  <Route path="/login" component={Login} />
                  <Route path="/logout" component={Logout} />
                  <Route
                    path="/interactions/:goalId"
                    component={Interactions}
                  />
                  <Route path="*" component={NotFound} />
                </Switch>
              ) : (
                <Route path="/" component={Login} />
              )}
            </main>
            <Footer />
          </Router>
        </div>
      </Fragment>
    );
  }
}
export default connect(({ authedUser }) => ({ authedUser }))(App);
