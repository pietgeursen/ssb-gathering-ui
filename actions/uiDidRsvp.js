import t from 'tcomb'
import Rsvp from '../models/rsvp'
import ScheduleRsvp from '../effects/scheduleRsvp'

const UiDidRsvp = t.struct({payload: Rsvp}, 'uiDidRsvp')

UiDidRsvp.prototype.update = function(model) {
  return {model: model, effect: ScheduleRsvp({payload: this.payload}) }
}

export default UiDidRsvp
