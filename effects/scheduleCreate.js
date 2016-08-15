import t from 'tcomb'

import UnpublishedGathering from '../models/unpublishedGathering'

const ScheduleCreate = UnpublishedGathering.extend({}, 'scheduleCreate')

ScheduleCreate.prototype.run = function(client) {
  client.createGathering(this, console.log)
}

export default ScheduleCreate


