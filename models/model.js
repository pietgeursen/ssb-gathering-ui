import t from 'tcomb'
import Rsvps from './rsvps'
import Gatherings from './gatherings'
import Comments from './comments'

t.struct.strict = true
const Model = t.struct({
  rsvps: Rsvps,
  gatherings: Gatherings,
  comments: Comments, 
  url: t.String
}, 'Model')

export default Model
