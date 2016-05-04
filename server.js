var TestSbot = require('./util/createTestSbot')
var WSServer = require('./ws-server');
var ws = require('pull-ws-server')

var sbot = TestSbot('teste')

var wsServerfn = WSServer(sbot)

var server = ws.createServer()

server.on('connection', wsServerfn)
server.listen(7777)
