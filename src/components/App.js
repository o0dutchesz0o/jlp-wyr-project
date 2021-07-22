import React, { Component } from "react";
import { connect } from 'react-redux'
import { handleInitialData } from "../actions/shared";
import HomePage from './HomePage'
import LoadingBar from "react-redux-loading";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render () {
    return (
      <div className="WYR-App">
        <LoadingBar style={{backgroundColor: "#9BE8B6", height: '10px'}}/>
        {this.props.loading === true
        ? null
        : <HomePage />}
      </div>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    loading: authedUser === null
  }
}
export default connect(mapStateToProps)(App)
