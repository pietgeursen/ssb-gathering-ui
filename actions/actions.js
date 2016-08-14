import t from 'tcomb'

import SbotGatheringAdded from './sbotGatheringWasAdded'
import SbotMyRsvpWasAdded from './sbotMyRsvpWasAdded'
import SbotCommentWasAdded from './sbotCommentWasAdded'
import UiDidRsvp from './uiDidRsvp'
import UiUrlDidChangeAction from './uiUrlDidChange'
import UiDidCreateGathering from './uiDidCreateGathering'
import UiDidComment from './uiDidComment'


const Action = t.union([SbotGatheringAdded, SbotMyRsvpWasAdded, SbotCommentWasAdded, UiDidRsvp, UiUrlDidChangeAction, UiDidCreateGathering, UiDidComment], 'Action')

export default Action
