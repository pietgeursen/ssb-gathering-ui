import t from 'tcomb'
import Gathering from '../models/gathering'
import Model from '../models/model'

const SbotGatheringAdded = t.struct({payload: Gathering}, 'sbotGatheringWasAdded')
SbotGatheringAdded.prototype.update = function(model) {
	return {model: Model.update(model, 
		{events: {$push: [this.payload]}}	
	)}
}

export default SbotGatheringAdded
