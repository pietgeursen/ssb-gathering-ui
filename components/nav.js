import {html} from 'inu'
const sf = require('sheetify')
const prefix = sf('./nav.css')

function Nav(){
    return html` 
      <div class=${prefix}>
        <nav class='navbar'>
          <div class='container'> 
            <ul class='navbar-list'>
              <li class='navbar-item'>
                <a class='navbar-link' href='/'>Gathering</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>`
    
}

export default Nav
