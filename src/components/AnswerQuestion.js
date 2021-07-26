import React, { Component } from "react";
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import {handleAnswerQuestion} from "../actions/questions";

class AnswerQuestion extends Component {
  state = {
    disabled: true,
    selectedOption: ''
  }

  handleChange = (e) => {
    this.setState(() => ({
      disabled: false,
      selectedOption: e.target.value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {selectedOption} = this.state
    const {dispatch, id} = this.props

    dispatch(handleAnswerQuestion(id, selectedOption))
    this.setState(() => ({
      disabled: true,
      selectedOption: ''
    }))
    //todo: redirect to questionDetails
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
          <form className='answer-question' onSubmit={this.handleSubmit}>
            <span className='question-header'>Would you rather...</span><br/>
            <input
              className='poll optionOne'
              type='radio'
              id='optionOne'
              name='answerOption'
              value='optionOne'
              onChange={this.handleChange}
            />
            <label htmlFor="optionOne">{optionOne.text}</label><br/><br/>
            <input
              className='poll optionTwo'
              type='radio'
              id='optionTwo'
              name='answerOption'
              value='optionTwo'
              onChange={this.handleChange}
            />
            <label htmlFor="optionTwo">{optionTwo.text}</label><br/><br/>
            <button
              className='btn poll'
              type='submit'
              disabled={this.state.disabled}>
              Submit</button>
          </form>
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