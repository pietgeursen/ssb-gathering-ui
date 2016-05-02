import element from 'vdux/element'
const sf = require('sheetify')
const prefix = sf('./event.css')

const Event = {

  render({props}){
    return (
      <div class={prefix}>  
        <div class='details row'>  
          <div class='pic four columns'>  
            <img src="http://vignette3.wikia.nocookie.net/thebiglebowski/images/7/7e/The_Dude.jpeg/revision/latest?cb=20111216183045" />
          </div>  
          <div class='info eight columns'>  
            <h3>Title</h3>
            <h4>Saturday 12pm</h4>
            <h4>Piet's house</h4>
            <h4>Created by: Piet</h4>
          </div>  
        </div>  
        <div class='respond-buttons row'>  
          <div class='four columns'>
            <button>GOING</button> 
          </div>
          <div class='four columns'>
            <button>MAYBE</button> 
          </div>
          <div class='four columns'>
            <button>CAN'T GO</button> 
          </div>
        </div>  
      </div>  
    )
  }

}

export default Event
