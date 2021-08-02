import React, {Component} from 'react'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import {setAuthedUser} from "../actions/authedUser";
import {setLoggedIn} from "../actions/login";

class Nav extends Component {
  handleLogOut = (e) => {
    e.preventDefault()
    const { dispatch } = this.props

    dispatch(setAuthedUser(''))
    dispatch(setLoggedIn(false))
  }

  render () {
    const { user } = this.props
    const { avatarURL, name} = user
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/home' exact activeClassName='active' className='nav-link'>Home Page</NavLink>
          </li>
          <li>
            <NavLink to='/add' exact activeClassName='active' className='nav-link'>Add New Question</NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' exact activeClassName='active' className='nav-link'>Leader Board</NavLink>
          </li>
          <li className='authed-user'>
              <img src={avatarURL} alt={`Avatar of ${name}`}/>
              <span className='user-name'>{name}</span>
            <Link to='/' className='log-out' onClick={(e) => this.handleLogOut(e)}>Log Out</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps({authedUser, users}) {
  const user = users[authedUser]
  return {
    authedUser,
    user
  }
}

export default connect(mapStateToProps)(Nav)