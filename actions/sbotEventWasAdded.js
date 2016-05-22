import t from 'tcomb'
import Event from '../models/event'

const SbotEventAdded = t.struct({payload: Event}, 'sbotEventWasAdded')
SbotEventAdded.prototype.update = function(model) {
  return {model: { ...model,
    events: model.events.concat([this.payload])
  }}
}

export default SbotEventAdded
