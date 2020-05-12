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
import RoundsList from "./components/Round/RoundsList";
import RoundDetail from "./components/Round/RoundDetail";
import Authenticate from "./components/login/Authenticate";
import PracticeRound from "./components/Practice/PracticeRound";
import PracticeResult from "./components/Practice/PracticeResult";
import PrivacyPolicy from "./components/footer/PrivacyPolicy";

const federated = {
  google_client_id: "830910274774-gdo0bc4rne1fl7ab26gmi4ikfvpipu7t.apps.googleusercontent.com"
};

class App extends Component {
  render() {
    const { authedUser, user } = this.props;
    console.log("App props: ", this.props);
    return (
      <Fragment>
        <LoadingBar className="loading-bar" />
        <div className="container-grid main-layout">
          <Router>
            <Heading />
            <Nav />
            <main className="container-grid layout-section main">
              {!authedUser ? (
                <Route path="*" render = {() => (<Authenticate federated={federated}/>)}/>
                ) : (
                <Switch>
                  {user && !user["name"] ? (
                    <Route exact path="/" component={User}/>
                  ) : (
                    <Route exact path="/" component={Goals}/>
                  )
                  }
                  <Route path="/user" component={User}/>
                  <Route path="/logout" component={Logout}/>
                  <Route path="/goal-add" component={GoalAdd}/>
                  <Route path="/goal-edit/:id" component={GoalEdit}/>
                  <Route path="/interaction-add" component={InteractionAdd}/>
                  <Route path="/interaction-edit/:id" component={InteractionEdit}/>
                  <Route path="/interactions/:goalId" component={Interactions}/>
                  <Route path="/rounds-list" component={RoundsList}/>
                  <Route path="/round-detail/:id" component={RoundDetail}/>
                  <Route path="/practice/:goalId" component={Practice}/>
                  <Route path="/practice-round" component={PracticeRound}/>
                  <Route path="/round-result" component={PracticeResult}/>
                  <Route path="/privacy-policy" component={PrivacyPolicy}/>
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
