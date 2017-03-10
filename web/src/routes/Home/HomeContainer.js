import { connect } from 'react-redux'
import Home from './Home'

import {browserHistory} from 'react-router'

import {getMapping} from 'adaptive-common/reducers/Mapping/getMapping'

import {selectBank} from 'adaptive-common/reducers/Bank/selectBank'
import {getItems} from 'adaptive-common/reducers/Bank/getItems'
import {getD2LClassRoster} from 'adaptive-common/reducers/Bank/getD2LClassRoster'

import {getMissions} from 'adaptive-common/reducers/Mission/getMissions'
import {selectMission} from 'adaptive-common/reducers/Mission/selectMission'

import {deleteMission} from 'adaptive-common/reducers/edit-mission/deleteMission'
import {addMission} from 'adaptive-common/reducers/edit-mission/addMission'
import {editMission} from 'adaptive-common/reducers/edit-mission/editMission'

import {getPhaseIResults} from 'adaptive-common/reducers/Result/getPhaseIResults'
import {getPhaseIIResults} from 'adaptive-common/reducers/Result/getPhaseIIResults'

import {logOutUser} from 'adaptive-common/reducers/Login/logOutUser'

import {changeView} from '../../reducers/view'

import {getD2LToken} from 'adaptive-common/selectors/'
import {getUser} from 'adaptive-common/selectors'

// this should ONLY be used for simpleLogin / non-LMS installs. This is NOT scalable.
// import {BANK_TO_DOMAIN, BANK_TO_LIBRARY} from '../../reducers/common'
import {findBankLibrary, findBankDomain} from 'adaptive-common/utilities'


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClickBank: (bank, username, enrolledBanks,
      credentials, d2lToken, orgUnitId) => {
      console.log('clicked bank', bank, username, enrolledBanks);
      console.log('clicked bank2', credentials, d2lToken, orgUnitId);

      dispatch(selectBank(bank));
      // for a newly created class, you cannot call getMissions
      // immediately after selectBank -- needs to happen afterwards,
      // because selectBank sets up the privateBankId (even for instructors)
      // so move this to happen on componentDidUpdate if privateBankId set and
      // no missions yet
      //dispatch(getMissions({subjectBankId: bank.id, username}));

      // use d2lToken as proxy for if need to get class roster
      if (d2lToken) {
        dispatch(getD2LClassRoster({url: d2lToken, orgUnitId, credentials}))
      }

      dispatch(getMapping(findBankDomain(bank.id, enrolledBanks)));
      dispatch(getItems(findBankLibrary(bank.id, enrolledBanks)));  // these two mappings need to be modified after we switch to D2L / LMS

      dispatch(changeView({name: 'dashboard.resultsView', mission: null}))      // true default
    },
    onGetMissions: (bankId) => dispatch(getMissions({subjectBankId: bankId, username: null})),
    onClickMission: (mission, bankId) => {
      dispatch(getPhaseIResults(mission, bankId));
      dispatch(getPhaseIIResults(mission, bankId));
      dispatch(selectMission(mission));
      dispatch(changeView({name: 'dashboard.resultsView', mission: mission}))      // true default
    },
    onClickAddMission: () =>
    {
      dispatch(changeView({name: 'add-mission'}))
      dispatch(addMission());
      // browserHistory.push('/missions/new')
    },
    onClickEditMission: (mission, directives) => {
      console.log('clicked edit mission', mission, directives);
      dispatch(changeView({name: 'edit-mission', mission: mission}));
      dispatch(editMission(mission, directives));
    },
    onClickDeleteMission: (mission, bankId) => {
      dispatch(deleteMission(mission, bankId))
    },
    logout: () => {
      dispatch(logOutUser())
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('state in HomeContainer', state);
  // console.log('offeredId:', state.mission && state.mission.currentMission ? state.mission.currentMission.assessmentOfferedId : null)

  return {
    banks: state.bank ? state.bank.banks : [],
    currentBank: state.bank.currentBank ? state.bank.currentBank : null,
    missions: state.mission ? state.mission.missions : [],
    outcomes: state.mapping.outcomes ? state.mapping.outcomes : [],
    currentMission: state.mission ? state.mission.currentMission : null,
    isGetMissionsInProgress: state.mission ? state.mission.isGetMissionsInProgress : null,
    view: state.view,
    isGetPrivateBankIdInProgress: state.bank.getPrivateBankIdInProgress ? state.bank.getPrivateBankIdInProgress : false,
    privateBankId: state.bank.privateBankId ? state.bank.privateBankId : null,
    username: getUser(state) ? getUser(state).username : null,
    d2lToken: getD2LToken(state)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
