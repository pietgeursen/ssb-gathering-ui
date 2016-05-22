import test from 'tape'
import Event from '../../models/event'
import validEvent from '../../util/validEvent'

test('throws when making an empty event', function(t) {
  t.throws(()=>Event({}))
  t.end()
})

test('creates a new event with the correct object', function(t) {
  const newEvent = Event(validEvent)
  t.ok(Event.is(newEvent), 'created event is the Event type')
  t.end()
})

