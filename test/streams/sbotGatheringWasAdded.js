import test from 'tape'
import {pull} from 'inu'
import sbotFutureGatheringWasAdded from '../../streams/sbotGatheringWasAdded'
import Gathering from '../../models/event'
import validGathering from '../../util/validGathering'
import sbotFutureGatheringWasAddedAction from '../../actions/sbotGatheringWasAdded'

test('stream emits Gathering Added Action type', function(t) {
  const client ={
    findFutureGatherings: function(){
      return pull(pull.values([
        Gathering(validGathering)
      ])) 
    }
  }

  pull(sbotFutureGatheringWasAdded(client), pull.drain(function(action) {
    t.true(sbotFutureGatheringWasAddedAction.is(action)) 
    t.end()
  }))

})

