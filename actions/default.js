import t from 'tcomb'

const Default = t.struct({payload: t.Object}, 'default')
Default.prototype.update = function(model) {
  debugger
  return {model: {...model}}
}

export default Default
