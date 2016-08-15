import {html} from 'inu'
const sf = require('sheetify')
import serialize from '@f/serialize-form'
import {validate} from 'tcomb-validation'

const prefix = sf('./create.css')
import UiDidCreateGathering from '../actions/uiDidCreateGathering'
import Gathering from '../models/unpublishedGathering'

function postGathering(title, location, description, date, time, mentions, imageUrl) {
 const dateTime = new Date(date + "T" + time).toString()
 return {
   type: 'gathering',
   dateTime,
   title,
   location,
   description,
   imageUrl
 } 
}


function onSubmit(e, dispatch) {
  e.preventDefault()
  const form = serialize(e.target)
  const gathering = postGathering(form.name, form.location, form.description, form.date, form.time)
  const result = validate(gathering, Gathering)
  
  if(result.isValid()) dispatch(UiDidCreateGathering(gathering))
  else console.log(result.errors)

}


function Create (model, dispatch) {
  return (
    html`<div class=${prefix}>
      <div class='section'>
        <h2>Create a new event</h2>
        <form onsubmit=${(e) => onSubmit(e, dispatch)}>
          <label for="eventNameInput">Gathering Name</label>
          <input name='name' class='u-full-width' type="text" placeholder="My sweet event" id="eventNameInput" />
          <div class='row'>
            <div class='six columns'>
              <label for="eventDate">Date</label>
              <input name="date" class='u-full-width' type='date' id="eventDate" />
            </div>
            <div class='six columns'>
              <label for="eventTimeInput">Time</label>
              <input name="time" class='u-full-width' type='time' id="eventTimeInput" />
            </div>
          </div>
          <label for="eventLocationInput">Location</label>
          <input name="location" class='u-full-width' type="text" placeholder="My place" id="eventLocationInput" />
          <label for="eventDescriptionInput">Gathering Description</label>
          <textarea name="description" class='u-full-width' placeholder="Fun times" id="eventDescriptionInput" ></textarea>
          <input class='button-primary' type="submit" value="Create">/input>
        </form>
      </div>
    </div>`
  ) 
}

export default Create
