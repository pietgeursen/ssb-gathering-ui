import {start, pull, html} from 'inu'
import moment from 'moment'
import ready from 'domready'
import SSBClient from './ws-client'
import api from './api'
import Router from './components/router'
const client = SSBClient(api)

import actionsStream from './streams/actionsStream'

function Rsvp(id, vote){
  return { type: 'rsvp', vote: { link: id, value: vote } } 
}

const app = {
  init: function(){
    return {
      model: {
        events: [],
        rsvps: [],
        url: '/'
      },
      effect: {
        type: 'INIT'
      }
  }},
  update: function(model, event){
    if(!event) return {model}
    switch(event.type){
      case "SBOT_MY_RSVP_WAS_ADDED":
        const newRsvp = event.payload.vote
        const rsvpIndex = model.rsvps.findIndex(function(rsvp) {
          return rsvp.link == newRsvp.link 
        })
        if(rsvpIndex >= 0){
          const newRsvps = [...model.rsvps] 
          newRsvps[rsvpIndex] = newRsvp
          return {model: { ...model,
            rsvps: newRsvps
          }}
        } else {
          return {model: { ...model,
            rsvps: model.rsvps.concat([event.payload.vote])
          }}
        }
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
    switch(effect.type){
      case "INIT": 
        return actionsStream(client) 
      case "SCHEDULE_RSVP":
        client.publish(Rsvp(effect.id, effect.status), function(err, res) { })
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
