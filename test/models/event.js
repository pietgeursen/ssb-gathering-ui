import test from 'tape'
import Event from '../../models/event'

test('throws when making an empty event', function(t) {
  t.throws(()=>Event({}))
  t.end()
})

test('creates a new event with the correct object', function(t) {
  const ev ={
    title: "",
    description: "",
    location: "",
    author: "",
    id: "",
    dateTime: "", 
    imageUrl: "",
    type: ""
  }

  const newEvent = Event(ev)
  t.ok(newEvent)
  t.end()
})

