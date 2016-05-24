import test from 'tape'
import Gathering from '../../models/gathering'
import validGathering from '../../util/validGathering'

test('throws when making an empty gathering', function(t) {
  t.throws(()=>Gathering({}))
  t.end()
})

test('creates a new gathering with the correct object', function(t) {
  const newGathering = Gathering(validGathering)
  t.ok(Gathering.is(newGathering), 'created gathering is the Gathering type')
  t.end()
})

