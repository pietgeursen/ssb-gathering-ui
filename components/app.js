import element from 'vdux/element'
const sf = require('sheetify')
const prefix = sf('./app.css')

const App = {

  render ({props}) {
    return (
      <div class={prefix}>
        <nav class='navbar'>
          <div class='container'> 
            <ul class='navbar-list'>
              <li class='navbar-item'>
                <a class='navbar-link' href='/#/'>Events</a>
              </li>
            </ul>
          </div>
        </nav>
        <div class='container'>
          <div class='section'>
            <select>
              <option value='upcoming'>Upcoming</option>
              <option value='hosting'>Hosting</option>
              <option value='invites'>Invites</option>
            </select>
            <a class='button button-primary create-button' href='/#/create'>Create</a> 
          </div>
          <div class='section'>
          </div>
        </div>
      </div>

      )
  }

}

export default App
