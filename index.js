import {start, pull, html} from 'inu'
import moment from 'moment'
import ready from 'domready'
import SSBClient from './ws-client'
import api from './api'
import Router from './components/router'
const client = SSBClient(api)

import seed from './util/seedEvents'

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
      type: 'EVENT_WAS_ADDED',
      payload: event
    } 
  }))
}

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
      case "URL_DID_CHANGE": 
        return {model: {...model, url: event.url}} 
      case "EVENT_WAS_ADDED":
        return {model: { ...model,
          events: model.events.concat([event.payload])
        }}
      case "DID_RSVP":
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
        return futureEventStream() 
      case "SCHEDULE_RSVP":
        //sbot.publish(Rsvp(effect.id, effect.status))
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
    console.log('in view with:', view);
    html.update(main, view)
  }))
})
