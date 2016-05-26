import t from 'tcomb'
import Rsvp from '../models/rsvp'
import ScheduleRsvp from '../effects/scheduleRsvp'

const UiDidRsvp = Rsvp.extend({}, 'uiDidRsvp')

UiDidRsvp.prototype.update = function(model) {
  return {model: model, effect: ScheduleRsvp(this) }
}

export default UiDidRsvp
