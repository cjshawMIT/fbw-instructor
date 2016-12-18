import React, {Component} from 'react';
import 'lodash'

import BASE_STYLES from '../../../styles/baseStyles'
import EmptyState from '../../../components/EmptyState'

import './GradesView.scss'

class GradesView extends Component {

  constructor() {
    super();

    this.state = {
      isExpanded: false,
    }
  }

  render() {
    let props = this.props;

    let expandCollapseButtonText = this.state.isExpanded ? 'Hide' : 'Show';

    // console.log('points view data', viewData)

    return (
      <div className="points-view">
        <div className="summary-bar flex-container align-center">
          <p className="summary__mission-name">
            Grades
          </p>

          <div className="summary-blurb flex-container align-center">
            <p className="summary__number">{props.grades ? props.grades.length : 0}</p>
            <p className="summary__text">grades recorded</p>
          </div>

          <button className="expand-collapse-button"
                  onClick={() => this.setState({isExpanded: !this.state.isExpanded})}>
            {expandCollapseButtonText}
          </button>
        </div>

        <ol className="grades-list medium-8 large-7 columns end">
          {_.map(props.grades, (grade, idx) => {
            return (
              <li key={`grade_${idx}`} className="flex-container align-center space-between">
                <p>{grade.takingAgentId}</p>
                <p>{grade.points}%</p>
              </li>
            )
          })}
        </ol>

      </div>
    )
  }


}

export default GradesView
