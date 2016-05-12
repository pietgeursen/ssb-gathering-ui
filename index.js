import start from 'chur'
import yo from 'yo-yo'
import moment from 'moment'

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
    return {
      model: {
        events: sbotSeedEvents,
        url: '/'
      }
    }},
  update: function(model, event){
    console.log('in reducer', model, event);
    if(!event) return {model: {...model}}
    if(event.event == 'SET_URL'){
      return {model: {...model, url: event.url}} 
    }
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


var streams = start(app)

function setUrl(url){
 return {
  event: 'SET_URL',
  url
 } 
}

document.onclick = handleLinkClicks(setUrl)
function handleLinkClicks (setUrl) {
  return e => {
    if (e.target.nodeName === 'A') {
      e.preventDefault()
      const href = e.target.getAttribute('href')
      console.log(href);
      streams.onEvent(setUrl(href))
    }
  }
}

streams.watchView(function(view) {
  yo.update(main, view)
})
