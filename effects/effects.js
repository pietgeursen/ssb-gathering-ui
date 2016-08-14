import t from 'tcomb'
import scheduleInit from './scheduleInit'
import scheduleRsvp from './scheduleRsvp'
import scheduleCreate from './scheduleCreate'

const Effect = t.union([scheduleInit, scheduleRsvp, scheduleCreate])

export default Effect
