import t from 'tcomb'

const UiDidRsvp = t.struct({payload: t.Object}, 'uiDidRsvp')

UiDidRsvp.prototype.update = function(model) {
  return {model: model, effect: {type: "SCHEDULE_RSVP", id: this.payload.id, status: this.payload.status}}
}

export default UiDidRsvp
