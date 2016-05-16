import {html} from 'inu'
import moment from 'moment'
const sf = require('sheetify')
const prefix = sf('./event.css')
import classNames from 'classnames'
import ActiveButton from './activeButton'

function rsvp(status, id) {
 return {
     type: 'DID_RSVP',
     status,
     id
 } 
}


function Event (model, dispatch){
    const event = model
    console.log(event);
    const time = moment(event.dateTime).calendar()
    const going = () => dispatch(rsvp(1, event.id))    
    const maybe = () => dispatch(rsvp(0, event.id))    
    const no = () => dispatch(rsvp(-1, event.id))    
   
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
            <h4>${event.createdBy}</h4>
          </div>  
        </div>  
        <div class='respond-buttons row'>  
          <div class='four columns'>
            ${ActiveButton( {text: 'GOING', active: event.status == 1, click: going}, dispatch) } 
          </div>
          <div class='four columns'>
            ${ActiveButton( {text: 'MAYBE', active: event.status == 0, click: maybe}, dispatch) } 
          </div>
          <div class='four columns'>
            ${ActiveButton( {text: 'NO', active: event.status == -1, click: no}, dispatch) } 
          </div>
        </div>  
      </div>`  
    
  }



export default Event
