import React, { Component } from "react";
import { connect } from "react-redux";

class UserRank extends Component {
  render () {
    const { user, users, rank } = this.props
    const { userName, questionsAsked, questionsAnswered, totalScore } = user
    const userInfo = users[userName]
    const { avatarURL, name } = userInfo


    return (
    <div className='user-rank'>
      <div className='row'>
        <p className='author col-md-6'>
          <img className='avatar' src={avatarURL} alt={`Avatar of ${name}`}/>
          <p>{name}</p>
        </p>
        <span className='rank row col-md-6' id={`rank-${rank}`}>
          <span className='rank-header col-md-3 offset-4'>Rank</span>
          <div className='row'>
            <div className='col-md-2 offset-5'>{`#${rank}`}</div>
          </div>
        </span>
      </div>
      <div className='row'>
        <div className='col-md-5 user-info'>
          <span>Questions Asked</span><span className='user-questions'>{questionsAsked}</span><br/>
          <span>Questions Answered</span><span className='user-questions'>{questionsAnswered}</span><br/>
        </div>
        <div className='row col-sm-5 user-score offset-1'>
          <span className='score-header col-med-3'>Total Score</span>
          <span className='score-header col-med-3'>{totalScore}</span>
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