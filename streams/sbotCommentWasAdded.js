import {pull} from 'inu'
import SbotCommentWasAddedAction from '../actions/sbotCommentWasAdded'

function sbotCommentWasAdded(client, gatheringId){
  return pull(
    pull.values([{mentions: gatheringId, text: 'derp'}]),
    pull.map((comment) => {
      return SbotCommentWasAddedAction(comment)
    })
  )
}

export default sbotCommentWasAdded

