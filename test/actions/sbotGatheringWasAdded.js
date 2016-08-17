import test from 'tape'
import sbotGatheringWasAdded from '../../actions/sbotGatheringWasAdded'
import validGathering from '../../util/validGathering'
import Gatherings from '../../models/gatherings'
import Gathering from '../../models/gathering'
import Model from '../../models/model'


test('push new gathering into gatherings', function(t) {
  const model = Model({url: '', rsvps: [], comments: [], gatherings: Gatherings([validGathering])}) 
  const newGathering = Gathering(validGathering)
  const action = sbotGatheringWasAdded(newGathering)

  const newModel = action.update(model)
  t.equal(newModel.model.gatherings.length, 2, 'new gatherings has length 2')
  t.end()
})

