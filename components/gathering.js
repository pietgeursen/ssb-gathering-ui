import {html} from 'inu'
import moment from 'moment'
const sf = require('sheetify')
const prefix = sf('./gathering.css')
import classNames from 'classnames'
import ActiveButton from './activeButton'
import UiDidRsvp from '../actions/uiDidRsvp'
import Rsvp from '../models/rsvp'

function Gathering (model, dispatch){
    const gathering = model.gathering
    const rsvp = model.rsvp || {}
    const time = moment(gathering.dateTime).calendar()
    const going = () => dispatch(UiDidRsvp({payload: {value: 1, link: gathering.id}}))    
    const maybe = () => dispatch(UiDidRsvp({payload: {value: 0, link: gathering.id}}))    
    const no = () => dispatch(UiDidRsvp({payload: {value: -1, link: gathering.id}}))    
   
    return html` 
      <div class=${classNames([prefix, 'section'])}>  
        <div class='details row'>  
          <div class='pic four columns'>  
            <img src=${gathering.imageUrl} />
          </div>  
          <div class='info eight columns'>  
            <h3>${gathering.title}</h3>
            <h4>${time}</h4>
            <h4>${gathering.location}</h4>
            <h4>${gathering.author}</h4>
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



export default Gathering
