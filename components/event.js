import {html} from 'inu'
import moment from 'moment'
const sf = require('sheetify')
const prefix = sf('./event.css')
import classNames from 'classnames'
import ActiveButton from './activeButton'

function doRsvp(status, id) {
 return {
     type: 'UI_DID_RSVP',
     status,
     id
 } 
}


function Event (model, dispatch){
    const event = model.event
    const rsvp = model.rsvp || {}
    console.log('in event with model', model);
    const time = moment(event.dateTime).calendar()
    const going = () => dispatch(doRsvp(1, event.id))    
    const maybe = () => dispatch(doRsvp(0, event.id))    
    const no = () => dispatch(doRsvp(-1, event.id))    
   
    return html` 
      <div class=${classNames([prefix, 'section'])}>  
        <div class='details row'>  
          <div class='pic four columns'>  
            <img src=${event.imageUrl} />
          </div>  
          <div class='info eight columns'>  
            <h3>${event.title}</h3>
            <h4>${time}</h4>
            <h4>${event.location}</h4>
            <h4>${event.author}</h4>
          </div>  
        </div>  
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
        </div>  
      </div>`  
  }



export default Event
