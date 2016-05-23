import t from 'tcomb'

const Gathering = t.struct({
  author: t.String,
  id: t.String,
  title: t.String,
  dateTime: t.String,
  description: t.String,
  imageUrl: t.String,
  location: t.String,
  title: t.String,
  type: t.String,
}, 'Gathering')

export default Gathering
