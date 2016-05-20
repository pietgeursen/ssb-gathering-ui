import t from 'tcomb'

const SbotEventAdded = t.struct({payload: t.Object}, 'sbotEventWasAdded')
SbotEventAdded.prototype.update = function(model) {
  return {model: { ...model,
    events: model.events.concat([this.payload])
  }}
}

export default SbotEventAdded
