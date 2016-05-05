var api = require('./api')
var pull = require('pull-stream')
var moment = require('moment')

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
      return sbot.messagesByType({type: 'event', live:true})
    }
    function future() {
      return pull(find(), pull.filter(function(event) {
        return moment(event.value.content.dateTime).isAfter(moment())
      }))
    }
    function create(event, cb) {
      sbot.publish(event, cb)
    }
    return {
      find:find,
      future: future,
      create: create
      }
    }  
}


