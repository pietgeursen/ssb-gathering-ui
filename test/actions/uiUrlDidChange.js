import test from 'tape'
import UiUrlDidChangeAction from '../../actions/uiUrlDidChange'
import Model from '../../models/model'


test('push new url into model.url', function(t) {
  const model = Model({url: '/', rsvps: [], gatherings: []}) 
  const newUrl = "/weee"
  const action = UiUrlDidChangeAction({payload: newUrl})

  const newModel = action.update(model)
  t.equal(newModel.model.url, '/weee', 'new url is correct')
  t.end()
})

