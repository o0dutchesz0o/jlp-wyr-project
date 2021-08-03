import React, { Component } from "react"
import { connect } from 'react-redux'
import { setAuthedUser } from "../actions/authedUser";
import { Link, Redirect } from "react-router-dom";
import { setLoggedIn } from "../actions/login";

class Login extends Component {
  state = {
    authedUser: '',
    redirectToReferrer: false
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
    this.setState( {
      redirectToReferrer: true}
    )
  }

  render () {
    const { users } = this.props
    const { authedUser, redirectToReferrer } = this.state
    const { from } = this.props.location.state || { from: { pathname: '/' } }


    if (redirectToReferrer === true) {
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
          <Link to='/'>
            <button className='btn login-btn' onClick={(e) => this.handleSubmit(e)}>Sign in</button>
          </Link>
        </div>
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