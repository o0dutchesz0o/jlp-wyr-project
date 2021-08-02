import React, { Component } from "react";
import { connect } from 'react-redux'
import DisplayQuestion from "./DisplayQuestion";
import {formatQuestion} from "../utils/helpers";

class HomePage extends Component {
  render () {
    const { formattedQuestions } = this.props
    const answeredQuestions = formattedQuestions.filter((question) => (
      question.hasAnsweredOptionOne || question.hasAnsweredOptionTwo
    ))

    const unansweredQuestions = formattedQuestions.filter(question => !answeredQuestions.includes(question));
    return (
      <div>
        <div className='header question-header'>Answered</div>
        <ul className='dashboard-list answeredQuestions'>
           {answeredQuestions.sort((a,b) => (a.timestamp < b.timestamp) ? 1 : -1)
             .map((question) => (
             <li key={question.id}>
               <DisplayQuestion id={question.id} answered='true'/>
             </li>
           ))}
         </ul>
        <div className='header question-header'>Unanswered Questions</div>
        <ul className='dashboard-list unansweredQuestions'>
          {unansweredQuestions.sort((a,b) => (a.timestamp < b.timestamp) ? 1 : -1)
            .map((question) => (
              <li key={question.id}>
                <DisplayQuestion id={question.id} answered='false'/>
              </li>
            ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({authedUser, users, questions}) {
  const formattedQuestions = Object.entries(questions).map(([question,questionValues]) => {
      return formatQuestion(questionValues, users, authedUser)
  })

  return {
    authedUser,
    formattedQuestions,
  }
}

export default connect(mapStateToProps)(HomePage)