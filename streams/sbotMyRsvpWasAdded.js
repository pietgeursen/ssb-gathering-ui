import {pull} from 'inu'
import SbotMyRsvpWasAddedAction from '../actions/sbotMyRsvpWasAdded'
import Rsvp from '../models/rsvp'

function sbotMyRsvpWasAdded(client){
  return pull(
    client.myRsvps(),
    pull.map((rsvp) => {
      const action = SbotMyRsvpWasAddedAction({payload: Rsvp(rsvp)})
      console.log(action);
      return action
    })
  )
}

export default sbotMyRsvpWasAdded
