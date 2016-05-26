import {pull} from 'inu'
import SbotGatheringWasAddedAction from '../actions/sbotGatheringWasAdded'

function sbotFutureGatheringWasAdded(client){
  return pull(
    client.findFutureGatherings(),
    pull.map((gathering) => {
      console.log('gathering: ', gathering);
      var action = SbotGatheringWasAddedAction(gathering)
      console.log('action: ',action);
      return action
    })
  )
}

export default sbotFutureGatheringWasAdded
