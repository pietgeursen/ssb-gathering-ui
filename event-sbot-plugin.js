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
    return {
      find: function(){
        return sbot.messagesByType({type: 'event', live:true})
      },
      findFuture: function(){
        return pull(this.find(), pull.filter(function(event) {
          return moment(event.value.content.dateTime).isAfter(moment())
        }))
      },
      create: function(event, cb) {
        sbot.publish(event, cb)
      }
    }  
  }

}

