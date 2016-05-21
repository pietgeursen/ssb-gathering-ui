import t from 'tcomb'
import Rsvp from '../models/rsvp'
import Model from '../models/model'

const SbotMyRsvpWasAdded = t.struct({payload: Rsvp}, 'sbotMyRsvpWasAdded')

SbotMyRsvpWasAdded.prototype.update = function(model) {
  const newRsvp = this.payload
  const rsvpIndex = model.rsvps.findIndex(function(rsvp) {
    return rsvp.link == newRsvp.link 
  })

  if(rsvpIndex >= 0){
    return {
      model: Model.update(model, {
        rsvps: {$splice: [[rsvpIndex, 1, this.payload]]}
      })
    }
  } else {
    return {
      model: Model.update(model, {
        rsvps: {$push: [this.payload]}
      })
    } 
  }
}

export default SbotMyRsvpWasAdded
