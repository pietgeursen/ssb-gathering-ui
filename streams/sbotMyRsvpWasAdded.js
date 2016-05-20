import {pull} from 'inu'
import sbotMyRsvpWasAddedAction from '../actions/sbotMyRsvpWasAdded'

function sbotMyRsvpWasAdded(client){
  return pull(
    client.myRsvps(),
    pull.map(sbotMyRsvpWasAddedAction)
  )
}

export default sbotMyRsvpWasAdded
