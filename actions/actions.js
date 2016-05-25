import t from 'tcomb'

import SbotGatheringAdded from './sbotGatheringWasAdded'
import SbotMyRsvpWasAdded from './sbotMyRsvpWasAdded'
import UiDidRsvp from './uiDidRsvp'
import UiUrlDidChangeAction from './uiUrlDidChange'


const Action = t.union([SbotGatheringAdded, SbotMyRsvpWasAdded, UiDidRsvp, UiUrlDidChangeAction], 'Action')

export default Action
