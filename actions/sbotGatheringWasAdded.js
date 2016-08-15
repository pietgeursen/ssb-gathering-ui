import t from 'tcomb'
import Gathering from '../models/gathering'
import Model from '../models/model'
import State from '../state/state'
import ScheduleCommentsOnGathering from '../effects/scheduleCommentsOnGathering'

const SbotGatheringAdded = Gathering.extend({}, 'sbotGatheringWasAdded')

SbotGatheringAdded.prototype.update = function(model) {
  
  const effect = ScheduleCommentsOnGathering({mentions: this.id})
	return State({
    model: Model.update(model, {gatherings: {$push: [this]}}),
    effect
  })
}

export default SbotGatheringAdded
