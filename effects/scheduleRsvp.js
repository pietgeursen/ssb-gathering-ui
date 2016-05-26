import t from 'tcomb'

import Rsvp from '../models/rsvp'

const ScheduleRsvp = Rsvp.extend({}, 'scheduleRsvp')

ScheduleRsvp.prototype.run = function(client) {
  client.publish(RsvpMsg(this.link, this.value), function(err, res) { })
}

function RsvpMsg(id, vote){
  return { type: 'rsvp', vote: { link: id, value: vote } } 
}

export default ScheduleRsvp

