import React, { Component, Fragment } from "react";
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route} from "react-router-dom";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import Nav from './Nav'
import HomePage from './HomePage'
import NewQuestion from './NewQuestion'
import QuestionDetails from "./QuestionDetails";
import DisplayQuestion from "./DisplayQuestion";
import AnswerQuestion from "./AnswerQuestion";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render () {
    return (
      <Router>
        <Fragment>
          <LoadingBar style={{backgroundColor: "#9BE8B6", height: '10px'}}/>
          <div className="WYR-App">
            {this.props.loading === true
              ? null
              : <div>
                  <Nav />
                  <Route path='/' exact component={HomePage}/>
                  <Route path='/add' exact component={NewQuestion}/>
                  {/*<Route path='/leaderboard' exact component={LeaderBoard}/>*/}
                  <Route path='/question/:id' exact component={DisplayQuestion}/>
                  <Route path='/question/:id/answer' exact component={AnswerQuestion}/>
                  <Route path='/question/:id/details' exact component={QuestionDetails}/>
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

function mapStateToProps({authedUser}) {
  return {
    loading: authedUser === null
  }
}
export default connect(mapStateToProps)(App)
