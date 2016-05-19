import {html} from 'inu'
const sf = require('sheetify')

function ActiveButton (model, dispatch){
  return html`
    <button onclick=${model.click} class=${model.active ? 'button-primary' : 'button'}>${model.text}</button>  
  `
}

export default ActiveButton
