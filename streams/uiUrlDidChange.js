import pullPushable from 'pull-pushable'
import catchLinks from 'catch-links'

function uiUrlDidChange(){
  var pushable = pullPushable()
  catchLinks(window, function(href){pushable.push(setUrl(href))})
  return pushable
}

function setUrl(url){
 return {
  type: 'UI_URL_DID_CHANGE',
  url
 } 
}

export default uiUrlDidChange
