import pullPushable from 'pull-pushable'
import {pull} from 'inu'
import catchLinks from 'catch-links'

import uiUrlDidChangeAction from '../actions/uiUrlDidChange'

function uiUrlDidChange(){
  var pushable = pullPushable()
  catchLinks(window, function(href){pushable.push(href)})
  return pull(
    pushable, 
    pull.map(uiUrlDidChangeAction)
  )
}


export default uiUrlDidChange
