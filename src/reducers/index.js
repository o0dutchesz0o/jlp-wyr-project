import { combineReducers } from 'redux'
import authedUser from "./autheduser";
import users from "./users";
import questions from "./questions";
import { loadingBarReducer } from "react-redux-loading";
import isLoggedIn from "./login";

export default combineReducers({
  authedUser,
  users,
  questions,
  isLoggedIn,
  loadingBar: loadingBarReducer,
})