import {pull} from 'inu'
import SbotGatheringWasAddedAction from '../actions/sbotGatheringWasAdded'

function sbotFutureGatheringWasAdded(client){
  return pull(
    client.findFutureGatherings(),
    pull.map((gathering) => {
      return SbotGatheringWasAddedAction({payload: gathering})
    })
  )
}

export default sbotFutureGatheringWasAdded
