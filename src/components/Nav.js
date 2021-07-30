import React, {Component} from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Nav extends Component {
  render () {
    const { user } = this.props
    const { avatarURL, name} = user
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active' className='nav-link'>Home Page</NavLink>
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
              <NavLink to='/logout' exact activeClassName='active' className='log-out'>Log Out</NavLink>
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