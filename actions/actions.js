import t from 'tcomb'

import SbotGatheringAdded from './sbotGatheringWasAdded'
import SbotMyRsvpWasAdded from './sbotMyRsvpWasAdded'
import UiDidRsvp from './uiDidRsvp'
import UiUrlDidChangeAction from './uiUrlDidChange'
import UiDidCreateGathering from './uiDidCreateGathering'


const Action = t.union([SbotGatheringAdded, SbotMyRsvpWasAdded, UiDidRsvp, UiUrlDidChangeAction, UiDidCreateGathering], 'Action')

export default Action
