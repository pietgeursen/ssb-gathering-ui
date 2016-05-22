import {html} from 'inu'
import moment from 'moment'
const sf = require('sheetify')
const prefix = sf('./event.css')
import classNames from 'classnames'
import ActiveButton from './activeButton'
import UiDidRsvp from '../actions/uiDidRsvp'
import Rsvp from '../models/rsvp'

function Event (model, dispatch){
    const event = model.event
    const rsvp = model.rsvp || {}
    const time = moment(event.dateTime).calendar()
    const going = () => dispatch(UiDidRsvp({payload: {value: 1, link: event.id}}))    
    const maybe = () => dispatch(UiDidRsvp({payload: {value: 0, link: event.id}}))    
    const no = () => dispatch(UiDidRsvp({payload: {value: -1, link: event.id}}))    
   
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
