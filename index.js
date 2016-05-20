import {start, pull, html} from 'inu'
import ready from 'domready'
import t from 'tcomb'
import SSBClient from './ws-client'
import api from './api'
import Router from './components/router'
const client = SSBClient(api)

import actionsStream from './streams/actionsStream'
import SbotEventAdded from './actions/sbotEventWasAdded'
import SbotMyRsvpWasAdded from './actions/sbotMyRsvpWasAdded'
import UiDidRsvp from './actions/uiDidRsvp'


const Action = t.union([SbotEventAdded, SbotMyRsvpWasAdded, UiDidRsvp ], 'Action')

const State = t.struct({
  model: t.Object,
  effect: t.maybe(t.Object)
}, 'State')

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
    return State(Action(event).update(model, event))
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

function Rsvp(id, vote){
  return { type: 'rsvp', vote: { link: id, value: vote } } 
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
