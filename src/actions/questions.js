import {saveQuestion, saveQuestionAnswer} from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

function addQuestion(poll) {
  return {
    type: ADD_QUESTION,
    poll
  }
}

function answerQuestion(info) {
  return {
    type: ANSWER_QUESTION,
    info
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(()=> dispatch(hideLoading()))
  }
}

export function handleAnswerQuestion(qid, answer ) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    const info = {
      authedUser,
      qid,
      answer
    }
    dispatch(showLoading())

    return saveQuestionAnswer(info)
      .then(() => dispatch(answerQuestion(info)))
      .then(() => dispatch(hideLoading()))
  }
}
