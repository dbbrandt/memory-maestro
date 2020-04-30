import React, { Component, Fragment} from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import Heading from "./components/heading/Heading";
import Nav from "./components/nav/Nav";
import Footer from "./components/footer/Footer";
import User from "./components/login/User";
import Logout from "./components/login/Logout";
import NotFound from "./components/login/NotFound";
import Goals from "./components/goal/Goals";
import GoalAdd from "./components/goal/GoalAdd";
import GoalEdit from "./components/goal/GoalEdit";
import Interactions from "./components/interaction/Interactions";
import InteractionEdit from "./components/interaction/InteractionEdit";
import InteractionAdd from "./components/interaction/InteractionAdd";
import Practice from "./components/Practice/Practice";
import Rounds from "./components/Practice/Rounds";
import Authenticate from "./components/login/Authenticate";
import Round from "./components/Practice/Round";
import RoundResult from "./components/Practice/RoundResult";
import RoundDetail from "./components/Practice/RoundDetail";

class App extends Component {
  render() {
    const { authedUser, user } = this.props;
    return (
      <Fragment>
        <LoadingBar className="loading-bar" />
        <div className="container-grid main-layout">
          <Router>
            <Heading />
            <Nav />
            <main className="container-grid layout-section main">
              {!authedUser ? (
                <Route path="*" component={Authenticate}/>
              ) : (
                <Switch>
                  {!!user ? (
                    <Route exact path="/" component={Goals}/>
                  ) : (
                    <Route exact path="/" component={User}/>
                  )
                  }
                  <Route path="/user" component={User}/>
                  <Route path="/logout" component={Logout}/>
                  <Route path="/goal-add" component={GoalAdd}/>
                  <Route path="/goal-edit/:id" component={GoalEdit}/>
                  <Route path="/interaction-add" component={InteractionAdd}/>
                  <Route path="/interaction-edit/:id" component={InteractionEdit}/>
                  <Route path="/interactions/:goalId" component={Interactions}/>
                  <Route path="/practice" component={Practice}/>
                  <Route path="/rounds" component={Rounds}/>
                  <Route path="/round-detail/:id" component={RoundDetail}/>
                  <Route path="/round" component={Round}/>
                  <Route path="/round-result" component={RoundResult}/>
                  <Route path="*" component={NotFound}/>
                </Switch>
              )
              }
            </main>
            <Footer />
          </Router>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authedUser, users}) => ({
  authedUser,
  user: users[authedUser]
});

export default connect(mapStateToProps)(App);
