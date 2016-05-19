import {start, pull, html} from 'inu'
import pullMany from 'pull-many'
import moment from 'moment'
import ready from 'domready'
import SSBClient from './ws-client'
import api from './api'
import Router from './components/router'
const client = SSBClient(api)

import seed from './util/seedEvents'
function Rsvp(id, vote){
  return { type: 'rsvp', vote: { link: id, value: vote } } 
}
function futureEventStream(){
  return pull(
  client.findFutureEvents(),
  pull.map(function(event) {
    return {
      ...event.value.content,
      dateTime: new Date(event.value.content.dateTime),
      author : event.value.author,
      id : event.key
    }}), 
  pull.map(function(event) {
    return {
      type: 'SBOT_EVENT_WAS_ADDED',
      payload: event
    } 
  }))
}

function myRsvpStream(){
  return pull(
  client.myRsvps(),
  pull.map(function(rsvp) {
    return {
      type: 'SBOT_MY_RSVP_WAS_ADDED',
      payload: rsvp
    } 
  }))
}

const mergedStreams = pullMany([myRsvpStream(), futureEventStream()])
const app = {
  init: function(){
    console.log('in init');
    return {
      model: {
        events: [],
        url: '/'
      },
      effect: {
        type: 'INIT'
      }
  }},
  update: function(model, event){
    console.log('in reducer', model, event);
    if(!event) return {model}
    switch(event.type){
      case "SBOT_MY_RSVP_WAS_ADDED":
        return {model}
      case "SBOT_EVENT_WAS_ADDED":
        return {model: { ...model,
          events: model.events.concat([event.payload])
        }}
      case "UI_URL_DID_CHANGE": 
        return {model: {...model, url: event.url}} 
      case "UI_DID_RSVP":
        return {model: model, effect: {type: "SCHEDULE_RSVP", id: event.id, status: event.status}}
    }
    return {model}
  },
  view: (model, dispatch) => {
    return html`
      <main>
        ${Router(model, dispatch)}
      </main>`
  },
  run: function(effect){
    console.log('in run with effect:', effect);
    switch(effect.type){
      case "INIT": 
        return mergedStreams 
      case "SCHEDULE_RSVP":
        client.publish(Rsvp(effect.id, effect.status), function(err, res) {
          console.log(err,res);
        })
        return pull.empty()
    }
    return pull.empty()
  }
}



ready(function(){
  const main = document.querySelector('main')
  const {views} = start(app)
  
  pull(
    views(),
    pull.drain(function(view) {
    html.update(main, view)
  }))
})
