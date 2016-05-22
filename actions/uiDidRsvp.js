import t from 'tcomb'
import Rsvp from '../models/rsvp'

const UiDidRsvp = t.struct({payload: Rsvp}, 'uiDidRsvp')

UiDidRsvp.prototype.update = function(model) {
  return {model: model, effect: {type: "SCHEDULE_RSVP", id: this.payload.link, status: this.payload.value}}
}

export default UiDidRsvp
