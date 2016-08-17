import t from 'tcomb'

const UnpublishedComment = t.struct({
  text: t.maybe(t.String),
  mentions: t.String
}, 'UnpublishedComment')

export default UnpublishedComment


