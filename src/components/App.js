import React, { Component } from "react";
import { connect } from 'react-redux'
import { handleInitialData } from "../actions/shared";
import Dashboard from './HomePage'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render () {
    return (
      <div className="WYR-App">
        {this.props.loading === true
        ? null
        : <Dashboard />}
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
