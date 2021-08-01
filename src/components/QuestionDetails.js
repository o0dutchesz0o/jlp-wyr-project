import React, { Component } from "react";
import { connect } from "react-redux";
import {formatQuestion} from "../utils/helpers";
import ProgressBar from 'react-bootstrap/ProgressBar'
import Badge from 'react-bootstrap/Badge'

class QuestionDetails extends Component {
  render () {
    const { questions, users, authedUser } = this.props
    const question  = questions[this.props.match.params.id]
    const formattedQuestion = formatQuestion(question, users, authedUser)
    const { name, avatar, optionOne, optionTwo, hasAnsweredOptionOne, hasAnsweredOptionTwo} = formattedQuestion
    const optionOneVotes = optionOne.votes.length
    const optionTwoVotes = optionTwo.votes.length

    const totalVotes = optionOneVotes + optionTwoVotes

    const optionOnePercentage = optionOneVotes / totalVotes * 100
    const optionTwoPercentage = optionTwoVotes / totalVotes * 100

    return (
      <div className='question'>
        <p className='author'>
          <img className='avatar' src={avatar} alt={`Avatar of ${name}`}/>
          <p>{`Asked by ${name}:`}</p>
        </p>
        <div>
          <span className='results-header'>Results:</span><br/>
          <span className='question-header'>Would you rather...</span><br/>
          <div className='question-details'>
            {(hasAnsweredOptionOne) && <Badge pill bg="success">Your vote</Badge>}
            <span className='results-option'>{optionOne.text}</span>
            <ProgressBar variant="info" now={optionOnePercentage} label={`${optionOnePercentage}%`} />
            {`${optionOneVotes} of ${totalVotes} votes`}
          </div>
          <div className='question-details'>
            {(hasAnsweredOptionTwo) && <Badge pill bg="success">Your vote</Badge>}
            <span className='results-option'>{optionTwo.text}</span>
            <ProgressBar variant="info" now={optionTwoPercentage} label={`${optionTwoPercentage}%`} />
            {`${optionTwoVotes} of ${totalVotes} votes`}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({authedUser, users, questions}, { id }) {
  return {
    authedUser,
    questions,
    users
  }
}

export default connect(mapStateToProps)(QuestionDetails)