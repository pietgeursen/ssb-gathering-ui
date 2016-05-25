import {start, pull, html} from 'inu'
import ready from 'domready'
import t from 'tcomb'
import SSBClient from './ws-client'
import api from './api'
import Router from './components/router'
const client = SSBClient(api)

import actionsStream from './streams/actionsStream'
import Effect from './effects/effects'
import ScheduleInit from './effects/scheduleInit'
import ScheduleRsvp from './effects/scheduleRsvp'
import SbotGatheringAdded from './actions/sbotGatheringWasAdded'
import SbotMyRsvpWasAdded from './actions/sbotMyRsvpWasAdded'
import UiDidRsvp from './actions/uiDidRsvp'
import UiUrlDidChangeAction from './actions/uiUrlDidChange'
import Default from './actions/default'

import Rsvps from './models/rsvps'
import Gatherings from './models/gatherings'
import Model from './models/model'

const Action = t.union([SbotGatheringAdded, SbotMyRsvpWasAdded, UiDidRsvp, UiUrlDidChangeAction], 'Action')

const State = t.struct({
  model: Model,
  effect: t.maybe(t.Object)
}, 'State')

const app = {

  init: function(){
    return State({
      model: {
        gatherings: [],
        rsvps: [],
        url: '/'
      },
      effect: ScheduleInit({})
      })},

  update: function(model, action){
    console.log(model, action);
    return State(Action(action).update(model, action))
  },

  view: (model, dispatch) => {
    return html`
      <main>
        ${Router(model, dispatch)}
      </main>`
  },

  run: function(effect){
    return Effect(effect).run(client)
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
