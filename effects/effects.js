import t from 'tcomb'
import scheduleInit from './scheduleInit'
import scheduleRsvp from './scheduleRsvp'

const Effect = t.union([scheduleInit, scheduleRsvp])

export default Effect
