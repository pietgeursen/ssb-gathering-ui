import {html} from 'inu'
import enroute from 'enroute'
import App from './app'
import Create from './create'
import ShowGathering from './showGathering'
import Nav from './nav'

const router = enroute({
  '/': () => App,
  '/#/create': () => Create,
  '/#/gathering/:id': ({id}) => ShowGathering(id),
  '*': () => App
})
function Router (model, dispatch) {
  const Component = router(model.url)

  return html`
    <div>
      ${Nav()}
      <div class='container'>
        ${Component(model, dispatch)}
      </div>
    </div>
  ` 
}




export default Router
