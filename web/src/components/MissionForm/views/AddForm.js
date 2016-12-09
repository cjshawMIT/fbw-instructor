
import React from 'react'
import BASE_STYLES from '../../../styles/baseStyles'

import EmptyState from '../../../components/EmptyState'
import LoadingBox from '../../../components/LoadingBox'
import SelectDirectives from './SelectDirectives';

import { DateRangePicker } from 'react-dates'
import 'react-dates/css/variables.scss'
import 'react-dates/css/styles.scss'

import 'lodash'
// require('./datepicker.css')
import './AddForm.scss'

export default function(props) {

  if (!props.newMission) return null;

  let alert = <div />;
  if (props.newMission.formError) {
//    alert = (
      // This should really be put back in ... after the demo?
        // after the demo.
//       <div className="formError">
//         Please fill in all form data before saving.
//       </div>
//    )
  } else {
  }

  let loadingBox;
  if (props.isCreateMissionInProgress) {
    loadingBox = LoadingBox('enter-active');
  } else {
    loadingBox = LoadingBox('enter');
  }

  let form;
  if (!props.isCreateMissionInProgress) {
    form = (
      <form onSubmit={(e) => {e.preventDefault(); props.onAddMission(props.newMission, props.currentBank.id, props.numberItemsForDirectives, props.itemBankId); e.preventDefault();}}>
        <div className="form-section">
          <label className="form-label" htmlFor="displayName">Mission Name</label>

          <input type="text" className="mission-name-input"
                 value={props.newMission.displayName}
                 placeholder="My new mission name"
                 id="displayName"
                 onChange={(e) => props.updateMissionForm({displayName: e.target.value})} />
       </div>

       <div className="form-section clearfix">
          <label className="form-label">Dates</label>
          <DateRangePicker className="" onDatesChange={props.updateMissionForm}
                           onFocusChange={(input) => props.updateMissionForm({focusedInput: input})}
                           focusedInput={props.newMission.focusedInput}
                           startDate={props.newMission.startTime}
                           endDate={props.newMission.deadline} />
        </div>


        <div className="form-section">
          <label className="form-label">Directives</label>
          <SelectDirectives {...props} />
        </div>

        <div className="">
          {alert}
          <button className="button create-mission-button" type="submit">Create mission</button>
        </div>

      </form>
    )
  }

  return (
    <div className="columns">
      {form}
      {loadingBox}
    </div>
  )


}