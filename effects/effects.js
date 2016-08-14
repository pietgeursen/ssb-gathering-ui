import t from 'tcomb'
import scheduleInit from './scheduleInit'
import scheduleRsvp from './scheduleRsvp'
import scheduleCreate from './scheduleCreate'
import scheduleComment from './scheduleComment'

const Effect = t.union([scheduleInit, scheduleRsvp, scheduleCreate, scheduleComment])

export default Effect
