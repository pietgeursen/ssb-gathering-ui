import {pull} from 'inu'
import SbotCommentWasAddedAction from '../actions/sbotCommentWasAdded'

function sbotCommentWasAdded(client){
  return pull(
    client.findCommentsOnGatherings(),
    pull.map((comment) => {
      console.log('sbot emitted a comment', comment)
      return SbotCommentWasAddedAction({mentions: comment.content.mentions[0], text: comment.content.text})
    })
  )
}

export default sbotCommentWasAdded

