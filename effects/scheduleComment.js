import t from 'tcomb'
import {post} from 'ssb-msg-schemas'
import Comment from '../models/comment'

const ScheduleComment = Comment.extend({}, 'scheduleComment')

ScheduleComment.prototype.run = function(client) {
  //client.publish(RsvpMsg(this.link, this.value), function(err, res) { })
  client.publish(post(this.text, null, null, this.mentions), function(err, res) {
    console.log('commented with err, res', err, res)
  })
}

export default ScheduleComment


