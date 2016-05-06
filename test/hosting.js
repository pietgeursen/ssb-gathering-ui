var test = require('tape')
var pull = require('pull-stream')
var ssbKeys = require('ssb-keys')
var validEvent = require('../util/validEvent')
validEvent.type = 'event'

var createSbot = require('scuttlebot')
  .use(require('scuttlebot/plugins/gossip'))
  .use(require('scuttlebot/plugins/friends'))
  .use(require('scuttlebot/plugins/replicate'))
  .use(require('../event-sbot-plugin'))

function follow (id) {
  return {
    type: 'contact', contact: id, following: true
  }
}

test('find gets all messages by all authors', function(t) {

  var piet = createSbot({temp:'piet', keys: ssbKeys.generate()})
  var katie = createSbot({temp:'katie', keys: ssbKeys.generate()})

  katie.gossip.add(piet.getAddress())
  piet.gossip.add(katie.getAddress())

  piet.publish(follow(katie.id), function(err, data) {
  })
  katie.publish(follow(piet.id), function(err, data) {
  })

  piet.events.create(validEvent,function(err, data) {})
  katie.events.create(validEvent,function(err, data) {})

  pull(piet.friends.createFriendStream({live: true}), pull.take(2), pull.collect(function(err, friends) {
    t.equal(friends.find(function(friend) {
     return friend === katie.id 
    }),katie.id ,'friends stream gets katie as friend')
  }))

  pull(piet.events.find(), pull.take(2), pull.collect(function(err, events) {
    t.equal(events[0].value.author, piet.id, 'message authored by piet')
    t.equal(events[1].value.author, katie.id, 'message authored by katie')
    t.equal(events.length, 2, 'got both events') 

    t.end()
    piet.close()
    katie.close()
  }))
  
})


test.skip('[WIP] hosting', function(t) {
  var testBot = require('../util/createTestSbot')('teste')

  testBot.events.create(validEvent,function(err, data) {
  })

  pull(testBot.events.hosting(), pull.drain(function(record) {
   t.equal(record.value.content.type, 'event', 'data has type event') 
   t.end()
   testBot.close()
   return false
  }))   
})

