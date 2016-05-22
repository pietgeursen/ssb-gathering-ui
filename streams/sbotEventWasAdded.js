import {pull} from 'inu'
import SbotEventWasAddedAction from '../actions/sbotEventWasAdded'

function sbotFutureEventWasAdded(client){
  return pull(
    client.findFutureEvents(),
    pull.map((event) => {
      return SbotEventWasAddedAction({payload: event})
    })
  )
}

export default sbotFutureEventWasAdded
