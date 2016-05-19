import {pull} from 'inu'

function sbotFutureEventWasAdded(client){
  return pull(
  client.findFutureEvents(),
  pull.map(function(event) {
    return {
      ...event.value.content,
      dateTime: new Date(event.value.content.dateTime),
      author : event.value.author,
      id : event.key
    }}), 
  pull.map(function(event) {
    return {
      type: 'SBOT_EVENT_WAS_ADDED',
      payload: event
    } 
  }))
}

export default sbotFutureEventWasAdded
