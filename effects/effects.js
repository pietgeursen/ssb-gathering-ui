import t from 'tcomb'
import scheduleInit from './scheduleInit'
import scheduleRsvp from './scheduleRsvp'
import scheduleCreate from './scheduleCreate'
import scheduleComment from './scheduleComment'
import scheduleCommentsOnGathering from './scheduleCommentsOnGathering'

const Effect = t.union([scheduleInit, scheduleRsvp, scheduleCreate, scheduleComment, scheduleCommentsOnGathering])

export default Effect
