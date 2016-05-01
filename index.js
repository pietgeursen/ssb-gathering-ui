import vdux from 'vdux/dom'
import element from 'vdux/element'
import ready from 'domready'

import App from './components/app'

function reducer(state, action) {
  return state
}

const initialState = {
  name: 'piet loves vdux'
}

const {subscribe, render} = vdux({reducer, initialState})


ready(() => {
  subscribe(state => {
   render(<App name={state.name} />)
  })
})

