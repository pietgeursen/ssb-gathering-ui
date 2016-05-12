import start from 'inu'
import yo from 'yo-yo'
import moment from 'moment'
import ready from 'domready'
import SSBClient from './ws-client'
import pull from 'pull-stream'
import api from './api'
import Router from './components/router'
const main = document.querySelector('main')
var client = SSBClient(api)

const sbotSeedEvents = require('./util/seedEvents')
for(event of sbotSeedEvents){
  //client.createEvent(event,function(err, data) {
  //})
}

const app = {
  init: function(){
    console.log('in init');
    return {
      model: {
        events: sbotSeedEvents,
        url: '/'
      }
    }},
  update: function(model, event){
    console.log('in reducer');
    return {model: {...model}}
  },
  view: Router,
  run: function(effect){
    return
  }
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

ready(function(){
  var streams = start(app)

  streams.viewStream(function(view) {
    yo.update(main, view)
  })
})
