import t from 'tcomb'
import Event from './event'

const Events = t.list(Event, 'Events')

export default Events
