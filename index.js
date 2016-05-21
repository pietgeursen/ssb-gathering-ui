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

import Rsvps from './models/rsvps'
import Events from './models/events'
import Model from './models/model'

const Action = t.union([SbotEventAdded, SbotMyRsvpWasAdded, UiDidRsvp ], 'Action')

const State = t.struct({
  model: Model,
  effect: t.maybe(t.Object)
}, 'State')

const app = {

  init: function(){
    return State({
      model: Model({
        events: Events([]),
        rsvps: Rsvps([]),
        url: '/'
      }),
      effect: {
        type: 'INIT'
      }})
      },

  update: function(model, event){
    debugger
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
        client.publish(RsvpMsg(effect.id, effect.status), function(err, res) { })
        return pull.empty()
    }
    return pull.empty()
  }
}

function RsvpMsg(id, vote){
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
