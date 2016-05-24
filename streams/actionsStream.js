import pullMany from 'pull-many'

import sbotGatheringWasAdded from './sbotGatheringWasAdded' 
import sbotMyRsvpWasAdded from './sbotMyRsvpWasAdded'
import uiUrlDidChange from './uiUrlDidChange'

function actionsStream(client){
  return pullMany([
    sbotGatheringWasAdded(client), 
    sbotMyRsvpWasAdded(client), 
    uiUrlDidChange()
  ])
}

export default actionsStream
