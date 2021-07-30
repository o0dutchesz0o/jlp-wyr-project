import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render() {
    console.log('LEADERBOARD PROPS', this.props)
    return(
      <div>
        Leaderboard
      </div>
    )
  }
}

function mapStateToProps({questions, users}) {
  return {
    questions,
    users
  }
}
export default connect(mapStateToProps)(Leaderboard)