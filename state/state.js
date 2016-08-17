import t from 'tcomb'
import Model from '../models/model'
import Effect from '../effects/effects'
import ScheduleInit from '../effects/scheduleInit'

const State = t.struct({
  model: Model,
  effect: t.maybe(t.Object)
}, 'State')

export default State
export function initialState(){
  console.log('init state');
  return State({
    model: Model({
      gatherings: [],
      rsvps: [],
      comments: [],
      url: '/'
    }),
    effect: ScheduleInit({})
  })
}

