import element from 'vdux/element'
import Form from 'vdux-form'
const sf = require('sheetify')
const prefix = sf('./create.css')

function onSubmit(form) {
  console.log('got form sub:', form)
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
