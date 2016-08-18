import { pull } from 'inu'
import SbotCommentWasAddedAction from '../actions/sbotCommentWasAdded'

function sbotCommentWasAdded (client) {
  return pull(
    client.findCommentsOnGatherings(),
    pull.asyncMap(function (comment, cb) {
      client.findAuthorNameOfMessage(comment.author, function (err, name) {
        if (err) return cb(err)
        comment.authorName = name
        cb(null, comment)
      })
    }),
    pull.map((comment) => {
      console.log('sbot emitted a comment', comment)
      return SbotCommentWasAddedAction({author: comment.author, authorName: comment.authorName, mentions: comment.content.mentions[0], text: comment.content.text})
    })
  )
}

export default sbotCommentWasAdded
