import t from 'tcomb'

const Rsvp = t.struct({
  link: t.String,
  value: t.Number
}, 'Rsvp')

export default Rsvp
