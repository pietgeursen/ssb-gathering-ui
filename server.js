var createSbot = require('scuttlebot')
  .use(require('scuttlebot/plugins/blobs'))
  .use(require('sbot-gatherings'))

var ssbKeys = require('ssb-keys')
// var path = require('path')
// var pullFile = require('pull-file')
var pull = require('pull-stream')
var cat = require('pull-cat')
var msgs = require('ssb-msg-schemas')

var sbot = createSbot({keys: ssbKeys.generate(), temp: 'test-fun'})

var WSServer = require('./ws-server')
var ws = require('pull-ws-server')

// var fileName = path.join(__dirname, '/dude.jpeg')

// pull(
//  pullFile(fileName),
//  sbot.blobs.add(null, function (err, res) {
//    console.log(err, res)
//  })
// )

// publish an about message that gives us a name.
var nameMe = pull(
  pull.once(1),
  pull.asyncMap(function (data, cb) {
    sbot.whoami(cb)
  }),
  pull.asyncMap(function (me, cb) {
    sbot.publish(msgs.name(me.id, 'Pie'), cb)
  })
)

var seedGatherings = pull(
  pull.values(require('./util/seedGatherings')),
  pull.asyncMap(function (gathering, cb) {
    sbot.gatherings.create(gathering, cb)
  })
)
// temporary seed of db for dev.
pull(
  cat([nameMe, seedGatherings]),
  pull.log()
)

var wsServerfn = WSServer(sbot)

var server = ws.createServer()

server.on('connection', wsServerfn)
server.listen(7777)
