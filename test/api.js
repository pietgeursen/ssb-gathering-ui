var pull = require('pull-stream')
var test = require('tape');
var ssbKeys = require('ssb-keys')
var createSbot = require('scuttlebot')
  .use(require('../event-sbot-plugin'))


var testBot = createSbot({keys: ssbKeys.generate(), temp: 'test'})

test('I get it', function(t) {
  testBot.events.createEvent({type: 'event'},function(err, data) {
    t.false(err, 'creates event without error')
  })
  pull(testBot.events.findEvents(), pull.drain(function(record) {
   t.equal(record.value.content.type, 'event', 'data has type event') 
   t.end()
   testBot.close()
   return false
  })) 
})

