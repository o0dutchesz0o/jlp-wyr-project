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