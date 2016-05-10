import vdux from 'vdux/dom'
import element from 'vdux/element'
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
    console.log(err, data);
  })
}

function reducer(state, action) {
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
  if(action.type === "DID_SUBMIT_EVENT"){
    client.createEvent(action.event,function(err, data) {
      console.log(err, data);
    })
    return state
  }
  return state
}

const initialState = {
  events: []    
}

const {subscribe, render, dispatch} = vdux({reducer, initialState})

pull(client.findFutureEvents(),pull.map(function(event) {
  return {
    ...event.value.content,
    author : event.value.author,
    id : event.key
  }
}), pull.drain(function(event) {
 console.log(event);
 dispatch(
   {
     type: "DID_CREATE_EVENT",
     event: event
   }
   ) 
}))

ready(() => {
  subscribe(state => {
    render(<Router state={state} />)
  })
})

