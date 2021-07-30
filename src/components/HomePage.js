import React, { Component } from "react";
import { connect } from 'react-redux'
import DisplayQuestion from "./DisplayQuestion";

class HomePage extends Component {
  render () {
    return (
      <div>
         <ul className='dashboard-list'>
           {this.props.questionIds.map((id) => (
             <li key={id}>
               <DisplayQuestion id={id}/>
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