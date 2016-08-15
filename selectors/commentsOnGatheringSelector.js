import {createSelector} from 'reselect'

const comments = model => model.comments

const commentsOnGathering = gathering => (
  createSelector(
    comments,
    comments => comments.filter(function(comment) {
      return comment.mentions === gathering.id 
    })
  )  
) 

export default commentsOnGathering

