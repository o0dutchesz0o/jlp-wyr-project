import React, { Component, Fragment } from "react";
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route} from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import Login from "./Login";
import Nav from './Nav'
import HomePage from './HomePage'
import NewQuestion from './NewQuestion'
import QuestionDetails from "./QuestionDetails";
import AnswerQuestion from "./AnswerQuestion";
import Leaderboard from "./Leaderboard";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render () {
    const { loading, isLoggedIn} = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar style={{backgroundColor: "#9BE8B6", height: '10px'}}/>
          <div className="WYR-App">
            { isLoggedIn === false
              ? <div>
                  <Route path='/' exact component={Login}/>
                </div>
              : loading === true
              ? null
              : <div>
                  <Nav />
                  <Route path='/home' exact component={HomePage}/>
                  <Route path='/add' exact component={NewQuestion}/>
                  <Route path='/leaderboard' exact component={Leaderboard}/>
                  <Route path='/question/:id' exact component={QuestionDetails}/>
                  <Route path='/answer/:id/' exact component={AnswerQuestion}/>
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
  debugger
  return {
    loading: authedUser === null,
    isLoggedIn
  }
}
export default connect(mapStateToProps)(App)
