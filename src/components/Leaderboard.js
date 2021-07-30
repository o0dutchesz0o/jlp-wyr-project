import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {

  render() {
    console.log('LEADERBOARD PROPS', this.props)
    const { questionsAsked, questionsAnswered, users } = this.props

    debugger
    return(
      <div className='leaderboard'>
        Leaderboard
      </div>
    )
  }
}

function mapStateToProps({questions, users}) {
  const userNames = Object.entries(users).map(([userName, _ ]) => userName )
  const questionsAsked = []
  Object.entries(users).map(([userName, userValues]) => {
    questionsAsked.push({[userName]: userValues.questions.length})
  })

  const questionsAnswered = []
  userNames.forEach(function(user) {
    let answered = 0
    Object.entries(questions).map(([qid, qidValue]) => {
      if (qidValue.optionOne.votes.includes(user)) {
        answered += 1
      }
      if (qidValue.optionTwo.votes.includes(user)) {
        answered += 1
      }
    });
    questionsAnswered.push({[user]: answered})
  })

  return {
    users,
    questionsAsked,
    questionsAnswered
  }
}
export default connect(mapStateToProps)(Leaderboard)