import t from 'tcomb'
import Rsvps from './rsvps'
import Gatherings from './gatherings'

t.struct.strict = true
const Model = t.struct({
  rsvps: Rsvps,
  gatherings: Gatherings,
  url: t.String
}, 'Model')

export default Model
