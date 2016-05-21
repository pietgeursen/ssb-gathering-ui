import t from 'tcomb'
import Rsvps from './rsvps'

const Model = t.struct({
  rsvps: Rsvps
}, 'Model')

export default Model
