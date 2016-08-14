import t from 'tcomb'

const Comment = t.struct({
  link: t.String,
  value: t.String
}, 'Comment')

export default Comment

