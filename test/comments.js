var test = require('tape')
var pull = require('pull-stream')
var ssbKeys = require('ssb-keys')
var schema = require('ssb-msg-schemas')
var validEvent = require('../util/validEvent')
validEvent.type = 'event'

var createSbot = require('scuttlebot')
  .use(require('../event-sbot-plugin'))

test('can get all comments on an event', function(t) {
  var pietKey = ssbKeys.generate()
  var sbot = createSbot({temp:'piety', keys: pietKey})

  sbot.publish(validEvent,function(err, event) {
    var id = event.key 
     
    sbot.publish(schema.post('wee',null, null, id), function(err, comment) {
      pull(sbot.links({dest: id}), pull.collect(function(err, data) {
        t.equal(data.length, 1, 'one link references event')
        sbot.close()
        t.end()
      }))
      
    })
  
  })

  
})

