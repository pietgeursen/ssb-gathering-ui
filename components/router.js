import Window from 'vdux/window'
import Document from 'vdux/document'
import element from 'vdux/element'
import enroute from 'enroute'
import App from './app'

const router = enroute({
  '/': () => App,
  '#/create': () => App
})

function render ({local, state, props}) {
  const Component = router(state.url)
  return (
    <Window onPopstate={local(setUrl)}>
      <Document onClick={handleLinkClicks(local(setUrl))}>
        <Component state={props.state} />
      </Document>
    </Window>
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
