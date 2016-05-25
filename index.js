import {start, pull, html} from 'inu'
import ready from 'domready'
import t from 'tcomb'
import SSBClient from './ws-client'
import api from './api'
import Router from './components/router'
const client = SSBClient(api)

import Effect from './effects/effects'
import Action from './actions/actions'
import State, {initialState} from './state/state'

const app = {

  init: initialState,

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
