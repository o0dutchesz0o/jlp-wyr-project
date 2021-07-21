import React, { Component } from "react";
import { connect } from 'react-redux'

class HomePage extends Component {
  render () {
    console.log("props", this.props)
    return (
      <div>
         <h3 className='center'>Your Dashboard</h3>
         <ul className='dashboard-list'>
           {this.props.questionIds.map((id) => (
             <li key={id}>
               <div>Question ID: {id}</div>
             </li>
           ))}
         </ul>
      </div>
    )
  }
}

function mapStateToProps({ questions}) {
  return {
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(HomePage)