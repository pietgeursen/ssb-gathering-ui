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
const futureEventStream = pull(
  client.findFutureEvents(),
  pull.map(function(event) {
    return {
      ...event.value.content,
      author : event.value.author,
      id : event.key
    }}), 
  pull.map(function(event) {
    return {
      event: {type: 'ADD_EVENT'},
      eventToAdd: event
    } 
  }))

const app = {
  init: function(){
    console.log('in init');
    return {
      model: {
        events: sbotSeedEvents,
        url: '/'
      },
      effect: {
        type: 'INIT' 
      }
  }},
  update: function(model, event){
    console.log('in reducer', model, event);
    if(event && event.type == "ADD_EVENT"){
      return {model: { ...model,
        events: events.concat([event.eventToAdd])
      } }
    }
    return {model: {...model}}
  },
  view: Router,
  run: function(effect){
    console.log('in init effect handler', effect);
    if(effect.type == "INIT"){
      return futureEventStream 
    }
    return
  }
}


  //console.log(event);

ready(function(){
  var streams = start(app)

  streams.viewStream(function(view) {
    yo.update(main, view)
  })
  streams.effectStream(function(effect) {
    console.log(effect);
  })
  streams.modelStream(function(model) {
    console.log(model);
  })
})
