import React, { Component } from "react"
import { connect } from 'react-redux'
import {setAuthedUser} from "../actions/authedUser";
import {Link, Redirect} from "react-router-dom";
import {setLoggedIn} from "../actions/login";

class Login extends Component {
  state = {
    authedUser: '',
    toHome: false
  }

  handleChange = (e) => {
    this.setState(() => ({
      authedUser: e.target.value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { authedUser } = this.state
    const { dispatch } = this.props

    dispatch(setAuthedUser(authedUser))
    dispatch(setLoggedIn(true))
    this.setState(() => ({
      toHome: true
    }))
  }

  render () {
    const { users } = this.props
    const { authedUser, toHome } = this.state

    if (toHome === true && authedUser != null) {
      return <Redirect to='/home'/>
    }

    return (
      <div className='login'>
          <form onSubmit={this.handleSubmit}>
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
            <button
              className='btn'
              type='submit'
              disabled={authedUser === ''}>
              Sign in
            </button>
            {/*<Link to={`/home`}>*/}
            {/*  <button className='btn' onClick={(e) => this.toHomePage(e)}>Sign in</button>*/}
            {/*</Link>*/}
          </div>
          </form>
      </div>
    )
  }
}

function mapStateToProps({users}) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Login)