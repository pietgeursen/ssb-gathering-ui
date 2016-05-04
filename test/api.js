var pull = require('pull-stream')
var test = require('tape');
var moment = require('moment')


test('create', function(t) {
  var testBot = require('../util/createTestSbot')('teste')

  testBot.events.create({type: 'event'},function(err, data) {
    t.false(err, 'creates event without error')
    t.end()
    testBot.close()
    return false
  })
})

test('find', function(t) {
  var testBot = require('../util/createTestSbot')('teste')

  testBot.events.create({type: 'event'},function(err, data) {
  })

  pull(testBot.events.find(), pull.drain(function(record) {
   t.equal(record.value.content.type, 'event', 'data has type event') 
   t.end()
   testBot.close()
   return false
  }))   
})

test('findFuture', function(t) {
  var testBot = require('../util/createTestSbot')('teste')
  var futureDateTime = moment().add(1, 'days').toDate()

  testBot.events.create({type: 'event', dateTime: futureDateTime}, function(err, data) {
  })

  pull(testBot.events.findFuture(), pull.drain(function(record) {
   t.true(moment(record.value.content.dateTime).isAfter(new Date()), 'event is in the future') 
   t.end()
   testBot.close()
   return false
  }))   
})
