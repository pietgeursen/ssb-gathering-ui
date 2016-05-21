import t from 'tcomb'

const Rsvp = t.struct({
  link: t.String,
  vote: t.Number
}, 'Rsvp')

export default Rsvp
