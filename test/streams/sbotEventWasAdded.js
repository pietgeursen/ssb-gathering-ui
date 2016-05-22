import test from 'tape'
import {pull} from 'inu'
import sbotFutureEventWasAdded from '../../streams/sbotEventWasAdded'
import Event from '../../models/event'
import validEvent from '../../util/validEvent'
import sbotFutureEventWasAddedAction from '../../actions/sbotEventWasAdded'

test('stream emits Event Added Action type', function(t) {
  const client ={
    findFutureEvents: function(){
      return pull(pull.values([
        Event(validEvent)
      ])) 
    }
  }

  pull(sbotFutureEventWasAdded(client), pull.drain(function(action) {
    t.true(sbotFutureEventWasAddedAction.is(action)) 
    t.end()
  }))

})

