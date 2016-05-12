import yo from 'yo-yo'
const sf = require('sheetify')
const prefix = sf('./nav.css')

function Nav(){
    return yo` 
      <div class={prefix}>
        <nav class='navbar'>
          <div class='container'> 
            <ul class='navbar-list'>
              <li class='navbar-item'>
                <a class='navbar-link' href='/'>Events</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>`
    
}

export default Nav
