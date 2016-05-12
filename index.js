import start from 'chur'
import yo from 'yo-yo'
import moment from 'moment'

import SSBClient from './ws-client'
import pull from 'pull-stream'
import api from './api'
import App from './components/app'
//import Router from './components/router'
const main = document.querySelector('main')
var client = SSBClient(api)

const sbotSeedEvents = require('./util/seedEvents')
for(event of sbotSeedEvents){
  //client.createEvent(event,function(err, data) {
  //})
}

const app = {
  init: function(){return {model: {events: sbotSeedEvents}}},
  update: function(model, event){
    console.log(model, event);
    return {model: model}
  },
  view: App,
  run: function(effect){}
}


pull(client.findFutureEvents(),pull.map(function(event) {
  return {
    ...event.value.content,
    author : event.value.author,
    id : event.key
  }
}), pull.drain(function(event) {
  //console.log(event);
}))


var streams = start(app)

streams.watchView(function(view) {
  yo.update(main, view)
})
