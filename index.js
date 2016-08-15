import {start, pull, html} from 'inu'
import ready from 'domready'

import SSBClient from './ws-client'
import api from './api'
const client = SSBClient(api)

import Effect from './effects/effects'
import Action from './actions/actions'
import State, {initialState} from './state/state'

import Router from './components/router'

const app = {

  init: initialState,

  update: function(model, action){
   const newState = State(Action(action).update(model, action))
   return newState
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

const {views} = start(app)

ready(function(){
  const main = document.querySelector('main')
  
  pull(
    views(),
    pull.drain(function(view) {
      html.update(main, view)
  }))
})
