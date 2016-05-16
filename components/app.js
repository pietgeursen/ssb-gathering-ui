import {html} from 'inu'
const sf = require('sheetify')
const prefix = sf('./app.css')
import Event from './event'

function App (model, dispatch) {
    
      return html`<div class=${prefix}>
          <div class='section'>
            <select>
              <option value='upcoming'>Upcoming</option>
              <option value='hosting'>Hosting</option>
              <option value='invites'>Invites</option>
            </select>
            <a class='button button-primary create-button' href='/#/create'>Create</a> 
          </div>
          <div>
            ${model.events.map(function(event) {
              return Event(event, dispatch) 
            })}
          </div>
      </div>`
  }


export default App
