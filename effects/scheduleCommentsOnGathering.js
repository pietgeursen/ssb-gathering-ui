import t from 'tcomb'

import Comment from '../models/comment'
import commentAddedStream from '../streams/sbotCommentWasAdded'

const ScheduleCommentOnGathering = Comment.extend({}, 'scheduleCommentOnGathering')

ScheduleCommentOnGathering.prototype.run = function(client) {
  return commentAddedStream(client, this.mentions) 
}

export default ScheduleCommentOnGathering
