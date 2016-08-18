import { pull } from 'inu'
import SbotGatheringWasAddedAction from '../actions/sbotGatheringWasAdded'

function sbotFutureGatheringWasAdded (client) {
  return pull(
    client.findFutureGatherings(),
    pull.asyncMap(function (gathering, cb) {
      client.findAuthorNameOfMessage(gathering.author, function (err, name) {
        if (err) return cb(err)
        gathering.authorName = name
        cb(null, gathering)
      })
    }),
    pull.map((gathering) => {
      console.log(gathering)
      var action = SbotGatheringWasAddedAction(gathering)
      return action
    })
  )
}

export default sbotFutureGatheringWasAdded
