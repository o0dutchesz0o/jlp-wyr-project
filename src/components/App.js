import React, { Component, Fragment } from "react";
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import Login from "./Login";
import HomePage from './HomePage'
import NewQuestion from './NewQuestion'
import QuestionDetails from "./QuestionDetails";
import AnswerQuestion from "./AnswerQuestion";
import Leaderboard from "./Leaderboard";
import PageNotFound from "./PageNotFound";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render () {
    const { loading, isLoggedIn} = this.props

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        isLoggedIn === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/', state: { from: props.location, redirect: true }}} />
      )} />
    )
    return (
      <Router>
        <Fragment>
          <LoadingBar style={{backgroundColor: "#9BE8B6", height: '10px'}}/>
          <div className="WYR-App">
            { loading
                ? null
                : <div>
                    <Switch>
                      <Route path='/' exact component={Login}/>
                      <PrivateRoute path='/home' exact component={HomePage}/>
                      <PrivateRoute path='/add' exact component={NewQuestion}/>
                      <PrivateRoute path='/leaderboard' exact component={Leaderboard}/>
                      <PrivateRoute path='/question/:id' exact component={QuestionDetails}/>
                      <PrivateRoute path='/answer/:id/' exact component={AnswerQuestion}/>
                      <Route path='/404' exact component={PageNotFound} />
                    </Switch>
                    <footer>
                      <a href="https://icons8.com/icon/122589/manager">Manager Icon</a>&nbsp;&nbsp;
                      <a href="https://icons8.com/icon/123623/businesswoman">Businesswoman Icon</a>&nbsp;&nbsp;
                      <a href="https://icons8.com/icon/110479/administrator-male"> Administrator Male Icon</a> by Icons8
                    </footer>
                  </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({authedUser, isLoggedIn}) {
  return {
    loading: authedUser === null,
    isLoggedIn
  }
}
export default connect(mapStateToProps)(App)
