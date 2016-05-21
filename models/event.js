import t from 'tcomb'

const Event = t.struct({
  author: t.String,
  id: t.String,
  title: t.String,
  dateTime: t.Date,
  description: t.String,
  imageUrl: t.String,
  location: t.String,
  title: t.String,
  type: t.String,
}, 'Event')

export default Event
