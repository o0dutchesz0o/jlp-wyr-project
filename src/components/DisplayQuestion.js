import React, { Component } from "react";
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'

class DisplayQuestion extends Component {
  toAnswer = (e, id) => {
    e.preventDefault()
    this.props.history.push(`answer/${id}`)
  }

  toDetails = (e, id) => {
    e.preventDefault()
    this.props.history.push(`question/${id}`)
  }

  render () {
    const { question } = this.props
    const { name, avatar, id, optionOne, optionTwo} = question

    if (question === null) {
      return <p>This WYR does not exist</p>
    }

    return (
      <div className='question'>
        <div className='author'>
          <img className='avatar' src={avatar} alt={`Avatar of ${name}`}/>
          <p>{`Asked by ${name}:`}</p>
        </div>
        <div className='question-info'>
          <span className='header question-header'>Would you rather...</span>
          <p className='question-options'>{`${optionOne.text} OR ${optionTwo.text}`}</p>
          { this.props.answered === 'true' ?
            <Link to={`/question/${id}`}>
              <button className='btn' onClick={(e) => this.toDetails(e,id)}>View Details</button>
            </Link>
            :
            <Link to={`/answer/${id}`}>
              <button className='btn' onClick={(e) => this.toAnswer(e,id)}>View Poll</button>
            </Link>
          }
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

export default withRouter(connect(mapStateToProps)(DisplayQuestion))