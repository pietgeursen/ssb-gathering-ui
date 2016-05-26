import {pull} from 'inu'
import SbotGatheringWasAddedAction from '../actions/sbotGatheringWasAdded'

function sbotFutureGatheringWasAdded(client){
  return pull(
    client.findFutureGatherings(),
    pull.map((gathering) => {
      var action = SbotGatheringWasAddedAction(gathering)
      return action
    })
  )
}

export default sbotFutureGatheringWasAdded
