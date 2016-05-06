var test = require('tape')
var pull = require('pull-stream')
var ssbKeys = require('ssb-keys')
var validEvent = require('../util/validEvent')
validEvent.type = 'event'

var createSbot = require('scuttlebot')
  .use(require('scuttlebot/plugins/friends'))
  .use(require('../event-sbot-plugin'))

function follow (id) {
  return {
    type: 'contact', contact: id, following: true
  }
}

test('find gets all messages by all authors, hosting gets only messages by me', function(t) {
  var pietKey = ssbKeys.generate()
  var katieKey = ssbKeys.generate()
  var sbot = createSbot({temp:'piet', keys: pietKey})
  var katie = sbot.createFeed(katieKey)
  var piet = sbot.createFeed(pietKey)


  piet.add(follow(katie.id), function(err, data) {
  })
  katie.add(follow(piet.id), function(err, data) {
  })

  piet.add(validEvent,function(err, data) {})
  katie.add(validEvent,function(err, data) {})

  pull(sbot.events.find(), pull.take(2), pull.collect(function(err, events) {
    t.equal(events[0].value.author, piet.id, 'message authored by piet')
    t.equal(events[1].value.author, katie.id, 'message authored by katie')
    t.equal(events.length, 2, 'got both events') 
    
    pull(sbot.events.hosting({live: false}), pull.collect(function (err, events){
      t.equal(events.length, 1, 'there is only one event')
      t.equal(events[0].value.author, piet.id, 'and its piets')
      t.end()
      sbot.close()
    }))

  }))
  
})


