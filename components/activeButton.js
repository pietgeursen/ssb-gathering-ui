import yo from 'yo-yo'
const sf = require('sheetify')

function ActiveButton (model, dispatch){
    return yo`
      <button onClick=${dispatch()} class=${model.active ? 'button-primary' : 'button'}>${model.text}</button>  
    `
  
}

export default ActiveButton
