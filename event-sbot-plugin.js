var api = require('./api');

module.exports = {
  name: 'events',
  version: '0.0.0',
  manifest: {
    find: 'source',
    create: 'async'
  },
  permissions: {},
  init: function(sbot, config){
    return {
      find: function(){
        return sbot.messagesByType({type: 'event', live:true})
      },
      create: function(event, cb) {
        sbot.publish(event, cb)
      }
    }  
  }

}

