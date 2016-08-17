import t from 'tcomb'
import Gathering from '../models/gathering'
import Model from '../models/model'
import State from '../state/state'

const SbotGatheringAdded = Gathering.extend({}, 'sbotGatheringWasAdded')

SbotGatheringAdded.prototype.update = function(model) {
  
	return State({
    model: Model.update(model, {gatherings: {$push: [this]}}),
  })
}

export default SbotGatheringAdded
