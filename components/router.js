import yo from 'yo-yo'
import enroute from 'enroute'
import App from './app'
//import Create from './create'
import Nav from './nav'
import catchLinks from 'catch-links'

const router = enroute({
  '/': () => App,
 // '/#/create': () => Create
})
function Router (model, dispatch) {
  catchLinks(window, function(href){dispatch(setUrl(href))})
  const Component = router(model.url)

  return yo`
        <div>
          ${Nav()}
          <div class='container'>
            ${Component(model, dispatch)}
          </div>
        </div>
        ` 
}


function setUrl(url){
 return {
  type: 'URL_DID_CHANGE',
  url
 } 
}


export default Router
