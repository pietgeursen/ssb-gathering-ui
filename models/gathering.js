import t from 'tcomb'
import UnpublishedGathering from './unpublishedGathering'

const Gathering = UnpublishedGathering.extend({
  author: t.String,
  authorName: t.maybe(t.String),
  id: t.String
}, 'Gathering')

export default Gathering
