import t from 'tcomb'
import Rsvp from './rsvp'

const Rsvps = t.list(Rsvp, 'Rsvps')

export default Rsvps
