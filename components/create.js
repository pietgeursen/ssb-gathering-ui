import element from 'vdux/element'
const sf = require('sheetify')
const prefix = sf('./create.css')

const Create = {
  render ({props}) {
    return (
      <div class={prefix}>
        <form>
          
        </form>
      </div>
    ) 
  }
}

export default Create
