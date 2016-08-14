import t from 'tcomb'

const UnpublishedGathering = t.struct({
  title: t.String,
  dateTime: t.String,
  description: t.String,
  imageUrl: t.maybe(t.String),
  location: t.String,
  title: t.String,
  type: t.String,
}, 'UnpublishedGathering')

export default UnpublishedGathering

