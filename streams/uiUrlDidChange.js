import pullPushable from 'pull-pushable'
import {pull} from 'inu'
import many from 'pull-many'
import catchLinks from 'catch-links'
import document from 'global/document'
import window from 'global/window'

import uiUrlDidChangeAction from '../actions/uiUrlDidChange'

function uiUrlDidChange(opts){
  return pull(
    href(opts), 
    pull.map((href) => uiUrlDidChangeAction({payload: href}))
  )
}

function href (opts) {
  var _opts = {catchLinks: catchLinks, ...opts}
  var pushable = pullPushable()
  _opts.catchLinks(window, function(href){pushable.push(href)})
  return pushable 
}

function history () {
  var pushable = pullPushable()
  window.onpopstate = function () {
    pushable.push(document.location.href)
  }
  return pushable 
}

export default uiUrlDidChange
