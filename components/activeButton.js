import element from 'vdux/element'
const sf = require('sheetify')

const ActiveButton = {
  render(state){
    return (
      <button onClick={state.props.click} class={state.props.active ? 'button-primary' : 'button'}>{state.props.text}</button>  
    ) 
  }
}

export default ActiveButton
