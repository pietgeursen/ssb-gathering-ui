import t from 'tcomb'
import Comment from '../models/comment'
import ScheduleComment from '../effects/scheduleComment'

const UiDidComment = Comment.extend({}, 'uiDidComment')

UiDidComment.prototype.update = function(model) {
  return {model: model, effect: ScheduleComment(this) }
}

export default UiDidComment

