import {pull} from 'inu'
import sbotEventWasAddedAction from '../actions/sbotEventWasAdded'

function sbotFutureEventWasAdded(client){
  return pull(
    client.findFutureEvents(),
    pull.map(sbotEventWasAddedAction)
  )
}

export default sbotFutureEventWasAdded
