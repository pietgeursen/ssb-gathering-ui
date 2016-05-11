import {element} from 'deku'
import enroute from 'enroute'
import App from './app'
import Create from './create'
import Nav from './nav'

const router = enroute({
  '/': () => App,
  '/#/create': () => Create
})

function render ({props}) {
  const Component = router(props.url)
  return (
        <div>
          <Nav />
          <div class='container'>
            <Component state={props.state} />
          </div>
        </div>
    )
}

function handleLinkClicks (setUrl) {
  return e => {
    if (e.target.nodeName === 'A') {
      e.preventDefault()
      const href = e.target.getAttribute('href')
      return setUrl(href)
    }
  }
}

function initialState() {
 return {url: '/'} 
}

function setUrl(url){
 return {
  type: 'SET_URL',
  url
 } 
}

function reducer(state, action) {
 if(action.type === 'SET_URL') {
   return {...state, url: action.url}
 }
 return state
}

export default {
  render,
  reducer,
  initialState
}
