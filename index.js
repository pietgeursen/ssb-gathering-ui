import vdux from 'vdux/dom'
import element from 'vdux/element'
import ready from 'domready'

import App from './components/app'


function reducer(state, action) {
  if(action.type === "RSVP"){
   return Object.assign({}, state, {status: action.status} ) 
  }
  return state
}

const initialState = {
  events: [
  {
    imageUrl: "http://vignette3.wikia.nocookie.net/thebiglebowski/images/7/7e/The_Dude.jpeg/revision/latest?cb=20111216183045",
    title: "Lebowskifest",
    description: "Abiding, bowling, the occasional acid flashback.",
    location: "Bowling Alley",
    time: new Date(),
    createdBy: "Piet"
  },
  {
    imageUrl: "http://25.media.tumblr.com/tumblr_llydmkQML11qaw9gjo1_400.jpg",
    title: "Art hack",
    description: "Art for hacking's sake",
    location: "Enspiral space",
    time: new Date(),
    createdBy: "Mikey",
    status: 1
  }
  ]    
}

const {subscribe, render} = vdux({reducer, initialState})


ready(() => {
  subscribe(state => {
    render(<App state={state} />)
  })
})

