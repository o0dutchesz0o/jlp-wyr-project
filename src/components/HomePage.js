import React, { Component } from "react";
import { connect } from 'react-redux'
import DisplayQuestion from "./DisplayQuestion";
import {formatQuestion} from "../utils/helpers";
import { Link } from 'react-router-dom'
import Nav from "./Nav";

class HomePage extends Component {
  state = {
    displayComponent: 'unanswered'
  }

  handleDisplayQuestions = (e) => {
    e.preventDefault()
    this.setState(() => ({
      displayComponent: e.target.id
    }))
  }

  render () {
    const { formattedQuestions } = this.props
    const { displayComponent } = this.state

    const answeredQuestions = formattedQuestions.filter((question) => (
      question.hasAnsweredOptionOne || question.hasAnsweredOptionTwo
    ))

    const unansweredQuestions = formattedQuestions.filter(question => !answeredQuestions.includes(question));

    return (
      <div>
        <Nav />
        <nav className='nav questions-nav'>
          <ul>
            <li>
              <Link
                    className='nav-question'
                    id='unanswered'
                    onClick={(e) => this.handleDisplayQuestions(e)}>
                    Unanswered Questions
              </Link>
            </li>
            <li>
              <Link
                    className='nav-question'
                    id='answered'
                    onClick={(e) => this.handleDisplayQuestions(e)}>
                    Answered Questions
              </Link>
            </li>
          </ul>
        </nav>
        {(displayComponent === 'unanswered') &&
          <div>
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
        }
        {(displayComponent === 'answered') &&
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
        </div>
        }
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