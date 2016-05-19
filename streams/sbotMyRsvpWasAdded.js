import {pull} from 'inu'

function sbotMyRsvpWasAdded(client){
  return pull(
  client.myRsvps(),
  pull.map(function(rsvp) {
    return {
      type: 'SBOT_MY_RSVP_WAS_ADDED',
      payload: rsvp
    } 
  }))
}

export default sbotMyRsvpWasAdded
