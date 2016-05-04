var test = require('tape')
var pull = require('pull-stream')
var ssbKeys = require('ssb-keys')

var createSbot = require('scuttlebot')

function createTestBot(name, port) {
 return createSbot({keys: ssbKeys.generate(), temp: name, port: port})
}

module.exports = createTestBot 


