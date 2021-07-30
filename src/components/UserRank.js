import React, { Component } from "react";
import { connect } from "react-redux";

class UserRank extends Component {
  render () {
    const { user, users } = this.props
    const { userName, questionsAsked, questionsAnswered, totalScore } = user
    const userInfo = users[userName]
    const { avatarURL, name } = userInfo

    return (
    <div className='user-rank'>
      <p className='author'>
        <img className='avatar' src={avatarURL} alt={`Avatar of ${name}`}/>
        <p>{name}</p>
      </p>
      <div className='row'>
        <div className='col-md-5 user-info'>
          <span>Questions Asked</span><span className='user-questions'>{questionsAsked}</span><br/>
          <span>Questions Answered</span><span className='user-questions'>{questionsAnswered}</span><br/>
        </div>
        <div className='col-sm-4 user-score'>
          <span className='score-header'>Total Score</span><br/>
          <span className='score-header'>{totalScore}</span><br/>
        </div>
      </div>
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