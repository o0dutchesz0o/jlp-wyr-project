import React, { Component } from "react";
import { connect } from 'react-redux'
import { handleInitialData } from "../actions/shared";
import HomePage from './HomePage'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render () {
    return (
      <div className="WYR-App">
        {this.props.loading === true
        ? null
        : <HomePage />}
        <footer>
          <a href="https://icons8.com/icon/122589/manager">Manager icon, </a>
          <a href="https://icons8.com/icon/123623/businesswoman">Businesswoman icon, </a>
          <a href="https://icons8.com/icon/110479/administrator-male"> & Administrator Male icon by Icons8</a>
        </footer>
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
