import element from 'vdux/element'
import Form from 'vdux-form'
const sf = require('sheetify')
const prefix = sf('./create.css')

function postEvent(title, location, description, date, time, mentions, imageUrl) {
 const dateTime = new Date(date + "T" + time)
 return {
   type: 'event',
   dateTime,
   title,
   location,
   description,
   imageUrl,
   mentions
 } 
}


function onSubmit(form) {
  const event = postEvent(form.name, form.location, form.desctiption, form.date, form.time)
  return {
    type: "DID_SUBMIT_EVENT",
    event
  }  
}


function render ({props, local}) {
  return (
    <div class={prefix}>
      <div class='section'>
        <h2>Create a new event</h2>
        <Form validate={() => {return {valid:true}}} onSubmit={onSubmit}>
          <label for="eventNameInput">Event Name</label>
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
          <label for="eventDescriptionInput">Event Description</label>
          <textarea name="description" class='u-full-width' placeholder="Fun times" id="eventDescriptionInput" ></textarea>
          <input class='button-primary' type="submit">Create</input>
        </Form>
      </div>
    </div>
  ) 
}

export default {
 render
}
