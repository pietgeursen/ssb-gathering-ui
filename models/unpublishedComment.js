import t from 'tcomb'

const Comment = t.struct({
  text: t.String,
  mentions: t.String
}, 'Comment')

export default Comment


