import yo from 'yo-yo'
import moment from 'moment'
const sf = require('sheetify')
const prefix = sf('./event.css')
import classNames from 'classnames'
import ActiveButton from './activeButton'

function rsvp(status, id) {
 return {
   type: 'RSVP',
   status,
   id
 } 
}


function Event (model, dispatch){
    const event = model
    const time = moment(event.dateTime).calendar()
    return yo` 
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
            ${ActiveButton( {}, dispatch) } 
          </div>
          <div class='four columns'>
            ${ActiveButton( {}, dispatch) } 
          </div>
          <div class='four columns'>
            ${ActiveButton( {}, dispatch) } 
          </div>
        </div>  
      </div>`  
    
  }



export default Event
