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
  var piet = sbot.createFeed(pietKey)

  piet.add(validEvent,function(err, data) {
    var id = data.key 
     
    sbot.publish(schema.post({text:'wee', mentions: id}), function(err, data) {
      console.log(err, data)
      pull(sbot.links({source:id}), pull.collect(function(err, data) {
        console.log(err, data);
        t.equal(data.length, 1, 'one link references event')
        sbot.close()
        t.end()
      }))
      
    })
  
  })

  
})


