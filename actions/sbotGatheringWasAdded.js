import t from 'tcomb'
import Gathering from '../models/gathering'
import Model from '../models/model'

const SbotGatheringAdded = Gathering.extend({}, 'sbotGatheringWasAdded')
SbotGatheringAdded.prototype.update = function(model) {
	return {model: Model.update(model, 
		{gatherings: {$push: [this]}}	
	)}
}

export default SbotGatheringAdded
