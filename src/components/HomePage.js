import React, { Component } from "react";
import { connect } from 'react-redux'
import Question from "./Question";

class HomePage extends Component {
  render () {
    console.log("HomePage props", this.props)
    return (
      <div>
         <h3 className='center'>Home</h3>
         <ul className='dashboard-list'>
           {this.props.questionIds.map((id) => (
             <li key={id}>
               <Question id={id}/>
             </li>
           ))}
         </ul>
        <footer>
          <a href="https://icons8.com/icon/122589/manager">Manager icon, </a>
          <a href="https://icons8.com/icon/123623/businesswoman">Businesswoman icon, </a>
          <a href="https://icons8.com/icon/110479/administrator-male"> & Administrator Male icon by Icons8</a>
        </footer>
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