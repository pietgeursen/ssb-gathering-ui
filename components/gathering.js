import { html } from 'inu'
import moment from 'moment'
const sf = require('sheetify')
import classNames from 'classnames'
const prefix = sf('./gathering.css')
import RsvpButtons from './rsvpButtons'

function Gathering (model, dispatch) {
  const gathering = model.gathering

  const rsvp = model.rsvp || {}
  const time = moment(gathering.dateTime).calendar()

  return html` 
      <div class=${classNames([prefix, 'section'])}>  
        <div class='details row'>  
          <div class='pic four columns'>  
            <img src=${gathering.imageUrl} />
          </div>  
          <div class='info eight columns'>  
            <a href="/#/gathering/${btoa(gathering.id)}">
              <h3>${gathering.title}</h3>
            </a>
            <h4>${time}</h4>
            <h4>${gathering.location}</h4>
            <h4>${gathering.authorName}</h4>
          </div>  
        </div>  
        ${RsvpButtons(model, dispatch)}
      </div>`
}

export default Gathering
