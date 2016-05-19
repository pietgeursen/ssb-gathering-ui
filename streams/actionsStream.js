import pullMany from 'pull-many'

import sbotEventWasAdded from './sbotEventWasAdded' 
import sbotMyRsvpWasAdded from './sbotMyRsvpWasAdded'
import uiUrlDidChange from './uiUrlDidChange'

function actionsStream(client){
  return pullMany([
    sbotEventWasAdded(client), 
    sbotMyRsvpWasAdded(client), 
    uiUrlDidChange()
  ])
}

export default actionsStream
