import t from 'tcomb'
import Comment from '../models/comment'
import Model from '../models/model'

const SbotCommentWasAdded = Comment.extend({}, 'sbotCommentWasAdded')

SbotCommentWasAdded.prototype.update = function(model) {
  return {model: Model.update(model, {comments: {$unshift: [this]}})}
}

export default SbotCommentWasAdded
