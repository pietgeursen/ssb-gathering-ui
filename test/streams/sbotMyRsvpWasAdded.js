import test from 'tape'
import {pull} from 'inu'
import sbotMyRsvpWasAdded from '../../streams/sbotMyRsvpWasAdded'
import Rsvp from '../../models/rsvp'
import validRsvp from '../../util/validRsvp'
import SbotMyRsvpWasAddedAction from '../../actions/sbotMyRsvpWasAdded'

test('stream emits Rsvp Added Action type', function(t) {
  const client ={
    myRsvps: function(){
      return pull(pull.values([
        Rsvp(validRsvp)
      ])) 
    }
  }

  pull(sbotMyRsvpWasAdded(client), pull.drain(function(action) {
    t.true(SbotMyRsvpWasAddedAction.is(action)) 
    t.end()
  }))

})

