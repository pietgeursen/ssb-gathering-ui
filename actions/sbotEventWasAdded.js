import t from 'tcomb'
import Event from '../models/event'
import Model from '../models/model'

const SbotEventAdded = t.struct({payload: Event}, 'sbotEventWasAdded')
SbotEventAdded.prototype.update = function(model) {
	return {model: Model.update(model, 
		{events: {$push: [this.payload]}}	
	)}
}

export default SbotEventAdded
