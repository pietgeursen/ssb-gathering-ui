import test from 'tape'
import sbotMyRsvpWasAddedAction from '../../actions/sbotMyRsvpWasAdded'
import Rsvps from '../../models/rsvps'
import Rsvp from '../../models/rsvp'
import Model from '../../models/model'


test('if rsvp link is new, push new rsvp into rsvps', function(t) {
  const model = Model({url: '', gatherings: [], rsvps: Rsvps([{link: 'dkjfd', value: 1}])}) 
  const newRsvp = Rsvp({link:'piet', value: 0})
  const action = sbotMyRsvpWasAddedAction(newRsvp)

  const newModel = action.update(model)
  t.equal(newModel.model.rsvps.length, 2, 'new rsvps has length 2')
  t.end()
})

test('if rsvp link already exists, replace old rsvp', function(t) {
  const model = Model({url: '', gatherings: [], rsvps: Rsvps([{link: 'dkjfd', value: 1}])}) 
  const newRsvp = Rsvp({link:'dkjfd', value: 0})
  const action = sbotMyRsvpWasAddedAction(newRsvp)

  const newModel = action.update(model)
  t.equal(newModel.model.rsvps.length, 1, 'new rsvps has length 1')
  t.deepEqual(newModel.model.rsvps[0], newRsvp, 'rsvps has been updated with newRsvp')
  t.end()

})



