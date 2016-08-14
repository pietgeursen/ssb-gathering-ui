import {createSelector} from 'reselect'

const rsvps = model => model.rsvps

const rsvpToGathering = gathering => (
  createSelector(
    rsvps,
    rsvps => rsvps.find(function(rsvp) {
      return rsvp.link === gathering.id 
    })
  )  
) 

export default rsvpToGathering
