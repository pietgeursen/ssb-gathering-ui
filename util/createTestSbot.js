var test = require('tape')
var pull = require('pull-stream')
var ssbKeys = require('ssb-keys')

var createSbot = require('scuttlebot')

function createTestBot(name) {
 return createSbot({keys: ssbKeys.generate(), temp: name})
}

module.exports = createTestBot 


