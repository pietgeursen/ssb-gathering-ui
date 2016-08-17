import {html} from 'inu'
import classNames from 'classnames'
const sf = require('sheetify')

import Gathering from './gathering'
import rsvpToGatheringSelector from '../selectors/rsvpToGatheringSelector'
import commentsOnGatheringSelector from '../selectors/commentsOnGatheringSelector'
import uiDiDComment from '../actions/uiDidComment'
const prefix = sf('./showGathering.css')

function ShowGathering(id){
  return function(model, dispatch){
    const gathering = model.gatherings.find(function(gathering) {
     return gathering.id === atob(id) 
    })
    const rsvp = rsvpToGatheringSelector(gathering)(model)
    const comments = commentsOnGatheringSelector(gathering)(model) 
    return ( html`
      <div class=${classNames([prefix, "section"])}>
        ${Gathering({gathering, rsvp}, dispatch)}
        <div class="details section"> 
          <h2>Details</h2>
          <h4>${gathering.description}</h4>
        </div>
        <div class="add-comment section"> 
          <h2>Write a comment</h2>
          <textarea class="u-full-width" placeholder="Write something..." ></textarea>
          <button onclick=${()=> dispatch(uiDiDComment({mentions: gathering.id, text: 'wee'}))}>Post</button>
        </div>
        <div class="comments section"> 
          ${comments.map(function(comment) {
            return( html`
            <div class="comment"> 
              ${comment.text} 
            </div>`
            )
          })}
        </div>
      </div>`
    )
  }

}

export default ShowGathering
