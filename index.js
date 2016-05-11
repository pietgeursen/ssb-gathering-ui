import {element, createApp} from 'deku'
import {createStore} from 'redux'
import { install, loop, Effects } from 'redux-loop'
import ready from 'domready'
import moment from 'moment'

import SSBClient from './ws-client'
import pull from 'pull-stream'
import api from './api'
import App from './components/app'
import Router from './components/router'

var client = SSBClient(api)
var sbotSeedEvents = [
{
    type: 'event',
    imageUrl: "http://vignette3.wikia.nocookie.net/thebiglebowski/images/7/7e/The_Dude.jpeg/revision/latest?cb=20111216183045",
    title: "Lebowskifest",
    description: "Abiding, bowling, the occasional acid flashback.",
    location: "Bowling Alley",
    dateTime: moment().add(2, 'days').toDate(),
    createdBy: "Piet"
  },
  {
    type: 'event',
    imageUrl: "http://25.media.tumblr.com/tumblr_llydmkQML11qaw9gjo1_400.jpg",
    title: "Art hack",
    description: "Art for hacking's sake",
    location: "Enspiral space",
    dateTime: moment().add(1, 'days').toDate(),
    createdBy: "Mikey",
    status: 0
  }
]

for(event of sbotSeedEvents){
  client.createEvent(event,function(err, data) {
  })
}

const submitNewStart = {
  type: 'DID_SUBMIT_NEW_EVENT'
}

const submitNewEvent = function(event){
 console.log('creating a new promise');
 return new Promise(function(resolve, reject) {
  client.createEvent(event, function(err, data){
    console.log('we created an event and should dispatch an action');
    if(err) reject({type: 'CREATE_FAILURE'})
    else resolve({type:'DID_CREATE_EVENT', event: data})
  })
 })
} 

const initialState = {
  events: []    
}

function reducer(state = initialState, action) {
  console.log(state, action);

  if(action.type === "DID_SUBMIT_NEW_EVENT"){
    return loop(state, Effects.promise(submitNewEvent, action.event) ) 
  }
  
  if(action.type === "RSVP"){
   const newState = {...state}
   const newEvent = newState.events.find(function(event) {
    return event.id == action.id 
   })
   newEvent.status = action.status
   return newState  
  }
  if(action.type === "DID_CREATE_EVENT"){
    const newState = {...state}
    if(newState.events.findIndex(function(event) {
      return event.id == action.event.id 
    }) >= 0) return newState
    newState.events.push(action.event)
    return newState
  }
  return state
}


//const {subscribe, render, dispatch} = vdux({reducer, initialState, middleware: [install()]})
let store = createStore(reducer, install())
let render = createApp(document.querySelector('#container'), store.dispatch)

pull(client.findFutureEvents(),pull.map(function(event) {
  return {
    ...event.value.content,
    author : event.value.author,
    id : event.key
  }
}), pull.drain(function(event) {
 store.dispatch(
   {
     type: "DID_CREATE_EVENT",
     event: event
   }
   ) 
  renderUI(store)

}))

function renderUI(store){
  render(<Router url='/' state={store.getState()} />, store.getState())
}

ready(() => {
  renderUI(store)
})

const newEvent = {
    type: 'event',
    imageUrl: "http://25.media.tumblr.com/tumblr_llydmkQML11qaw9gjo1_400.jpg",
    title: "dfkdjf hack",
    description: "Art for hacking's sake",
    location: "Enspiral space",
    dateTime: moment().add(1, 'days').toDate(),
    createdBy: "Mikey",
    status: 0
}


