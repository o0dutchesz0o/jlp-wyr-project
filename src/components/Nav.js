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
            <NavLink to='/' exact activeClassName='active'>Home Page</NavLink>
          </li>
          <li>
            <NavLink to='/add' exact activeClassName='active'>Add New Question</NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' exact activeClassName='active'>Leader Board</NavLink>
          </li>
        </ul>
        <div className='authed-user'>
          <img className='avatar' src={avatarURL} alt={`Avatar of ${name}`}/>
          <span className='user-name'>{name}</span>
          <NavLink to='/logout' exact activeClassName='active'>Log Out</NavLink>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({authedUser, users}) {
  const user = users[authedUser]
  debugger
  return {
    authedUser,
    user
  }
}

export default connect(mapStateToProps)(Nav)