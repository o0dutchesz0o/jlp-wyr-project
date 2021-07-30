import React, { Component } from "react";
import { connect } from "react-redux";

class UserRank extends Component {
  render () {
    const { user, users } = this.props
    const { userName, questionsAsked, questionsAnswered } = user
    return (
    <div className='user-rank'>
      UserRank
    </div>
    )
  }
}

function mapStateToProps({users}) {
  return {
    users
  }
}

export default connect(mapStateToProps)(UserRank)