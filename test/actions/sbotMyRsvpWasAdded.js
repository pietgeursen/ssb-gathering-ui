import test from 'tape'
import sbotMyRsvpWasAddedAction from '../../actions/sbotMyRsvpWasAdded'
import Rsvps from '../../models/rsvps'
import Rsvp from '../../models/rsvp'
import Model from '../../models/model'


test('if rsvp link is new, push new rsvp into rsvps', function(t) {
  const model = Model({url: '', events: [], rsvps: Rsvps([{link: 'dkjfd', vote: 1}])}) 
  const newRsvp = Rsvp({link:'piet', vote: 0})
  const action = sbotMyRsvpWasAddedAction({payload: newRsvp})

  const newModel = action.update(model)
  t.equal(newModel.model.rsvps.length, 2, 'new rsvps has length 2')
  t.end()
})

test('if rsvp link already exists, replace old rsvp', function(t) {
  const model = Model({url: '', events: [], rsvps: Rsvps([{link: 'dkjfd', vote: 1}])}) 
  const newRsvp = Rsvp({link:'dkjfd', vote: 0})
  const action = sbotMyRsvpWasAddedAction({payload: newRsvp})

  const newModel = action.update(model)
  t.equal(newModel.model.rsvps.length, 1, 'new rsvps has length 1')
  t.deepEqual(newModel.model.rsvps[0], newRsvp, 'rsvps has been updated with newRsvp')
  t.end()

})



