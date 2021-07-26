import React, { Component } from "react";
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
class AnswerQuestion extends Component {
  toDetails = (e, id) => {
    e.preventDefault()
    //todo: redirect to questionDetails
  }

  handleSubmit = (e, id) => {
    e.preventDefault()
    //todo: update state to handle hasAnsweredOption
  }

  render () {
    const { question } = this.props
    const { name, avatar, id, optionOne, optionTwo } = question
    // console.log('question props', this.props)

    console.log('question', question)
    if (question === null) {
      return <p>This WYR does not exist</p>
    }

    return (
      <div className='question'>
        <p className='question-author'>
          <img className='avatar' src={avatar} alt={`Avatar of ${name}`}/>
          <p>{`Asked by ${name}:`}</p>
        </p>
        <div>
          <span className='question-header'>Would you rather...</span><br/>
          <input className='poll' type='radio' id='optionOne' value='optionOne'/>
          <label for="optionOne">{optionOne.text}</label><br/><br/>
          <input className='poll' type='radio' id='optionTwo' value='optionTwo'/>
          <label for="optionTwo">{optionTwo.text}</label><br/><br/>
          <button className='btn poll' onClick={(e) => this.handleSubmit(e,id)}>Submit</button>
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

export default connect(mapStateToProps)(AnswerQuestion)