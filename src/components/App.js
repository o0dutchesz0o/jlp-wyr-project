import React, { Component } from "react";
import { connect } from 'react-redux'
import { handleInitialData } from "../actions/shared";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render () {
    return (
      <div className="App">
        <header className="App-header">
          Header
        </header>
      </div>
    )
  }

}

export default connect()(App);
