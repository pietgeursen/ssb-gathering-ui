var muxrpc = require('muxrpc')
var pull = require('pull-stream')
var Serializer = require('pull-serializer')
var api = require('./api')

module.exports = function (sbot) {
  return function (stream) {
    // create rpc object
    var rpc = muxrpc({}, api, serialize)({
      findEvents: sbot.events.find,
      findFutureEvents: sbot.events.future,
      createEvent: sbot.events.create,
      myRsvps: sbot.events.myRsvps,
			publish: sbot.publish
    })

    // start the stream
    pull(stream, rpc.createStream(), stream)
  }
}

function serialize (stream) {
  return Serializer(stream, JSON, {split: '\n\n'})
}

module.exports.verifyClient = function (config) {
  return function (info) {
    return info.origin === config.getLocalUrl()
  }
}
