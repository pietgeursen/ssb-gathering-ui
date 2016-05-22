import test from 'tape'
import Rsvp from '../../models/rsvp'
import validRsvp from '../../util/validRsvp'

test('throws when making an empty rsvp', function(t) {
  t.throws(()=> Rsvp({}))
  t.end()
})

test('creates a new rsvp with the correct object', function(t) {
  const newRsvp = Rsvp(validRsvp)
  t.ok(Rsvp.is(newRsvp), 'created rsvp is the Rsvp type')
  t.end()
})


