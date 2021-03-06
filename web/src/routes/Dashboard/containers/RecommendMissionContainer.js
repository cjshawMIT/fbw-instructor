import { connect } from 'react-redux'

import RecommendMission from '../views/RecommendMission'

import {recommendMissionSelector} from '../selectors/recommendMissionSelector'
import {createTestFlightMissions} from 'adaptive-common/reducers/edit-mission/createTestFlightMissions'
import {updateSpawnDate} from 'adaptive-common/reducers/edit-mission/updateSpawnDate'
import {getEnrolledSubject} from 'adaptive-common/selectors/bank'
import { isTarget } from 'adaptive-common/selectors/mission'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSpawnDateChange: (dateData) => {
      console.log('called updateSpawnDate', dateData)
      dispatch(updateSpawnDate(dateData));
    },
    onSpawnPhaseIIMissions: (studentData, bankId, currentMission, spawnDate) => dispatch(createTestFlightMissions(studentData, bankId, currentMission, spawnDate)),
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('state in recommend missions container', state);
  let currentMission = state.mission.currentMission;

  return {
    currentBank: getEnrolledSubject(state),
    view: state.view,
    mission: currentMission,
    recommendation: recommendMissionSelector(state),
    isSpawnInProgress: state.editMission.isSpawnInProgress ? state.editMission.isSpawnInProgress : false,
    spawnDate: state.editMission.spawnDate,
    spawnDateFocused: state.editMission.spawnDateFocused,
    spawnedMissions: state.editMission.spawnedMissionsByMission && currentMission ? state.editMission.spawnedMissionsByMission[currentMission.id] : null
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RecommendMission)
