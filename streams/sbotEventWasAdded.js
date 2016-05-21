import {pull} from 'inu'
import SbotEventWasAddedAction from '../actions/sbotEventWasAdded'
import Event from '../models/event'

function sbotFutureEventWasAdded(client){
  return pull(
    client.findFutureEvents(),
    pull.map((event) => new SbotEventWasAddedAction({payload: Event(event)}))
  )
}

export default sbotFutureEventWasAdded
