import t from 'tcomb'

import Comment from '../models/comment'

const ScheduleComment = Comment.extend({}, 'scheduleComment')

ScheduleComment.prototype.run = function(client) {
  //client.publish(RsvpMsg(this.link, this.value), function(err, res) { })
}

export default ScheduleComment


