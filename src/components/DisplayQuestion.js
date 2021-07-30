import React, { Component } from "react";
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'

class DisplayQuestion extends Component {
  toAnswer = (e, id) => {
    e.preventDefault()
    //todo: redirect to questionAnswer
  }

  handleSubmit = (e) => {
    e.preventDefault()
    //todo: update state to handle hasAnsweredOption
  }

  render () {
    const { question, authedUser } = this.props
    const { author, name, avatar, hasAnsweredOptionOne, hasAnsweredOptionTwo, id, optionOne, optionTwo, timestamp} = question

    if (question === null) {
      return <p>This WYR does not exist</p>
    }

    return (
      <div className='question'>
        <p className='question-author'>
          <img className='avatar' src={avatar} alt={`Avatar of ${name}`}/>
          <p>{`Asked by ${name}:`}</p>
        </p>
        <div className='question-info'>
          <span className='question-header'>Would you rather...</span>
          <p className='question-options'>{`${optionOne.text} OR ${optionTwo.text}`}</p>

          <button className='btn' onClick={(e) => this.toAnswer(e,id)}>View Poll</button>
        </div>
      </div>

    )
  }
}

//first param - what I need to get from the store
//2nd param - what prop I'm passing to it
function mapStateToProps({authedUser, users, questions}, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question: question ? formatQuestion(question, users, authedUser) : null
  }
}

export default connect(mapStateToProps)(DisplayQuestion)