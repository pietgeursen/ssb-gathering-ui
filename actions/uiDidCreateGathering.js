import t from 'tcomb'
import UnpublishedGathering from '../models/unpublishedGathering'
import ScheduleCreate from '../effects/scheduleCreate'
import Model from '../models/model'

const UiDidCreateGathering = UnpublishedGathering.extend({}, 'uiDidCreateGathering')

UiDidCreateGathering.prototype.update = function (model) {
  return {
    model: Model.update(model, {url: {$set: '/'}}),
    effect: ScheduleCreate(this)
  }
}

export default UiDidCreateGathering
