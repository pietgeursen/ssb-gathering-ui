import yo from 'yo-yo'
import enroute from 'enroute'
import App from './app'
//import Create from './create'
import Nav from './nav'

const router = enroute({
  '/': () => App,
 // '/#/create': () => Create
})
function Router (model, dispatch) {
  const Component = router(model.url)
  document.onclick = handleLinkClicks(setUrl)

  function handleLinkClicks (setUrl) {
    return e => {
      if (e.target.nodeName === 'A') {
        e.preventDefault()
        const href = e.target.getAttribute('href')
        dispatch(setUrl(href))
      }
    }
  }
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
  type: 'SET_URL',
  url
 } 
}


export default Router
