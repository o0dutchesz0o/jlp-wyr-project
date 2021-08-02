import React, { Component} from "react";
import { connect } from 'react-redux'
import {handleAddQuestion} from "../actions/questions";
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
  }

  handleChange = (e) => {
    const option = e.target.className
    const text = e.target.value
    this.setState(() => ({
      [option]: text
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { optionOneText, optionTwoText } = this.state
    const { dispatch, id } = this.props

    dispatch(handleAddQuestion(optionOneText, optionTwoText))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: !id
    }))
  }

  render() {
    const {optionOneText, optionTwoText, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/'/>
    }

    return (
      <div className='question'>
        <span className='header question-header'>Create New Question</span>
        <form className='new-question' onSubmit={this.handleSubmit}>
            Complete the question:
            <p className='wyr'>Would you rather...</p>
            <input className='optionOneText'
                   type='text'
                   placeholder='Enter Option One Text Here'
                   value={optionOneText}
                   onChange={this.handleChange}
            />
            <h2><span>OR</span></h2>
            <input className='optionTwoText'
                   type='text'
                   placeholder='Enter Option Two Text Here'
                   value={optionTwoText}
                   onChange={this.handleChange}
            />
            <button
              className='btn'
              type='submit'
              disabled={optionOneText === '' || optionTwoText === ''}>
              Submit
            </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)