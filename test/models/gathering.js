import test from 'tape'
import Gathering from '../../models/event'
import validGathering from '../../util/validGathering'

test('throws when making an empty event', function(t) {
  t.throws(()=>Gathering({}))
  t.end()
})

test('creates a new event with the correct object', function(t) {
  const newGathering = Gathering(validGathering)
  t.ok(Gathering.is(newGathering), 'created event is the Gathering type')
  t.end()
})

