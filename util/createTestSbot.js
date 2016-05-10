var ssbKeys = require('ssb-keys')

var createSbot = require('scuttlebot')
  .use(require('../../sbot-event'))

function createTestBot(name) {
 return createSbot({keys: ssbKeys.generate(), temp: name})
}

module.exports = createTestBot 


