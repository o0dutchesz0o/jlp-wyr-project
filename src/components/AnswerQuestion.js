import React, { Component } from "react";
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handleAnswerQuestion } from "../actions/questions";

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
    const { questions, users, authedUser } = this.props
    const question  = questions[this.props.match.params.id]
    const formattedQuestion = formatQuestion(question, users, authedUser)
    const { name, avatar, optionOne, optionTwo } = formattedQuestion

    if (question === null) {
      return <p>This WYR does not exist</p>
    }

    return (
      <div className='question'>
        <p className='author'>
          <img className='avatar' src={avatar} alt={`Avatar of ${name}`}/>
          <p>{`Asked by ${name}:`}</p>
        </p>
        <div>
          <form className='answer-question' onSubmit={this.handleSubmit}>
            <span className='header question-header'>Would you rather...</span><br/>
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
function mapStateToProps({authedUser, questions, users}) {
  return {
    authedUser,
    questions,
    users
  }
}

export default connect(mapStateToProps)(AnswerQuestion)