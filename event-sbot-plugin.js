var api = require('./api');

module.exports = {
  name: 'events',
  version: '0.0.0',
  manifest: api,
  permissions: {},
  init: function(sbot, config){
    return {
      findEvents: function(){
        return sbot.messagesByType({type: 'event', live:true})
      },
      createEvent: function(event, cb) {
        sbot.publish(event, cb)
      }
    }  
  }

}

