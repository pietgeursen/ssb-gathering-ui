import pullMany from 'pull-many'

import sbotGatheringWasAdded from './sbotGatheringWasAdded' 
import sbotMyRsvpWasAdded from './sbotMyRsvpWasAdded'
import sbotCommentWasAdded from './sbotCommentWasAdded'
import uiUrlDidChange from './uiUrlDidChange'


function Streams(client){
  return pullMany([
    sbotGatheringWasAdded(client), 
    sbotMyRsvpWasAdded(client), 
    sbotCommentWasAdded(client),
    uiUrlDidChange(),
  ])
}

export default Streams
