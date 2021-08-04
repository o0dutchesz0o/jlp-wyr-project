import React, { Component } from "react";
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { handleAnswerQuestion } from "../actions/questions";
import {Redirect} from "react-router-dom";
import Nav from './Nav'

class AnswerQuestion extends Component {
  state = {
    disabled: true,
    selectedOption: '',
    toDetails: false
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
    const {dispatch} = this.props
    const { id } = this.props.match.params
    dispatch(handleAnswerQuestion(id, selectedOption))

    this.setState(() => ({
      disabled: true,
      selectedOption: '',
      toDetails: true
    }))
  }

  render () {
    const { questions, users, authedUser } = this.props
    const { toDetails } = this.state

    const question  = questions[this.props.match.params.id]

    if (question === undefined) {
      return <Redirect to={{pathname: '/404', state: { from: this.props.location }}} />
    } else {
      const formattedQuestion = formatQuestion(question, users, authedUser)
      const { name, avatar, optionOne, optionTwo, id } = formattedQuestion

      if (toDetails === true) {
        return <Redirect to={`/question/${id}`}/>
      }

      return (
        <div>
          <Nav/>
        <div className='question'>
          <div className='author'>
            <img className='avatar' src={avatar} alt={`Avatar of ${name}`}/>
            <p>{`Asked by ${name}:`}</p>
          </div>
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
        </div>
      )
    }
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