import t from 'tcomb'
import actionsStream from '../streams/actionsStream'

const ScheduleInit = t.struct({}, 'scheduleInit')

ScheduleInit.prototype.run = function(client) {
  return actionsStream(client) 
}

export default ScheduleInit
