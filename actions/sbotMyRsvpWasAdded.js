import t from 'tcomb'

const SbotMyRsvpWasAdded = t.struct({payload: t.Object}, 'sbotMyRsvpWasAdded')

SbotMyRsvpWasAdded.prototype.update = function(model) {
  const newRsvp = this.payload
  const rsvpIndex = model.rsvps.findIndex(function(rsvp) {
    return rsvp.link == newRsvp.link 
  })
  if(rsvpIndex >= 0){
    const newRsvps = [...model.rsvps] 
    newRsvps[rsvpIndex] = newRsvp
    return {model: { ...model,
      rsvps: newRsvps
    }}
  } else {
    return {model: { ...model,
      rsvps: model.rsvps.concat([this.payload])
    }}
  }
}

export default SbotMyRsvpWasAdded
