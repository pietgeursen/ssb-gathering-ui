import test from 'tape'
import {pull} from 'inu'
import uiUrlDidChange from '../../streams/uiUrlDidChange'
import uiUrlDidChangeAction from '../../actions/uiUrlDidChange'

test('stream emits Url Changed Action type', function(t) {

  var _dis
  function fakeClickLinks(window, dispatch ) {
   _dis = dispatch 
  }
  
  pull(uiUrlDidChange({catchLinks: fakeClickLinks}), pull.drain(function(action) {
    t.true(uiUrlDidChangeAction.is(action)) 
    t.end()
  }))

  _dis('/#/create')
})


