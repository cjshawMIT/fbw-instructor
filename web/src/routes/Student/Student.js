'use strict';

import React, {Component} from 'react'

import MissionComponent from 'adaptive-common/components/mission/web/Mission'
import MissionContainer from  'adaptive-common/components/mission/MissionContainer'
const Mission = MissionContainer(MissionComponent)

import {osidToDisplayName} from 'adaptive-common/selectors/login'

// import QuestionsComponent from 'adaptive-common/components/questions/web/Questions'
// import QuestionContainer from  'adaptive-common/components/questions/QuestionsContainer'
// const Questions = QuestionContainer(QuestionsComponent)

// import LoadingBox from '../../components/LoadingBox'
import './Student.scss'

class Student extends Component {

  constructor() {
    super();
  }

  render() {

    // if (!this.props.result) return null;

    return (
      <div>
        <div className="student__nav-bar clearfix">
          <p>You are looking at <span>{osidToDisplayName(this.props.result.takingAgentId)}</span>
          >>
          <span>{this.props.mission.displayName.text}</span></p>
        </div>
        <Mission />
      </div>
    )
  }

}

export default Student
