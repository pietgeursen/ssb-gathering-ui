import t from 'tcomb'

import Rsvp from '../models/rsvp'

const ScheduleRsvp = t.struct({payload: Rsvp}, 'scheduleRsvp')

ScheduleRsvp.prototype.run = function(client) {
  client.publish(RsvpMsg(this.payload.link, this.payload.value), function(err, res) { })
}

function RsvpMsg(id, vote){
  return { type: 'rsvp', vote: { link: id, value: vote } } 
}

export default ScheduleRsvp

