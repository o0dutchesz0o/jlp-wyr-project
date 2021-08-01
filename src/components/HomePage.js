import React, { Component } from "react";
import { connect } from 'react-redux'
import DisplayQuestion from "./DisplayQuestion";
import {formatQuestion} from "../utils/helpers";

class HomePage extends Component {
  render () {
    const { formattedQuestions } = this.props
    debugger
    return (
      <div>
         <ul className='dashboard-list'>
           {formattedQuestions.sort((a,b) => (a.timestamp < b.timestamp) ? 1 : -1)
             .map((question) => (
             <li key={question.id}>
               <DisplayQuestion id={question.id}/>
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