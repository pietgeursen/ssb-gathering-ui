import test from 'tape'
import sbotEventWasAdded from '../../actions/sbotEventWasAdded'
import validEvent from '../../util/validEvent'
import Events from '../../models/events'
import Event from '../../models/event'
import Model from '../../models/model'


test('push new event into events', function(t) {
  const model = Model({url: '', rsvps: [], events: Events([validEvent])}) 
  const newEvent = Event(validEvent)
  const action = sbotEventWasAdded({payload: newEvent})

  const newModel = action.update(model)
  t.equal(newModel.model.events.length, 2, 'new events has length 2')
  t.end()
})

