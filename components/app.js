import element from 'vdux/element'

const App = {

  render (state) {
    return <h1>Welcome to {state.props.name}</h1>
  }

}

export default App
