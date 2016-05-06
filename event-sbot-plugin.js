var api = require('./api')
var pull = require('pull-stream')
var moment = require('moment')
var Event  = require('./util/eventType');

module.exports = {
  name: 'events',
  version: '0.0.0',
  manifest: {
    find: 'source',
    findFuture: 'source',
    create: 'async'
  },
  permissions: {},
  init: function(sbot, config){
    function find(){
      return sbot.messagesByType({type: 'event', live: true})
    }
    function future() {
      return pull(find(), pull.filter(function(event) {
        return moment(event.value.content.dateTime).isAfter(moment())
      }))
    }
    function hosting(){
      return pull(find(), pull.filter(function(event) {
        return event.value.author === sbot.id 
      })) 
    }
    function create(event, cb) {
      //var e = Event(event)
      sbot.publish(event, cb)
    }
    return {
      find:find,
      future: future,
      create: create,
      hosting: hosting
      }
    }  
}


