import t from 'tcomb'
import Streams from '../streams/streams'

const ScheduleInit = t.struct({}, 'scheduleInit')

ScheduleInit.prototype.run = function(client) {
  return Streams(client) 
}

export default ScheduleInit
