import t from 'tcomb'
import UnpublishedGathering from '../models/unpublishedGathering'
import ScheduleCreate from '../effects/scheduleCreate'

const UiDidCreateGathering = UnpublishedGathering.extend({}, 'uiDidCreateGathering')

UiDidCreateGathering.prototype.update = function(model) {
  return {model: model, effect: ScheduleCreate(this) }
}

export default UiDidCreateGathering

