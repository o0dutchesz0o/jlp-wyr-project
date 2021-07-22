import React, { Component} from "react";
import {handleAddQuestion} from "../actions/questions";
import authedUser from "../reducers/autheduser";

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: ''
  }

  handleChange = (e) => {
    // todo - setstate for options
    const option = e.target.className
    const text = e.target.value
    this.setState(() => ({
      [option]: text
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { optionOneText, optionTwoText } = this.state
    //todo add question to store

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: ''
    }))
  }

  render() {
    const {optionOneText, optionTwoText } = this.state

    // todo redirect to results view when submitted
    console.log('state', this.state)
    return (
      <div className='question'>
        <span className='question-header'>Create New Question</span>
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

export default NewQuestion