export function formatQuestion(question, users, authedUser) {
  const { id, author, optionOne, optionTwo, timestamp} = question

  return {
    id,
    author: author,
    timestamp,
    optionOne,
    optionTwo,
    avatar: users[question.author].avatarURL,
    name: users[question.author].name,
    hasAnsweredOptionOne: optionOne.votes.includes(authedUser),
    hasAnsweredOptionTwo: optionTwo.votes.includes(authedUser)
  }
}

export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}