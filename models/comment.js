import t from 'tcomb'
import UnpublishedComment from './unpublishedComment'

const Comment = UnpublishedComment.extend({
  author: t.maybe(t.String),
}, 'Comment')

export default Comment

