import React, {Component} from 'react'
import {Link} from 'react-router'

import {osidToDisplayName} from 'fbw-platform-common/selectors/login'
import QuestionCard from 'fbw-platform-common/components/question-card/web/QuestionCard'

import './QuestionResult.scss'

const createMarkup = (htmlString) => {
  return {__html: htmlString};
}

const renderMath = (element) => {
  MathJax.Hub.Typeset();
  // katex.render(texString, element);
}

class QuestionResult extends Component {

  constructor() {
    super();
    this.state = {isExpanded: false}
  }

  render() {
    let props = this.props;
    let expandCollapseButtonText = this.state.isExpanded ? 'Hide' : 'Show';

    let expandedStudents = !this.state.isExpanded ? null :
          (
            <ul className="students-list">
              {_.map(props.studentsAchieved, student => {
                return (<Link key={student.takingAgentId} className="students-list__item"
                          to={`/students/JANEWAY?mission=Internal-test-mission`} target="_blank">{osidToDisplayName(student.takingAgentId)}</Link>)
              })}
              {_.map(props.studentsNotAchieved, student => {
                return (<Link key={student.takingAgentId} className="students-list__item warning-color"
                            to={`/students/JANEWAY?mission=Internal-test-mission`} target="_blank">{osidToDisplayName(student.takingAgentId)}</Link>)
              })}
            </ul>
          )

    // console.log('outcome:', props.outcome);
    // console.log('result', props.result);
    // console.log('question', props.question);

    return (
      <div key={`questionResult_${props.idx}`} className="question-result ">
        <div className="question-statistics">
          <div className="flex-container align-center space-between">
            <div className="flex-container">
              <p className="bold">{props.result.numStudentsAttempted} <span className="mute "> tried| </span></p>
              <p className="warning-color">{ props.result.numStudentsNotAchieved} <span className="mute "> wrong </span></p>
            </div>
            <button className="expand-collapse-button small"
                    onClick={() => this.setState({isExpanded: !this.state.isExpanded})}>{expandCollapseButtonText}</button>
          </div>

          {expandedStudents}
        </div>

        <div className="row">
          {/* <div className="medium-3 columns">
          </div> */}
          <div className="medium-12 columns">
            <QuestionCard question={props.question} outcome={props.outcome} isExpanded={false} />
          </div>
        </div>


      </div>
    )
  }

}

export default QuestionResult
