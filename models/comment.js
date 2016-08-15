import t from 'tcomb'

const Comment = t.struct({
  mentions: t.String,
  text: t.maybe(t.String)
}, 'Comment')

export default Comment

