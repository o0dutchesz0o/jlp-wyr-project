import React, {Component} from 'react'
import { connect } from 'react-redux'
import {NavLink, Link, useHistory} from 'react-router-dom'
import {setAuthedUser} from "../actions/authedUser";
import {setLoggedIn} from "../actions/login";

class Nav extends Component {
  render () {
    const { user, isLoggedIn, dispatch } = this.props
    const { avatarURL, name} = user

    const verifyUser = {
      isAuthenticated: isLoggedIn,
      signout(cb) {
        dispatch(setAuthedUser(''))
        dispatch(setLoggedIn(false))
        verifyUser.isAuthenticated = false;
      }
    }

    function LogoutButton(props) {
      const { verifyUser, isAuthenticated } = props;
      let history = useHistory();

      return isAuthenticated ? (
        <Link to='/' className='log-out' onClick={() => {
          verifyUser.signout(() => history.push("/"))
        }}>Log Out</Link>
      ) : null;
    }

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
              <LogoutButton verifyUser={verifyUser} isAuthenticated={isLoggedIn} />
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps({authedUser, users, isLoggedIn}) {
  const user = users[authedUser]
  return {
    authedUser,
    isLoggedIn,
    user
  }
}

export default connect(mapStateToProps)(Nav)