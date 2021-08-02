export const LOGIN = 'LOGIN'

export function setLoggedIn(flag){
  return {
    type: LOGIN,
    flag
  }
}