import React, { Component } from "react"
import { connect } from 'react-redux'
import { setAuthedUser } from "../actions/authedUser";
import {Link, Redirect, useHistory} from "react-router-dom";
import { setLoggedIn } from "../actions/login";

class Login extends Component {
  state = {
    authedUser: '',
  }

  handleChange = (e) => {
    this.setState(() => ({
      authedUser: e.target.value
    }))
  }

  render () {
    const { users, isLoggedIn, redirectToReferrer, dispatch } = this.props
    const { authedUser } = this.state
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirect } = this.props.location.state || false

    const verifyUser = {
      isAuthenticated: isLoggedIn,
      signin(cb) {
        dispatch(setAuthedUser(authedUser))
        dispatch(setLoggedIn(true))
        verifyUser.isAuthenticated = true;
      }
    }
    debugger
    function LoginButton(props) {
      const { verifyUser, isAuthenticated } = props;
      let history = useHistory();

      return !isAuthenticated ? (
        <Link to='/home' className='btn login-btn' onClick={() => {
          verifyUser.signin(() => history.push("/home"))
        }}>Sign in</Link>
      ) : null;
    }

    if (redirect === true && isLoggedIn === true) {
      return (<Redirect to={from} />)
    }

    return (
            <div className='login'>
            <div className='header login-header center'>Would You Rather... </div>
            <div className='center'>Please sign in to continue</div>
            <div className='row user-select'>
            <select className='col-4 offset-4 user-select'
              value={authedUser}
              onChange={this.handleChange}
            >
              <option value="" disabled>Select User</option>
              {Object.entries(users).map(([userName, userValues]) => (
                <option value={userName}>{userValues.name}</option>
              ))}
              </select>
              <LoginButton verifyUser={verifyUser} isAuthenticated={isLoggedIn} redirectToReferrer={redirectToReferrer}/>
            </div>
          </div>
    )
  }
}

function mapStateToProps({users, isLoggedIn}) {
  debugger
  return {
    users,
    isLoggedIn,
  }
}

export default connect(mapStateToProps)(Login)