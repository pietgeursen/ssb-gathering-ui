import t from 'tcomb'
import Rsvps from './rsvps'
import Events from './events'

const Model = t.struct({
  rsvps: Rsvps,
  events: Events,
  url: t.String
}, 'Model')

export default Model
