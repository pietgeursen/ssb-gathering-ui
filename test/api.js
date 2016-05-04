var Muxrpc = require('muxrpc')
var pull = require('pull-stream')
var test = require('tape');
var TestBot = require('../util/createTestSbot')

var api = {
  findEvents: 'source',
  createEvent: 'async'
}

var testBot = TestBot('teste')

var client = Muxrpc(api, null)()

var server = Muxrpc(null, api)({
   findEvents: function(){
     return testBot.messagesByType({type: 'event', live:true})
   },
   createEvent: function(event, cb) {
    testBot.publish(event, cb)
   }
})

var a = client.createStream() 
var b = server.createStream()

pull(a,b,a)

test('I get it', function(t) {
  client.createEvent({type: 'event'},function(err, data) {
    t.false(err)
  })
  pull(client.findEvents(), pull.drain(function(record) {
   t.equal(record.value.content.type, 'event', 'data has type event') 
   t.end()
   testBot.close()
   return false
  })) 
})

