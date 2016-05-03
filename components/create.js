import element from 'vdux/element'
const sf = require('sheetify')
const prefix = sf('./create.css')

const Create = {
  render ({props}) {
    return (
      <div class={prefix}>
        <div class='section'>
          <h2>Create a new event</h2>
          <form>
            <label for="eventNameInput">Event Name</label>
            <input class='u-full-width' type="text" placeholder="My sweet event" id="eventNameInput" />
            <div class='row'>
              <div class='six columns'>
                <label for="eventDate">Date</label>
                <input class='u-full-width' type='date' id="eventDate" />
              </div>
              <div class='six columns'>
                <label for="eventTimeInput">Time</label>
                <input class='u-full-width' type='time' id="eventTimeInput" />
              </div>
            </div>
            <label for="eventDescriptionInput">Event Description</label>
            <textarea class='u-full-width' placeholder="Fun times" id="eventDescriptionInput" ></textarea>
          </form>
        </div>
      </div>
    ) 
  }
}

export default Create
