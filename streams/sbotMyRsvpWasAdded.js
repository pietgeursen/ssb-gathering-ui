import {pull} from 'inu'
import SbotMyRsvpWasAddedAction from '../actions/sbotMyRsvpWasAdded'

function sbotMyRsvpWasAdded(client){
  return pull(
    client.myRsvps(),
    pull.map((rsvp) => {
      return SbotMyRsvpWasAddedAction(rsvp)
    })
  )
}

export default sbotMyRsvpWasAdded
