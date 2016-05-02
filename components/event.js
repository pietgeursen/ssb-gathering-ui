import element from 'vdux/element'
import moment from 'moment'
const sf = require('sheetify')
const prefix = sf('./event.css')

const Event = {
  render({props}){
    const event = props.event
    const time = moment(event.time).calendar()
    return (
      <div class={prefix}>  
        <div class='details row'>  
          <div class='pic four columns'>  
            <img src={event.imageUrl} />
          </div>  
          <div class='info eight columns'>  
            <h3>{event.title}</h3>
            <h4>{time}</h4>
            <h4>{event.location}</h4>
            <h4>{event.createdBy}</h4>
          </div>  
        </div>  
        <div class='respond-buttons row'>  
          <div class='four columns'>
            <button>GOING</button> 
          </div>
          <div class='four columns'>
            <button>MAYBE</button> 
          </div>
          <div class='four columns'>
            <button>CAN'T GO</button> 
          </div>
        </div>  
      </div>  
    )
  }

}

export default Event
