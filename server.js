var createSbot = require('scuttlebot')
  .use(require('../sbot-events/'))

var ssbKeys = require('ssb-keys')
var sbot = createSbot({keys: ssbKeys.generate(), temp: 'test-fun'})

var WSServer = require('./ws-server');
var ws = require('pull-ws-server')

//temporary seed of db for dev.
var seedGatherings = require('./util/seedGatherings');
for(event of seedGatherings){
  sbot.events.create(event, function(err, data) {
    console.log(err);
  })
}

var wsServerfn = WSServer(sbot)

var server = ws.createServer()

server.on('connection', wsServerfn)
server.listen(7777)
