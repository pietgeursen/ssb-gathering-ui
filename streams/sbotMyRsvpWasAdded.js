import {pull} from 'inu'
import SbotMyRsvpWasAddedAction from '../actions/sbotMyRsvpWasAdded'
import Rsvp from '../models/rsvp'

function sbotMyRsvpWasAdded(client){
  return pull(
    client.myRsvps(),
    pull.map((rsvp) => {
      return SbotMyRsvpWasAddedAction({payload: rsvp})
    })
  )
}

export default sbotMyRsvpWasAdded
