var test = require('tape')
var pull = require('pull-stream')
var ssbKeys = require('ssb-keys')
var schema = require('ssb-msg-schemas')
var validEvent = require('../util/validEvent')
validEvent.type = 'event'

var createSbot = require('scuttlebot')
  .use(require('../event-sbot-plugin'))

test('can get all rsvps on an event', function(t) {
  var pietKey = ssbKeys.generate()
  var sbot = createSbot({temp:'piety', keys: pietKey})

  sbot.publish(validEvent,function(err, event) {
    var id = event.key 
     
    sbot.publish(schema.vote(id, 1), function(err, vote) {
      pull(sbot.events.rsvpsOnEvent(id, {live: false}), pull.collect(function(err, data) {
        t.equal(data.length, 1, 'one link references event')
        t.deepEqual(data[0], vote.value)
        sbot.close()
        t.end()
      }))
    })
  })
})
