import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserRank from "./UserRank";
import { generateUID } from "../utils/helpers";

class Leaderboard extends Component {

  render() {
    const { userQuestions } = this.props
    return(
      <div className='leaderboard'>
        <ul className='leaderboard-list'>
          {userQuestions.map((user) => (
            <li key={user.id}>
              <UserRank user={user} />
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

    let id = generateUID()

     userQuestions.push({
         id,
         userName: userName,
         questionsAsked: userValues.questions.length,
         questionsAnswered: answered,
    })
  })

  return {
    users,
    userQuestions
  }
}

export default connect(mapStateToProps)(Leaderboard)