import t from 'tcomb'
import Comment from '../models/comment'
import Model from '../models/model'

const SbotCommentWasAdded = Comment.extend({}, 'sbotMyRsvpWasAdded')

SbotCommentWasAdded.prototype.update = function(model) {
  const newRsvp = this
  const rsvpIndex = model.rsvps.findIndex(function(rsvp) {
    return rsvp.link == newRsvp.link 
  })

  if(rsvpIndex >= 0){
    return {
      model: Model.update(model, {
        rsvps: {$splice: [[rsvpIndex, 1, this]]}
      })
    }
  } else {
    return {
      model: Model.update(model, {
        rsvps: {$push: [this]}
      })
    } 
  }
}

export default SbotCommentWasAdded
