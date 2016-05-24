import t from 'tcomb'
import Model from '../models/model'

const UiUrlDidChange = t.struct({payload: t.String}, 'uiUrlDidChange')

UiUrlDidChange.prototype.update = function(model) {
  return {model: Model.update(model, {url: {$set: this.payload}}) }
}

export default UiUrlDidChange
