import t from 'tcomb'
import UnpublishedComment from '../models/unpublishedComment'
import ScheduleComment from '../effects/scheduleComment'

const UiDidComment = UnpublishedComment.extend({}, 'uiDidComment')

UiDidComment.prototype.update = function(model) {
  return {model: model, effect: ScheduleComment(this) }
}

export default UiDidComment

