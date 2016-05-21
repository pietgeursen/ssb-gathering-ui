import test from 'tape'
import sbotMyRsvpWasAddedAction from '../../actions/sbotMyRsvpWasAdded'

test('ok', function(t) {
  t.ok(true)
  t.end()
})

test('if rsvp link is new, push new rsvp into rsvps', function(t) {
  const model = {rsvps: [{link: 'dkjfd', vote: 1}]} 
  const newRsvp = {link:'piet', vote: 0}
  const action = sbotMyRsvpWasAddedAction({payload: newRsvp})

  const newModel = action.update(model)
  t.equal(newModel.model.rsvps.length, 2, 'new rsvps has length 2')
  t.end()
})

test('if rsvp link already exists, replace old rsvp', function(t) {
  const model = {rsvps: [{link: 'dkjfd', vote: 1}]} 
  const newRsvp = {link:'dkjfd', vote: 0}
  const action = sbotMyRsvpWasAddedAction({payload: newRsvp})

  const newModel = action.update(model)
  t.equal(newModel.model.rsvps.length, 1, 'new rsvps has length 1')
  t.deepEqual(newModel.model.rsvps[0], newRsvp)
  t.notEqual(newModel.model.rsvps[0], newRsvp)
  t.end()

})



