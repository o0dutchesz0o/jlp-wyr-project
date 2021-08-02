import {LOGIN} from "../actions/login";

export default function isLoggedIn(state = null, action) {
  switch(action.type) {
    case LOGIN:
      return action.flag
    default :
      return state
  }
}