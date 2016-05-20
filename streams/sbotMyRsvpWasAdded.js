import {pull} from 'inu'
import SbotMyRsvpWasAddedAction from '../actions/sbotMyRsvpWasAdded'

function sbotMyRsvpWasAdded(client){
  return pull(
    client.myRsvps(),
    pull.map((rsvp) => SbotMyRsvpWasAddedAction({payload:rsvp}))
  )
}

export default sbotMyRsvpWasAdded
