import {html} from 'inu'
const sf = require('sheetify')
const prefix = sf('./rsvpButtons.css')
import ActiveButton from './activeButton'
import UiDidRsvp from '../actions/uiDidRsvp'


function RsvpButtons(model, dispatch) {
  const rsvp = model.rsvp || {}
  const gathering = model.gathering
  const going = () => dispatch(UiDidRsvp({value: 1, link: gathering.id}))    
  const maybe = () => dispatch(UiDidRsvp({value: 0, link: gathering.id}))    
  const no = () => dispatch(UiDidRsvp({value: -1, link: gathering.id}))    
 return html`
   <div class='respond-buttons row'>  
    <div class='four columns'>
      ${ActiveButton( {text: 'GOING', active: rsvp.value == 1, click: going}, dispatch) } 
    </div>
    <div class='four columns'>
      ${ActiveButton( {text: 'MAYBE', active: rsvp.value == 0, click: maybe}, dispatch) } 
    </div>
    <div class='four columns'>
      ${ActiveButton( {text: 'NO', active: rsvp.value == -1, click: no}, dispatch) } 
    </div>
  </div>`  
}

export default RsvpButtons
