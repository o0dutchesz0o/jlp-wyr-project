import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserRank from "./UserRank";
import { generateUID } from "../utils/helpers";

class Leaderboard extends Component {

  render() {
    const { userQuestions } = this.props
    let rank = 0
    return(
      <div className='leaderboard'>
        <ul className='leaderboard-list'>
          {userQuestions.sort((a,b) => (a.totalScore < b.totalScore) ? 1 : -1)
            .map((user) => (
            <li key={user.id}>
              <UserRank user={user} rank={rank = rank + 1} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({questions, users}) {
  const userQuestions = []

  Object.entries(users).map(([userName, userValues]) => {

    let answered = 0
    Object.entries(questions).map(([qid, qidValue]) => {
      if (qidValue.optionOne.votes.includes(userName)) {
        answered += 1
      }
      if (qidValue.optionTwo.votes.includes(userName)) {
        answered += 1
      }
    });
    let totalScore = userValues.questions.length + answered

    let id = generateUID()
     userQuestions.push({
         id,
         userName: userName,
         questionsAsked: userValues.questions.length,
         questionsAnswered: answered,
          totalScore
    })
  })

  return {
    users,
    userQuestions
  }
}

export default connect(mapStateToProps)(Leaderboard)