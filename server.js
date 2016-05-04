var createSbot = require('scuttlebot')
  .use(require('./event-sbot-plugin'))

var ssbKeys = require('ssb-keys')
var sbot = createSbot({keys: ssbKeys.generate(), temp: 'test'})

var WSServer = require('./ws-server');
var ws = require('pull-ws-server')

var wsServerfn = WSServer(sbot)

var server = ws.createServer()

server.on('connection', wsServerfn)
server.listen(7777)
