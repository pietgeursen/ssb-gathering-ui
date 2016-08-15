import t from 'tcomb'
import Comment from './comment'

const Comments = t.list(Comment, 'Comments')

export default Comments

