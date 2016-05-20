function sbotEventWasAdded(event) {
  return {
    type: 'SBOT_EVENT_WAS_ADDED',
    payload: event
  } 
}

export default sbotEventWasAdded
