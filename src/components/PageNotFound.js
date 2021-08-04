import React, { Component } from "react"
import Nav from './Nav'

class PageNotFound extends Component {
  render () {
    const pathname = this.props.location.state.from.pathname
    
    return (
      <div>
        <Nav/>
        <h3 className='page-not-found'>No match for route <code>{pathname}</code></h3>
      </div>
    )
  }}

export default PageNotFound